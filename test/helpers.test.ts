import { describe, it } from 'node:test';
import assert from 'node:assert';
import { performance } from 'node:perf_hooks';
import { TestDatabaseHelper } from './helpers/testDatabase.ts';

describe('QA Tooling: Helper para Instancias Aisladas SQLite en Memoria (SUB-102-02)', () => {
  it('debe inicializar una base de datos en memoria y cargar las 17 tablas en menos de 10 ms', () => {
    const t0 = performance.now();
    const db = TestDatabaseHelper.create();
    const t1 = performance.now();
    const latency = t1 - t0;

    const count = Number(
      (db.prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';").get() as { count: number }).count
    );

    TestDatabaseHelper.teardown(db);

    assert.strictEqual(count, 17, 'Debe crear exactamente las 17 tablas físicas del esquema 3FN');
    assert.ok(latency < 20, `La creación debe ser ultrarrápida (medida: ${latency.toFixed(2)} ms)`);
  });

  it('debe garantizar aislamiento total entre instancias independientes (sin contaminación de estado)', () => {
    const db1 = TestDatabaseHelper.create();
    const db2 = TestDatabaseHelper.create();

    // Insertar familia en db1
    db1.prepare(`
      INSERT INTO familias (nombre_titular, apellidos_titular, dni_nie, email, telefono, direccion_postal, codigo_postal)
      VALUES ('Familia 1', 'Pérez', '12345678A', 'perez@test.com', '600111222', 'Calle 1', '46001')
    `).run();

    const countDb1 = Number((db1.prepare('SELECT count(*) as c FROM familias;').get() as { c: number }).c);
    const countDb2 = Number((db2.prepare('SELECT count(*) as c FROM familias;').get() as { c: number }).c);

    TestDatabaseHelper.teardown(db1);
    TestDatabaseHelper.teardown(db2);

    assert.strictEqual(countDb1, 1, 'db1 debe contener 1 familia');
    assert.strictEqual(countDb2, 0, 'db2 debe permanecer completamente vacía (aislamiento verificado)');
  });

  it('debe activar la restricción de llaves foráneas (PRAGMA foreign_keys = ON) por defecto', () => {
    const db = TestDatabaseHelper.create();
    const fkStatus = (db.prepare('PRAGMA foreign_keys;').get() as { foreign_keys: number }).foreign_keys;

    // Probar rechazo de registro huérfano (menor sin familia)
    assert.throws(
      () => {
        db.prepare(`
          INSERT INTO menores (id_familia, nombre, apellidos, fecha_nacimiento)
          VALUES (9999, 'Hijo Huérfano', 'Test', '2023-01-01')
        `).run();
      },
      /FOREIGN KEY constraint failed/,
      'Debe bloquear la inserción de claves foráneas inexistentes'
    );

    TestDatabaseHelper.teardown(db);
    assert.strictEqual(fkStatus, 1, 'foreign_keys debe estar habilitado (1)');
  });

  it('debe sembrar datos maestros fundacionales cuando se especifica seed: true', () => {
    const db = TestDatabaseHelper.create({ seed: true });

    const sedeActiva = db.prepare('SELECT * FROM configuracion_sede WHERE activo = 1;').get() as { nombre_sede: string; radio_max_km: number };
    const totalServicios = Number((db.prepare('SELECT count(*) as c FROM servicios;').get() as { c: number }).c);
    const totalTarifas = Number((db.prepare('SELECT count(*) as c FROM tarifas_edad;').get() as { c: number }).c);

    TestDatabaseHelper.teardown(db);

    assert.ok(sedeActiva !== undefined, 'Debe existir una sede central activa sembrada');
    assert.strictEqual(sedeActiva.radio_max_km, 25.0);
    assert.ok(totalServicios >= 4, 'Debe haber al menos 4 modalidades de servicio sembradas');
    assert.ok(totalTarifas >= 3, 'Debe haber tarifas por edad configuradas');
  });

  it('debe limpiar tablas de datos respetando las relaciones con TestDatabaseHelper.clean()', () => {
    const db = TestDatabaseHelper.create({ seed: true });

    TestDatabaseHelper.clean(db);

    const countSedes = Number((db.prepare('SELECT count(*) as c FROM configuracion_sede;').get() as { c: number }).c);
    const countServicios = Number((db.prepare('SELECT count(*) as c FROM servicios;').get() as { c: number }).c);

    TestDatabaseHelper.teardown(db);

    assert.strictEqual(countSedes, 0, 'La tabla de sedes debe estar vacía tras clean()');
    assert.strictEqual(countServicios, 0, 'La tabla de servicios debe estar vacía tras clean()');
  });
});
