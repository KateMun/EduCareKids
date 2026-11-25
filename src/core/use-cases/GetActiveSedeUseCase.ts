import { SedeConfigService } from '../services/SedeConfigService';
import { SedeConfig } from '../domain/entities/SedeConfig';

export class GetActiveSedeUseCase {
  constructor(private sedeService: SedeConfigService) {}

  public execute(): SedeConfig | null {
    try {
      return this.sedeService.obtenerConfiguracionActiva();
    } catch {
      return null;
    }
  }
}
