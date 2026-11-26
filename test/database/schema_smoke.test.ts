import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { TestDatabaseHelper } from '../helpers/testDatabase.ts';
import { SedeConfigRepository } from '../../src/infrastructure/repositories/SedeConfigRepository.ts';
import { SedeConfigService } from '../../src/core/services/SedeConfigService.ts';

describe('Smoke Tests: Inicialización, Teardown y Ciclo de Vida CRUD 15 (SUB-102-03)', () => {
  let db: DatabaseSync;
  let repo: SedeConfigRepository;
  let service: SedeConfigService;

  beforeEach(() => {
    db = TestDatabaseHelper.create();
    repo = new SedeConfigRepository(db);
    service = new SedeConfigService(repo);
  });

  afterEach(() => {
    TestDatabaseHelper.teardown(db);
  });

  describe('1. Inicialización y Teardown de Base de Datos', () => {
    it('debe inicializar el esquema 3FN completo con las 17 tablas activas', () => {
      const stmt = db.prepare(`
        SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name ASC
      `);
      const tables = stmt.all() as Array<{ name: string }>;
      const tableNames = tables.map((t) => t.name);

      assert.strictEqual(tableNames.length, 17, 'Debe contener exactamente 17 tablas maestras');
      assert.ok(tableNames.includes('configuracion_sede'));
      assert.ok(tableNames.includes('servicios'));
      assert.ok(tableNames.includes('familias'));
      assert.ok(tableNames.includes('citas'));
      assert.ok(tableNames.includes('auditoria_eventos'));
    });

    it('debe verificar que las llaves foráneas están activadas en la conexión efímera', () => {
      const fkCheck = db.prepare('PRAGMA foreign_keys;').get() as { foreign_keys: number };
      assert.strictEqual(fkCheck.foreign_keys, 1, 'PRAGMA foreign_keys debe ser 1 (activado)');
    });

    it('debe completar el ciclo de teardown sin bloqueos ni errores', () => {
      const tempDb = TestDatabaseHelper.create();
      assert.doesNotThrow(() => {
        TestDatabaseHelper.teardown(tempDb);
      });
    });
  });

  describe('2. Ciclo de Vida Completo CRUD 15 (configuracion_sede)', () => {
    it('debe ejecutar el ciclo de vida completo: Crear, Consultar, Actualizar y Dar de baja lógica', () => {
      // 1. CREATE: Crear sede central de prueba
      const nuevaSede = service.crearSede({
        nombre_sede: 'Sede Central EduCare Kids',
        direccion: 'Calle Mayor 12, Valencia',
        codigo_postal: '46001',
        ciudad: 'Valencia',
        radio_max_km: 25.0,
        margen_minutos: 20,
        normativa_interna: 'Normativa general de seguridad y ratios pedagógicos de EduCare Kids',
        activo: 1,
      });

      assert.ok(nuevaSede.id_sede, 'La sede debe tener un ID autoincremental asignado');
      assert.strictEqual(nuevaSede.nombre_sede, 'Sede Central EduCare Kids');
      assert.strictEqual(nuevaSede.radio_max_km, 25.0);
      assert.strictEqual(nuevaSede.margen_minutos, 20);
      assert.strictEqual(nuevaSede.activo, 1);

      // 2. READ: Leer y verificar los datos activos
      const activa = service.obtenerConfiguracionActiva();
      assert.strictEqual(activa.id_sede, nuevaSede.id_sede);
      assert.strictEqual(activa.radio_max_km, 25.0);
      assert.strictEqual(activa.margen_minutos, 20);

      // 3. UPDATE: Actualizar radio a 20 km y margen a 15 min
      const actualizada = service.actualizarConfiguracion(nuevaSede.id_sede, {
        nombre_sede: 'Sede Central EduCare Kids - Ampliada',
        direccion: 'Calle Mayor 12, Valencia',
        radio_max_km: 20.0,
        margen_minutos: 15,
      });

      assert.strictEqual(actualizada.radio_max_km, 20.0, 'El radio actualizado debe ser 20.0 km');
      assert.strictEqual(actualizada.margen_minutos, 15, 'El margen actualizado debe ser 15 min');
      assert.strictEqual(actualizada.nombre_sede, 'Sede Central EduCare Kids - Ampliada');

      // 4. DELETE: Borrado lógico (activo = 0)
      const bajaOk = service.darDeBaja(nuevaSede.id_sede);
      assert.strictEqual(bajaOk, true, 'La baja lógica debe reportar éxito');

      const sedeInactiva = service.obtenerPorId(nuevaSede.id_sede);
      assert.strictEqual(sedeInactiva.activo, 0, 'La sede dada de baja debe tener activo = 0');

      // Comprobar que ya no existe sede activa en el sistema
      assert.throws(
        () => service.obtenerConfiguracionActiva(),
        /No se encontró ninguna configuración de sede activa/,
        'Debe lanzar excepción al consultar sede activa inexistente'
      );
    });

    it('debe rechazar valores de radio fuera de límite (> 25 km o <= 0 km)', () => {
      // Intento con radio excesivo (> 25 km)
      assert.throws(
        () => {
          service.crearSede({
            nombre_sede: 'Sede Fuera de Rango',
            direccion: 'Avenida Lejana 99',
            radio_max_km: 30.0,
            margen_minutos: 20,
          });
        },
        /no exceder los 25 km/,
        'Debe rechazar radio mayor a 25 km'
      );

      // Intento con radio <= 0
      assert.throws(
        () => {
          service.crearSede({
            nombre_sede: 'Sede Cero',
            direccion: 'Calle Cero 0',
            radio_max_km: 0,
            margen_minutos: 20,
          });
        },
        /debe ser mayor a 0 km/,
        'Debe rechazar radio igual o menor a cero'
      );
    });

    it('debe rechazar márgenes de tiempo negativos (< 0 minutos)', () => {
      assert.throws(
        () => {
          service.crearSede({
            nombre_sede: 'Sede Margen Inválido',
            direccion: 'Plaza Central 1',
            radio_max_km: 15.0,
            margen_minutos: -5,
          });
        },
        /no puede ser un valor negativo/,
        'Debe rechazar margen negativo'
      );
    });

    it('debe limpiar los datos entre pruebas con TestDatabaseHelper.clean() sin alterar el esquema', () => {
      service.crearSede({
        nombre_sede: 'Sede Temporal',
        direccion: 'Calle Test 1',
        radio_max_km: 10,
        margen_minutos: 10,
      });

      assert.strictEqual(service.listarTodas().length, 1);

      TestDatabaseHelper.clean(db);

      assert.strictEqual(service.listarTodas().length, 0, 'La tabla debe quedar vacía tras clean');

      // Verificar que el esquema sigue operativo insertando de nuevo
      const nueva = service.crearSede({
        nombre_sede: 'Sede Post-Clean',
        direccion: 'Calle Test 2',
        radio_max_km: 15,
        margen_minutos: 15,
      });
      assert.strictEqual(nueva.nombre_sede, 'Sede Post-Clean');
    });
  });
});
