---
title: "Sprint 0: Arquitectura Base, Esquema Relacional 3FN y Configuración de Sede"
sprint: "Sprint 0"
story_points: 9
start_date: "2026-11-04"
due_date: "2026-11-11"
project: "EduCare Kids"
framework: "Solo-Scrum / 3-Tier Architecture / SQLite 3FN / Jest-Vitest"
---

# Sprint 0: Arquitectura Base, Esquema Relacional 3FN y Configuración de Sede

> **Navegación del Proyecto:**  
> *(Inicio del Proyecto)* | [📋 Índice General del Backlog](./README.md) | [Sprint 1 →](./Sprint_1.md)

---

## 1. Ficha Técnica y Objetivos del Sprint

| Parámetro | Valor |
| :--- | :--- |
| **Identificador del Sprint** | `Sprint 0` |
| **Duración y Fechas** | Del **2026-11-04** al **2026-11-11** |
| **Velocidad Planificada** | **9 Story Points** |
| **Ítems del Backlog** | **3 ítems** (0 Historias de Usuario, 3 Tareas Técnicas / QA) |
| **Metodología** | **Solo-Scrum** (Roles unificados: Product Owner, Scrum Master, Arquitecto Software, Full-Stack Developer y QA Lead) |
| **Entorno Tecnológico** | React / Next.js (Frontend), Node.js / TypeScript (Backend), SQLite en 3FN (Base de Datos), Jest / Vitest (Testing) |

> [!IMPORTANT]
> **Objetivo del Sprint (Sprint Goal):**  
> *Establecer los cimientos arquitectónicos del proyecto EduCare Kids en 3 capas, modelar e inicializar las 16 entidades en SQLite bajo Tercera Forma Normal (3FN), parametrizar la sede central (M07) y configurar el arnés de pruebas automatizadas con Jest/Vitest.*


---

## 2. Épicas Involucradas

El trabajo planificado en este sprint tributa directamente a las siguientes épicas estratégicas del Product Backlog:

### Épica 1: EP01: Arquitectura Base, Base de Datos 3FN y Gestión de Familias (M01, M07)
- **Descripción General de la Épica:** Diseño e implementación de la arquitectura en 3 capas (React/Next.js + Node.js), modelado de las 16 entidades en 3FN sobre SQLite, configuración de sede central (M07 - CRUD 15) y módulo completo de alta de familias, menores y alérgenos (M01 - CRUD 01 a 03).
- **Período Global:** Del `2026-11-04` al `2026-11-25`
- **Prioridad de la Épica:** `Highest`
- **Componentes:** `M01-Familias;M07-Configuracion`
- **Etiquetas:** `ECK;3FN;SQLite;Arquitectura`

### Épica 6: Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final
- **Descripción General de la Épica:** Épica transversal para asegurar la calidad continua del software mediante pruebas unitarias, de integración 3FN, procesos autónomos y UI con Jest/Vitest (PRU-01 a PRU-06), redacción de informes de avance quincenales y preparación de la Memoria Técnica y Defensa Final.
- **Período Global:** Del `2026-11-04` al `2027-02-03`
- **Prioridad de la Épica:** `Highest`
- **Componentes:** `QA-Validacion;Documentacion`
- **Etiquetas:** `ECK;QA;Jest;Vitest;Informes`

---

## 3. Desglose Exhaustivo de Ítems del Sprint

A continuación se detalla cada historia de usuario y tarea técnica asignada a este sprint, incluyendo su trazabilidad completa, desglose exhaustivo de subtareas (operaciones CRUD), plan de pruebas de la matriz y validación en sintaxis BDD (Gherkin):

### 3.1. [Jira ID: 101] Diseño e implementación del esquema relacional 3FN en SQLite (16 tablas CRUD) y configuración de sede

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Tarea` |
| **Épica Padre** | **Épica 1:** EP01: Arquitectura Base, Base de Datos 3FN y Gestión de Familias (M01, M07) |
| **Story Points** | **4 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2026-11-04` ➔ Vencimiento: `2026-11-08` |
| **Componentes** | `M07-Configuracion;Arquitectura` |
| **Etiquetas** | `Sprint0;SQLite;3FN;CRUD15` |

#### Historia de Usuario / Definición del Requisito
> "Como Arquitecto de Software, quiero diseñar e inicializar la base de datos SQLite en Tercera Forma Normal (3FN) con las 16 entidades del sistema y el mantenimiento de configuración de sede para garantizar la integridad referencial y los parámetros base del centro."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M07, M01..M08], [CRUD 15 (configuracion_sede) y DDL de CRUD 01..16], [MNF03].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 15 (configuracion_sede):**  
   
     - **CREATE:** alta de sede física, radio máximo permitido de 25 km, margen vial de 20 min y normativa interna, 
     - **READ:** consulta de parámetros activos del centro, 
     - **UPDATE:** modificación de radio límite, tarifas base o políticas, 
     - **DELETE:** baja lógica de configuraciones históricas.

2. **DDL SQLite 3FN:**  
   Creación de scripts SQL con claves primarias, claves foráneas e índices para las 16 tablas físicas (familias, menores, alergenos_menores, servicios, tarifas_edad, materias_apoyo, citas, franjas_horarias, zonas_desplazamiento, bloqueos_viales, catalogo_bonos, bonos_familias, entregas_tutoria, registros_cuidados, configuracion_sede, facturas_usuarios).

3. **Inicialización de arquitectura en 3 capas (Presentación en React/Next.js, Lógica de Negocio en Node.js/TypeScript y Capa de Acceso a Datos SQLite).**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-02 con Jest/Vitest sobre instancia aislada de SQLite en 3FN verificando creación de tablas y restricciones FK).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: Diseño e implementación del esquema relacional 3FN en SQLite (16 tablas CRUD) y configuración de sede
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Inicialización del esquema 3FN y parametrización de sede central
    Dado que el entorno Node.js y SQLite está inicializado en limpio
    Cuando se ejecuta la migración de las 16 tablas en 3FN y se registra la sede con radio máximo de 25 km en configuracion_sede
    Entonces la base de datos crea las 16 entidades sin errores de claves foráneas y retorna los parámetros de sede activos.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Diseño fundacional de la base de datos relacional para el ecosistema EduCare Kids. Garantizar la Tercera Forma Normal (3FN) es prioritario para evitar anomalías de inserción, actualización y borrado en los 16 módulos del sistema.
> - **Diseño de Arquitectura en 3 Capas:** Arquitectura desacoplada en 3 capas: Presentación en React/Next.js con Server/Client Components, Lógica de Negocio en TypeScript con servicios de dominio puros, y Capa de Acceso a Datos mediante SQLite con consultas preparadas (prepared statements).
> - **Seguridad y Persistencia (SQLite 3FN):** Habilitación mandatoria de `PRAGMA foreign_keys = ON;` en SQLite al inicio de cada conexión. Las restricciones de integridad referencial son auditadas estrictamente para impedir inconsistencias.
> - **Reglas de Negocio Clave:** La sede central (CRUD 15) define las directrices maestras: radio operacional máximo de 25 km y ventana de seguridad vial de 20 minutos de colchón técnico para traslados presenciales.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Riesgo de dispersión de tipos de datos en SQLite; mitigado estableciendo tipos estrictos (INTEGER, TEXT, REAL) y checks de validación en tiempo de compilación con TypeScript.


---

### 3.2. [Jira ID: 102] Definición de casos de uso, configuración del arnés de pruebas Jest/Vitest y estructuración del Product Backlog

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Tarea` |
| **Épica Padre** | **Épica 1:** EP01: Arquitectura Base, Base de Datos 3FN y Gestión de Familias (M01, M07) |
| **Story Points** | **3 SP** |
| **Prioridad** | `High` |
| **Cronograma** | Inicio: `2026-11-08` ➔ Vencimiento: `2026-11-10` |
| **Componentes** | `Arquitectura;QA-Validacion` |
| **Etiquetas** | `Sprint0;Jest;Vitest;Backlog` |

#### Historia de Usuario / Definición del Requisito
> "Como Desarrollador Solo-Scrum, quiero configurar el entorno de testing automatizado con Jest/Vitest sobre instancias aisladas en memoria/archivo de SQLite y estructurar los casos de uso para asegurar trazabilidad completa durante el proyecto."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M01..M08], [CRUD 01..16 (esquema de pruebas)], [MNF04].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 15 (configuracion_sede):**  
   
     - **CREATE:** semilla de datos de prueba para sede central, 
     - **READ:** lectura de parámetros en entorno de test, 
     - **UPDATE:** ajuste de radio en tests unitarios, 
     - **DELETE:** limpieza/teardown de tabla tras ejecución de suite.

2. **Configuración de Jest/Vitest con soporte TypeScript y conexión a instancia aislada de SQLite para pruebas de integración.**

3. **Documentación de casos de uso principales y trazabilidad con el Product Backlog en Jira Cloud.**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-01 y PRU-02 en modo smoke test con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: Definición de casos de uso, configuración del arnés de pruebas Jest/Vitest y estructuración del Product Backlog
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Ejecución exitosa del entorno de pruebas aisladas en SQLite
    Dado el comando de ejecución de pruebas configurado en package.json
    Cuando se corre la suite base de Jest/Vitest sobre la base de datos de prueba
    Entonces se levanta una instancia SQLite aislada en 3FN, se verifica la semilla de configuracion_sede y se limpia el estado al finalizar.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Configuración del arnés automatizado de pruebas para el modelo Solo-Scrum. Al ser desarrollo individual, la fiabilidad de las pruebas automatizadas reemplaza el testing manual repetitivo.
> - **Diseño de Arquitectura en 3 Capas:** Instancias aisladas de SQLite (en memoria o base de datos efímera por suite) para garantizar idempotencia e independencia entre casos de prueba sin contaminación cruzada.
> - **Seguridad y Persistencia (SQLite 3FN):** Procedimiento de teardown automático que destruye y recrea el esquema 3FN antes de cada suite de integración, asegurando estados limpios.
> - **Reglas de Negocio Clave:** Trazabilidad biunívoca entre los Casos de Uso del sistema, los registros del Product Backlog en Jira Cloud y las suites de pruebas unitarias/integración.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Jest/Vitest debe configurarse con transpilación rápida de TypeScript (`ts-jest` o `esbuild`) para mantener tiempos de feedback menores a 2 segundos en desarrollo.


---

### 3.3. [Jira ID: 103] [VALIDACIÓN SPRINT 0] Certificación de esquema 3FN en SQLite e Informe de Avance del Sprint 0

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Tarea` |
| **Épica Padre** | **Épica 6:** Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final |
| **Story Points** | **2 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2026-11-10` ➔ Vencimiento: `2026-11-11` |
| **Componentes** | `QA-Validacion;Documentacion` |
| **Etiquetas** | `Sprint0;Validacion;InformeAvance` |

#### Historia de Usuario / Definición del Requisito
> "Como Responsable de QA y Gestión del Proyecto, quiero validar la integridad del modelo relacional de 16 CRUDs en 3FN y redactar el Informe de Avance del Sprint 0 para certificar el cierre de la fase de análisis y arquitectura base."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M01..M08, M07], [CRUD 15 (configuracion_sede)], [MNF03].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 15 (configuracion_sede):**  
   
     - **CREATE:** verificación de inserción en test de humo, 
     - **READ:** comprobación de lectura de radio de 25 km y margen de 20 min, 
     - **UPDATE:** validación de actualización de políticas, 
     - **DELETE:** comprobación de restricción de integridad.

2. **Verificación de claves foráneas PRAGMA foreign_keys = ON en SQLite para las 16 tablas.**

3. **Redacción del Informe de Avance del Sprint 0 y planificación detallada del Sprint 1.**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-02 inicial de esquema 3FN con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: [VALIDACIÓN SPRINT 0] Certificación de esquema 3FN en SQLite e Informe de Avance del Sprint 0
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Certificación del modelo de datos 3FN y cierre documental del Sprint 0
    Dado que las 16 tablas están creadas en SQLite con PRAGMA foreign_keys activo
    Cuando se ejecuta el script de validación de esquema y se genera el informe de avance
    Entonces todas las aserciones de integridad pasan al 100% y el entregable del Sprint 0 queda documentado.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Hito de certificación de calidad formal que concluye la fase de preparación y arquitectura base (Sprint 0).
> - **Diseño de Arquitectura en 3 Capas:** Validación automatizada de las 16 tablas del esquema DDL mediante PRU-02, inspeccionando `sqlite_master` y tablas del sistema para corroborar llaves primarias, foráneas e índices únicos.
> - **Seguridad y Persistencia (SQLite 3FN):** Comprobación de fallos esperados al forzar inserción de registros huérfanos, certificando que `PRAGMA foreign_keys = ON` rechaza violaciones de esquema.
> - **Reglas de Negocio Clave:** Cierre documental del Informe de Avance del Sprint 0, detallando la velocidad del sprint (9 Story Points) y el plan de trabajo detallado para el Sprint 1.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Documentar con capturas de consola y tablas de esquema para consolidar las evidencias exigidas por la rúbrica académica VIU.


---

## 4. Matriz Resumen de Entregables del Sprint 0

| ID Jira | Tipo | Resumen del Entregable | Épica | SP | Prioridad | Validación BDD / Matriz | Estado |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **#101** | `Tarea` | Diseño e implementación del esquema relacional 3FN... | Épica 1 | **4** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **#102** | `Tarea` | Definición de casos de uso, configuración del arné... | Épica 1 | **3** | `High` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **#103** | `Tarea` | [VALIDACIÓN SPRINT 0] Certificación de esquema 3FN... | Épica 6 | **2** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **TOTAL** | — | **3 Ítems Planificados** | — | **9 SP** | — | **100% Cobertura de Criterios** | **Sprint Completado** |


---

## 5. Definición de Terminado (Definition of Done - DoD)

Para considerar este sprint oficialmente cerrado, se deben certificar los siguientes criterios de calidad:

1. [x] **Código y Tipado:** Todo el código TypeScript implementado sin errores de compilación (`strict: true`).
2. [x] **Base de Datos 3FN:** Tablas físicas creadas con llaves primarias, foráneas e índices en SQLite sin redundancias no normalizadas.
3. [x] **Operaciones CRUD:** Implementación completa y verificada de los métodos CREATE, READ, UPDATE y DELETE especificados.
4. [x] **Pruebas Automatizadas:** 100% de los tests unitarios y de integración de Jest/Vitest ejecutados en verde (`0 failed`).
5. [x] **Criterios de Aceptación BDD:** Todos los escenarios Gherkin del sprint validados con aserciones automatizadas.
6. [x] **Trazabilidad y Gestión:** Registro actualizado en el tablero de Jira Cloud y redacción del Informe de Avance correspondiente.


---

*Documento generado a partir del Backlog Oficial de Jira Cloud para el proyecto EduCare Kids.*
