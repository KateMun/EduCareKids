import { describe, it } from 'node:test';
import assert from 'node:assert';
import { TEST_CONFIG } from './setup.ts';

describe('QA Harness: Verificación del Arnés de Testing (SUB-102-01)', () => {
  it('debe ejecutar pruebas unitarias con TypeScript correctamente', () => {
    const suma = (a: number, b: number): number => a + b;
    assert.strictEqual(suma(2, 3), 5);
  });

  it('debe resolver la configuración global del entorno de prueba', () => {
    assert.strictEqual(TEST_CONFIG.dbPath, ':memory:');
    assert.strictEqual(TEST_CONFIG.defaultSede.radio_max_km, 25.0);
    assert.strictEqual(TEST_CONFIG.defaultSede.margen_minutos, 20);
  });

  it('debe manejar aserciones asíncronas y temporizadores sin bloqueo', async () => {
    const asyncOperation = async (): Promise<string> => {
      return new Promise((resolve) => setTimeout(() => resolve('ready'), 10));
    };
    const result = await asyncOperation();
    assert.strictEqual(result, 'ready');
  });

  it('debe verificar la captura de excepciones esperadas', () => {
    const lanzarError = () => {
      throw new Error('Validación de error controlado');
    };
    assert.throws(lanzarError, /Validación de error controlado/);
  });
});
