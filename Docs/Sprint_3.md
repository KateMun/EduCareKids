---
title: "Sprint 3: Calendario Reactivo, Reservas y Motor Autónomo de Desplazamiento Vial (M03, M04, P01)"
sprint: "Sprint 3"
story_points: 15
start_date: "2026-12-10"
due_date: "2026-12-23"
project: "EduCare Kids"
framework: "Solo-Scrum / 3-Tier Architecture / SQLite 3FN / Jest-Vitest"
---

# Sprint 3: Calendario Reactivo, Reservas y Motor Autónomo de Desplazamiento Vial (M03, M04, P01)

> **Navegación del Proyecto:**  
> [← Sprint 2](./Sprint_2.md) | [📋 Índice General del Backlog](./README.md) | [Sprint 4 →](./Sprint_4.md)

---

## 1. Ficha Técnica y Objetivos del Sprint

| Parámetro | Valor |
| :--- | :--- |
| **Identificador del Sprint** | `Sprint 3` |
| **Duración y Fechas** | Del **2026-12-10** al **2026-12-23** |
| **Velocidad Planificada** | **15 Story Points** |
| **Ítems del Backlog** | **3 ítems** (2 Historias de Usuario, 1 Tareas Técnicas / QA) |
| **Metodología** | **Solo-Scrum** (Roles unificados: Product Owner, Scrum Master, Arquitecto Software, Full-Stack Developer y QA Lead) |
| **Entorno Tecnológico** | React / Next.js (Frontend), Node.js / TypeScript (Backend), SQLite en 3FN (Base de Datos), Jest / Vitest (Testing) |

> [!IMPORTANT]
> **Objetivo del Sprint (Sprint Goal):**  
> *Construir el calendario interactivo semanal/mensual con control de franjas horarias y prevención de solapamientos (CRUD 07, CRUD 08), definir zonas viales (CRUD 09) e implementar el proceso autónomo P01 (validación de radio <=25 km e inserción automática de 20 min de margen vial previo y posterior en CRUD 10).*


---

## 2. Épicas Involucradas

El trabajo planificado en este sprint tributa directamente a las siguientes épicas estratégicas del Product Backlog:

### Épica 3: EP03: Calendario Reactivo, Reservas y Motor Autónomo de Desplazamiento Vial (M03, M04, P01)
- **Descripción General de la Épica:** Desarrollo del calendario interactivo semanal/mensual, gestión de citas y turnos (M03 - CRUD 07 y 08), zonas de desplazamiento y bloqueos viales (M04 - CRUD 09 y 10) e implementación del proceso autónomo P01 (validación de radio <=25 km y bloqueo automático de 20 min previos y posteriores).
- **Período Global:** Del `2026-12-10` al `2026-12-23`
- **Prioridad de la Épica:** `Highest`
- **Componentes:** `M03-Calendario;M04-Desplazamientos`
- **Etiquetas:** `ECK;Calendario;P01;BloqueoVial`

### Épica 6: Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final
- **Descripción General de la Épica:** Épica transversal para asegurar la calidad continua del software mediante pruebas unitarias, de integración 3FN, procesos autónomos y UI con Jest/Vitest (PRU-01 a PRU-06), redacción de informes de avance quincenales y preparación de la Memoria Técnica y Defensa Final.
- **Período Global:** Del `2026-11-04` al `2027-02-03`
- **Prioridad de la Épica:** `Highest`
- **Componentes:** `QA-Validacion;Documentacion`
- **Etiquetas:** `ECK;QA;Jest;Vitest;Informes`

---

## 3. Desglose Exhaustivo de Ítems del Sprint

A continuación se detalla cada historia de usuario y tarea técnica asignada a este sprint, incluyendo su trazabilidad completa, desglose exhaustivo de subtareas (operaciones CRUD), plan de pruebas de la matriz y validación en sintaxis BDD (Gherkin):

### 3.1. [Jira ID: 401] Calendario interactivo semanal/mensual, reserva de citas y gestión de franjas horarias (M03 - CRUD 07 y 08)

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Historia` |
| **Épica Padre** | **Épica 3:** EP03: Calendario Reactivo, Reservas y Motor Autónomo de Desplazamiento Vial (M03, M04, P01) |
| **Story Points** | **6 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2026-12-10` ➔ Vencimiento: `2026-12-15` |
| **Componentes** | `M03-Calendario` |
| **Etiquetas** | `Sprint3;M03;CRUD07;CRUD08` |

#### Historia de Usuario / Definición del Requisito
> "Como Padre/Tutor o Administrador, quiero gestionar los turnos de apertura y reservar citas en un calendario interactivo semanal y mensual que inhabilite casilleros ocupados para impedir solapamientos en la agenda."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M03], [CRUD 07 (citas), CRUD 08 (franjas_horarias)], [PRU-04, PRU-06, MNF04].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 07 (citas):**  
   
     - **CREATE:** creación de reserva vinculando familia, menor, servicio, fecha, hora inicio/fin e importe total calculado, 
     - **READ:** consulta de agenda semanal/mensual por familia y vista global de administrador, 
     - **UPDATE:** reprogramación de fecha/hora o cambio de estado de la cita, 
     - **DELETE:** anulación/cancelación lógica de reserva liberando disponibilidad.

2. **CRUD 08 (franjas_horarias):**  
   
     - **CREATE:** definición de horarios de apertura, turnos disponibles y días no laborables, 
     - **READ:** consulta de cuadrante disponible, 
     - **UPDATE:** modificación de horarios o bloqueos administrativos, 
     - **DELETE:** eliminación de turno horario.

3. **Interfaz de calendario reactivo que bloquea visualmente los casilleros ocupados y genera enlace externo Meet/Zoom si la modalidad es online.**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-06 con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: Calendario interactivo semanal/mensual, reserva de citas y gestión de franjas horarias (M03 - CRUD 07 y 08)
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Rechazo de solapamiento de citas en el calendario interactivo
    Dado que existe una cita confirmada de 10:00 a 12:00 en la tabla citas dentro de una franja activa de franjas_horarias
    Cuando otro usuario intenta reservar en la misma franja horaria
    Entonces el sistema muestra el casillero inhabilitado en la UI y la capa de datos rechaza la inserción por solapamiento.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Módulo de calendario reactivo y reserva de citas (CRUD 07) con administración de franjas horarias y turnos (CRUD 08). Componente central de interacción de usuario.
> - **Diseño de Arquitectura en 3 Capas:** Algoritmo de detección de colisiones de agenda en backend: `WHERE cita.activa = 1 AND ((nueva_inicio < cita.fin) AND (nueva_fin > cita.inicio))`.
> - **Seguridad y Persistencia (SQLite 3FN):** Bloqueo a nivel de interfaz visual (reactivo en Next.js) y validación transaccional obligatoria en la capa de datos de SQLite para evitar condiciones de carrera.
> - **Reglas de Negocio Clave:** Soporte para citas presenciales en domicilio y sesiones virtuales. Para reservas online, generación automática de enlace externo de videoconferencia (Meet/Zoom).
> - **Gestión de Riesgos y Lecciones Aprendidas:** Manejo riguroso de franjas de apertura: no permitir reservas fuera de turnos operativos, días festivos o franjas no laborables parametrizadas en CRUD 08.


---

### 3.2. [Jira ID: 402] Zonas viales, bloqueos de 20 min y motor autónomo P01 de validación de distancia <=25 km (M04 - CRUD 09, 10 y P01)

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Historia` |
| **Épica Padre** | **Épica 3:** EP03: Calendario Reactivo, Reservas y Motor Autónomo de Desplazamiento Vial (M03, M04, P01) |
| **Story Points** | **6 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2026-12-15` ➔ Vencimiento: `2026-12-21` |
| **Componentes** | `M04-Desplazamientos;M03-Calendario` |
| **Etiquetas** | `Sprint3;M04;CRUD09;CRUD10;P01` |

#### Historia de Usuario / Definición del Requisito
> "Como Sistema Autónomo (P01) y Administrador, quiero gestionar los tramos kilométricos hasta 25 km y reservar automáticamente 20 minutos antes y después de cada cita presencial para absorber el desplazamiento vial e impedir citas presenciales fuera de radio."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M04, M03, M07], [CRUD 09 (zonas_desplazamiento), CRUD 10 (bloqueos_viales), CRUD 07 (citas)], [P01, PRU-03, PRU-04].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 09 (zonas_desplazamiento):**  
   
     - **CREATE:** alta de tramos kilométricos hasta 25 km con recargo económico de trayecto y tiempo vial, 
     - **READ:** consulta de tarifa vial según distancia de la familia, 
     - **UPDATE:** ajuste de importes por tramo kilométrico, 
     - **DELETE:** baja de zona vial.

2. **CRUD 10 (bloqueos_viales):**  
   
     - **CREATE:** inserción automática por el motor P01 de dos franjas técnicas de 20 minutos previas y posteriores vinculadas a cada cita presencial, 
     - **READ:** visualización de bloqueos de traslado en agenda, 
     - **UPDATE:** reajuste automático si se reprograma la cita principal, 
     - **DELETE:** liberación automática de los bloqueos de 20 min si se anula la cita presencial.

3. **Implementación del proceso autónomo P01:**  
   validación de radio <=25 km y transacción atómica en SQLite que inserta la cita (CRUD 07) junto con los dos bloqueos viales de 20 min (CRUD 10).

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-03 y PRU-04 con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: Zonas viales, bloqueos de 20 min y motor autónomo P01 de validación de distancia <=25 km (M04 - CRUD 09, 10 y P01)
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Reserva automática de 20 minutos previos y posteriores en cita presencial a 12 km (P01)
    Dado que una familia está ubicada a 12 km de la sede (<= 25 km)
    Cuando confirma una cita presencial de 16:00 a 18:00
    Entonces el motor P01 inserta la cita en citas y crea automáticamente dos registros en bloqueos_viales (15:40-16:00 y 18:00-18:20) bloqueando el calendario.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Implementación del Proceso Autónomo P01: el cerebro de logística vial de EduCare Kids. Combina validación de radio con inserción automática de colchones de seguridad de 20 minutos.
> - **Diseño de Arquitectura en 3 Capas:** Transacción ACID unificada en SQLite: `BEGIN TRANSACTION` -> validar distancia <= 25 km en sede -> insertar cita (CRUD 07) -> insertar bloqueo previo de 20 min en `bloqueos_viales` (CRUD 10) -> insertar bloqueo posterior de 20 min en `bloqueos_viales` -> `COMMIT`.
> - **Seguridad y Persistencia (SQLite 3FN):** Si la familia está a > 25 km (ej. 28 km), la transacción revierte con rollback inmediato y arroja excepción de violación de radio vial.
> - **Reglas de Negocio Clave:** Ejemplo representativo: Para una reserva presencial de 16:00 a 18:00 a 12 km de distancia, P01 reserva 15:40-16:00 (ida) y 18:00-18:20 (retorno), garantizando que ningún otro servicio colisione con el desplazamiento de la niñera o docente.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Si la cita principal se reprograma o anula, los dos bloqueos viales vinculados deben actualizarse o liberarse en cascada de forma estrictamente síncrona.


---

### 3.3. [Jira ID: 403] [VALIDACIÓN SPRINT 3] Ejecución de pruebas del motor autónomo P01 (PRU-03, PRU-04, PRU-06) e Informe de Avance Sprint 3

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Tarea` |
| **Épica Padre** | **Épica 6:** Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final |
| **Story Points** | **3 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2026-12-21` ➔ Vencimiento: `2026-12-23` |
| **Componentes** | `QA-Validacion;M04-Desplazamientos` |
| **Etiquetas** | `Sprint3;Validacion;PRU03;PRU04;InformeAvance` |

#### Historia de Usuario / Definición del Requisito
> "Como Responsable de QA, quiero certificar mediante pruebas automatizadas la restricción de 25 km (PRU-03), la inserción de bloqueos viales de 20 minutos (PRU-04) y el bloqueo visual de solapamientos (PRU-06), redactando el Informe de Avance del Sprint 3."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M03, M04, M07], [CRUD 07 (citas), CRUD 08 (franjas_horarias), CRUD 09 (zonas_desplazamiento), CRUD 10 (bloqueos_viales)], [P01, PRU-03, PRU-04, PRU-06].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 07 (citas) y CRUD 08 (franjas_horarias):**  
   CREATE, READ, UPDATE, DELETE verificados en tests de integración de agenda.

2. **CRUD 09 (zonas_desplazamiento) y CRUD 10 (bloqueos_viales):**  
   CREATE, READ, UPDATE, DELETE validando el disparo autónomo de P01 para domicilio a 28 km (PRU-03) y domicilio a 12 km (PRU-04).

3. **Redacción del Informe de Avance del Sprint 3 y planificación del Sprint 4.**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-03, PRU-04 y PRU-06 con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: [VALIDACIÓN SPRINT 3] Ejecución de pruebas del motor autónomo P01 (PRU-03, PRU-04, PRU-06) e Informe de Avance Sprint 3
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Certificación automatizada del motor P01 y cierre del Sprint 3
    Dado el escenario de familia a 28 km (PRU-03) y familia a 12 km (PRU-04)
    Cuando se ejecuta la suite de pruebas en Jest/Vitest
    Entonces se verifica que a 28 km se bloquean servicios presenciales y a 12 km se insertan los dos bloqueos de 20 min en bloqueos_viales.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Validación automatizada de los procesos más complejos del sistema: motor autónomo P01, validación de distancias (PRU-03), bloqueos viales (PRU-04) y UI reactiva (PRU-06).
> - **Diseño de Arquitectura en 3 Capas:** Suites de prueba en Jest/Vitest que simulan llamadas concurrentes y casos borde de solapamiento de minutos exactos.
> - **Seguridad y Persistencia (SQLite 3FN):** Aserción de que el caso a 28 km genera rechazo categórico de servicio presencial, mientras que el caso a 12 km crea los registros técnicos exactos en `bloqueos_viales`.
> - **Reglas de Negocio Clave:** Superación del Sprint 3 (15 Story Points), certificando la viabilidad técnica del núcleo operativo de desplazamiento.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Verificar que los bloqueos viales se visualicen de forma diferenciada en la interfaz del administrador (en color técnico ámbar) para evitar confusiones con citas de clientes.


---

## 4. Matriz Resumen de Entregables del Sprint 3

| ID Jira | Tipo | Resumen del Entregable | Épica | SP | Prioridad | Validación BDD / Matriz | Estado |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **#401** | `Historia` | Calendario interactivo semanal/mensual, reserva de... | Épica 3 | **6** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **#402** | `Historia` | Zonas viales, bloqueos de 20 min y motor autónomo ... | Épica 3 | **6** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **#403** | `Tarea` | [VALIDACIÓN SPRINT 3] Ejecución de pruebas del mot... | Épica 6 | **3** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
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
