import { SedeConfig, CreateSedeConfigDTO, UpdateSedeConfigDTO } from '../entities/SedeConfig';

export interface ISedeConfigRepository {
  create(data: CreateSedeConfigDTO): SedeConfig;
  findById(id: number): SedeConfig | null;
  findActive(): SedeConfig | null;
  findAll(): SedeConfig[];
  update(id: number, data: UpdateSedeConfigDTO): SedeConfig;
  softDelete(id: number): boolean;
}

