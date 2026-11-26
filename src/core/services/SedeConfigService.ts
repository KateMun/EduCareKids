import type { ISedeConfigRepository } from '../domain/repositories/ISedeConfigRepository.ts';
import type { SedeConfig, CreateSedeConfigDTO, UpdateSedeConfigDTO } from '../domain/entities/SedeConfig.ts';

export class SedeConfigService {
  private sedeRepo: ISedeConfigRepository;

  constructor(sedeRepo: ISedeConfigRepository) {
    this.sedeRepo = sedeRepo;
  }

  /**
   * CREATE: Registra una nueva configuración de sede central.
   * Valida radio máximo (0 < radio <= 25 km) y margen vial (>= 0 min).
   */
  public crearSede(data: CreateSedeConfigDTO): SedeConfig {
    this.validarParametros(data.radio_max_km, data.margen_minutos, data.nombre_sede, data.direccion);

    // Si la nueva sede se registra como activa (por defecto), marcamos como históricas las anteriores
    if (data.activo === undefined || data.activo === 1) {
      const activeCurrent = this.sedeRepo.findActive();
      if (activeCurrent && activeCurrent.id_sede) {
        this.sedeRepo.softDelete(activeCurrent.id_sede);
      }
    }

    return this.sedeRepo.create(data);
  }

  /**
   * READ: Obtiene la configuración de sede activa actualmente.
   */
  public obtenerConfiguracionActiva(): SedeConfig {
    const active = this.sedeRepo.findActive();
    if (!active) {
      throw new Error('No se encontró ninguna configuración de sede activa en el sistema');
    }
    return active;
  }

  /**
   * READ: Obtiene una configuración por su identificador.
   */
  public obtenerPorId(id: number): SedeConfig {
    const sede = this.sedeRepo.findById(id);
    if (!sede) {
      throw new Error(`No existe configuración de sede con ID ${id}`);
    }
    return sede;
  }

  /**
   * READ: Lista todas las configuraciones (activas e históricas).
   */
  public listarTodas(): SedeConfig[] {
    return this.sedeRepo.findAll();
  }

  /**
   * UPDATE: Modifica los parámetros de una sede existente.
   */
  public actualizarConfiguracion(id: number, data: UpdateSedeConfigDTO): SedeConfig {
    this.validarParametros(data.radio_max_km, data.margen_minutos, data.nombre_sede, data.direccion);
    return this.sedeRepo.update(id, data);
  }

  /**
   * DELETE: Baja lógica (activo = 0) para mantener la trazabilidad histórica de parámetros.
   */
  public darDeBaja(id: number): boolean {
    const success = this.sedeRepo.softDelete(id);
    if (!success) {
      throw new Error(`No se pudo dar de baja la sede con ID ${id} (no encontrada)`);
    }
    return true;
  }

  /**
   * Validaciones estrictas de reglas de negocio del centro
   */
  private validarParametros(
    radio?: number,
    margen?: number,
    nombre?: string,
    direccion?: string
  ): void {
    if (nombre !== undefined && nombre.trim().length === 0) {
      throw new Error('El nombre de la sede no puede estar vacío');
    }
    if (direccion !== undefined && direccion.trim().length === 0) {
      throw new Error('La dirección de la sede no puede estar vacía');
    }
    if (radio !== undefined) {
      if (radio <= 0 || radio > 25.0) {
        throw new Error(`Radio de cobertura inválido (${radio} km): debe ser mayor a 0 km y no exceder los 25 km permitidos por normativa`);
      }
    }
    if (margen !== undefined) {
      if (margen < 0) {
        throw new Error(`Margen de desplazamiento inválido (${margen} min): no puede ser un valor negativo`);
      }
    }
  }
}

