import { DatabaseSync } from 'node:sqlite';

export interface SeedResult {
  sedeId: number;
  serviciosCount: number;
  tarifasCount: number;
  bonosCount: number;
  zonasCount: number;
}

/**
 * Ejecuta el sembrado inicial idempotente de la Sede Central (CRUD 15)
 * y los catálogos fundacionales del centro infantil.
 */
export function seedDatabase(db: DatabaseSync): SeedResult {
  db.exec('PRAGMA foreign_keys = ON;');

  // Iniciar transacción para garantizar atomicidad
  db.exec('BEGIN TRANSACTION;');

  try {
    // 1. Semilla Fundacional: Sede Central (CRUD 15 / M07)
    // Desactivar sedes anteriores si existieran para evitar duplicidad activa
    db.prepare('UPDATE configuracion_sede SET activo = 0 WHERE activo = 1;').run();

    const insertSede = db.prepare(`
      INSERT INTO configuracion_sede (
        nombre_sede, direccion, codigo_postal, ciudad, radio_max_km, margen_minutos, normativa_interna, activo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const resSede = insertSede.run(
      'Sede Central EduCare Kids',
      'Calle Mayor 12',
      '46001',
      'Valencia',
      25.0,
      20,
      'Normativa oficial de régimen interno de EduCare Kids: ratio legal por educador, control estricto de alérgenos y margen de seguridad vial de 20 minutos.',
      1
    );
    const sedeId = Number(resSede.lastInsertRowid);

    // 2. Semilla de Catálogo de Servicios (CRUD 04 / M02)
    const insertServicio = db.prepare(`
      INSERT OR IGNORE INTO servicios (codigo_servicio, nombre_servicio, descripcion, precio_base_hora, requiere_desplazamiento, activo)
      VALUES (?, ?, ?, ?, ?, 1)
    `);

    insertServicio.run('CUIDADO_CENTRO', 'Cuidado en Centro Infantil', 'Atención lúdica y pedagógica en las instalaciones del centro.', 12.00, 0);
    insertServicio.run('NINERA_DOMICILIO', 'Niñera a Domicilio', 'Cuidado infantil profesional en el domicilio familiar dentro del radio de 25 km.', 18.00, 1);
    insertServicio.run('CLASES_APOYO', 'Clases de Apoyo Pedagógico', 'Refuerzo escolar personalizado por asignaturas y etapas.', 15.00, 0);
    insertServicio.run('TUTORIA_ASINCRONA', 'Tutoría y Consultas Asíncronas', 'Resolución de dudas pedagógicas mediante buzón interactivo.', 25.00, 0);

    const serviciosCount = Number(db.prepare('SELECT COUNT(*) as count FROM servicios;').get().count);

    // 3. Semilla de Tarifas Dinámicas por Edad (CRUD 05 / M02)
    // Obtener IDs de servicios para vincular recargos etarios (+30% lactante y +15% infantil)
    const servicioCentro = db.prepare("SELECT id_servicio FROM servicios WHERE codigo_servicio = 'CUIDADO_CENTRO'").get();
    const servicioDomicilio = db.prepare("SELECT id_servicio FROM servicios WHERE codigo_servicio = 'NINERA_DOMICILIO'").get();

    const insertTarifa = db.prepare(`
      INSERT OR IGNORE INTO tarifas_edad (id_servicio, rango_edad_min_meses, rango_edad_max_meses, etiqueta_rango, porcentaje_recargo, activo)
      VALUES (?, ?, ?, ?, ?, 1)
    `);

    if (servicioCentro) {
      insertTarifa.run(servicioCentro.id_servicio, 0, 24, '0-2 años: Lactante (+30%)', 0.30);
      insertTarifa.run(servicioCentro.id_servicio, 25, 60, '3-5 años: Infantil (+15%)', 0.15);
      insertTarifa.run(servicioCentro.id_servicio, 61, 144, '6-12 años: Primaria (0%)', 0.00);
    }
    if (servicioDomicilio) {
      insertTarifa.run(servicioDomicilio.id_servicio, 0, 24, '0-2 años: Lactante (+30%)', 0.30);
      insertTarifa.run(servicioDomicilio.id_servicio, 25, 60, '3-5 años: Infantil (+15%)', 0.15);
      insertTarifa.run(servicioDomicilio.id_servicio, 61, 144, '6-12 años: Primaria (0%)', 0.00);
    }

    const tarifasCount = Number(db.prepare('SELECT COUNT(*) as count FROM tarifas_edad;').get().count);

    // 4. Semilla de Catálogo de Bonos (CRUD 11 / M05)
    const insertBono = db.prepare(`
      INSERT OR IGNORE INTO catalogo_bonos (nombre_bono, horas_totales, precio_total, porcentaje_descuento, dias_validez, activo)
      VALUES (?, ?, ?, ?, ?, 1)
    `);

    insertBono.run('Bono Básico 5h', 5, 85.00, 5.0, 90);
    insertBono.run('Bono Estándar 10h', 10, 160.00, 10.0, 90);
    insertBono.run('Bono Familiar Plus 20h', 20, 300.00, 15.0, 90);

    const bonosCount = Number(db.prepare('SELECT COUNT(*) as count FROM catalogo_bonos;').get().count);

    // 5. Semilla de Zonas de Desplazamiento (CRUD 09 / M04)
    const insertZona = db.prepare(`
      INSERT OR IGNORE INTO zonas_desplazamiento (nombre_zona, distancia_min_km, distancia_max_km, suplemento_desplazamiento, tiempo_estimado_minutos, activo)
      VALUES (?, ?, ?, ?, ?, 1)
    `);

    insertZona.run('Zona 1: Proximidad Centro', 0.0, 5.0, 0.00, 10);
    insertZona.run('Zona 2: Urbana Valencia', 5.1, 15.0, 5.00, 20);
    insertZona.run('Zona 3: Metropolitana Límite', 15.1, 25.0, 10.00, 25);

    const zonasCount = Number(db.prepare('SELECT COUNT(*) as count FROM zonas_desplazamiento;').get().count);

    db.exec('COMMIT;');

    return {
      sedeId,
      serviciosCount,
      tarifasCount,
      bonosCount,
      zonasCount,
    };
  } catch (error) {
    db.exec('ROLLBACK;');
    throw error;
  }
}

