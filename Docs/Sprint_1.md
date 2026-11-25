---
title: "Sprint 1: Gestión de Familias, Menores y Alérgenos (M01, M07)"
sprint: "Sprint 1"
story_points: 14
start_date: "2026-11-12"
due_date: "2026-11-25"
project: "EduCare Kids"
framework: "Solo-Scrum / 3-Tier Architecture / SQLite 3FN / Jest-Vitest"
---

# Sprint 1: Gestión de Familias, Menores y Alérgenos (M01, M07)

> **Navegación del Proyecto:**  
> [← Sprint 0](./Sprint_0.md) | [📋 Índice General del Backlog](./README.md) | [Sprint 2 →](./Sprint_2.md)

---

## 1. Ficha Técnica y Objetivos del Sprint

| Parámetro | Valor |
| :--- | :--- |
| **Identificador del Sprint** | `Sprint 1` |
| **Duración y Fechas** | Del **2026-11-12** al **2026-11-25** |
| **Velocidad Planificada** | **14 Story Points** |
| **Ítems del Backlog** | **3 ítems** (2 Historias de Usuario, 1 Tareas Técnicas / QA) |
| **Metodología** | **Solo-Scrum** (Roles unificados: Product Owner, Scrum Master, Arquitecto Software, Full-Stack Developer y QA Lead) |
| **Entorno Tecnológico** | React / Next.js (Frontend), Node.js / TypeScript (Backend), SQLite en 3FN (Base de Datos), Jest / Vitest (Testing) |

> [!IMPORTANT]
> **Objetivo del Sprint (Sprint Goal):**  
> *Implementar el núcleo de datos familiares (CRUD 01), la gestión de expedientes de menores con cálculo dinámico de edad (CRUD 02) y la vinculación de alérgenos/pautas médicas (CRUD 03), asegurando la integridad 3FN y la verificación preliminar de distancia a sede.*


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

### 3.1. [Jira ID: 201] Gestión de titulares familiares con dirección postal y validación estática de distancia a sede (M01 - CRUD 01)

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Historia` |
| **Épica Padre** | **Épica 1:** EP01: Arquitectura Base, Base de Datos 3FN y Gestión de Familias (M01, M07) |
| **Story Points** | **5 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2026-11-12` ➔ Vencimiento: `2026-11-17` |
| **Componentes** | `M01-Familias` |
| **Etiquetas** | `Sprint1;M01;CRUD01;P01` |

#### Historia de Usuario / Definición del Requisito
> "Como Padre/Tutor o Administrador, quiero registrar, consultar, actualizar y dar de baja lógica las fichas familiares incluyendo su dirección postal y distancia estática respecto a la sede central para determinar la elegibilidad de servicios presenciales (radio <= 25 km)."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M01, M07], [CRUD 01 (familias), CRUD 15 (configuracion_sede)], [P01, MNF01].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 01 (familias):**  
   
     - **CREATE:** alta de titulares familiares con dirección postal completa, teléfono, email y distancia kilométrica estática respecto a la sede, 
     - **READ:** consulta de listado de familias y detalle de perfil familiar por ID, 
     - **UPDATE:** modificación de datos de contacto, dirección postal y recálculo de distancia a sede, 
     - **DELETE:** baja lógica del núcleo familiar marcando estado inactivo sin borrar historial.

2. **CRUD 15 (configuracion_sede):**  
   
     - **CREATE:** carga de parámetro por defecto si no existe, 
     - **READ:** consulta del radio máximo de 25 km para contrastar con la distancia de la familia, 
     - **UPDATE:** ajuste de umbral de distancia, 
     - **DELETE:** desactivación de regla obsoleta.

3. **Interfaz web adaptativa en React/Next.js con nodo padre de prueba para alta y edición de familias.**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-02 y PRU-03 con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: Gestión de titulares familiares con dirección postal y validación estática de distancia a sede (M01 - CRUD 01)
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Alta de familia con validación de distancia respecto al límite de 25 km
    Dado que la sede central tiene configurado un radio máximo de 25 km en configuracion_sede
    Cuando se registra una familia en la tabla familias con domicilio a 28 km de distancia
    Entonces el registro se persiste en 3FN marcando que supera el radio presencial y habilitando únicamente modalidades online o asíncronas.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Implementación del módulo central de titulares familiares (CRUD 01). Los datos de localización son críticos porque condicionan la elegibilidad de prestación presencial.
> - **Diseño de Arquitectura en 3 Capas:** Separación estricta entre datos de contacto/facturación y estado operativo del núcleo familiar. Implementación de baja lógica (`activo = 0`) para preservar histórico y facturación.
> - **Seguridad y Persistencia (SQLite 3FN):** Protección de datos personales de las familias (RGPD). Validación de formato de email, teléfono español y coordenadas/dirección postal normalizada.
> - **Reglas de Negocio Clave:** Regla de Oro de la Sede: Domicilios con distancia <= 25 km habilitan servicios presenciales (niñera a domicilio y clases presenciales). Domicilios > 25 km restringen la cuenta exclusivamente a servicios online y tutoría asíncrona.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Cálculo inicial estático de kilometraje verificado contra el parámetro activo en `configuracion_sede` (CRUD 15), preparando el terreno para el proceso dinámico P01.


---

### 3.2. [Jira ID: 202] Gestión de fichas de menores con cálculo dinámico de edad y catálogo relacional de alérgenos (M01 - CRUD 02 y 03)

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Historia` |
| **Épica Padre** | **Épica 1:** EP01: Arquitectura Base, Base de Datos 3FN y Gestión de Familias (M01, M07) |
| **Story Points** | **6 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2026-11-17` ➔ Vencimiento: `2026-11-23` |
| **Componentes** | `M01-Familias` |
| **Etiquetas** | `Sprint1;M01;CRUD02;CRUD03` |

#### Historia de Usuario / Definición del Requisito
> "Como Padre/Tutor, quiero gestionar las fichas de mis hijos con su fecha de nacimiento y asignar sus alérgenos o pautas médicas para que el sistema calcule automáticamente su edad exacta y garantice un cuidado infantil seguro."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M01], [CRUD 02 (menores), CRUD 03 (alergenos_menores)], [MNF04].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 02 (menores):**  
   
     - **CREATE:** alta de menor vinculado por FK a id_familia con nombre, fecha de nacimiento obligatoria y notas de cuidado, 
     - **READ:** consulta de menores por familia con cálculo dinámico de edad en años y meses, 
     - **UPDATE:** actualización de notas de cuidado y datos del menor, 
     - **DELETE:** baja lógica del menor respetando integridad referencial.

2. **CRUD 03 (alergenos_menores):**  
   
     - **CREATE:** alta de alergias, intolerancias o pautas médicas y su asignación relacional al menor, 
     - **READ:** listado de alérgenos activos por niño, 
     - **UPDATE:** modificación de severidad o instrucciones médicas, 
     - **DELETE:** desvinculación o baja de alérgeno.

3. **Función pura en TypeScript para cálculo exacto de edad (meses/años) a partir de la fecha de nacimiento.**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-01 y PRU-02 con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: Gestión de fichas de menores con cálculo dinámico de edad y catálogo relacional de alérgenos (M01 - CRUD 02 y 03)
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Registro de menor de 18 meses con alérgeno vinculado y cálculo automático de edad
    Dado que existe una familia activa en la tabla familias
    Cuando se inserta un niño en la tabla menores con fecha de nacimiento de hace 18 meses y se le asocia una intolerancia en alergenos_menores
    Entonces el sistema calcula automáticamente 1.5 años (franja lactante 0-2 años) y persiste la relación en 3FN sin registros huérfanos.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Gestión de expedientes infantiles (CRUD 02) y alérgenos/pautas médicas (CRUD 03). El sistema debe garantizar un entorno de cuidado ultra-seguro y adaptado.
> - **Diseño de Arquitectura en 3 Capas:** Cumplimiento riguroso de la Tercera Forma Normal (3FN): La edad NO se persiste en la base de datos como campo estático, sino que se calcula dinámicamente mediante una función pura a partir de `fecha_nacimiento` y la fecha de referencia.
> - **Seguridad y Persistencia (SQLite 3FN):** Tratamiento especial de datos de salud infantil (alergias alimentarias, intolerancias, protocolos de emergencia). Relación relacional normalizada 1:N entre menor y alérgenos.
> - **Reglas de Negocio Clave:** Segmentación etaria automática: Lactante (0 a 2 años inclusive), Infantil (3 a 5 años inclusive), Escolar / Primaria / ESO (> 5 años). Esta clasificación alimenta directamente el motor de recargos tarifarios de M02.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Manejo cuidadoso de zonas horarias y años bisiestos en el cálculo de meses/años para evitar clasificaciones incorrectas en días límite de cumpleaños.


---

### 3.3. [Jira ID: 203] [VALIDACIÓN SPRINT 1] Ejecución de pruebas unitarias/integración de M01 (PRU-01, PRU-02) e Informe de Avance Sprint 1

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Tarea` |
| **Épica Padre** | **Épica 6:** Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final |
| **Story Points** | **3 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2026-11-23` ➔ Vencimiento: `2026-11-25` |
| **Componentes** | `QA-Validacion;M01-Familias` |
| **Etiquetas** | `Sprint1;Validacion;PRU01;PRU02;InformeAvance` |

#### Historia de Usuario / Definición del Requisito
> "Como Responsable de QA, quiero ejecutar la suite de pruebas unitarias de cálculo de edad e integración 3FN de los CRUD 01 a 03 y redactar el Informe de Avance del Sprint 1 para certificar la calidad del módulo M01."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M01], [CRUD 01 (familias), CRUD 02 (menores), CRUD 03 (alergenos_menores)], [PRU-01, PRU-02].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 01 (familias):**  
   CREATE, READ, UPDATE, DELETE verificados mediante tests de integración automatizados en SQLite.

2. **CRUD 02 (menores) y CRUD 03 (alergenos_menores):**  
   CREATE, READ, UPDATE, DELETE validando restricciones FK (ON DELETE RESTRICT/CASCADE según modelo 3FN) y precisión del cálculo de edad (18 meses y 4 años).

3. **Elaboración del Informe de Avance del Sprint 1 y planificación del Sprint 2.**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-01 y PRU-02 con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: [VALIDACIÓN SPRINT 1] Ejecución de pruebas unitarias/integración de M01 (PRU-01, PRU-02) e Informe de Avance Sprint 1
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Validación completa de persistencia 3FN del módulo M01
    Dado el conjunto de pruebas automatizadas para CRUD 01, CRUD 02 y CRUD 03
    Cuando se ejecuta Jest/Vitest sobre la instancia aislada de SQLite
    Entonces el 100% de los tests de ciclo CRUD e integridad referencial pasan sin errores y se genera el informe del Sprint 1.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Certificación integral del módulo familiar M01 mediante pruebas unitarias (PRU-01) y pruebas de persistencia relacional 3FN (PRU-02).
> - **Diseño de Arquitectura en 3 Capas:** Pruebas de integridad referencial `ON DELETE RESTRICT`: verificar que no es posible eliminar una familia si tiene menores vinculados activos, evitando registros huérfanos.
> - **Seguridad y Persistencia (SQLite 3FN):** Validación de aserciones en Jest/Vitest sobre inserción de niños con alérgenos múltiples y verificación de recálculo de edad exacto a 18 meses (1.5 años) y 4 años.
> - **Reglas de Negocio Clave:** Cumplimiento de la meta de calidad del Sprint 1 (14 Story Points) y consolidación del segundo Informe de Avance para la dirección del proyecto.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Asegurar que los datos de prueba en la suite cubran casos límite (menor con 0 días de nacido, menor exactamente en el día de su 2º cumpleaños).


---

## 4. Matriz Resumen de Entregables del Sprint 1

| ID Jira | Tipo | Resumen del Entregable | Épica | SP | Prioridad | Validación BDD / Matriz | Estado |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **#201** | `Historia` | Gestión de titulares familiares con dirección post... | Épica 1 | **5** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **#202** | `Historia` | Gestión de fichas de menores con cálculo dinámico ... | Épica 1 | **6** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **#203** | `Tarea` | [VALIDACIÓN SPRINT 1] Ejecución de pruebas unitari... | Épica 6 | **3** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
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
