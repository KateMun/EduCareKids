/**
 * EduCare Kids — Global Test Setup & Environment Configuration
 * Framework: Vitest / Jest / Node.js Test Runner
 */

export const TEST_CONFIG = {
  dbPath: ':memory:',
  timeout: 5000,
  defaultSede: {
    nombre_sede: 'Sede Central Test',
    direccion: 'Calle Test 123',
    codigo_postal: '46001',
    ciudad: 'Valencia',
    radio_max_km: 25.0,
    margen_minutos: 20,
    activo: 1,
  },
};

