import { SedeConfigService } from '../services/SedeConfigService.ts';
import type { SedeConfig } from '../domain/entities/SedeConfig.ts';

export class GetActiveSedeUseCase {
  private sedeService: SedeConfigService;

  constructor(sedeService: SedeConfigService) {
    this.sedeService = sedeService;
  }

  public execute(): SedeConfig | null {
    try {
      return this.sedeService.obtenerConfiguracionActiva();
    } catch {
      return null;
    }
  }
}
