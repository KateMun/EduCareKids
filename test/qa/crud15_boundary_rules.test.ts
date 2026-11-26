import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { TestDatabaseHelper } from '../helpers/testDatabase.ts';
import { SedeConfigRepository } from '../../src/infrastructure/repositories/SedeConfigRepository.ts';
import { SedeConfigService } from '../../src/core/services/SedeConfigService.ts';

describe('QA Reglas Límite: Verificación de Parámetros Borde de CRUD 15 (SUB-103-02)', () => {
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

  describe('1. Valores Límite Válidos en Capa de Servicio (Valores Borde Aceptados)', () => {
    it('debe aceptar el límite máximo exacto de radio de cobertura de 25.0 km', () => {
      const sede = service.crearSede({
        nombre_sede: 'Sede Límite 25km',
        direccion: 'Calle Mayor 12, Valencia',
        radio_max_km: 25.0,
        margen_minutos: 20,
      });

      assert.ok(sede.id_sede);
      assert.strictEqual(sede.radio_max_km, 25.0, 'El radio debe ser exactamente 25.0 km');
      assert.strictEqual(sede.margen_minutos, 20);
    });

    it('debe aceptar radios positivos mínimos en el límite inferior (0.1 km y 0.01 km)', () => {
      const sedeMinima = service.crearSede({
        nombre_sede: 'Sede Micro Cobertura',
        direccion: 'Plaza del Ayuntamiento 1',
        radio_max_km: 0.1,
        margen_minutos: 5,
      });

      assert.strictEqual(sedeMinima.radio_max_km, 0.1, 'Debe admitir radios estrictamente positivos pequeños');
    });

    it('debe aceptar un margen de desplazamiento vial de 0 minutos (sin margen adicional)', () => {
      const sedeSinMargen = service.crearSede({
        nombre_sede: 'Sede Servicio Solo Centro',
        direccion: 'Calle Colón 1',
        radio_max_km: 10.0,
        margen_minutos: 0,
      });

      assert.strictEqual(sedeSinMargen.margen_minutos, 0, 'El margen 0 es un valor límite válido');
    });

    it('debe aplicar los valores por defecto del centro si no se especifican (25 km y 20 min)', () => {
      const sedePorDefecto = service.crearSede({
        nombre_sede: 'Sede Valores por Defecto',
        direccion: 'Avenida del Puerto 50',
      });

      assert.strictEqual(sedePorDefecto.radio_max_km, 25.0, 'Debe heredar el radio oficial por defecto de 25 km');
      assert.strictEqual(sedePorDefecto.margen_minutos, 20, 'Debe heredar el margen vial por defecto de 20 min');
    });
  });

  describe('2. Rechazo de Valores Borde Fuera de Rango en Capa de Servicio (Validación Temprana)', () => {
    it('debe rechazar radios que excedan el límite operativo (> 25.0 km)', () => {
      // 25.01 km
      assert.throws(
        () => {
          service.crearSede({
            nombre_sede: 'Sede Excedida',
            direccion: 'Calle Fuera 1',
            radio_max_km: 25.01,
          });
        },
        /no exceder los 25 km permitidos/,
        'Debe rechazar 25.01 km por exceder la política territorial'
      );

      // 30.0 km
      assert.throws(
        () => {
          service.crearSede({
            nombre_sede: 'Sede 30km',
            direccion: 'Calle Fuera 2',
            radio_max_km: 30.0,
          });
        },
        /no exceder los 25 km permitidos/,
        'Debe rechazar 30.0 km'
      );
    });

    it('debe rechazar radios nulos o negativos (<= 0 km)', () => {
      // 0 km
      assert.throws(
        () => {
          service.crearSede({
            nombre_sede: 'Sede Cero',
            direccion: 'Calle Nula 1',
            radio_max_km: 0,
          });
        },
        /debe ser mayor a 0 km/,
        'Debe rechazar radio igual a cero'
      );

      // -10 km
      assert.throws(
        () => {
          service.crearSede({
            nombre_sede: 'Sede Negativa',
            direccion: 'Calle Negativa 1',
            radio_max_km: -10.0,
          });
        },
        /debe ser mayor a 0 km/,
        'Debe rechazar radio negativo'
      );
    });

    it('debe rechazar márgenes de minutos negativos (< 0 min)', () => {
      assert.throws(
        () => {
          service.crearSede({
            nombre_sede: 'Sede Margen Negativo',
            direccion: 'Calle Test 1',
            radio_max_km: 15.0,
            margen_minutos: -1,
          });
        },
        /no puede ser un valor negativo/,
        'Debe rechazar margen negativo'
      );
    });

    it('debe rechazar actualización a valores borde inválidos mediante actualizarConfiguracion', () => {
      const sede = service.crearSede({
        nombre_sede: 'Sede Base',
        direccion: 'Calle Base 1',
        radio_max_km: 20.0,
        margen_minutos: 15,
      });

      assert.throws(
        () => {
          service.actualizarConfiguracion(sede.id_sede!, {
            radio_max_km: 28.5,
          });
        },
        /no exceder los 25 km permitidos/,
        'La actualización no debe permitir violar el radio de 25 km'
      );

      assert.throws(
        () => {
          service.actualizarConfiguracion(sede.id_sede!, {
            margen_minutos: -10,
          });
        },
        /no puede ser un valor negativo/,
        'La actualización no debe permitir márgenes negativos'
      );
    });
  });

  describe('3. Protección Defensiva a Nivel de Motor SQLite (Restricciones CHECK en DDL)', () => {
    it('debe disparar CHECK constraint failed si se intenta saltar la validación e insertar radio > 25 km directamente', () => {
      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO configuracion_sede (nombre_sede, direccion, radio_max_km, margen_minutos)
            VALUES ('Bypass Sede', 'Calle Inyección', 26.0, 20)
          `).run();
        },
        /CHECK constraint failed/,
        'El motor de base de datos SQLite debe bloquear físicamente radios > 25.0 km'
      );
    });

    it('debe disparar CHECK constraint failed si se inserta radio <= 0 km directamente', () => {
      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO configuracion_sede (nombre_sede, direccion, radio_max_km, margen_minutos)
            VALUES ('Bypass Sede Cero', 'Calle Inyección', 0.0, 20)
          `).run();
        },
        /CHECK constraint failed/,
        'El motor de base de datos SQLite debe bloquear físicamente radios <= 0 km'
      );
    });

    it('debe disparar CHECK constraint failed si se inserta margen_minutos < 0 directamente', () => {
      assert.throws(
        () => {
          db.prepare(`
            INSERT INTO configuracion_sede (nombre_sede, direccion, radio_max_km, margen_minutos)
            VALUES ('Bypass Margen', 'Calle Inyección', 15.0, -5)
          `).run();
        },
        /CHECK constraint failed/,
        'El motor de base de datos SQLite debe bloquear físicamente margen_minutos < 0'
      );
    });

    it('debe permitir inserción directa en DDL con valores límite exactos (25.0 km y 0 min)', () => {
      assert.doesNotThrow(() => {
        db.prepare(`
          INSERT INTO configuracion_sede (nombre_sede, direccion, radio_max_km, margen_minutos)
          VALUES ('Sede Límite SQL', 'Calle Extremo 1', 25.0, 0)
        `).run();
      }, 'El motor SQLite debe aceptar radio = 25.0 y margen = 0');
    });
  });

  describe('4. Preservación del Histórico de Sedes y Trazabilidad de Parámetros Borde', () => {
    it('debe transicionar a inactivo (activo = 0) la sede previa cuando se da de alta una nueva sede activa', () => {
      // 1. Alta primera sede (radio 25 km, margen 20 min)
      const sede1 = service.crearSede({
        nombre_sede: 'Sede Central v1',
        direccion: 'Calle Mayor 12',
        radio_max_km: 25.0,
        margen_minutos: 20,
      });

      // 2. Alta segunda sede con nuevo radio de 20 km
      const sede2 = service.crearSede({
        nombre_sede: 'Sede Central v2',
        direccion: 'Calle Mayor 12 - Ampliada',
        radio_max_km: 20.0,
        margen_minutos: 15,
      });

      // 3. Comprobar que sede1 ahora es histórica (activo = 0)
      const sede1Consultada = service.obtenerPorId(sede1.id_sede!);
      assert.strictEqual(sede1Consultada.activo, 0, 'La sede previa debe pasar a baja lógica');

      // 4. Comprobar que sede2 es la única activa
      const activa = service.obtenerConfiguracionActiva();
      assert.strictEqual(activa.id_sede, sede2.id_sede);
      assert.strictEqual(activa.radio_max_km, 20.0);

      // 5. El histórico total debe contener ambas sedes
      const todas = service.listarTodas();
      assert.strictEqual(todas.length, 2, 'El histórico debe conservar todas las versiones de configuración');
    });
  });
});
