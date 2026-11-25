-- ==============================================================================
-- EduCare Kids — Sistema Integral de Centro Infantil y Pedagógico
-- Script DDL Maestro: Esquema Relacional en Tercera Forma Normal (3FN)
-- Subtarea: SUB-101-01 (Sprint 0 - Jira ID #101)
-- Motor de Base de Datos: SQLite 3
-- Cumplimiento: Tercera Forma Normal (3FN), Transaccionalidad ACID, PRAGMA foreign_keys = ON
-- ==============================================================================

PRAGMA foreign_keys = ON;

-- ------------------------------------------------------------------------------
-- 1. TABLA: configuracion_sede (CRUD 15 / M07)
-- Parámetros fundacionales de la sede central física, radio operativo y ventana vial
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS configuracion_sede (
    id_sede INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_sede TEXT NOT NULL,
    direccion TEXT NOT NULL,
    codigo_postal TEXT NOT NULL DEFAULT '46001',
    ciudad TEXT NOT NULL DEFAULT 'Valencia',
    radio_max_km REAL NOT NULL DEFAULT 25.0 CHECK (radio_max_km > 0 AND radio_max_km <= 25.0),
    margen_minutos INTEGER NOT NULL DEFAULT 20 CHECK (margen_minutos >= 0),
    normativa_interna TEXT,
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    actualizado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

-- ------------------------------------------------------------------------------
-- 2. TABLA: familias (CRUD 01 / M01)
-- Núcleo familiar titular del servicio, datos de contacto y distancia a sede
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS familias (
    id_familia INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_titular TEXT NOT NULL,
    apellidos_titular TEXT NOT NULL,
    dni_nie TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefono TEXT NOT NULL,
    direccion_postal TEXT NOT NULL,
    codigo_postal TEXT NOT NULL,
    ciudad TEXT NOT NULL DEFAULT 'Valencia',
    distancia_sede_km REAL NOT NULL DEFAULT 0.0 CHECK (distancia_sede_km >= 0),
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    actualizado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

-- ------------------------------------------------------------------------------
-- 3. TABLA: menores (CRUD 02 / M01)
-- Ficha individual del menor matriculado, vinculada a una familia titular (1:N)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS menores (
    id_menor INTEGER PRIMARY KEY AUTOINCREMENT,
    id_familia INTEGER NOT NULL,
    nombre TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    fecha_nacimiento TEXT NOT NULL, -- Formato ISO 8601: YYYY-MM-DD
    observaciones TEXT,
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    actualizado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (id_familia) REFERENCES familias (id_familia) ON DELETE CASCADE
);

-- ------------------------------------------------------------------------------
-- 4. TABLA: alergenos_menores (CRUD 03 / M01)
-- Catálogo relacional de alérgenos y pautas médicas específicas por menor (3FN)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS alergenos_menores (
    id_alergeno INTEGER PRIMARY KEY AUTOINCREMENT,
    id_menor INTEGER NOT NULL,
    tipo_alergeno TEXT NOT NULL, -- Ej: Gluten, Lactosa, Huevo, Frutos Secos, Polen
    gravedad TEXT NOT NULL CHECK (gravedad IN ('LEVE', 'MODERADA', 'GRAVE', 'ANAFILACTICA')),
    pauta_medica TEXT NOT NULL,
    medicacion_urgencia TEXT,
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    actualizado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (id_menor) REFERENCES menores (id_menor) ON DELETE CASCADE
);

-- ------------------------------------------------------------------------------
-- 5. TABLA: servicios (CRUD 04 / M02)
-- Catálogo oficial de las 4 modalidades operativas del centro
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS servicios (
    id_servicio INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_servicio TEXT UNIQUE NOT NULL CHECK (codigo_servicio IN ('CUIDADO_CENTRO', 'NINERA_DOMICILIO', 'CLASES_APOYO', 'TUTORIA_ASINCRONA')),
    nombre_servicio TEXT NOT NULL,
    descripcion TEXT,
    precio_base_hora REAL NOT NULL CHECK (precio_base_hora >= 0),
    requiere_desplazamiento INTEGER NOT NULL DEFAULT 0 CHECK (requiere_desplazamiento IN (0, 1)),
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    actualizado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

-- ------------------------------------------------------------------------------
-- 6. TABLA: tarifas_edad (CRUD 05 / M02)
-- Motor tarifario dinámico según tramo etario (+30% lactante, +15% infantil)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tarifas_edad (
    id_tarifa INTEGER PRIMARY KEY AUTOINCREMENT,
    id_servicio INTEGER NOT NULL,
    rango_edad_min_meses INTEGER NOT NULL CHECK (rango_edad_min_meses >= 0),
    rango_edad_max_meses INTEGER NOT NULL CHECK (rango_edad_max_meses >= rango_edad_min_meses),
    etiqueta_rango TEXT NOT NULL, -- Ej: '0-2 años: Lactante (+30%)'
    porcentaje_recargo REAL NOT NULL DEFAULT 0.0 CHECK (porcentaje_recargo >= 0),
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (id_servicio) REFERENCES servicios (id_servicio) ON DELETE CASCADE
);

-- ------------------------------------------------------------------------------
-- 7. TABLA: materias_apoyo (CRUD 06 / M02)
-- Catálogo de asignaturas y materias de refuerzo escolar por etapa educativa
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS materias_apoyo (
    id_materia INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_materia TEXT UNIQUE NOT NULL,
    nombre_materia TEXT NOT NULL,
    etapa_educativa TEXT NOT NULL CHECK (etapa_educativa IN ('INFANTIL', 'PRIMARIA', 'SECUNDARIA', 'GENERAL')),
    descripcion TEXT,
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

-- ------------------------------------------------------------------------------
-- 8. TABLA: franjas_horarias (CRUD 08 / M03)
-- Turnos de atención, franjas operativas y configuración de días laborables
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS franjas_horarias (
    id_franja INTEGER PRIMARY KEY AUTOINCREMENT,
    dia_semana INTEGER NOT NULL CHECK (dia_semana BETWEEN 1 AND 7), -- 1=Lunes, 7=Domingo
    hora_inicio TEXT NOT NULL, -- Formato HH:MM
    hora_fin TEXT NOT NULL,    -- Formato HH:MM
    turno TEXT NOT NULL CHECK (turno IN ('MANANA', 'TARDE', 'COMPLETO')),
    es_laborable INTEGER NOT NULL DEFAULT 1 CHECK (es_laborable IN (0, 1)),
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1))
);

-- ------------------------------------------------------------------------------
-- 9. TABLA: zonas_desplazamiento (CRUD 09 / M04)
-- Tramos kilométricos de desplazamiento y cálculo de suplementos (máx. 25 km)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS zonas_desplazamiento (
    id_zona INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_zona TEXT NOT NULL,
    distancia_min_km REAL NOT NULL CHECK (distancia_min_km >= 0),
    distancia_max_km REAL NOT NULL CHECK (distancia_max_km <= 25.0 AND distancia_max_km >= distancia_min_km),
    suplemento_desplazamiento REAL NOT NULL DEFAULT 0.0 CHECK (suplemento_desplazamiento >= 0),
    tiempo_estimado_minutos INTEGER NOT NULL DEFAULT 20 CHECK (tiempo_estimado_minutos >= 0),
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1))
);

-- ------------------------------------------------------------------------------
-- 10. TABLA: citas (CRUD 07 / M03)
-- Calendario y reservas de atención presencial o a domicilio con control de agenda
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS citas (
    id_cita INTEGER PRIMARY KEY AUTOINCREMENT,
    id_familia INTEGER NOT NULL,
    id_menor INTEGER NOT NULL,
    id_servicio INTEGER NOT NULL,
    id_franja INTEGER,
    id_materia INTEGER,
    id_zona INTEGER,
    fecha_cita TEXT NOT NULL, -- Formato YYYY-MM-DD
    hora_inicio TEXT NOT NULL, -- Formato HH:MM
    hora_fin TEXT NOT NULL,    -- Formato HH:MM
    estado_cita TEXT NOT NULL DEFAULT 'PENDIENTE' CHECK (estado_cita IN ('PENDIENTE', 'CONFIRMADA', 'EN_CURSO', 'FINALIZADA', 'CANCELADA')),
    es_domicilio INTEGER NOT NULL DEFAULT 0 CHECK (es_domicilio IN (0, 1)),
    direccion_servicio TEXT,
    precio_calculado REAL NOT NULL DEFAULT 0.0 CHECK (precio_calculado >= 0),
    observaciones TEXT,
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    actualizado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (id_familia) REFERENCES familias (id_familia) ON DELETE RESTRICT,
    FOREIGN KEY (id_menor) REFERENCES menores (id_menor) ON DELETE RESTRICT,
    FOREIGN KEY (id_servicio) REFERENCES servicios (id_servicio) ON DELETE RESTRICT,
    FOREIGN KEY (id_franja) REFERENCES franjas_horarias (id_franja) ON DELETE SET NULL,
    FOREIGN KEY (id_materia) REFERENCES materias_apoyo (id_materia) ON DELETE SET NULL,
    FOREIGN KEY (id_zona) REFERENCES zonas_desplazamiento (id_zona) ON DELETE SET NULL
);

-- ------------------------------------------------------------------------------
-- 11. TABLA: bloqueos_viales (CRUD 10 / M04 - Motor Autónomo P01)
-- Franjas de tránsito de 20 min antes y 20 min después para servicios a domicilio
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bloqueos_viales (
    id_bloqueo INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cita INTEGER NOT NULL,
    tipo_bloqueo TEXT NOT NULL CHECK (tipo_bloqueo IN ('PREVIO_20MIN', 'POSTERIOR_20MIN', 'INCIDENCIA_VIAL')),
    fecha_bloqueo TEXT NOT NULL, -- Formato YYYY-MM-DD
    hora_inicio TEXT NOT NULL,   -- Formato HH:MM
    hora_fin TEXT NOT NULL,      -- Formato HH:MM
    motivo TEXT NOT NULL DEFAULT 'Margen de desplazamiento vial de 20 min (P01)',
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (id_cita) REFERENCES citas (id_cita) ON DELETE CASCADE
);

-- ------------------------------------------------------------------------------
-- 12. TABLA: catalogo_bonos (CRUD 11 / M05)
-- Paquetes de bonos prepago por horas (5h, 10h, 20h) con descuento comercial
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS catalogo_bonos (
    id_catalogo_bono INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_bono TEXT NOT NULL,
    horas_totales INTEGER NOT NULL CHECK (horas_totales IN (5, 10, 20)),
    precio_total REAL NOT NULL CHECK (precio_total > 0),
    porcentaje_descuento REAL NOT NULL DEFAULT 0.0 CHECK (porcentaje_descuento >= 0),
    dias_validez INTEGER NOT NULL DEFAULT 90 CHECK (dias_validez > 0),
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

-- ------------------------------------------------------------------------------
-- 13. TABLA: bonos_familias (CRUD 12 / M05 - Procesos P02 y P03)
-- Monedero de saldo prepago activo por familia, consumo y alertas de saldo bajo (<= 2h)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bonos_familias (
    id_bono_familia INTEGER PRIMARY KEY AUTOINCREMENT,
    id_familia INTEGER NOT NULL,
    id_catalogo_bono INTEGER NOT NULL,
    horas_iniciales INTEGER NOT NULL CHECK (horas_iniciales > 0),
    horas_restantes REAL NOT NULL CHECK (horas_restantes >= 0),
    fecha_compra TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    fecha_caducidad TEXT NOT NULL, -- Formato YYYY-MM-DD
    estado_bono TEXT NOT NULL DEFAULT 'ACTIVO' CHECK (estado_bono IN ('ACTIVO', 'AGOTADO', 'CADUCADO')),
    alerta_saldo_bajo_emitida INTEGER NOT NULL DEFAULT 0 CHECK (alerta_saldo_bajo_emitida IN (0, 1)),
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    actualizado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (id_familia) REFERENCES familias (id_familia) ON DELETE CASCADE,
    FOREIGN KEY (id_catalogo_bono) REFERENCES catalogo_bonos (id_catalogo_bono) ON DELETE RESTRICT
);

-- ------------------------------------------------------------------------------
-- 14. TABLA: entregas_tutoria (CRUD 13 / M06)
-- Buzón asíncrono pedagógico: consultas de familias, feedback y vídeos docentes
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS entregas_tutoria (
    id_entrega INTEGER PRIMARY KEY AUTOINCREMENT,
    id_menor INTEGER NOT NULL,
    id_materia INTEGER NOT NULL,
    titulo_actividad TEXT NOT NULL,
    descripcion_duda TEXT NOT NULL,
    url_recurso_adjunto TEXT,
    feedback_docente TEXT,
    url_video_respuesta TEXT,
    estado_entrega TEXT NOT NULL DEFAULT 'PENDIENTE' CHECK (estado_entrega IN ('PENDIENTE', 'REVISADA', 'CONTESTADA')),
    fecha_entrega TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    fecha_respuesta TEXT,
    FOREIGN KEY (id_menor) REFERENCES menores (id_menor) ON DELETE CASCADE,
    FOREIGN KEY (id_materia) REFERENCES materias_apoyo (id_materia) ON DELETE RESTRICT
);

-- ------------------------------------------------------------------------------
-- 15. TABLA: registros_cuidados (CRUD 14 / M06)
-- Diario infantil de cuidados diarios: alimentación, siestas, control y pautas
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS registros_cuidados (
    id_registro_cuidado INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cita INTEGER NOT NULL,
    id_menor INTEGER NOT NULL,
    hora_toma_alimento TEXT,
    descripcion_alimentacion TEXT,
    hora_inicio_siesta TEXT,
    hora_fin_siesta TEXT,
    control_esfinteres TEXT,
    estado_animo TEXT NOT NULL DEFAULT 'ALEGRE' CHECK (estado_animo IN ('ALEGRE', 'TRANQUILO', 'IRRITABLE', 'CANSADO')),
    incidencias TEXT,
    alerta_alergica_detectada INTEGER NOT NULL DEFAULT 0 CHECK (alerta_alergica_detectada IN (0, 1)),
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (id_cita) REFERENCES citas (id_cita) ON DELETE CASCADE,
    FOREIGN KEY (id_menor) REFERENCES menores (id_menor) ON DELETE CASCADE
);

-- ------------------------------------------------------------------------------
-- 16. TABLA: facturas_usuarios (CRUD 16 / M08)
-- Facturación familiar transparente con desglose de importes, recargos e IVA
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS facturas_usuarios (
    id_factura INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_factura TEXT UNIQUE NOT NULL, -- Formato correlativo: FAC-YYYY-XXXX
    id_familia INTEGER NOT NULL,
    id_cita INTEGER,
    id_bono_familia INTEGER,
    importe_base REAL NOT NULL CHECK (importe_base >= 0),
    recargo_edad REAL NOT NULL DEFAULT 0.0 CHECK (recargo_edad >= 0),
    suplemento_desplazamiento REAL NOT NULL DEFAULT 0.0 CHECK (suplemento_desplazamiento >= 0),
    descuento_bono REAL NOT NULL DEFAULT 0.0 CHECK (descuento_bono >= 0),
    iva_porcentaje REAL NOT NULL DEFAULT 21.0 CHECK (iva_porcentaje >= 0),
    total_neto REAL NOT NULL CHECK (total_neto >= 0),
    estado_pago TEXT NOT NULL DEFAULT 'PENDIENTE' CHECK (estado_pago IN ('PENDIENTE', 'PAGADA', 'ANULADA')),
    fecha_emision TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    fecha_pago TEXT,
    FOREIGN KEY (id_familia) REFERENCES familias (id_familia) ON DELETE RESTRICT,
    FOREIGN KEY (id_cita) REFERENCES citas (id_cita) ON DELETE SET NULL,
    FOREIGN KEY (id_bono_familia) REFERENCES bonos_familias (id_bono_familia) ON DELETE SET NULL
);

-- ------------------------------------------------------------------------------
-- 17. TABLA AUXILIAR DE SEGURIDAD: auditoria_eventos (MNF02)
-- Registro inmutable de eventos críticos, accesos y alertas de seguridad
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS auditoria_eventos (
    id_log INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_evento TEXT NOT NULL, -- Ej: 'AUTH_LOGIN', 'ALERTA_SALDO_BONO', 'ACCESO_DENEGADO_RBAC'
    id_usuario TEXT,
    rol TEXT,
    ip_origen TEXT,
    detalles TEXT NOT NULL,
    fecha_evento TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

-- ==============================================================================
-- ÍNDICES ESTRATÉGICOS PARA RENDIMIENTO (Optimización de consultas frecuentes)
-- ==============================================================================

-- Búsqueda de menores por familia
CREATE INDEX IF NOT EXISTS idx_menores_familia ON menores (id_familia);

-- Verificación de alérgenos por menor
CREATE INDEX IF NOT EXISTS idx_alergenos_menor ON alergenos_menores (id_menor);

-- Tarifas dinámicas por servicio
CREATE INDEX IF NOT EXISTS idx_tarifas_servicio ON tarifas_edad (id_servicio);

-- Consulta de citas por fecha y estado (Agenda Reactiva M03)
CREATE INDEX IF NOT EXISTS idx_citas_fecha_estado ON citas (fecha_cita, estado_cita);
CREATE INDEX IF NOT EXISTS idx_citas_familia ON citas (id_familia);

-- Bloqueos viales por fecha y cita (Motor P01)
CREATE INDEX IF NOT EXISTS idx_bloqueos_fecha ON bloqueos_viales (fecha_bloqueo, id_cita);

-- Monedero de bonos por familia y estado (Procesos P02 y P03)
CREATE INDEX IF NOT EXISTS idx_bonos_familia_estado ON bonos_familias (id_familia, estado_bono);

-- Diario de cuidados por cita y menor
CREATE INDEX IF NOT EXISTS idx_cuidados_cita_menor ON registros_cuidados (id_cita, id_menor);

-- Facturación por familia y estado de pago
CREATE INDEX IF NOT EXISTS idx_facturas_familia ON facturas_usuarios (id_familia, estado_pago);

