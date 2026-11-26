import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { TestDatabaseHelper } from '../helpers/testDatabase.ts';

describe('PRU-02 Inicial: Certificación de Claves Foráneas, Integridad Referencial y Restricciones 3FN (SUB-103-01)', () => {
  let db: DatabaseSync;

  beforeEach(() => {
    db = TestDatabaseHelper.create();
  });

  afterEach(() => {
    TestDatabaseHelper.teardown(db);
  });

  describe('1. Verificación del Catálogo Completo de Tablas 3FN e Índices', () => {
    it('debe contener las 16 tablas del modelo funcional CRUD más la tabla auxiliar de auditoría (17 en total)', () => {
      const stmt = db.prepare(`
        SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name ASC
      `);
      const tables = (stmt.all() as Array<{ name: string }>).map((t) => t.name);

      const expectedTables = [
        'alergenos_menores',
        'auditoria_eventos',
        'bloqueos_viales',
        'bonos_familias',
        'catalogo_bonos',
        'citas',
        'configuracion_sede',
        'entregas_tutoria',
        'facturas_usuarios',
        'familias',
        'franjas_horarias',
        'materias_apoyo',
        'menores',
        'registros_cuidados',
        'servicios',
        'tarifas_edad',
        'zonas_desplazamiento',
      ];

      assert.strictEqual(tables.length, 17, 'Debe registrar exactamente 17 tablas relacionales');
      assert.deepStrictEqual(tables.sort(), expectedTables.sort(), 'El catálogo de tablas debe coincidir con el diseño 3FN');
    });

    it('debe tener creados los 8 índices estratégicos de rendimiento para consultas frecuentes', () => {
      const stmt = db.prepare(`
        SELECT name FROM sqlite_master WHERE type = 'index' AND name LIKE 'idx_%' ORDER BY name ASC
      `);
      const indexes = (stmt.all() as Array<{ name: string }>).map((i) => i.name);

      const expectedIndexes = [
        'idx_alergenos_menor',
        'idx_bloqueos_fecha',
        'idx_bonos_familia_estado',
        'idx_citas_familia',
        'idx_citas_fecha_estado',
        'idx_cuidados_cita_menor',
        'idx_facturas_familia',
        'idx_menores_familia',
        'idx_tarifas_servicio',
      ];

      for (const idx of expectedIndexes) {
        assert.ok(indexes.includes(idx), `Debe existir el índice de rendimiento ${idx}`);
      }
    });
  });

  describe('2. Bloqueo de Registros Huérfanos e Integridad Referencial (PRAGMA foreign_keys = ON)', () => {
    it('debe rechazar la inserción de un menor sin familia titular existente (FOREIGN KEY constraint failed)', () => {
      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO menores (id_familia, nombre, apellidos, fecha_nacimiento)
            VALUES (99999, 'Lucas', 'Pérez Gómez', '2023-05-10')
          `).run();
        },
        /FOREIGN KEY constraint failed/,
        'Debe fallar al intentar insertar menor con id_familia inexistente'
      );
    });

    it('debe rechazar la inserción de alérgenos para un menor que no existe', () => {
      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO alergenos_menores (id_menor, tipo_alergeno, gravedad, pauta_medica)
            VALUES (88888, 'Lactosa', 'MODERADA', 'Evitar lácteos y derivados')
          `).run();
        },
        /FOREIGN KEY constraint failed/,
        'Debe fallar al intentar insertar alérgeno con id_menor inexistente'
      );
    });

    it('debe rechazar la inserción de una cita con servicio o menor inexistente', () => {
      // Crear familia válida
      const famRes = db.prepare(`
        INSERT INTO familias (nombre_titular, apellidos_titular, dni_nie, email, telefono, direccion_postal, codigo_postal)
        VALUES ('María', 'López', '12345678Z', 'maria@educare.es', '600112233', 'Calle Paz 5', '46002')
      `).run();
      const famId = Number(famRes.lastInsertRowid);

      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO citas (id_familia, id_menor, id_servicio, fecha_cita, hora_inicio, hora_fin)
            VALUES (?, 99999, 1, '2026-12-01', '09:00', '10:00')
          `).run(famId);
        },
        /FOREIGN KEY constraint failed/,
        'Debe fallar al intentar agendar cita con menor huérfano'
      );
    });

    it('debe rechazar la inserción de bloqueos viales con id_cita inexistente', () => {
      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO bloqueos_viales (id_cita, tipo_bloqueo, fecha_bloqueo, hora_inicio, hora_fin)
            VALUES (77777, 'PREVIO_20MIN', '2026-12-01', '08:40', '09:00')
          `).run();
        },
        /FOREIGN KEY constraint failed/,
        'Debe fallar al insertar bloqueo vial sin cita previa'
      );
    });

    it('debe rechazar la asignación de bono familiar a catálogo inexistente', () => {
      const famRes = db.prepare(`
        INSERT INTO familias (nombre_titular, apellidos_titular, dni_nie, email, telefono, direccion_postal, codigo_postal)
        VALUES ('Pedro', 'Martínez', '87654321A', 'pedro@educare.es', '611223344', 'Calle Colón 10', '46004')
      `).run();
      const famId = Number(famRes.lastInsertRowid);

      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO bonos_familias (id_familia, id_catalogo_bono, horas_iniciales, horas_restantes, fecha_caducidad)
            VALUES (?, 99999, 10, 10.0, '2027-03-01')
          `).run(famId);
        },
        /FOREIGN KEY constraint failed/,
        'Debe fallar al vincular bono con catálogo inexistente'
      );
    });
  });

  describe('3. Políticas de Borrado en Cascada (CASCADE) vs. Restricción (RESTRICT)', () => {
    it('debe propagar la eliminación en cascada de familias a menores y alérgenos (ON DELETE CASCADE)', () => {
      // 1. Insertar familia
      const fRes = db.prepare(`
        INSERT INTO familias (nombre_titular, apellidos_titular, dni_nie, email, telefono, direccion_postal, codigo_postal)
        VALUES ('Carlos', 'Soler', '44556677B', 'carlos@educare.es', '622334455', 'Gran Vía 20', '46005')
      `).run();
      const idFamilia = Number(fRes.lastInsertRowid);

      // 2. Insertar menor
      const mRes = db.prepare(`
        INSERT INTO menores (id_familia, nombre, apellidos, fecha_nacimiento)
        VALUES (?, 'Martina', 'Soler', '2022-01-15')
      `).run(idFamilia);
      const idMenor = Number(mRes.lastInsertRowid);

      // 3. Insertar alérgeno
      db.prepare(`
        INSERT INTO alergenos_menores (id_menor, tipo_alergeno, gravedad, pauta_medica)
        VALUES (?, 'Frutos Secos', 'GRAVE', 'Adrenalina autoinyectable en mochila')
      `).run(idMenor);

      // Verificar que existen
      assert.strictEqual(
        (db.prepare('SELECT COUNT(*) as c FROM menores WHERE id_familia = ?').get(idFamilia) as { c: number }).c,
        1
      );
      assert.strictEqual(
        (db.prepare('SELECT COUNT(*) as c FROM alergenos_menores WHERE id_menor = ?').get(idMenor) as { c: number }).c,
        1
      );

      // 4. Eliminar familia titular
      db.prepare('DELETE FROM familias WHERE id_familia = ?').run(idFamilia);

      // 5. Verificar que el menor y sus alérgenos fueron eliminados en cascada automáticamente
      const menoresRestantes = db.prepare('SELECT COUNT(*) as c FROM menores WHERE id_familia = ?').get(idFamilia) as { c: number };
      const alergenosRestantes = db.prepare('SELECT COUNT(*) as c FROM alergenos_menores WHERE id_menor = ?').get(idMenor) as { c: number };

      assert.strictEqual(menoresRestantes.c, 0, 'El menor debe ser borrado en cascada al eliminar su familia');
      assert.strictEqual(alergenosRestantes.c, 0, 'Los alérgenos deben ser borrados en cascada');
    });

    it('debe impedir la eliminación de una familia con facturas emitidas (ON DELETE RESTRICT)', () => {
      // 1. Insertar familia
      const fRes = db.prepare(`
        INSERT INTO familias (nombre_titular, apellidos_titular, dni_nie, email, telefono, direccion_postal, codigo_postal)
        VALUES ('Ana', 'Beltrán', '99887766K', 'ana@educare.es', '633445566', 'Calle Ruzafa 3', '46006')
      `).run();
      const idFamilia = Number(fRes.lastInsertRowid);

      // 2. Insertar factura emitida para esa familia
      db.prepare(`
        INSERT INTO facturas_usuarios (numero_factura, id_familia, importe_base, total_neto, estado_pago)
        VALUES ('FAC-2026-0001', ?, 50.0, 60.5, 'PENDIENTE')
      `).run(idFamilia);

      // 3. Intentar eliminar la familia: debe bloquearse por integridad contable
      assert.throws(
        () => {
          db.prepare('DELETE FROM familias WHERE id_familia = ?').run(idFamilia);
        },
        /FOREIGN KEY constraint failed/,
        'Debe impedir el borrado de una familia con registros contables vinculados (RESTRICT)'
      );
    });
  });

  describe('4. Validación de Restricciones CHECK de Negocio a Nivel de Base de Datos', () => {
    it('debe rechazar radio_max_km mayor a 25.0 km o menor o igual a 0 en configuracion_sede', () => {
      // Radio excesivo (> 25 km)
      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO configuracion_sede (nombre_sede, direccion, radio_max_km, margen_minutos)
            VALUES ('Sede Ilegal', 'Calle 1', 25.1, 20)
          `).run();
        },
        /CHECK constraint failed/,
        'Debe fallar al superar el radio de 25 km'
      );

      // Radio <= 0
      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO configuracion_sede (nombre_sede, direccion, radio_max_km, margen_minutos)
            VALUES ('Sede Cero', 'Calle 1', 0, 20)
          `).run();
        },
        /CHECK constraint failed/,
        'Debe fallar con radio igual a 0'
      );
    });

    it('debe rechazar margen_minutos negativo en configuracion_sede', () => {
      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO configuracion_sede (nombre_sede, direccion, radio_max_km, margen_minutos)
            VALUES ('Sede Margen', 'Calle 1', 15.0, -1)
          `).run();
        },
        /CHECK constraint failed/,
        'Debe fallar con margen de minutos negativo'
      );
    });

    it('debe exigir que los bonos del catálogo tengan exactamente 5, 10 o 20 horas (CHECK horas_totales)', () => {
      // Horas permitidas: 5, 10, 20
      db.prepare(`
        INSERT INTO catalogo_bonos (nombre_bono, horas_totales, precio_total, porcentaje_descuento)
        VALUES ('Bono Válido 10h', 10, 150.0, 10.0)
      `).run();

      // Horas no permitidas (ej: 15h)
      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO catalogo_bonos (nombre_bono, horas_totales, precio_total)
            VALUES ('Bono Inválido 15h', 15, 200.0)
          `).run();
        },
        /CHECK constraint failed/,
        'Debe rechazar paquete de horas que no sea 5, 10 o 20'
      );
    });

    it('debe rechazar gravedad de alérgeno fuera de los valores permitidos (LEVE, MODERADA, GRAVE, ANAFILACTICA)', () => {
      // Crear familia y menor válidos
      const fRes = db.prepare(`
        INSERT INTO familias (nombre_titular, apellidos_titular, dni_nie, email, telefono, direccion_postal, codigo_postal)
        VALUES ('Elena', 'Vidal', '11223344J', 'elena@educare.es', '644556677', 'Calle Xátiva 8', '46002')
      `).run();
      const mRes = db.prepare(`
        INSERT INTO menores (id_familia, nombre, apellidos, fecha_nacimiento)
        VALUES (?, 'Hugo', 'Vidal', '2021-08-20')
      `).run(Number(fRes.lastInsertRowid));

      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO alergenos_menores (id_menor, tipo_alergeno, gravedad, pauta_medica)
            VALUES (?, 'Huevo', 'EXTREMA', 'Urgencias')
          `).run(Number(mRes.lastInsertRowid));
        },
        /CHECK constraint failed/,
        'Debe rechazar valor de gravedad no enumerado'
      );
    });

    it('debe rechazar distancias máximas superiores a 25.0 km en zonas_desplazamiento', () => {
      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO zonas_desplazamiento (nombre_zona, distancia_min_km, distancia_max_km, suplemento_desplazamiento)
            VALUES ('Zona Lejana', 25.0, 30.0, 15.0)
          `).run();
        },
        /CHECK constraint failed/,
        'Debe rechazar zonas de desplazamiento mayores a 25 km'
      );
    });
  });

  describe('5. Unicidad de Claves de Negocio (UNIQUE Constraints)', () => {
    it('debe rechazar familias con DNI/NIE o email duplicado', () => {
      db.prepare(`
        INSERT INTO familias (nombre_titular, apellidos_titular, dni_nie, email, telefono, direccion_postal, codigo_postal)
        VALUES ('Titular 1', 'Apellido', '11111111A', 'unico@educare.es', '655667788', 'Calle 1', '46001')
      `).run();

      // DNI duplicado
      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO familias (nombre_titular, apellidos_titular, dni_nie, email, telefono, direccion_postal, codigo_postal)
            VALUES ('Titular 2', 'Apellido 2', '11111111A', 'otro@educare.es', '655667789', 'Calle 2', '46001')
          `).run();
        },
        /UNIQUE constraint failed: familias.dni_nie/,
        'Debe rechazar DNI/NIE duplicado'
      );

      // Email duplicado
      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO familias (nombre_titular, apellidos_titular, dni_nie, email, telefono, direccion_postal, codigo_postal)
            VALUES ('Titular 3', 'Apellido 3', '22222222B', 'unico@educare.es', '655667790', 'Calle 3', '46001')
          `).run();
        },
        /UNIQUE constraint failed: familias.email/,
        'Debe rechazar email duplicado'
      );
    });
  });
});
