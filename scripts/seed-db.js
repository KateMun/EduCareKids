#!/usr/bin/env node
const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.resolve(__dirname, '..', 'educare_kids.db');
const SCHEMA_PATH = path.resolve(__dirname, '..', 'src', 'infrastructure', 'database', 'schema.sql');

console.log('=====================================================');
console.log(' EduCare Kids — Poblado de Semillas Iniciales (Seed) ');
console.log('=====================================================');

try {
  const db = new DatabaseSync(DB_PATH);
  db.exec('PRAGMA foreign_keys = ON;');

  // Verificar si las tablas existen; si no, inicializar
  const tables = db.prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='configuracion_sede';").get();
  if (tables.count === 0 && fs.existsSync(SCHEMA_PATH)) {
    console.log('Tablas no encontradas. Ejecutando DDL inicial...');
    const ddlSql = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(ddlSql);
  }

  db.exec('BEGIN TRANSACTION;');

  // 1. Sede Central (CRUD 15 / M07)
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
  console.log(`✓ Sede Central activa insertada con éxito (ID: ${sedeId}).`);

  // 2. Servicios Base (CRUD 04 / M02)
  const insertServicio = db.prepare(`
    INSERT OR IGNORE INTO servicios (codigo_servicio, nombre_servicio, descripcion, precio_base_hora, requiere_desplazamiento, activo)
    VALUES (?, ?, ?, ?, ?, 1)
  `);

  insertServicio.run('CUIDADO_CENTRO', 'Cuidado en Centro Infantil', 'Atención lúdica y pedagógica en las instalaciones del centro.', 12.00, 0);
  insertServicio.run('NINERA_DOMICILIO', 'Niñera a Domicilio', 'Cuidado infantil profesional en el domicilio familiar dentro del radio de 25 km.', 18.00, 1);
  insertServicio.run('CLASES_APOYO', 'Clases de Apoyo Pedagógico', 'Refuerzo escolar personalizado por asignaturas y etapas.', 15.00, 0);
  insertServicio.run('TUTORIA_ASINCRONA', 'Tutoría y Consultas Asíncronas', 'Resolución de dudas pedagógicas mediante buzón interactivo.', 25.00, 0);
  console.log('✓ Catálogo de 4 modalidades de servicio fundacionales registrado.');

  // 3. Tarifas Dinámicas por Edad (CRUD 05 / M02)
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
  console.log('✓ Tramos etarios y recargos (+30% lactante y +15% infantil) configurados.');

  // 4. Catálogo de Bonos (CRUD 11 / M05)
  const insertBono = db.prepare(`
    INSERT OR IGNORE INTO catalogo_bonos (nombre_bono, horas_totales, precio_total, porcentaje_descuento, dias_validez, activo)
    VALUES (?, ?, ?, ?, ?, 1)
  `);
  insertBono.run('Bono Básico 5h', 5, 85.00, 5.0, 90);
  insertBono.run('Bono Estándar 10h', 10, 160.00, 10.0, 90);
  insertBono.run('Bono Familiar Plus 20h', 20, 300.00, 15.0, 90);
  console.log('✓ Paquetes de bonos prepago (5h, 10h y 20h) registrados.');

  // 5. Zonas de Desplazamiento (CRUD 09 / M04)
  const insertZona = db.prepare(`
    INSERT OR IGNORE INTO zonas_desplazamiento (nombre_zona, distancia_min_km, distancia_max_km, suplemento_desplazamiento, tiempo_estimado_minutos, activo)
    VALUES (?, ?, ?, ?, ?, 1)
  `);
  insertZona.run('Zona 1: Proximidad Centro', 0.0, 5.0, 0.00, 10);
  insertZona.run('Zona 2: Urbana Valencia', 5.1, 15.0, 5.00, 20);
  insertZona.run('Zona 3: Metropolitana Límite', 15.1, 25.0, 10.00, 25);
  console.log('✓ Zonas viales de desplazamiento (hasta límite 25 km) registradas.');

  db.exec('COMMIT;');

  // Resumen
  const countSedes = db.prepare('SELECT count(*) as c FROM configuracion_sede WHERE activo = 1;').get().c;
  const countServicios = db.prepare('SELECT count(*) as c FROM servicios;').get().c;
  const countTarifas = db.prepare('SELECT count(*) as c FROM tarifas_edad;').get().c;
  const countBonos = db.prepare('SELECT count(*) as c FROM catalogo_bonos;').get().c;
  const countZonas = db.prepare('SELECT count(*) as c FROM zonas_desplazamiento;').get().c;

  console.log('\n=== Resumen de Datos Fundacionales Sembrados ===');
  console.log(`- Sede activa:             ${countSedes}`);
  console.log(`- Modalidades de servicio: ${countServicios}`);
  console.log(`- Tarifas por tramo edad:  ${countTarifas}`);
  console.log(`- Catálogo de bonos:       ${countBonos}`);
  console.log(`- Zonas viales:            ${countZonas}`);
  console.log('================================================\n');

  db.close();
} catch (error) {
  console.error('\nERROR durante el sembrado de datos:', error.message);
  process.exit(1);
}

