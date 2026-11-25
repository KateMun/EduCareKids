---
title: "Sprint 4: Monedero de Bonos Prepago, Tutoría Asíncrona y Diario de Cuidados (M05, M06, P02, P03)"
sprint: "Sprint 4"
story_points: 15
start_date: "2026-12-24"
due_date: "2027-01-06"
project: "EduCare Kids"
framework: "Solo-Scrum / 3-Tier Architecture / SQLite 3FN / Jest-Vitest"
---

# Sprint 4: Monedero de Bonos Prepago, Tutoría Asíncrona y Diario de Cuidados (M05, M06, P02, P03)

> **Navegación del Proyecto:**  
> [← Sprint 3](./Sprint_3.md) | [📋 Índice General del Backlog](./README.md) | [Sprint 5 →](./Sprint_5.md)

---

## 1. Ficha Técnica y Objetivos del Sprint

| Parámetro | Valor |
| :--- | :--- |
| **Identificador del Sprint** | `Sprint 4` |
| **Duración y Fechas** | Del **2026-12-24** al **2027-01-06** |
| **Velocidad Planificada** | **15 Story Points** |
| **Ítems del Backlog** | **3 ítems** (2 Historias de Usuario, 1 Tareas Técnicas / QA) |
| **Metodología** | **Solo-Scrum** (Roles unificados: Product Owner, Scrum Master, Arquitecto Software, Full-Stack Developer y QA Lead) |
| **Entorno Tecnológico** | React / Next.js (Frontend), Node.js / TypeScript (Backend), SQLite en 3FN (Base de Datos), Jest / Vitest (Testing) |

> [!IMPORTANT]
> **Objetivo del Sprint (Sprint Goal):**  
> *Implementar el monedero de bonos prepago (CRUD 11, 12) con procesos autónomos de débito por reserva (P02) y alerta de saldo <=2h (P03), habilitar el buzón de entregas asíncronas de apoyo escolar (CRUD 13) y el registro diario de cuidados de niñera (CRUD 14), ejecutando la suite consolidada PRU-01 a PRU-06.*


---

## 2. Épicas Involucradas

El trabajo planificado en este sprint tributa directamente a las siguientes épicas estratégicas del Product Backlog:

### Épica 4: EP04: Monedero de Bonos Prepago, Tutoría Asíncrona y Diario de Cuidados (M05, M06, P02, P03)
- **Descripción General de la Épica:** Gestión del catálogo de bonos (5h, 10h, 20h) y saldos familiares (M05 - CRUD 11 y 12), procesos autónomos de débito (P02) y alertas de saldo <=2h (P03), junto con entregas de tutoría asíncrona y registro diario de cuidados infantiles (M06 - CRUD 13 y 14).
- **Período Global:** Del `2026-12-24` al `2027-01-06`
- **Prioridad de la Épica:** `Medium`
- **Componentes:** `M05-Bonos;M06-Tutoria`
- **Etiquetas:** `ECK;Bonos;P02;P03;Tutoria`

### Épica 6: Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final
- **Descripción General de la Épica:** Épica transversal para asegurar la calidad continua del software mediante pruebas unitarias, de integración 3FN, procesos autónomos y UI con Jest/Vitest (PRU-01 a PRU-06), redacción de informes de avance quincenales y preparación de la Memoria Técnica y Defensa Final.
- **Período Global:** Del `2026-11-04` al `2027-02-03`
- **Prioridad de la Épica:** `Highest`
- **Componentes:** `QA-Validacion;Documentacion`
- **Etiquetas:** `ECK;QA;Jest;Vitest;Informes`

---

## 3. Desglose Exhaustivo de Ítems del Sprint

A continuación se detalla cada historia de usuario y tarea técnica asignada a este sprint, incluyendo su trazabilidad completa, desglose exhaustivo de subtareas (operaciones CRUD), plan de pruebas de la matriz y validación en sintaxis BDD (Gherkin):

### 3.1. [Jira ID: 501] Catálogo de bonos prepago, saldos familiares y procesos autónomos de débito y alerta <=2h (M05 - CRUD 11, 12, P02, P03)

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Historia` |
| **Épica Padre** | **Épica 4:** EP04: Monedero de Bonos Prepago, Tutoría Asíncrona y Diario de Cuidados (M05, M06, P02, P03) |
| **Story Points** | **6 SP** |
| **Prioridad** | `High` |
| **Cronograma** | Inicio: `2026-12-24` ➔ Vencimiento: `2026-12-29` |
| **Componentes** | `M05-Bonos` |
| **Etiquetas** | `Sprint4;M05;CRUD11;CRUD12;P02;P03` |

#### Historia de Usuario / Definición del Requisito
> "Como Padre/Tutor y Sistema Autónomo, quiero adquirir bonos de horas prepago (5h, 10h, 20h) con descuento en el monedero de prueba, descontar automáticamente las horas al confirmar citas (P02) y emitir una alerta auditada cuando el saldo sea <= 2 horas (P03)."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M05, M03, M08, MNF02], [CRUD 11 (catalogo_bonos), CRUD 12 (bonos_familias)], [P02, P03, PRU-05].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 11 (catalogo_bonos):**  
   
     - **CREATE:** alta de paquetes comerciales de 5h, 10h y 20h con porcentaje de descuento y condiciones de caducidad, 
     - **READ:** consulta de oferta de bonos, 
     - **UPDATE:** modificación de descuentos o vigencia, 
     - **DELETE:** baja lógica de tipo de bono.

2. **CRUD 12 (bonos_familias):**  
   
     - **CREATE:** adquisición/recarga de bono en monedero de prueba familiar, 
     - **READ:** consulta de saldo de horas disponibles y movimientos, 
     - **UPDATE:** débito automático de horas consumidas tras confirmar cita mediante P02, 
     - **DELETE:** anulación o baja por caducidad de bono.

3. **Implementación de P02 y P03:**  
   deducción automática de horas al confirmar cita y disparo de alerta por email simulado + registro de evento de auditoría cuando el saldo resultante sea <= 2 horas.

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-05 con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: Catálogo de bonos prepago, saldos familiares y procesos autónomos de débito y alerta <=2h (M05 - CRUD 11, 12, P02, P03)
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Débito automático de bono (P02) y disparo de alerta por saldo <= 2 horas (P03)
    Dado que una familia tiene un bono activo en bonos_familias con saldo de 3.5 horas
    Cuando confirma una reserva de 2 horas
    Entonces el motor P02 descuenta el saldo a 1.5 horas y el motor P03 detecta saldo <= 2 horas, enviando alerta y registrando el evento en auditoría.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Implementación del monedero prepago de horas de servicio (CRUD 11 y CRUD 12) junto con los procesos autónomos P02 (débito) y P03 (alerta de saldo crítico).
> - **Diseño de Arquitectura en 3 Capas:** El motor P02 descuenta atómicamente horas del saldo del bono de la familia al confirmarse una cita. Si el saldo resultante es <= 2.0 horas, se invoca de inmediato el motor P03.
> - **Seguridad y Persistencia (SQLite 3FN):** Registro inmutable del evento de alerta en el subsistema de auditoría (MNF02) con sello de tiempo, identificador familiar y saldo remanente.
> - **Reglas de Negocio Clave:** Catálogo de bonos con tarifas bonificadas: 5 horas (-5%), 10 horas (-10%), 20 horas (-15%). Descuento automático de fracciones de hora (ej: cita de 2.0 horas sobre saldo de 3.5h deja saldo de 1.5h y dispara alerta P03).
> - **Gestión de Riesgos y Lecciones Aprendidas:** Prevenir saldos negativos mediante restricción `CHECK (saldo_horas >= 0)` a nivel de base de datos en SQLite.


---

### 3.2. [Jira ID: 502] Buzón de entregas de tutoría asíncrona y registro de diario de cuidados infantiles (M06 - CRUD 13 y 14)

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Historia` |
| **Épica Padre** | **Épica 4:** EP04: Monedero de Bonos Prepago, Tutoría Asíncrona y Diario de Cuidados (M05, M06, P02, P03) |
| **Story Points** | **5 SP** |
| **Prioridad** | `Medium` |
| **Cronograma** | Inicio: `2026-12-29` ➔ Vencimiento: `2027-01-03` |
| **Componentes** | `M06-Tutoria` |
| **Etiquetas** | `Sprint4;M06;CRUD13;CRUD14` |

#### Historia de Usuario / Definición del Requisito
> "Como Padre/Tutor y Administrador/Docente, quiero gestionar el buzón asíncrono de deberes, material didáctico y enlaces a vídeos explicativos, así como el diario de cuidados del servicio de niñera (alimentación, siestas, medicación e incidencias)."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M06], [CRUD 13 (entregas_tutoria), CRUD 14 (registros_cuidados)], [MNF04].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 13 (entregas_tutoria):**  
   
     - **CREATE:** subida de deberes escolares, material didáctico y enlaces a vídeos explicativos vinculados al menor y materia, 
     - **READ:** consulta de buzón asíncrono y feedback pedagógico, 
     - **UPDATE:** registro y edición de correcciones docentes y calificación, 
     - **DELETE:** borrado lógico de entrega.

2. **CRUD 14 (registros_cuidados):**  
   
     - **CREATE:** alta de ficha de seguimiento diario de niñera con alimentación, siestas, medicación e incidencias vinculada a la cita, 
     - **READ:** consulta de historial de cuidados por parte de los padres, 
     - **UPDATE:** ampliación de observaciones del cuidado, 
     - **DELETE:** eliminación lógica de registro.

3. **Interfaz unificada para consulta familiar de seguimiento pedagógico y reporte diario de cuidados.**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-02 extendida a M06 con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: Buzón de entregas de tutoría asíncrona y registro de diario de cuidados infantiles (M06 - CRUD 13 y 14)
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Registro de corrección docente asíncrona y ficha de cuidado diario
    Dado un menor con servicio de tutoría asíncrona y servicio de niñera registrado
    Cuando el docente actualiza la corrección en entregas_tutoria y la niñera registra alimentación y siesta en registros_cuidados
    Entonces los padres visualizan en tiempo real el feedback académico con su enlace de vídeo y el parte diario de cuidado infantil.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Módulo pedagógico y de bitácora diaria (M06): Buzón de tutoría asíncrona (CRUD 13) y Diario de cuidados infantiles (CRUD 14).
> - **Diseño de Arquitectura en 3 Capas:** Almacenamiento de metadatos de entregas, calificaciones docentes y enlaces a vídeos explicativos (URLs externas seguras) sin saturar la base de datos con binarios pesados.
> - **Seguridad y Persistencia (SQLite 3FN):** Acceso restringido: Los padres solo pueden consultar las fichas de cuidado y entregas pedagógicas pertenecientes exclusivamente a sus hijos acreditados.
> - **Reglas de Negocio Clave:** El diario de cuidados permite registrar: tomas de biberón/comidas, horas de siesta, medicación suministrada según pauta médica autorizada y registro de incidencias del turno.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Interfaz unificada intuitiva para facilitar el reporte rápido del profesional desde el móvil al término de cada servicio.


---

### 3.3. [Jira ID: 503] [VALIDACIÓN SPRINT 4] Auditoría de código, ejecución integral de Matriz de Pruebas (PRU-01 a PRU-06) e Informe Sprint 4

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Tarea` |
| **Épica Padre** | **Épica 6:** Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final |
| **Story Points** | **4 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2027-01-03` ➔ Vencimiento: `2027-01-06` |
| **Componentes** | `QA-Validacion` |
| **Etiquetas** | `Sprint4;Validacion;PRU05;MatrizCompleta;InformeAvance` |

#### Historia de Usuario / Definición del Requisito
> "Como Responsable de QA, quiero realizar la auditoría de código, resolución de errores y ejecución consolidada de toda la matriz de pruebas (PRU-01 a PRU-06) sobre los mantenimientos CRUD y procesos autónomos P01, P02 y P03, emitiendo el Informe de Avance del Sprint 4."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M01..M08, MNF01..MNF04], [CRUD 01..15], [P01, P02, P03, PRU-01 a PRU-06].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 11 (catalogo_bonos), CRUD 12 (bonos_familias), CRUD 13 (entregas_tutoria) y CRUD 14 (registros_cuidados):**  
   CREATE, READ, UPDATE, DELETE validados en suite de integración SQLite 3FN.

2. **Ejecución de regresión completa de PRU-01 (cálculo edad/tarifas), PRU-02 (integridad 3FN), PRU-03 (radio 25 km), PRU-04 (bloqueos 20 min), PRU-05 (débito de bonos y alerta <=2h) y PRU-06 (UI y bloqueo de solapamientos).**

3. **Redacción del Informe de Avance del Sprint 4 y plan del Sprint 5.**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-01 a PRU-06 íntegras con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: [VALIDACIÓN SPRINT 4] Auditoría de código, ejecución integral de Matriz de Pruebas (PRU-01 a PRU-06) e Informe Sprint 4
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Superación del 100% de la Matriz de Pruebas PRU-01 a PRU-06 en el Sprint 4
    Dado el conjunto completo de pruebas PRU-01, PRU-02, PRU-03, PRU-04, PRU-05 y PRU-06
    Cuando se ejecuta la auditoría de testing en Jest/Vitest
    Entonces las 6 suites de prueba finalizan en verde sin regresiones y se genera el Informe de Avance del Sprint 4.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Gran hito de QA del proyecto: auditoría profunda de código, refactorización y ejecución integral consolidada de la Matriz de Pruebas (PRU-01 a PRU-06).
> - **Diseño de Arquitectura en 3 Capas:** Ejecución en pipeline local de toda la suite: cálculo de tarifas (PRU-01), integridad 3FN de 15 CRUDs (PRU-02), restricción vial 25 km (PRU-03), bloqueo vial 20 min (PRU-04), débito y alerta de bonos (PRU-05) y colisiones en agenda (PRU-06).
> - **Seguridad y Persistencia (SQLite 3FN):** Comprobación de que no existen regresiones tras la incorporación de los módulos M05 y M06.
> - **Reglas de Negocio Clave:** Cierre del Sprint 4 con 15 Story Points completados, dejando el sistema en estado óptimo para la recta final de facturación y seguridad.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Monitorear el tiempo total de ejecución de la suite de pruebas para asegurar que se mantenga por debajo del umbral de rendimiento aceptable.


---

## 4. Matriz Resumen de Entregables del Sprint 4

| ID Jira | Tipo | Resumen del Entregable | Épica | SP | Prioridad | Validación BDD / Matriz | Estado |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **#501** | `Historia` | Catálogo de bonos prepago, saldos familiares y pro... | Épica 4 | **6** | `High` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **#502** | `Historia` | Buzón de entregas de tutoría asíncrona y registro ... | Épica 4 | **5** | `Medium` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **#503** | `Tarea` | [VALIDACIÓN SPRINT 4] Auditoría de código, ejecuci... | Épica 6 | **4** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **TOTAL** | — | **3 Ítems Planificados** | — | **15 SP** | — | **100% Cobertura de Criterios** | **Sprint Completado** |


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
