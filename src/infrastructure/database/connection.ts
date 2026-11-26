import { DatabaseSync } from 'node:sqlite';
import * as fs from 'fs';
import * as path from 'path';

export class DatabaseConnection {
  private static instance: DatabaseSync | null = null;

  public static getInstance(dbPath: string = ':memory:'): DatabaseSync {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseSync(dbPath);
      DatabaseConnection.instance.exec('PRAGMA foreign_keys = ON;');
      DatabaseConnection.initSchema(DatabaseConnection.instance);
    }
    return DatabaseConnection.instance;
  }

  public static createIsolatedInstance(dbPath: string = ':memory:'): DatabaseSync {
    const db = new DatabaseSync(dbPath);
    db.exec('PRAGMA foreign_keys = ON;');
    DatabaseConnection.initSchema(db);
    return db;
  }

  public static resetInstance(): void {
    if (DatabaseConnection.instance) {
      try {
        DatabaseConnection.instance.close();
      } catch {}
      DatabaseConnection.instance = null;
    }
  }

  public static initSchema(db: DatabaseSync): void {
    // Busca el schema.sql maestro
    const possiblePaths = [
      path.resolve(process.cwd(), 'src', 'infrastructure', 'database', 'schema.sql'),
      path.resolve(process.cwd(), 'migrations', '001_initial_schema.sql'),
    ];

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        const sql = fs.readFileSync(p, 'utf8');
        db.exec(sql);
        return;
      }
    }
  }
}

