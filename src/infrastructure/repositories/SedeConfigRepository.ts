import { DatabaseSync } from 'node:sqlite';
import type { SedeConfig, CreateSedeConfigDTO, UpdateSedeConfigDTO } from '../../core/domain/entities/SedeConfig.ts';
import type { ISedeConfigRepository } from '../../core/domain/repositories/ISedeConfigRepository.ts';
import { DatabaseConnection } from '../database/connection.ts';

export class SedeConfigRepository implements ISedeConfigRepository {
  private db: DatabaseSync;

  constructor(db?: DatabaseSync) {
    this.db = db || DatabaseConnection.getInstance();
  }

  public create(data: CreateSedeConfigDTO): SedeConfig {
    const stmt = this.db.prepare(`
      INSERT INTO configuracion_sede (
        nombre_sede, direccion, codigo_postal, ciudad, radio_max_km, margen_minutos, normativa_interna, activo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const radio = data.radio_max_km !== undefined ? data.radio_max_km : 25.0;
    const margen = data.margen_minutos !== undefined ? data.margen_minutos : 20;
    const cp = data.codigo_postal || '46001';
    const ciudad = data.ciudad || 'Valencia';
    const normativa = data.normativa_interna || null;
    const activo = data.activo !== undefined ? data.activo : 1;

    const result = stmt.run(
      data.nombre_sede,
      data.direccion,
      cp,
      ciudad,
      radio,
      margen,
      normativa,
      activo
    );

    const insertedId = Number(result.lastInsertRowid);
    const created = this.findById(insertedId);
    if (!created) {
      throw new Error(`Error al recuperar la sede recién creada con ID ${insertedId}`);
    }
    return created;
  }

  public findById(id: number): SedeConfig | null {
    const stmt = this.db.prepare(`
      SELECT * FROM configuracion_sede WHERE id_sede = ?
    `);
    const row = stmt.get(id);
    return row ? (row as unknown as SedeConfig) : null;
  }

  public findActive(): SedeConfig | null {
    const stmt = this.db.prepare(`
      SELECT * FROM configuracion_sede WHERE activo = 1 ORDER BY id_sede DESC LIMIT 1
    `);
    const row = stmt.get();
    return row ? (row as unknown as SedeConfig) : null;
  }

  public findAll(): SedeConfig[] {
    const stmt = this.db.prepare(`
      SELECT * FROM configuracion_sede ORDER BY id_sede DESC
    `);
    return stmt.all() as unknown as SedeConfig[];
  }

  public update(id: number, data: UpdateSedeConfigDTO): SedeConfig {
    const existing = this.findById(id);
    if (!existing) {
      throw new Error(`No existe configuración de sede con ID ${id}`);
    }

    const fields: string[] = [];
    const values: (string | number | null)[] = [];

    if (data.nombre_sede !== undefined) {
      fields.push('nombre_sede = ?');
      values.push(data.nombre_sede);
    }
    if (data.direccion !== undefined) {
      fields.push('direccion = ?');
      values.push(data.direccion);
    }
    if (data.codigo_postal !== undefined) {
      fields.push('codigo_postal = ?');
      values.push(data.codigo_postal);
    }
    if (data.ciudad !== undefined) {
      fields.push('ciudad = ?');
      values.push(data.ciudad);
    }
    if (data.radio_max_km !== undefined) {
      fields.push('radio_max_km = ?');
      values.push(data.radio_max_km);
    }
    if (data.margen_minutos !== undefined) {
      fields.push('margen_minutos = ?');
      values.push(data.margen_minutos);
    }
    if (data.normativa_interna !== undefined) {
      fields.push('normativa_interna = ?');
      values.push(data.normativa_interna);
    }
    if (data.activo !== undefined) {
      fields.push('activo = ?');
      values.push(data.activo);
    }

    fields.push("actualizado_en = CURRENT_TIMESTAMP");

    if (fields.length === 1) {
      return existing;
    }

    values.push(id);
    const sql = `UPDATE configuracion_sede SET ${fields.join(', ')} WHERE id_sede = ?`;
    const stmt = this.db.prepare(sql);
    stmt.run(...values);

    const updated = this.findById(id);
    if (!updated) {
      throw new Error(`Error al recuperar la sede actualizada con ID ${id}`);
    }
    return updated;
  }

  public softDelete(id: number): boolean {
    const existing = this.findById(id);
    if (!existing) {
      return false;
    }
    const stmt = this.db.prepare(`
      UPDATE configuracion_sede SET activo = 0, actualizado_en = CURRENT_TIMESTAMP WHERE id_sede = ?
    `);
    const result = stmt.run(id);
    return Number(result.changes) > 0;
  }
}

