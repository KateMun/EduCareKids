import { NextResponse } from 'next/server';
import { SedeConfigRepository } from '@/infrastructure/repositories/SedeConfigRepository';
import { SedeConfigService } from '@/core/services/SedeConfigService';
import { GetActiveSedeUseCase } from '@/core/use-cases/GetActiveSedeUseCase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const repository = new SedeConfigRepository();
    const service = new SedeConfigService(repository);
    const useCase = new GetActiveSedeUseCase(service);
    const sede = useCase.execute();

    if (!sede) {
      return NextResponse.json(
        { success: false, message: 'No hay sede activa configurada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: sede,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error interno al consultar sede';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
