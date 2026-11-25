export interface SedeConfig {
  id_sede?: number;
  nombre_sede: string;
  direccion: string;
  codigo_postal: string;
  ciudad: string;
  radio_max_km: number;
  margen_minutos: number;
  normativa_interna?: string | null;
  activo: number; // 1 = Activa, 0 = Baja lógica (histórico)
  creado_en?: string;
  actualizado_en?: string;
}

export type CreateSedeConfigDTO = {
  nombre_sede: string;
  direccion: string;
  codigo_postal?: string;
  ciudad?: string;
  radio_max_km?: number;
  margen_minutos?: number;
  normativa_interna?: string;
  activo?: number;
};

export type UpdateSedeConfigDTO = Partial<{
  nombre_sede: string;
  direccion: string;
  codigo_postal: string;
  ciudad: string;
  radio_max_km: number;
  margen_minutos: number;
  normativa_interna: string;
  activo: number;
}>;

