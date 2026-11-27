# 🧸 EduCare Kids — Sistema Integral de Centro Infantil y Pedagógico

> **Proyecto:** Sistema de Gestión Integral, Reserva de Citas, Logística Vial y Pedagogía Infantil  
> **Asignatura:** Proyecto de Ingeniería de Software (VIU - Grado en Ingeniería Informática)  
> **Directora Técnica / Autora:** Kate / Daniel  
> **Metodología:** Solo-Scrum Adaptado  
> **Estado:** 🟩 **Sprint 0 Certificado al 100% (9 / 9 Story Points)**  
> **Cobertura de Pruebas:** 49 tests en verde / 17 suites (0 fallos, tiempo de ejecución ~730 ms)

---

## 🏛️ 1. Arquitectura en 3 Capas

El proyecto está diseñado bajo una **Arquitectura en 3 Capas Estricta** para garantizar el desacoplamiento, la testabilidad y el mantenimiento a largo plazo:

1. **Capa 1: Presentación (Frontend & API)**
   * **Framework:** Next.js 14 (App Router) + React 18 + TailwindCSS.
   * **Ubicación:** `src/app` y `src/components`.
   * **Principio:** Los componentes de interfaz de usuario nunca acceden directamente a la base de datos; consumen casos de uso y servicios de dominio a través de rutas API REST tipadas.

2. **Capa 2: Lógica de Dominio y Casos de Uso (Core)**
   * **Lenguaje:** TypeScript 5.0+ en modo estricto.
   * **Ubicación:** `src/core/domain` (Entidades e Interfaces de Repositorio), `src/core/services` (Reglas de negocio y validación de límites) y `src/core/use-cases` (Casos de Uso CU-01 a CU-16 y matriz de trazabilidad).
   * **Principio:** Lógica pura e independiente de la infraestructura de almacenamiento.

3. **Capa 3: Persistencia y Acceso a Datos (Infraestructura)**
   * **Motor:** SQLite 3 nativo (`node:sqlite` con transaccionalidad ACID y `PRAGMA foreign_keys = ON;`).
   * **Esquema:** Normalización estricta en **Tercera Forma Normal (3FN)** con 17 tablas físicas (16 funcionales de catálogo CRUD + 1 de auditoría inmutable) y 9 índices estratégicos de rendimiento.
   * **Ubicación:** `src/infrastructure/database` y `src/infrastructure/repositories`.

---

## 🗄️ 2. Modelo Relacional 3FN (17 Tablas Físicas)

| N.º | Tabla SQLite | Módulo | CRUD | Descripción Operativa |
| :---: | :--- | :---: | :---: | :--- |
| **1** | `configuracion_sede` | M07 | CRUD 15 | Sede central física, radio máx. ($\le 25\text{ km}$) y margen vial ($\ge 20\text{ min}$). |
| **2** | `familias` | M01 | CRUD 01 | Titulares familiares, contacto, dirección y distancia a sede. |
| **3** | `menores` | M01 | CRUD 02 | Fichas de menores matriculados vinculados a familias titulares (1:N). |
| **4** | `alergenos_menores` | M01 | CRUD 03 | Aislamiento 3FN de alérgenos y pautas médicas de urgencia. |
| **5** | `servicios` | M02 | CRUD 04 | Catálogo oficial de las 4 modalidades asistenciales del centro. |
| **6** | `tarifas_edad` | M02 | CRUD 05 | Motor tarifario dinámico según tramo etario (+30% lactante, +15% infantil). |
| **7** | `materias_apoyo` | M02 | CRUD 06 | Asignaturas y etapas escolares (Infantil, Primaria, Secundaria). |
| **8** | `franjas_horarias` | M03 | CRUD 08 | Turnos de atención operativa y días laborables. |
| **9** | `zonas_desplazamiento`| M04 | CRUD 09 | Tramos kilométricos y cálculo de suplementos viales ($\le 25\text{ km}$). |
| **10**| `citas` | M03 | CRUD 07 | Calendario reactivo de citas presenciales y a domicilio. |
| **11**| `bloqueos_viales` | M04 | CRUD 10 | Motor Autónomo P01: franjas de tránsito de 20 min antes y después. |
| **12**| `catalogo_bonos` | M05 | CRUD 11 | Paquetes comerciales prepago por horas (5h, 10h, 20h) con descuento. |
| **13**| `bonos_familias` | M05 | CRUD 12 | Monedero activo, consumo P02 y alertas de saldo bajo $\le 2\text{h}$ (P03). |
| **14**| `entregas_tutoria` | M06 | CRUD 13 | Buzón pedagógico asíncrono y feedback docente en vídeo. |
| **15**| `registros_cuidados` | M06 | CRUD 14 | Diario infantil: tomas de comida, siestas, esfínteres y ánimo. |
| **16**| `facturas_usuarios` | M08 | CRUD 16 | Facturación familiar con desglose de recargos, bonos e IVA (21%). |
| **17**| `auditoria_eventos` | MNF02 | — | Registro inmutable de seguridad y eventos de acceso. |

---

## 🚀 3. Puesta en Marcha y Scripts Disponibles

### Requisitos Previos
* **Node.js:** v22.0.0 o superior (con soporte para `--experimental-sqlite` y `--experimental-strip-types`).
* **NPM:** v10.0.0 o superior.

### Instalación de Dependencias
```bash
npm install
```

### Configuración e Inicialización de la Base de Datos
```bash
# 1. Regenerar el esquema físico SQLite 3FN limpio
npm run db:setup

# 2. Poblar catálogos maestros y la Sede Central (Valencia)
npm run db:seed
```

### Ejecución de Pruebas Automatizadas (QA Harness)
```bash
# Ejecutar la suite completa de tests unitarios y de integración
npm test

# Modo observador interactivo
npm run test:watch
```

### Servidor de Desarrollo
```bash
npm run dev
# Abrir http://localhost:3000 en el navegador
```

---

## 🧪 4. Certificación de Calidad y Trazabilidad Ágil

* **Resumen de Pruebas:** 49 tests automatizados cubriendo:
  * Inicialización y teardown hermético con SQLite en memoria (`:memory:`).
  * Ciclo de vida completo del CRUD 15 (`configuracion_sede`).
  * Certificación PRU-02 de claves foráneas (`ON DELETE CASCADE` vs. `ON DELETE RESTRICT`).
  * Restricciones `CHECK` de límites territoriales (radio $\le 25\text{ km}$, margen $\ge 0\text{ min}$).
  * Matriz de Trazabilidad bidireccional (CU-01 a CU-16 vs. Épicas Jira `EP01` a `EP06`).
* **Documentación Local:**
  * Informe de Avance Sprint 0: `Docs/Informe_Avance_Sprint_0.md`.
  * Matriz de Trazabilidad de Casos de Uso: `Docs/matriz_trazabilidad_casos_uso.md`.
  * Declaración de Co-Creación e Interacción con IA: `Docs/Sprint_0-DeclaracionIA.md`.
  * Diagrama Entidad-Relación en PlantUML: `Docs/diagrama_er_3fn.puml`.

---

## 📅 5. Hoja de Ruta de Sprints

* [x] **Sprint 0 (9 SP):** Arquitectura Base, Esquema 3FN, Arnés Jest/Vitest y Trazabilidad (`NABF-7`, `NABF-8`, `NABF-9`).
* [ ] **Sprint 1 (14 SP):** Gestión de Titulares Familiares, Fichas de Menores y Alérgenos (`NABF-10`, `NABF-11`, `NABF-12`).
* [ ] **Sprint 2 (14 SP):** Catálogo de Servicios, Tarifación por Edad y Materias Escolares (`NABF-13`, `NABF-14`, `NABF-15`).
* [ ] **Sprint 3 (13 SP):** Agenda Reactiva, Bloqueos Viales y Motor Autónomo P01 (`NABF-16`, `NABF-17`, `NABF-18`).
* [ ] **Sprint 4 (14 SP):** Monedero de Bonos (P02/P03), Tutoría Asíncrona y Diario de Cuidados (`NABF-19`, `NABF-20`, `NABF-21`).
* [ ] **Sprint 5 (13 SP):** Facturación Familiar, Seguridad RBAC y Cierre Operativo (`NABF-22`, `NABF-23`, `NABF-24`).
* [ ] **Entrega Final (Release - 13 SP):** Memoria Técnica Definitiva, Vídeo Demostración y Defensa Oficial (`NABF-25`, `NABF-26`, `NABF-27`).

---

*Licencia académica VIU — Proyecto desarrollado bajo metodología Solo-Scrum.*
