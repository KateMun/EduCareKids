---
title: "Sprint 2: Catálogo de Servicios, Tarifas Dinámicas por Edad y Materias Escolares (M02)"
sprint: "Sprint 2"
story_points: 14
start_date: "2026-11-26"
due_date: "2026-12-09"
project: "EduCare Kids"
framework: "Solo-Scrum / 3-Tier Architecture / SQLite 3FN / Jest-Vitest"
---

# Sprint 2: Catálogo de Servicios, Tarifas Dinámicas por Edad y Materias Escolares (M02)

> **Navegación del Proyecto:**  
> [← Sprint 1](./Sprint_1.md) | [📋 Índice General del Backlog](./README.md) | [Sprint 3 →](./Sprint_3.md)

---

## 1. Ficha Técnica y Objetivos del Sprint

| Parámetro | Valor |
| :--- | :--- |
| **Identificador del Sprint** | `Sprint 2` |
| **Duración y Fechas** | Del **2026-11-26** al **2026-12-09** |
| **Velocidad Planificada** | **14 Story Points** |
| **Ítems del Backlog** | **3 ítems** (2 Historias de Usuario, 1 Tareas Técnicas / QA) |
| **Metodología** | **Solo-Scrum** (Roles unificados: Product Owner, Scrum Master, Arquitecto Software, Full-Stack Developer y QA Lead) |
| **Entorno Tecnológico** | React / Next.js (Frontend), Node.js / TypeScript (Backend), SQLite en 3FN (Base de Datos), Jest / Vitest (Testing) |

> [!IMPORTANT]
> **Objetivo del Sprint (Sprint Goal):**  
> *Desarrollar el catálogo de 4 modalidades de servicio (CRUD 04), el motor de tarificación dinámica con recargos inversamente proporcionales a la edad (+30% lactantes 0-2 años, +15% 3-5 años) (CRUD 05) y el catálogo de materias escolares por etapa (CRUD 06), alcanzando el 22% de alcance base funcional.*


---

## 2. Épicas Involucradas

El trabajo planificado en este sprint tributa directamente a las siguientes épicas estratégicas del Product Backlog:

### Épica 2: EP02: Catálogo de Servicios, Tarifas Dinámicas por Edad y Materias (M02)
- **Descripción General de la Épica:** Implementación del catálogo de 4 modalidades operativas (niñera, clase presencial, clase online y tutoría asíncrona), motor de recargo dinámico inversamente proporcional a la edad (+30% 0-2 años, +15% 3-5 años) y gestión de materias escolares (M02 - CRUD 04 a 06).
- **Período Global:** Del `2026-11-26` al `2026-12-09`
- **Prioridad de la Épica:** `High`
- **Componentes:** `M02-Catalogo`
- **Etiquetas:** `ECK;TarifasDinamicas;M02`

### Épica 6: Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final
- **Descripción General de la Épica:** Épica transversal para asegurar la calidad continua del software mediante pruebas unitarias, de integración 3FN, procesos autónomos y UI con Jest/Vitest (PRU-01 a PRU-06), redacción de informes de avance quincenales y preparación de la Memoria Técnica y Defensa Final.
- **Período Global:** Del `2026-11-04` al `2027-02-03`
- **Prioridad de la Épica:** `Highest`
- **Componentes:** `QA-Validacion;Documentacion`
- **Etiquetas:** `ECK;QA;Jest;Vitest;Informes`

---

## 3. Desglose Exhaustivo de Ítems del Sprint

A continuación se detalla cada historia de usuario y tarea técnica asignada a este sprint, incluyendo su trazabilidad completa, desglose exhaustivo de subtareas (operaciones CRUD), plan de pruebas de la matriz y validación en sintaxis BDD (Gherkin):

### 3.1. [Jira ID: 301] Catálogo de servicios y motor de tarifas dinámicas según franja de edad del menor (M02 - CRUD 04 y 05)

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Historia` |
| **Épica Padre** | **Épica 2:** EP02: Catálogo de Servicios, Tarifas Dinámicas por Edad y Materias (M02) |
| **Story Points** | **6 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2026-11-26` ➔ Vencimiento: `2026-12-02` |
| **Componentes** | `M02-Catalogo` |
| **Etiquetas** | `Sprint2;M02;CRUD04;CRUD05;Tarifas` |

#### Historia de Usuario / Definición del Requisito
> "Como Administrador, quiero administrar las 4 modalidades de servicio con su tarifa base y configurar los tramos de recargo porcentual por edad (+30% para 0-2 años, +15% para 3-5 años y estándar para mayores) para tarificar dinámicamente según la delicadeza del cuidado."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M02, M01], [CRUD 04 (servicios), CRUD 05 (tarifas_edad)], [PRU-01, PRU-02].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 04 (servicios):**  
   
     - **CREATE:** alta de las 4 modalidades: niñera a domicilio, clase particular presencial, clase online y tutoría asíncrona con su tarifa base por hora, 
     - **READ:** catálogo de servicios activos y filtro por modalidad presencial/remota, 
     - **UPDATE:** actualización de precios base y descripciones, 
     - **DELETE:** baja lógica de servicios.

2. **CRUD 05 (tarifas_edad):**  
   
     - **CREATE:** creación de reglas de recargo por franja: 0-2 años +30%, 3-5 años +15%, >5 años 0%, 
     - **READ:** consulta de tramo aplicable según edad calculada del menor, 
     - **UPDATE:** modificación de porcentajes de recargo, 
     - **DELETE:** baja lógica de tramo tarifario.

3. **Motor de cálculo tarifario en capa de negocio que combina tarifa base (CRUD 04) + recargo por edad del menor (CRUD 02 + CRUD 05).**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-01 y PRU-02 con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: Catálogo de servicios y motor de tarifas dinámicas según franja de edad del menor (M02 - CRUD 04 y 05)
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Aplicación automática de recargo del +30% en lactante de 18 meses y +15% en menor de 4 años
    Dado un servicio con tarifa base de 20 EUR/hora en la tabla servicios y las reglas activas en tarifas_edad
    Cuando se cotiza el servicio para un menor de 18 meses y otro de 4 años
    Entonces el sistema calcula exactamente 26 EUR/hora (+30%) para el lactante y 23 EUR/hora (+15%) para el niño de 4 años.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Implementación del catálogo de servicios comerciales (CRUD 04) y el motor de tarifas dinámicas en función de la edad (CRUD 05). Núcleo del modelo de monetización.
> - **Diseño de Arquitectura en 3 Capas:** Capa de lógica desacoplada donde el servicio de tarificación recibe el identificador del servicio base y el menor, calcula la edad al vuelo y aplica la fórmula de recargo parametrizada.
> - **Seguridad y Persistencia (SQLite 3FN):** Almacenamiento de importes en formato decimal de alta precisión (céntimos en base de datos o enteros para evitar errores de redondeo de punto flotante de JavaScript).
> - **Reglas de Negocio Clave:** Matriz tarifaria: Modalidades operativas (Niñera 20€/h, Clase Presencial 22€/h, Clase Online 18€/h, Tutoría Asíncrona 15€/h). Recargo etario: 0-2 años (+30%), 3-5 años (+15%), >5 años (0% recargo estándar). Ejemplo: Niñera para lactante de 18 meses = 20€ + 30% = 26.00 €/h.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Los tramos de recargo deben ser configurables por el administrador en `tarifas_edad` sin necesidad de modificar el código fuente de la aplicación.


---

### 3.2. [Jira ID: 302] Gestión del catálogo de asignaturas y etapas escolares para apoyo educativo (M02 - CRUD 06)

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Historia` |
| **Épica Padre** | **Épica 2:** EP02: Catálogo de Servicios, Tarifas Dinámicas por Edad y Materias (M02) |
| **Story Points** | **5 SP** |
| **Prioridad** | `High` |
| **Cronograma** | Inicio: `2026-12-02` ➔ Vencimiento: `2026-12-07` |
| **Componentes** | `M02-Catalogo` |
| **Etiquetas** | `Sprint2;M02;CRUD06` |

#### Historia de Usuario / Definición del Requisito
> "Como Administrador y Padre/Tutor, quiero gestionar y consultar las asignaturas y niveles educativos disponibles para asociarlos a las clases particulares presenciales, online y al refuerzo asíncrono."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M02], [CRUD 06 (materias_apoyo)], [PRU-02, MNF04].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 06 (materias_apoyo):**  
   
     - **CREATE:** alta de asignatura con nombre, etapa escolar Infantil/Primaria/ESO y vinculación a modalidades de apoyo, 
     - **READ:** listado de materias filtradas por etapa educativa, 
     - **UPDATE:** edición de temario, etapa o estado de la materia, 
     - **DELETE:** baja lógica de asignatura sin afectar citas históricas.

2. **Integración en interfaz de catálogo (React/Next.js) con selector de materias y simulador de tarifa por edad en tiempo real.**

3. **Validación de integridad referencial entre servicios pedagógicos (CRUD 04) y materias de apoyo (CRUD 06).**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-02 con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: Gestión del catálogo de asignaturas y etapas escolares para apoyo educativo (M02 - CRUD 06)
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Mantenimiento completo de materias escolares en 3FN
    Dado que el administrador accede al catálogo de materias_apoyo
    Cuando crea una nueva asignatura asociada a etapa Primaria, la edita y consulta el catálogo desde el perfil familiar
    Entonces la materia se almacena en 3FN y se muestra disponible para las modalidades de clases particulares y tutoría asíncrona.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Catálogo de materias de apoyo y refuerzo escolar (CRUD 06), clasificadas por ciclos educativos (Infantil, Primaria, ESO).
> - **Diseño de Arquitectura en 3 Capas:** Relaciones normalizadas en 3FN que permiten vincular una sesión de apoyo presencial, online o tutoría asíncrona con una o varias materias específicas.
> - **Seguridad y Persistencia (SQLite 3FN):** Integridad referencial que impide borrar asignaturas si están referenciadas en citas históricas o entregas de tutoría pendientes.
> - **Reglas de Negocio Clave:** El catálogo permite a las familias filtrar docentes y servicios especializados por materia escolar (Matemáticas, Lengua, Inglés, Apoyo a la Lectoescritura).
> - **Gestión de Riesgos y Lecciones Aprendidas:** Diseño flexible para permitir añadir temarios o campos de observaciones curriculares sin alterar la estructura base.


---

### 3.3. [Jira ID: 303] [VALIDACIÓN SPRINT 2] Certificación de pruebas de tarificación dinámica (PRU-01, PRU-02) e Informe de Avance Sprint 2

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Tarea` |
| **Épica Padre** | **Épica 6:** Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final |
| **Story Points** | **3 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2026-12-07` ➔ Vencimiento: `2026-12-09` |
| **Componentes** | `QA-Validacion;M02-Catalogo` |
| **Etiquetas** | `Sprint2;Validacion;PRU01;PRU02;InformeAvance` |

#### Historia de Usuario / Definición del Requisito
> "Como Responsable de QA, quiero ejecutar las pruebas unitarias de tarificación por edad (PRU-01) y las pruebas de persistencia de los CRUD 01 a 06 (PRU-02) junto con el Informe de Avance del Sprint 2 para certificar el 22% de alcance base de M01+M02."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M01, M02], [CRUD 04 (servicios), CRUD 05 (tarifas_edad), CRUD 06 (materias_apoyo)], [PRU-01, PRU-02].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 04 (servicios), CRUD 05 (tarifas_edad) y CRUD 06 (materias_apoyo):**  
   CREATE, READ, UPDATE, DELETE validados íntegramente en suite de integración SQLite 3FN.

2. **Verificación de casos borde en PRU-01 (límites exactos de 2 años y 5 años en cálculo de recargo +30% y +15%).**

3. **Redacción del Informe de Avance del Sprint 2 y planificación del Sprint 3.**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-01 y PRU-02 completas con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: [VALIDACIÓN SPRINT 2] Certificación de pruebas de tarificación dinámica (PRU-01, PRU-02) e Informe de Avance Sprint 2
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Certificación sin fallos de PRU-01 y PRU-02 para los 6 primeros CRUDs
    Dado el conjunto de pruebas PRU-01 y PRU-02 sobre los módulos M01 y M02
    Cuando se ejecuta el runner de Jest/Vitest
    Entonces todas las pruebas unitarias de tarifas y de integridad referencial de los CRUD 01 a 06 resultan exitosas y se documenta el informe del Sprint 2.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Hito de validación del Sprint 2 y certificación del 22% del alcance práctico total de EduCare Kids (módulos M01 y M02 completamente terminados y probados).
> - **Diseño de Arquitectura en 3 Capas:** Ejecución exhaustiva de PRU-01 (motor matemático de cálculo de tarifas) y PRU-02 (persistencia 3FN de los 6 primeros CRUDs).
> - **Seguridad y Persistencia (SQLite 3FN):** Aserción de que un menor de 18 meses cotiza a 26€/h (+30%) y uno de 4 años a 23€/h (+15%) sobre tarifa base de 20€/h con precisión absoluta.
> - **Reglas de Negocio Clave:** Cierre documental del Informe de Avance del Sprint 2 con 14 Story Points completados en tiempo y forma.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Validar que las tablas de tarifas admitan cambios de precios futuros sin alterar el importe histórico registrado en citas ya facturadas.


---

## 4. Matriz Resumen de Entregables del Sprint 2

| ID Jira | Tipo | Resumen del Entregable | Épica | SP | Prioridad | Validación BDD / Matriz | Estado |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **#301** | `Historia` | Catálogo de servicios y motor de tarifas dinámicas... | Épica 2 | **6** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **#302** | `Historia` | Gestión del catálogo de asignaturas y etapas escol... | Épica 2 | **5** | `High` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **#303** | `Tarea` | [VALIDACIÓN SPRINT 2] Certificación de pruebas de ... | Épica 6 | **3** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **TOTAL** | — | **3 Ítems Planificados** | — | **14 SP** | — | **100% Cobertura de Criterios** | **Sprint Completado** |


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
