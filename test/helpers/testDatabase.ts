import { DatabaseSync } from 'node:sqlite';
import * as fs from 'fs';
import * as path from 'path';

export interface TestDatabaseOptions {
  seed?: boolean;
  foreignKeys?: boolean;
}

export interface SeedSummary {
  sedeId: number;
  serviciosCount: number;
  tarifasCount: number;
  bonosCount: number;
  zonasCount: number;
}

/**
 * Helper para aprovisionar instancias aisladas de SQLite en memoria (:memory:)
 * garantizando determinismo e independencia total entre suites de prueba.
 */
export class TestDatabaseHelper {
  private static cachedSchemaSql: string | null = null;

  /**
   * Obtiene el SQL del esquema maestro de 16 tablas 3FN cacheador para máxima velocidad.
   */
  public static getSchemaSql(): string {
    if (!TestDatabaseHelper.cachedSchemaSql) {
      const possiblePaths = [
        path.resolve(process.cwd(), 'src', 'infrastructure', 'database', 'schema.sql'),
        path.resolve(process.cwd(), 'migrations', '001_initial_schema.sql'),
      ];

      for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
          TestDatabaseHelper.cachedSchemaSql = fs.readFileSync(p, 'utf8');
          break;
        }
      }

      if (!TestDatabaseHelper.cachedSchemaSql) {
        throw new Error('No se encontró el archivo schema.sql maestro para inicializar la base de datos de test.');
      }
    }
    return TestDatabaseHelper.cachedSchemaSql;
  }

  /**
   * Crea una instancia nueva, completamente aislada y en memoria (:memory:) de SQLite.
   * Aplica el DDL de 16 tablas 3FN e inicializa restricciones de claves foráneas.
   */
  public static create(options: TestDatabaseOptions = {}): DatabaseSync {
    const { seed = false, foreignKeys = true } = options;

    const db = new DatabaseSync(':memory:');

    if (foreignKeys) {
      db.exec('PRAGMA foreign_keys = ON;');
    }

    // Cargar DDL maestro de 16 tablas
    const schemaSql = TestDatabaseHelper.getSchemaSql();
    db.exec(schemaSql);

    if (seed) {
      TestDatabaseHelper.seed(db);
    }

    return db;
  }

  /**
   * Puebla la base de datos de prueba con datos maestros básicos (Sede central, catálogos base).
   */
  public static seed(db: DatabaseSync): SeedSummary {
    db.exec('BEGIN TRANSACTION;');

    try {
      // 1. Sede Central
      db.prepare('UPDATE configuracion_sede SET activo = 0 WHERE activo = 1;').run();
      const insertSede = db.prepare(`
        INSERT INTO configuracion_sede (
          nombre_sede, direccion, codigo_postal, ciudad, radio_max_km, margen_minutos, normativa_interna, activo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 1)
      `);
      const resSede = insertSede.run(
        'Sede Central Test',
        'Calle Mayor 12',
        '46001',
        'Valencia',
        25.0,
        20,
        'Normativa interna de prueba'
      );
      const sedeId = Number(resSede.lastInsertRowid);

      // 2. Servicios
      const insertServicio = db.prepare(`
        INSERT OR IGNORE INTO servicios (codigo_servicio, nombre_servicio, descripcion, precio_base_hora, requiere_desplazamiento, activo)
        VALUES (?, ?, ?, ?, ?, 1)
      `);
      insertServicio.run('CUIDADO_CENTRO', 'Cuidado en Centro', 'Cuidado regular en centro infantil', 12.00, 0);
      insertServicio.run('NINERA_DOMICILIO', 'Niñera a Domicilio', 'Servicio a domicilio', 18.00, 1);
      insertServicio.run('CLASES_APOYO', 'Clases de Apoyo', 'Refuerzo escolar', 15.00, 0);
      insertServicio.run('TUTORIA_ASINCRONA', 'Tutoría Asíncrona', 'Buzón pedagógico', 25.00, 0);

      // 3. Tarifas por edad
      const servCentro = db.prepare("SELECT id_servicio FROM servicios WHERE codigo_servicio = 'CUIDADO_CENTRO'").get() as { id_servicio: number };
      if (servCentro) {
        const insertTarifa = db.prepare(`
          INSERT OR IGNORE INTO tarifas_edad (id_servicio, rango_edad_min_meses, rango_edad_max_meses, etiqueta_rango, porcentaje_recargo, activo)
          VALUES (?, ?, ?, ?, ?, 1)
        `);
        insertTarifa.run(servCentro.id_servicio, 0, 24, '0-2 años: Lactante (+30%)', 0.30);
        insertTarifa.run(servCentro.id_servicio, 25, 60, '3-5 años: Infantil (+15%)', 0.15);
        insertTarifa.run(servCentro.id_servicio, 61, 144, '6-12 años: Primaria (0%)', 0.00);
      }

      // 4. Catálogo de bonos
      const insertBono = db.prepare(`
        INSERT OR IGNORE INTO catalogo_bonos (nombre_bono, horas_totales, precio_total, porcentaje_descuento, dias_validez, activo)
        VALUES (?, ?, ?, ?, ?, 1)
      `);
      insertBono.run('Bono 5h Test', 5, 85.00, 5.0, 90);
      insertBono.run('Bono 10h Test', 10, 160.00, 10.0, 90);

      // 5. Zonas de desplazamiento
      const insertZona = db.prepare(`
        INSERT OR IGNORE INTO zonas_desplazamiento (nombre_zona, distancia_min_km, distancia_max_km, suplemento_desplazamiento, tiempo_estimado_minutos, activo)
        VALUES (?, ?, ?, ?, ?, 1)
      `);
      insertZona.run('Zona 1 Test', 0.0, 5.0, 0.00, 10);
      insertZona.run('Zona 2 Test', 5.1, 15.0, 5.00, 20);

      db.exec('COMMIT;');

      return {
        sedeId,
        serviciosCount: Number((db.prepare('SELECT count(*) as c FROM servicios').get() as { c: number }).c),
        tarifasCount: Number((db.prepare('SELECT count(*) as c FROM tarifas_edad').get() as { c: number }).c),
        bonosCount: Number((db.prepare('SELECT count(*) as c FROM catalogo_bonos').get() as { c: number }).c),
        zonasCount: Number((db.prepare('SELECT count(*) as c FROM zonas_desplazamiento').get() as { c: number }).c),
      };
    } catch (error) {
      db.exec('ROLLBACK;');
      throw error;
    }
  }

  /**
   * Limpia y vacía las tablas de datos respetando las restricciones de integridad.
   */
  public static clean(db: DatabaseSync): void {
    db.exec('PRAGMA foreign_keys = OFF;');
    const tables = [
      'auditoria_eventos',
      'facturas_usuarios',
      'registros_cuidados',
      'entregas_tutoria',
      'bonos_familias',
      'catalogo_bonos',
      'bloqueos_viales',
      'citas',
      'zonas_desplazamiento',
      'franjas_horarias',
      'materias_apoyo',
      'tarifas_edad',
      'servicios',
      'alergenos_menores',
      'menores',
      'familias',
      'configuracion_sede',
    ];
    for (const t of tables) {
      db.exec(`DELETE FROM ${t};`);
    }
    db.exec('PRAGMA foreign_keys = ON;');
  }

  /**
   * Cierra de forma segura la instancia de base de datos en memoria.
   */
  public static teardown(db: DatabaseSync): void {
    try {
      db.close();
    } catch {
      // Ya cerrada
    }
  }
}
