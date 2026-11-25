-- ==============================================================================
-- Migration: 001_initial_schema.sql
-- EduCare Kids — Base de Datos Relacional SQLite 3FN
-- ==============================================================================

PRAGMA foreign_keys = ON;

-- 1. configuracion_sede
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

-- 2. familias
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

-- 3. menores
CREATE TABLE IF NOT EXISTS menores (
    id_menor INTEGER PRIMARY KEY AUTOINCREMENT,
    id_familia INTEGER NOT NULL,
    nombre TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    fecha_nacimiento TEXT NOT NULL,
    observaciones TEXT,
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    actualizado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (id_familia) REFERENCES familias (id_familia) ON DELETE CASCADE
);

-- 4. alergenos_menores
CREATE TABLE IF NOT EXISTS alergenos_menores (
    id_alergeno INTEGER PRIMARY KEY AUTOINCREMENT,
    id_menor INTEGER NOT NULL,
    tipo_alergeno TEXT NOT NULL,
    gravedad TEXT NOT NULL CHECK (gravedad IN ('LEVE', 'MODERADA', 'GRAVE', 'ANAFILACTICA')),
    pauta_medica TEXT NOT NULL,
    medicacion_urgencia TEXT,
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    actualizado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (id_menor) REFERENCES menores (id_menor) ON DELETE CASCADE
);

-- 5. servicios
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

-- 6. tarifas_edad
CREATE TABLE IF NOT EXISTS tarifas_edad (
    id_tarifa INTEGER PRIMARY KEY AUTOINCREMENT,
    id_servicio INTEGER NOT NULL,
    rango_edad_min_meses INTEGER NOT NULL CHECK (rango_edad_min_meses >= 0),
    rango_edad_max_meses INTEGER NOT NULL CHECK (rango_edad_max_meses >= rango_edad_min_meses),
    etiqueta_rango TEXT NOT NULL,
    porcentaje_recargo REAL NOT NULL DEFAULT 0.0 CHECK (porcentaje_recargo >= 0),
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (id_servicio) REFERENCES servicios (id_servicio) ON DELETE CASCADE
);

-- 7. materias_apoyo
CREATE TABLE IF NOT EXISTS materias_apoyo (
    id_materia INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_materia TEXT UNIQUE NOT NULL,
    nombre_materia TEXT NOT NULL,
    etapa_educativa TEXT NOT NULL CHECK (etapa_educativa IN ('INFANTIL', 'PRIMARIA', 'SECUNDARIA', 'GENERAL')),
    descripcion TEXT,
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

-- 8. franjas_horarias
CREATE TABLE IF NOT EXISTS franjas_horarias (
    id_franja INTEGER PRIMARY KEY AUTOINCREMENT,
    dia_semana INTEGER NOT NULL CHECK (dia_semana BETWEEN 1 AND 7),
    hora_inicio TEXT NOT NULL,
    hora_fin TEXT NOT NULL,
    turno TEXT NOT NULL CHECK (turno IN ('MANANA', 'TARDE', 'COMPLETO')),
    es_laborable INTEGER NOT NULL DEFAULT 1 CHECK (es_laborable IN (0, 1)),
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1))
);

-- 9. zonas_desplazamiento
CREATE TABLE IF NOT EXISTS zonas_desplazamiento (
    id_zona INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_zona TEXT NOT NULL,
    distancia_min_km REAL NOT NULL CHECK (distancia_min_km >= 0),
    distancia_max_km REAL NOT NULL CHECK (distancia_max_km <= 25.0 AND distancia_max_km >= distancia_min_km),
    suplemento_desplazamiento REAL NOT NULL DEFAULT 0.0 CHECK (suplemento_desplazamiento >= 0),
    tiempo_estimado_minutos INTEGER NOT NULL DEFAULT 20 CHECK (tiempo_estimado_minutos >= 0),
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1))
);

-- 10. citas
CREATE TABLE IF NOT EXISTS citas (
    id_cita INTEGER PRIMARY KEY AUTOINCREMENT,
    id_familia INTEGER NOT NULL,
    id_menor INTEGER NOT NULL,
    id_servicio INTEGER NOT NULL,
    id_franja INTEGER,
    id_materia INTEGER,
    id_zona INTEGER,
    fecha_cita TEXT NOT NULL,
    hora_inicio TEXT NOT NULL,
    hora_fin TEXT NOT NULL,
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

-- 11. bloqueos_viales
CREATE TABLE IF NOT EXISTS bloqueos_viales (
    id_bloqueo INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cita INTEGER NOT NULL,
    tipo_bloqueo TEXT NOT NULL CHECK (tipo_bloqueo IN ('PREVIO_20MIN', 'POSTERIOR_20MIN', 'INCIDENCIA_VIAL')),
    fecha_bloqueo TEXT NOT NULL,
    hora_inicio TEXT NOT NULL,
    hora_fin TEXT NOT NULL,
    motivo TEXT NOT NULL DEFAULT 'Margen de desplazamiento vial de 20 min (P01)',
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (id_cita) REFERENCES citas (id_cita) ON DELETE CASCADE
);

-- 12. catalogo_bonos
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

-- 13. bonos_familias
CREATE TABLE IF NOT EXISTS bonos_familias (
    id_bono_familia INTEGER PRIMARY KEY AUTOINCREMENT,
    id_familia INTEGER NOT NULL,
    id_catalogo_bono INTEGER NOT NULL,
    horas_iniciales INTEGER NOT NULL CHECK (horas_iniciales > 0),
    horas_restantes REAL NOT NULL CHECK (horas_restantes >= 0),
    fecha_compra TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    fecha_caducidad TEXT NOT NULL,
    estado_bono TEXT NOT NULL DEFAULT 'ACTIVO' CHECK (estado_bono IN ('ACTIVO', 'AGOTADO', 'CADUCADO')),
    alerta_saldo_bajo_emitida INTEGER NOT NULL DEFAULT 0 CHECK (alerta_saldo_bajo_emitida IN (0, 1)),
    creado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    actualizado_en TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (id_familia) REFERENCES familias (id_familia) ON DELETE CASCADE,
    FOREIGN KEY (id_catalogo_bono) REFERENCES catalogo_bonos (id_catalogo_bono) ON DELETE RESTRICT
);

-- 14. entregas_tutoria
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

-- 15. registros_cuidados
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

-- 16. facturas_usuarios
CREATE TABLE IF NOT EXISTS facturas_usuarios (
    id_factura INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_factura TEXT UNIQUE NOT NULL,
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

-- 17. auditoria_eventos
CREATE TABLE IF NOT EXISTS auditoria_eventos (
    id_log INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_evento TEXT NOT NULL,
    id_usuario TEXT,
    rol TEXT,
    ip_origen TEXT,
    detalles TEXT NOT NULL,
    fecha_evento TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_menores_familia ON menores (id_familia);
CREATE INDEX IF NOT EXISTS idx_alergenos_menor ON alergenos_menores (id_menor);
CREATE INDEX IF NOT EXISTS idx_tarifas_servicio ON tarifas_edad (id_servicio);
CREATE INDEX IF NOT EXISTS idx_citas_fecha_estado ON citas (fecha_cita, estado_cita);
CREATE INDEX IF NOT EXISTS idx_citas_familia ON citas (id_familia);
CREATE INDEX IF NOT EXISTS idx_bloqueos_fecha ON bloqueos_viales (fecha_bloqueo, id_cita);
CREATE INDEX IF NOT EXISTS idx_bonos_familia_estado ON bonos_familias (id_familia, estado_bono);
CREATE INDEX IF NOT EXISTS idx_cuidados_cita_menor ON registros_cuidados (id_cita, id_menor);
CREATE INDEX IF NOT EXISTS idx_facturas_familia ON facturas_usuarios (id_familia, estado_pago);
