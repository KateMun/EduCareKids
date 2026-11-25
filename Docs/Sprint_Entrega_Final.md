---
title: "Entrega Final (Release): Memoria Técnica, Demostración Funcional y Certificación de Release Candidate"
sprint: "Entrega Final (Release)"
story_points: 13
start_date: "2027-01-21"
due_date: "2027-02-03"
project: "EduCare Kids"
framework: "Solo-Scrum / 3-Tier Architecture / SQLite 3FN / Jest-Vitest"
---

# Entrega Final (Release): Memoria Técnica, Demostración Funcional y Certificación de Release Candidate

> **Navegación del Proyecto:**  
> [← Sprint 5](./Sprint_5.md) | [📋 Índice General del Backlog](./README.md) | *(Cierre de Entrega Final)*

---

## 1. Ficha Técnica y Objetivos del Sprint

| Parámetro | Valor |
| :--- | :--- |
| **Identificador del Sprint** | `Entrega Final (Release)` |
| **Duración y Fechas** | Del **2027-01-21** al **2027-02-03** |
| **Velocidad Planificada** | **13 Story Points** |
| **Ítems del Backlog** | **3 ítems** (0 Historias de Usuario, 3 Tareas Técnicas / QA) |
| **Metodología** | **Solo-Scrum** (Roles unificados: Product Owner, Scrum Master, Arquitecto Software, Full-Stack Developer y QA Lead) |
| **Entorno Tecnológico** | React / Next.js (Frontend), Node.js / TypeScript (Backend), SQLite en 3FN (Base de Datos), Jest / Vitest (Testing) |

> [!IMPORTANT]
> **Objetivo del Sprint (Sprint Goal):**  
> *Consolidar la documentación académica y técnica definitiva del proyecto EduCare Kids (Memoria Técnica en 3FN), grabar el vídeo demostrativo funcional del circuito operativo completo y certificar el cumplimiento integral de la rúbrica VIU para la entrega oficial.*


---

## 2. Épicas Involucradas

El trabajo planificado en este sprint tributa directamente a las siguientes épicas estratégicas del Product Backlog:

### Épica 6: Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final
- **Descripción General de la Épica:** Épica transversal para asegurar la calidad continua del software mediante pruebas unitarias, de integración 3FN, procesos autónomos y UI con Jest/Vitest (PRU-01 a PRU-06), redacción de informes de avance quincenales y preparación de la Memoria Técnica y Defensa Final.
- **Período Global:** Del `2026-11-04` al `2027-02-03`
- **Prioridad de la Épica:** `Highest`
- **Componentes:** `QA-Validacion;Documentacion`
- **Etiquetas:** `ECK;QA;Jest;Vitest;Informes`

---

## 3. Desglose Exhaustivo de Ítems del Sprint

A continuación se detalla cada historia de usuario y tarea técnica asignada a este sprint, incluyendo su trazabilidad completa, desglose exhaustivo de subtareas (operaciones CRUD), plan de pruebas de la matriz y validación en sintaxis BDD (Gherkin):

### 3.1. [Jira ID: 701] Redacción de la Memoria Técnica definitiva del proyecto EduCare Kids (Arquitectura 3 Capas, 16 CRUDs 3FN y Pruebas)

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Tarea` |
| **Épica Padre** | **Épica 6:** Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final |
| **Story Points** | **6 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2027-01-21` ➔ Vencimiento: `2027-01-28` |
| **Componentes** | `Documentacion` |
| **Etiquetas** | `Release;MemoriaTecnica;VIU` |

#### Historia de Usuario / Definición del Requisito
> "Como Autora del Proyecto de Ingeniería de Software, quiero redactar y consolidar la Memoria Técnica definitiva documentando el análisis, diseño en 3FN de los 16 CRUDs, implementación del alcance práctico, procesos autónomos y resultados de la matriz de pruebas."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M01..M08, MNF01..MNF04], [CRUD 01..16 (documentación técnica y diagramas E-R)], [P01..P03, PRU-01..PRU-06].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 01..16 (esquema completo 3FN):**  
   Documentación detallada de las operaciones CREATE, READ, UPDATE, DELETE, diccionario de datos y diagrama Entidad-Relación de las 16 tablas físicas.

2. **Documentación de la arquitectura en 3 capas (React/Next.js, Node.js/TypeScript, SQLite) y de los procesos autónomos P01, P02 y P03.**

3. **Compilación de evidencias de ejecución de las pruebas PRU-01 a PRU-06 y métricas de velocidad Solo-Scrum de los Sprints 0 a 5.**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (Verificación documental y congelación de código con suite PRU-01 a PRU-06 en verde sobre SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: Redacción de la Memoria Técnica definitiva del proyecto EduCare Kids (Arquitectura 3 Capas, 16 CRUDs 3FN y Pruebas)
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Consolidación de la Memoria Técnica definitiva cumpliendo rúbrica académica VIU
    Dado que el desarrollo y las pruebas han concluido en el Sprint 5
    Cuando se compila la memoria técnica definitiva con todos los diagramas, tablas de trazabilidad y evidencias de pruebas
    Entonces el documento cumple al 100% los requisitos formales y técnicos de la asignatura Proyecto de Ingeniería de Software.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Consolidación y redacción de la Memoria Técnica definitiva del proyecto EduCare Kids siguiendo la estructura y directrices académicas de la asignatura Proyecto de Ingeniería de Software (VIU).
> - **Diseño de Arquitectura en 3 Capas:** Documentación rigurosa de la Arquitectura en 3 Capas, Diagramas Entidad-Relación normalizados en 3FN de las 16 entidades físicas, diccionarios de datos y esquemas de flujo de los procesos autónomos P01, P02 y P03.
> - **Seguridad y Persistencia (SQLite 3FN):** Inclusión de matrices de trazabilidad completas que conectan requisitos de usuario, CRUDs, código fuente y suites de pruebas Jest/Vitest.
> - **Reglas de Negocio Clave:** Consolidación de métricas Solo-Scrum: velocidad alcanzada en los Sprints 0 a 5 (94 Story Points totales planificados y ejecutados), gráficas burndown y lecciones aprendidas.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Revisión exhaustiva contra la rúbrica de evaluación para garantizar la máxima calificación académica.


---

### 3.2. [Jira ID: 702] Grabación del vídeo de demostración funcional, empaquetado de Release y preparación de la defensa

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Tarea` |
| **Épica Padre** | **Épica 6:** Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final |
| **Story Points** | **4 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2027-01-28` ➔ Vencimiento: `2027-02-01` |
| **Componentes** | `Documentacion;QA-Validacion` |
| **Etiquetas** | `Release;VideoDemo;EntregaFinal` |

#### Historia de Usuario / Definición del Requisito
> "Como Autora del Proyecto, quiero grabar el vídeo demostrativo mostrando en vivo el circuito operativo programado (M01, M02, M03/M04 con motor P01 y pruebas Jest/Vitest) y empaquetar el repositorio para la entrega oficial."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M01, M02, M03, M04, M07], [CRUD 01..06, CRUD 07, CRUD 10, CRUD 15], [P01, PRU-01..PRU-06].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 01..06, CRUD 07 y CRUD 10:**  
   Demostración en vivo de las operaciones CREATE, READ, UPDATE, DELETE sobre la aplicación web EduCare Kids y persistencia en SQLite.

2. **Grabación de la ejecución del motor autónomo P01 (bloqueo vial de 20 min y restricción de 25 km), cálculo dinámico de tarifas (+30% y +15%) y ejecución de tests en consola.**

3. **Empaquetado final del código fuente, base de datos SQLite con semilla de datos y guía de instalación (README).**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (Ejecución en vivo de PRU-01 a PRU-06 durante la grabación del vídeo sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: Grabación del vídeo de demostración funcional, empaquetado de Release y preparación de la defensa
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Grabación exitosa del vídeo demostrativo y empaquetado de la Release
    Dado el entorno local preconfigurado con datos de prueba representativos
    Cuando se realiza la demostración del flujo completo de EduCare Kids y la ejecución de Jest/Vitest
    Entonces el vídeo queda grabado con calidad óptima mostrando todos los requisitos funcionales y técnicos exigidos.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Grabación de la demostración funcional en vídeo y empaquetado del repositorio de código para la defensa y evaluación.
> - **Diseño de Arquitectura en 3 Capas:** Demostración práctica del circuito operativo completo: alta de familia y menor con alérgeno, cálculo automático de edad, cotización con recargo (+30%), reserva de cita presencial con P01 bloqueando 20 min antes y después, compra y débito de bono con alerta P03, y emisión de factura.
> - **Seguridad y Persistencia (SQLite 3FN):** Ejecución en directo en el vídeo de la suite completa de pruebas en consola (`npm test`) mostrando el paso de todas las pruebas en verde.
> - **Reglas de Negocio Clave:** Preparación de la presentación ejecutiva para la defensa del Trabajo de Fin de Asignatura.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Verificar la calidad de audio, resolución de vídeo y tiempos máximos estipulados por la universidad.


---

### 3.3. [Jira ID: 703] [VALIDACIÓN ENTREGA FINAL] Certificación de Release Candidate, checklist de cumplimiento VIU y entrega oficial

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Tarea` |
| **Épica Padre** | **Épica 6:** Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final |
| **Story Points** | **3 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2027-02-01` ➔ Vencimiento: `2027-02-03` |
| **Componentes** | `QA-Validacion;Documentacion` |
| **Etiquetas** | `Release;Validacion;CierreProyecto;VIU` |

#### Historia de Usuario / Definición del Requisito
> "Como Responsable de QA y Autora del Proyecto, quiero realizar la validación final de entrega comprobando que todos los artefactos (código, base de datos 3FN, tests PRU-01..06, informes de sprints, memoria técnica y vídeo) estén completos y verificados para la entrega oficial el 03/02/2027."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M01..M08, MNF01..MNF04], [CRUD 01..16 (verificación final de entregables)], [P01..P03, PRU-01..PRU-06].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 01..16:**  
   Verificación final de que los scripts SQL y mantenimientos operativos responden correctamente a CREATE, READ, UPDATE, DELETE en una instalación limpia desde cero.

2. **Ejecución final de humo y regresión de la suite de pruebas PRU-01 a PRU-06 verificando cero errores o advertencias.**

3. **Cierre administrativo del tablero Jira Cloud y entrega oficial de la Release en el campus virtual VIU.**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (Certificación definitiva de PRU-01 a PRU-06 con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: [VALIDACIÓN ENTREGA FINAL] Certificación de Release Candidate, checklist de cumplimiento VIU y entrega oficial
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Verificación de checklist final y entrega oficial del proyecto EduCare Kids
    Dado el paquete final de entrega con código fuente, memoria técnica y vídeo demostrativo
    Cuando se ejecuta el checklist de validación final antes del 03/02/2027
    Entonces todos los criterios académicos de la asignatura se cumplen al 100% y el proyecto queda entregado oficialmente.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Hito final de cierre de proyecto: Certificación de Release Candidate, verificación de la lista de verificación (checklist) VIU y entrega oficial en el campus virtual.
> - **Diseño de Arquitectura en 3 Capas:** Comprobación de instalación desde cero (`git clone` simulado o desempaquetado en limpio, instalación de dependencias, migración de 16 tablas 3FN y ejecución de tests sin advertencias).
> - **Seguridad y Persistencia (SQLite 3FN):** Validación de integridad de los archivos entregables: código fuente, scripts SQL, dataset de prueba, memoria técnica en PDF, enlace al vídeo de defensa e informes de avance.
> - **Reglas de Negocio Clave:** Cierre del tablero Jira Cloud con el 100% de historias de usuario y tareas en estado "Done" / "Finalizado".
> - **Gestión de Riesgos y Lecciones Aprendidas:** Confirmar recepción y comprobante de entrega en la plataforma virtual antes de la fecha límite oficial (03/02/2027).


---

## 4. Matriz Resumen de Entregables del Entrega Final (Release)

| ID Jira | Tipo | Resumen del Entregable | Épica | SP | Prioridad | Validación BDD / Matriz | Estado |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **#701** | `Tarea` | Redacción de la Memoria Técnica definitiva del pro... | Épica 6 | **6** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **#702** | `Tarea` | Grabación del vídeo de demostración funcional, emp... | Épica 6 | **4** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **#703** | `Tarea` | [VALIDACIÓN ENTREGA FINAL] Certificación de Releas... | Épica 6 | **3** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **TOTAL** | — | **3 Ítems Planificados** | — | **13 SP** | — | **100% Cobertura de Criterios** | **Sprint Completado** |


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
