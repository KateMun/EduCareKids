#!/usr/bin/env node
const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.resolve(__dirname, '..', 'educare_kids.db');
const SCHEMA_PATH = path.resolve(__dirname, '..', 'src', 'infrastructure', 'database', 'schema.sql');

console.log('=====================================================');
console.log(' EduCare Kids — Inicialización de Base de Datos 3FN ');
console.log('=====================================================');
console.log(`Ruta de la base de datos: ${DB_PATH}`);
console.log(`Script DDL maestro:       ${SCHEMA_PATH}`);

if (!fs.existsSync(SCHEMA_PATH)) {
  console.error(`ERROR: No se encontró el archivo de esquema en ${SCHEMA_PATH}`);
  process.exit(1);
}

try {
  const db = new DatabaseSync(DB_PATH);
  db.exec('PRAGMA foreign_keys = ON;');
  
  const ddlSql = fs.readFileSync(SCHEMA_PATH, 'utf8');
  db.exec(ddlSql);

  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;").all();
  
  console.log('\n✓ Esquema relacional 3FN inicializado con éxito.');
  console.log(`✓ Total de tablas físicas creadas: ${tables.length}`);
  tables.forEach((t, i) => {
    console.log(`   [${String(i + 1).padStart(2, '0')}] ${t.name}`);
  });
  
  db.close();
  console.log('\nOperación completada con éxito. Listo para ejecutar "npm run db:seed".');
} catch (error) {
  console.error('\nERROR durante la inicialización de la base de datos:', error.message);
  process.exit(1);
}

