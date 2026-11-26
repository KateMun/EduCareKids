import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  USE_CASES_CATALOG,
  getUseCaseById,
  getUseCaseByCrud,
  getUseCasesByJiraKey,
  getUseCasesByModule,
} from '../src/core/use-cases/traceability.ts';

describe('QA Trazabilidad: Especificación de Casos de Uso y Matriz Jira Cloud (SUB-102-04)', () => {
  it('debe registrar exactamente los 16 Casos de Uso principales (CU-01 a CU-16)', () => {
    assert.strictEqual(USE_CASES_CATALOG.length, 16, 'Deben existir exactamente 16 casos de uso');

    for (let i = 1; i <= 16; i++) {
      const expectedId = `CU-${i.toString().padStart(2, '0')}`;
      const cu = getUseCaseById(expectedId);
      assert.ok(cu, `El caso de uso ${expectedId} debe estar formalmente definido`);
      assert.strictEqual(cu?.crudNumber, i, `El caso de uso ${expectedId} debe mapear al CRUD ${i}`);
    }
  });

  it('debe asegurar unicidad en IDs de Casos de Uso y números de CRUD', () => {
    const ids = USE_CASES_CATALOG.map((cu) => cu.id);
    const uniqueIds = new Set(ids);
    assert.strictEqual(uniqueIds.size, 16, 'Todos los IDs de CU deben ser únicos');

    const cruds = USE_CASES_CATALOG.map((cu) => cu.crudNumber);
    const uniqueCruds = new Set(cruds);
    assert.strictEqual(uniqueCruds.size, 16, 'Todos los números de CRUD (1..16) deben ser únicos');
  });

  it('debe contener especificaciones completas de precondiciones, flujo principal y postcondiciones', () => {
    for (const cu of USE_CASES_CATALOG) {
      assert.ok(cu.title.trim().length > 0, `${cu.id}: Debe tener un título descriptivo`);
      assert.ok(cu.jiraKey.startsWith('NABF-'), `${cu.id}: Clave Jira debe iniciar con NABF-`);
      assert.ok(cu.epic.startsWith('EP0'), `${cu.id}: Épica debe iniciar con EP0`);
      assert.ok(cu.tableName.trim().length > 0, `${cu.id}: Debe vincularse a una tabla relacional`);
      assert.ok(cu.preconditions.length > 0, `${cu.id}: Debe tener al menos una precondición`);
      assert.ok(cu.mainFlow.length > 0, `${cu.id}: Debe tener pasos en el flujo principal`);
      assert.ok(cu.postconditions.length > 0, `${cu.id}: Debe tener al menos una postcondición`);
    }
  });

  it('debe verificar la trazabilidad íntegra de CU-15 (CRUD 15 - Configuracion de Sede)', () => {
    const cu15 = getUseCaseById('CU-15');
    assert.ok(cu15);
    assert.strictEqual(cu15?.crudNumber, 15);
    assert.strictEqual(cu15?.jiraKey, 'NABF-7');
    assert.strictEqual(cu15?.epic, 'EP01');
    assert.strictEqual(cu15?.module, 'M07');
    assert.strictEqual(cu15?.tableName, 'configuracion_sede');
    assert.strictEqual(cu15?.primaryActor, 'Administrador');

    const flowText = cu15?.mainFlow.join(' ');
    assert.ok(flowText?.includes('25.0 km'), 'El flujo de CU-15 debe explicitar el límite de 25 km');
    assert.ok(flowText?.includes('20 minutos'), 'El flujo de CU-15 debe explicitar la ventana de 20 min');
  });

  it('debe permitir búsquedas de trazabilidad bidireccional por Jira, módulo y CRUD', () => {
    // Búsqueda por CRUD
    const cuByCrud = getUseCaseByCrud(15);
    assert.strictEqual(cuByCrud?.id, 'CU-15');

    // Búsqueda por Clave Jira (NABF-11 cubre CRUD 02 y CRUD 03)
    const nabf11Cases = getUseCasesByJiraKey('NABF-11');
    assert.strictEqual(nabf11Cases.length, 2, 'NABF-11 debe agrupar los casos de menores y alérgenos');
    assert.deepStrictEqual(
      nabf11Cases.map((c) => c.id).sort(),
      ['CU-02', 'CU-03']
    );

    // Búsqueda por Módulo (M01 cubre CRUD 01, 02, 03)
    const m01Cases = getUseCasesByModule('M01');
    assert.strictEqual(m01Cases.length, 3, 'Módulo M01 debe contener 3 casos de uso');

    // Búsqueda por Módulo P01 (M04 cubre CRUD 09 y CRUD 10)
    const m04Cases = getUseCasesByModule('M04');
    assert.strictEqual(m04Cases.length, 2, 'Módulo M04 debe contener zonas y bloqueos viales');
  });
});
