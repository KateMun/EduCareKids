---
title: "Sprint 5: Facturación Familiar, Seguridad RBAC, Auditoría y Resguardos SQLite (M08, MNF01..MNF04)"
sprint: "Sprint 5"
story_points: 14
start_date: "2027-01-07"
due_date: "2027-01-20"
project: "EduCare Kids"
framework: "Solo-Scrum / 3-Tier Architecture / SQLite 3FN / Jest-Vitest"
---

# Sprint 5: Facturación Familiar, Seguridad RBAC, Auditoría y Resguardos SQLite (M08, MNF01..MNF04)

> **Navegación del Proyecto:**  
> [← Sprint 4](./Sprint_4.md) | [📋 Índice General del Backlog](./README.md) | [Sprint Entrega_Final →](./Sprint_Entrega_Final.md)

---

## 1. Ficha Técnica y Objetivos del Sprint

| Parámetro | Valor |
| :--- | :--- |
| **Identificador del Sprint** | `Sprint 5` |
| **Duración y Fechas** | Del **2027-01-07** al **2027-01-20** |
| **Velocidad Planificada** | **14 Story Points** |
| **Ítems del Backlog** | **3 ítems** (1 Historias de Usuario, 2 Tareas Técnicas / QA) |
| **Metodología** | **Solo-Scrum** (Roles unificados: Product Owner, Scrum Master, Arquitecto Software, Full-Stack Developer y QA Lead) |
| **Entorno Tecnológico** | React / Next.js (Frontend), Node.js / TypeScript (Backend), SQLite en 3FN (Base de Datos), Jest / Vitest (Testing) |

> [!IMPORTANT]
> **Objetivo del Sprint (Sprint Goal):**  
> *Completar el sistema con facturación desglosada y analítica (CRUD 16), control de acceso basado en roles RBAC (Padres vs Administrador - MNF01), sistema inmutable de auditoría (MNF02), resguardo y restauración de SQLite (MNF03), y ejecutar la regresión final de los 16 CRUDs.*


---

## 2. Épicas Involucradas

El trabajo planificado en este sprint tributa directamente a las siguientes épicas estratégicas del Product Backlog:

### Épica 5: EP05: Facturación, Analítica, Seguridad RBAC, Auditoría y Resguardos (M08, MNF01..MNF04)
- **Descripción General de la Épica:** Implementación de facturación y control de acceso basado en roles Padres/Administrador (M08/MNF01 - CRUD 16), logs de auditoría (MNF02), mecanismo de backups SQLite (MNF03) y optimización de usabilidad adaptativa y rendimiento (MNF04).
- **Período Global:** Del `2027-01-07` al `2027-01-20`
- **Prioridad de la Épica:** `High`
- **Componentes:** `M08-Facturacion;MNF-Seguridad`
- **Etiquetas:** `ECK;RBAC;Auditoria;Backups;UI`

### Épica 6: Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final
- **Descripción General de la Épica:** Épica transversal para asegurar la calidad continua del software mediante pruebas unitarias, de integración 3FN, procesos autónomos y UI con Jest/Vitest (PRU-01 a PRU-06), redacción de informes de avance quincenales y preparación de la Memoria Técnica y Defensa Final.
- **Período Global:** Del `2026-11-04` al `2027-02-03`
- **Prioridad de la Épica:** `Highest`
- **Componentes:** `QA-Validacion;Documentacion`
- **Etiquetas:** `ECK;QA;Jest;Vitest;Informes`

---

## 3. Desglose Exhaustivo de Ítems del Sprint

A continuación se detalla cada historia de usuario y tarea técnica asignada a este sprint, incluyendo su trazabilidad completa, desglose exhaustivo de subtareas (operaciones CRUD), plan de pruebas de la matriz y validación en sintaxis BDD (Gherkin):

### 3.1. [Jira ID: 601] Facturación familiar, analítica de ocupación y control de acceso por roles RBAC (M08/MNF01 - CRUD 16)

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Historia` |
| **Épica Padre** | **Épica 5:** EP05: Facturación, Analítica, Seguridad RBAC, Auditoría y Resguardos (M08, MNF01..MNF04) |
| **Story Points** | **6 SP** |
| **Prioridad** | `High` |
| **Cronograma** | Inicio: `2027-01-07` ➔ Vencimiento: `2027-01-13` |
| **Componentes** | `M08-Facturacion;MNF-Seguridad` |
| **Etiquetas** | `Sprint5;M08;MNF01;CRUD16;RBAC` |

#### Historia de Usuario / Definición del Requisito
> "Como Administrador y Padre/Tutor, quiero gestionar los perfiles de acceso RBAC (Padres/Administrador), emitir extractos de facturación familiar y consultar indicadores estadísticos de ocupación e ingresos del centro."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M08, MNF01], [CRUD 16 (facturas_usuarios)], [PRU-06].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 16 (facturas_usuarios):**  
   
     - **CREATE:** emisión de extractos de facturación familiar desglosando tarifa base, recargo por edad y trayecto vial, así como alta de cuentas con rol Padres o Administrador, 
     - **READ:** consulta de facturas emitidas, analítica de ingresos/ocupación y verificación de permisos RBAC, 
     - **UPDATE:** rectificación de facturas y actualización de credenciales/roles, 
     - **DELETE:** anulación lógica de facturas y desactivación de cuentas de usuario.

2. **Middleware de autorización RBAC que protege las rutas de administración (configuración de sede, tarifas, analítica) frente al perfil de padres.**

3. **Panel de reportes con emisión de cuadrantes y estadísticas de ocupación.**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-06 y PRU-02 para CRUD 16 con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: Facturación familiar, analítica de ocupación y control de acceso por roles RBAC (M08/MNF01 - CRUD 16)
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Emisión de factura familiar y restricción de acceso por rol RBAC
    Dado un usuario autenticado con rol Padres en facturas_usuarios
    Cuando consulta sus propios extractos de facturación e intenta acceder al panel de configuración de sede del Administrador
    Entonces el sistema permite la descarga de su factura familiar pero bloquea el acceso administrativo por política RBAC (MNF01).
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Implementación del módulo de facturación familiar y analítica comercial (M08) y control de acceso basado en roles RBAC (MNF01 - CRUD 16).
> - **Diseño de Arquitectura en 3 Capas:** Middleware de seguridad en Node.js/Next.js que inspecciona el token de sesión y valida permisos: Rol `Padres` (acceso a sus propios datos, hijos, reservas y facturas) vs Rol `Administrador` (control total de sede, tarifas, agenda global, logs y analítica).
> - **Seguridad y Persistencia (SQLite 3FN):** Aislamiento multi-tenant lógico: un padre jamás debe poder listar ni visualizar extractos de facturación de otra familia.
> - **Reglas de Negocio Clave:** Las facturas desglosan con total transparencia: tarifa base por hora, recargo por edad del menor, suplemento de desplazamiento kilométrico y aplicación de bonos prepago.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Garantizar numeración correlativa y datos fiscales inmutables una vez que la factura pasa a estado emitida.


---

### 3.2. [Jira ID: 602] Auditoría de eventos (logs), resguardos automáticos SQLite (backups) y refactorización de usabilidad adaptativa (MNF02, MNF03, MNF04)

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Tarea` |
| **Épica Padre** | **Épica 5:** EP05: Facturación, Analítica, Seguridad RBAC, Auditoría y Resguardos (M08, MNF01..MNF04) |
| **Story Points** | **5 SP** |
| **Prioridad** | `High` |
| **Cronograma** | Inicio: `2027-01-13` ➔ Vencimiento: `2027-01-18` |
| **Componentes** | `MNF-Seguridad;Arquitectura` |
| **Etiquetas** | `Sprint5;MNF02;MNF03;MNF04;Refactorizacion` |

#### Historia de Usuario / Definición del Requisito
> "Como Administrador del Sistema, quiero contar con un registro inmutable de eventos críticos (auditoría), copias de seguridad y recuperación de la base de datos SQLite y ajustes finales de diseño web adaptativo y estabilidad."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos MNF02, MNF03, MNF04], [CRUD 16 (facturas_usuarios) y soporte transversal CRUD 01..16], [P03, PRU-05, PRU-06].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 16 (facturas_usuarios) y Auditoría (MNF02):**  
   
     - **CREATE:** registro automático de logs de auditoría en eventos críticos como alertas P03, cambios de tarifas y accesos RBAC, 
     - **READ:** visor de eventos de auditoría para el administrador, 
     - **UPDATE:** marcado de eventos revisados, 
     - **DELETE:** purga controlada según política de retención.

2. **Mecanismo de resguardo y recuperación (MNF03):**  
   script automatizado de exportación/backup e importación segura del archivo SQLite en 3FN.

3. **Refactorización de usabilidad adaptativa (MNF04):**  
   optimización responsive en dispositivos móviles/escritorio y estabilidad general del sistema.

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-05 y PRU-06 con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: Auditoría de eventos (logs), resguardos automáticos SQLite (backups) y refactorización de usabilidad adaptativa (MNF02, MNF03, MNF04)
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Generación de backup SQLite y trazabilidad de auditoría de eventos
    Dado que se produce una alerta de saldo bajo (P03) y el administrador solicita un resguardo del sistema
    Cuando se ejecuta el módulo de auditoría (MNF02) y backup (MNF03)
    Entonces el evento queda registrado con marca temporal exacta y se genera una copia íntegra y recuperable de la base de datos SQLite.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Consolidación de los requisitos no funcionales críticos: Auditoría de eventos (MNF02), Resguardos y Backups de SQLite (MNF03) y Refactorización de Usabilidad Adaptativa (MNF04).
> - **Diseño de Arquitectura en 3 Capas:** Tabla inmutable de auditoría con índices temporales. Utilización de comandos seguros de copia (`VACUUM INTO` o SQLite Backup API) para respaldar la base de datos activa sin bloquear operaciones concurrentes.
> - **Seguridad y Persistencia (SQLite 3FN):** Validación de restauración de backups en instancia limpia para certificar el plan de recuperación ante desastres (Disaster Recovery).
> - **Reglas de Negocio Clave:** Diseño responsive verificado en dispositivos móviles (360px - 768px) y escritorios (1024px+), garantizando que las interfaces de reservas y cuidados sean plenamente usables.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Política de retención de logs y permisos de solo lectura para el visor de auditoría administrativa.


---

### 3.3. [Jira ID: 603] [VALIDACIÓN SPRINT 5] Certificación de regresión final de los 16 CRUDs y redacción del último Informe de Avance Sprint 5

#### Ficha del Ítem
| Campo Jira | Detalle |
| :--- | :--- |
| **Tipo de Trabajo** | `Tarea` |
| **Épica Padre** | **Épica 6:** Plan de Validación Continua por Sprint, Calidad (QA), Informes y Entrega Final |
| **Story Points** | **3 SP** |
| **Prioridad** | `Highest` |
| **Cronograma** | Inicio: `2027-01-18` ➔ Vencimiento: `2027-01-20` |
| **Componentes** | `QA-Validacion;Documentacion` |
| **Etiquetas** | `Sprint5;Validacion;PRU06;InformeAvance` |

#### Historia de Usuario / Definición del Requisito
> "Como Responsable de QA, quiero ejecutar la suite de regresión final comprobando los 16 CRUDs en 3FN, los módulos no funcionales (MNF01 a MNF04) y redactar el último Informe de Avance correspondiente al cierre del desarrollo en el Sprint 5."

#### Matriz de Trazabilidad e Ingeniería
- **Módulos y CRUDs Vinculados:** `[Módulos M01..M08, MNF01..MNF04], [CRUD 01..16 (incluyendo facturas_usuarios)], [PRU-01 a PRU-06].`
- **Arquitectura de Persistencia:** Base de datos relacional SQLite bajo Tercera Forma Normal (3FN), con llaves foráneas forzadas activas (`PRAGMA foreign_keys = ON`).
- **Nivel de Servicio:** Transaccionalidad ACID y prevención de estados huérfanos.

#### Desglose Exhaustivo de Subtareas Técnicas
Las subtareas técnicas requeridas para completar este ítem son las siguientes:

1. **CRUD 16 (facturas_usuarios) y conjunto CRUD 01..16:**  
   CREATE, READ, UPDATE, DELETE verificados de extremo a extremo sin errores de integridad ni regresiones.

2. **Comprobación de usabilidad responsive (MNF04), logs de auditoría (MNF02) y restauración de backup SQLite (MNF03).**

3. **Redacción del último Informe de Avance del Sprint 5 previo a la fase de Release.**

#### Plan de Validación en el Sprint
> [!NOTE]
> **Estrategia de Testing Automatizado:**  
> Ejecución de prueba automatizada correspondiente de la Matriz de Pruebas (PRU-01 a PRU-06 en regresión total con Jest/Vitest sobre instancia aislada de SQLite en 3FN).

#### Validación en Nomenclatura BDD (Gherkin)
La validación del criterio de aceptación sigue estrictamente el estándar BDD (Behavior-Driven Development) para garantizar la verificación sin ambigüedades:

```gherkin
# Lenguaje: Gherkin / BDD (Español)
Característica: [VALIDACIÓN SPRINT 5] Certificación de regresión final de los 16 CRUDs y redacción del último Informe de Avance Sprint 5
  Como usuario del sistema EduCare Kids
  Quiero que la funcionalidad cumpla las reglas de negocio
  Para asegurar la calidad y robustez del software

  Escenario: Cierre técnico del Sprint 5 con los 16 CRUDs y módulos no funcionales verificados
    Dado el sistema completo EduCare Kids con sus 8 módulos funcionales y 4 no funcionales
    Cuando se ejecuta la suite completa de pruebas automatizadas antes del Release
    Entonces el 100% de los tests pasan satisfactoriamente y se emite el último Informe de Avance del Sprint 5.
```

#### Comentarios Técnicos y Consideraciones de Implementación
> [!TIP]
> **Notas de Ingeniería y Arquitectura:**
> - **Análisis Funcional:** Certificación final de regresión de los 16 CRUDs en Tercera Forma Normal (3FN), cerrando formalmente el ciclo de desarrollo de software en el Sprint 5.
> - **Diseño de Arquitectura en 3 Capas:** Ejecución del 100% de la suite de pruebas automatizadas sobre una base de datos SQLite poblada con el dataset completo de prueba.
> - **Seguridad y Persistencia (SQLite 3FN):** Comprobación exhaustiva de los módulos no funcionales MNF01 a MNF04 funcionando en armonía con los 8 módulos funcionales M01 a M08.
> - **Reglas de Negocio Clave:** Emisión del último Informe de Avance (Sprint 5, 14 Story Points), dando paso a la fase de Release Candidate y preparación de la entrega final.
> - **Gestión de Riesgos y Lecciones Aprendidas:** Congelación de código funcional (Feature Freeze) para evitar alteraciones imprevistas antes de la defensa final.


---

## 4. Matriz Resumen de Entregables del Sprint 5

| ID Jira | Tipo | Resumen del Entregable | Épica | SP | Prioridad | Validación BDD / Matriz | Estado |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **#601** | `Historia` | Facturación familiar, analítica de ocupación y con... | Épica 5 | **6** | `High` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **#602** | `Tarea` | Auditoría de eventos (logs), resguardos automático... | Épica 5 | **5** | `High` | Gherkin BDD / PRU | ✅ Listo para Verificación |
| **#603** | `Tarea` | [VALIDACIÓN SPRINT 5] Certificación de regresión f... | Épica 6 | **3** | `Highest` | Gherkin BDD / PRU | ✅ Listo para Verificación |
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
