/**
 * Matriz de Trazabilidad y Catálogo Formal de Casos de Uso (CU-01 a CU-16)
 * Subtarea: SUB-102-04 (Sprint 0 - Jira ID #102 / NABF-8)
 * Proyecto: EduCare Kids — Sistema Integral de Centro Infantil y Pedagógico
 */

export interface UseCaseDefinition {
  id: string; // Ej: 'CU-01'
  title: string;
  crudNumber: number; // 1 a 16
  module: string; // M01 a M08
  moduleName: string;
  jiraKey: string; // NABF-X
  epic: string; // EP01 a EP06
  component: string;
  primaryActor: 'Administrador' | 'Docente / Cuidador' | 'Familia Titular' | 'Motor Autónomo P01/P02/P03' | 'Responsable Financiero';
  tableName: string;
  preconditions: string[];
  mainFlow: string[];
  postconditions: string[];
}

export const USE_CASES_CATALOG: UseCaseDefinition[] = [
  {
    id: 'CU-01',
    title: 'Gestión de Titulares Familiares y Distancia a Sede',
    crudNumber: 1,
    module: 'M01',
    moduleName: 'Filiación y Gestión de Familias',
    jiraKey: 'NABF-10',
    epic: 'EP01',
    component: 'M01-Familias',
    primaryActor: 'Administrador',
    tableName: 'familias',
    preconditions: ['El usuario tiene rol Administrador o Gestor de Admisiones'],
    mainFlow: [
      'El actor ingresa los datos del titular (DNI/NIE, nombre, teléfono, dirección postal)',
      'El sistema calcula y valida la distancia a la sede central (Calle Mayor 12, Valencia)',
      'Se almacena el registro familiar y se genera el identificador único id_familia',
    ],
    postconditions: ['Familia matriculada en estado activo y vinculada a la cobertura territorial'],
  },
  {
    id: 'CU-02',
    title: 'Gestión de Fichas de Menores y Cálculo Dinámico de Edad',
    crudNumber: 2,
    module: 'M01',
    moduleName: 'Filiación y Gestión de Familias',
    jiraKey: 'NABF-11',
    epic: 'EP01',
    component: 'M01-Familias',
    primaryActor: 'Administrador',
    tableName: 'menores',
    preconditions: ['Existe una familia titular registrada previamente'],
    mainFlow: [
      'El actor selecciona la familia titular e introduce datos del menor (nombre, fecha de nacimiento)',
      'El sistema calcula la edad en meses y clasifica al menor en su tramo etario pedagógico',
      'Se persiste la ficha vinculada mediante clave foránea id_familia',
    ],
    postconditions: ['Ficha del menor matriculada con trazabilidad biográfica'],
  },
  {
    id: 'CU-03',
    title: 'Registro y Control de Alérgenos y Pautas Médicas',
    crudNumber: 3,
    module: 'M01',
    moduleName: 'Filiación y Gestión de Familias',
    jiraKey: 'NABF-11',
    epic: 'EP01',
    component: 'M01-Familias',
    primaryActor: 'Docente / Cuidador',
    tableName: 'alergenos_menores',
    preconditions: ['Existe una ficha de menor activa'],
    mainFlow: [
      'El actor registra el tipo de alérgeno, nivel de gravedad (Leve a Anafiláctica) y pauta médica',
      'El sistema valida la integridad referencial y activa advertencias preventivas de catering',
    ],
    postconditions: ['Historial médico y alérgeno indexado en 3FN'],
  },
  {
    id: 'CU-04',
    title: 'Mantenimiento del Catálogo de Modalidades de Servicio',
    crudNumber: 4,
    module: 'M02',
    moduleName: 'Catálogo de Servicios y Motor Tarifario',
    jiraKey: 'NABF-13',
    epic: 'EP02',
    component: 'M02-Servicios',
    primaryActor: 'Administrador',
    tableName: 'servicios',
    preconditions: ['Permisos administrativos de dirección'],
    mainFlow: [
      'El actor configura las 4 modalidades (Centro, Niñera a domicilio, Apoyo escolar, Tutoría asíncrona)',
      'Se definen precios base por hora y si el servicio requiere logística de desplazamiento',
    ],
    postconditions: ['Catálogo oficial de servicios activo y tarificado'],
  },
  {
    id: 'CU-05',
    title: 'Parametrización del Motor Tarifario por Franjas de Edad',
    crudNumber: 5,
    module: 'M02',
    moduleName: 'Catálogo de Servicios y Motor Tarifario',
    jiraKey: 'NABF-13',
    epic: 'EP02',
    component: 'M02-Servicios',
    primaryActor: 'Administrador',
    tableName: 'tarifas_edad',
    preconditions: ['Servicios dados de alta en catálogo base'],
    mainFlow: [
      'El actor define tramos etarios en meses y asigna recargos (+30% lactante 0-2 años, +15% 2-4 años)',
      'El sistema asocia la regla de recargo porcentual al servicio correspondiente',
    ],
    postconditions: ['Tarifación etaria automatizada y vinculada'],
  },
  {
    id: 'CU-06',
    title: 'Catálogo de Asignaturas y Etapas Escolares de Apoyo',
    crudNumber: 6,
    module: 'M02',
    moduleName: 'Catálogo de Servicios y Motor Tarifario',
    jiraKey: 'NABF-14',
    epic: 'EP02',
    component: 'M02-Servicios',
    primaryActor: 'Docente / Cuidador',
    tableName: 'materias_apoyo',
    preconditions: ['Plan curricular vigente'],
    mainFlow: [
      'El actor da de alta materias clasificadas por etapa (Infantil, Primaria, Secundaria)',
      'Se asocian códigos únicos de materia para vincular con tutorías y citas',
    ],
    postconditions: ['Materias disponibles para agendamiento escolar'],
  },
  {
    id: 'CU-07',
    title: 'Reserva y Agendamiento de Citas Presenciales y a Domicilio',
    crudNumber: 7,
    module: 'M03',
    moduleName: 'Agenda Reactiva y Calendario de Citas',
    jiraKey: 'NABF-16',
    epic: 'EP03',
    component: 'M03-Agenda',
    primaryActor: 'Familia Titular',
    tableName: 'citas',
    preconditions: ['Familia y menor matriculados, servicio activo'],
    mainFlow: [
      'El actor selecciona fecha, servicio y franja horaria disponible',
      'Si es servicio a domicilio, el sistema valida que la distancia sea <= 25 km',
      'El sistema bloquea la agenda y calcula el importe estimado',
    ],
    postconditions: ['Cita agendada en estado PENDIENTE o CONFIRMADA'],
  },
  {
    id: 'CU-08',
    title: 'Configuración de Franjas Horarias y Turnos Laborables',
    crudNumber: 8,
    module: 'M03',
    moduleName: 'Agenda Reactiva y Calendario de Citas',
    jiraKey: 'NABF-16',
    epic: 'EP03',
    component: 'M03-Agenda',
    primaryActor: 'Administrador',
    tableName: 'franjas_horarias',
    preconditions: ['Calendario laboral del centro definido'],
    mainFlow: [
      'El actor configura turnos (Mañana, Tarde) y horas de inicio/fin por día de la semana (1-7)',
      'Se activan o desactivan franjas no laborables o festivas',
    ],
    postconditions: ['Malla temporal de atención activa'],
  },
  {
    id: 'CU-09',
    title: 'Mantenimiento de Zonas Viales y Suplementos Kilométricos',
    crudNumber: 9,
    module: 'M04',
    moduleName: 'Logística Vial y Motor Autónomo P01',
    jiraKey: 'NABF-17',
    epic: 'EP04',
    component: 'M04-Logistica',
    primaryActor: 'Administrador',
    tableName: 'zonas_desplazamiento',
    preconditions: ['Radio máximo de sede física configurado (25 km)'],
    mainFlow: [
      'El actor define tramos de distancia (0-5 km, 5-15 km, 15-25 km) y sus suplementos económicos',
      'El sistema impone restricción estricta de no permitir zonas por encima de 25.0 km',
    ],
    postconditions: ['Tabulador de suplementos de transporte validado'],
  },
  {
    id: 'CU-10',
    title: 'Ejecución del Motor Autónomo P01: Bloqueos Viales de 20 min',
    crudNumber: 10,
    module: 'M04',
    moduleName: 'Logística Vial y Motor Autónomo P01',
    jiraKey: 'NABF-17',
    epic: 'EP04',
    component: 'M04-Logistica',
    primaryActor: 'Motor Autónomo P01/P02/P03',
    tableName: 'bloqueos_viales',
    preconditions: ['Cita a domicilio confirmada'],
    mainFlow: [
      'El motor autónomo detecta la inserción de una cita domiciliaria',
      'Calcula e inserta automáticamente un bloqueo vial de 20 min previo y 20 min posterior',
      'Bloquea la disponibilidad de educadores durante dicho margen de tránsito',
    ],
    postconditions: ['Colisiones de agenda impedidas por margen preventivo'],
  },
  {
    id: 'CU-11',
    title: 'Gestión del Catálogo de Bonos Prepago por Horas',
    crudNumber: 11,
    module: 'M05',
    moduleName: 'Monedero Prepago y Procesos P02/P03',
    jiraKey: 'NABF-19',
    epic: 'EP05',
    component: 'M05-Bonos',
    primaryActor: 'Administrador',
    tableName: 'catalogo_bonos',
    preconditions: ['Política comercial aprobada'],
    mainFlow: [
      'El actor registra paquetes de horas (5h, 10h, 20h) con descuento y caducidad de 90 días',
      'El sistema valida que las horas coincidan con los paquetes oficiales',
    ],
    postconditions: ['Paquetes de bonos disponibles en catálogo'],
  },
  {
    id: 'CU-12',
    title: 'Monedero de Bonos Familiares, Débito P02 y Alerta P03 (<= 2h)',
    crudNumber: 12,
    module: 'M05',
    moduleName: 'Monedero Prepago y Procesos P02/P03',
    jiraKey: 'NABF-19',
    epic: 'EP05',
    component: 'M05-Bonos',
    primaryActor: 'Motor Autónomo P01/P02/P03',
    tableName: 'bonos_familias',
    preconditions: ['Familia con bono adquirido activo'],
    mainFlow: [
      'El proceso P02 debita las horas consumidas tras la finalización de una cita',
      'El proceso P03 evalúa el saldo restante: si es <= 2 horas, emite alerta de reposición',
      'Si el saldo llega a 0, transiciona el estado del bono a AGOTADO',
    ],
    postconditions: ['Saldo de monedero actualizado y alerta registrada'],
  },
  {
    id: 'CU-13',
    title: 'Buzón Asíncrono de Consultas Pedagógicas y Feedback en Vídeo',
    crudNumber: 13,
    module: 'M06',
    moduleName: 'Tutoría Asíncrona y Diario de Cuidados',
    jiraKey: 'NABF-20',
    epic: 'EP05',
    component: 'M06-Tutoria',
    primaryActor: 'Familia Titular',
    tableName: 'entregas_tutoria',
    preconditions: ['Menor matriculado y servicio de tutoría contratado'],
    mainFlow: [
      'La familia envía una duda académica y adjunta recursos formativos',
      'El docente revisa la entrega y emite feedback pedagógico y enlace de vídeo explicativo',
    ],
    postconditions: ['Interacción asíncrona resuelta y archivada'],
  },
  {
    id: 'CU-14',
    title: 'Diario Infantil de Cuidados Diarios y Alertas Médicas',
    crudNumber: 14,
    module: 'M06',
    moduleName: 'Tutoría Asíncrona y Diario de Cuidados',
    jiraKey: 'NABF-20',
    epic: 'EP05',
    component: 'M06-Tutoria',
    primaryActor: 'Docente / Cuidador',
    tableName: 'registros_cuidados',
    preconditions: ['Cita en curso o recién finalizada'],
    mainFlow: [
      'El cuidador registra tomas de alimento, siestas, esfínteres y estado de ánimo',
      'Si se produce alguna incidencia alérgica, se activa la bandera alerta_alergica_detectada',
    ],
    postconditions: ['Bitácora diaria guardada y accesible por la familia'],
  },
  {
    id: 'CU-15',
    title: 'Configuración de Sede Central, Radio Operativo (25 km) y Ventana Vial (20 min)',
    crudNumber: 15,
    module: 'M07',
    moduleName: 'Configuración del Sistema y Sede Física',
    jiraKey: 'NABF-7',
    epic: 'EP01',
    component: 'M07-Configuracion',
    primaryActor: 'Administrador',
    tableName: 'configuracion_sede',
    preconditions: ['Permiso exclusivo de Dirección Técnica'],
    mainFlow: [
      'El administrador establece o modifica la dirección física de la sede central',
      'Configura el radio máximo de desplazamiento (acotado entre > 0 y <= 25.0 km)',
      'Configura la ventana temporal vial (mínimo 20 minutos)',
      'Al activar una nueva configuración, las anteriores se preservan con baja lógica (activo = 0)',
    ],
    postconditions: ['Parámetros operativos vigentes y auditables'],
  },
  {
    id: 'CU-16',
    title: 'Emisión de Facturación Familiar Transparente y Desglose Económico',
    crudNumber: 16,
    module: 'M08',
    moduleName: 'Facturación, Ocupación y Seguridad RBAC',
    jiraKey: 'NABF-22',
    epic: 'EP06',
    component: 'M08-Facturacion',
    primaryActor: 'Responsable Financiero',
    tableName: 'facturas_usuarios',
    preconditions: ['Servicios consumidos o bonos adquiridos por la familia'],
    mainFlow: [
      'El sistema calcula importes: base + recargo edad + desplazamiento - descuento bonos + 21% IVA',
      'Genera el número correlativo de factura FAC-YYYY-XXXX',
      'Permite registrar la liquidación o anulación del documento fiscal',
    ],
    postconditions: ['Factura fiscal emitida y registrada con trazabilidad contable'],
  },
];

/**
 * Localiza la especificación de un caso de uso por su identificador (CU-01 .. CU-16)
 */
export function getUseCaseById(id: string): UseCaseDefinition | undefined {
  return USE_CASES_CATALOG.find((cu) => cu.id.toUpperCase() === id.toUpperCase());
}

/**
 * Localiza la especificación de un caso de uso por su número de CRUD (1 .. 16)
 */
export function getUseCaseByCrud(crudNumber: number): UseCaseDefinition | undefined {
  return USE_CASES_CATALOG.find((cu) => cu.crudNumber === crudNumber);
}

/**
 * Obtiene los casos de uso asociados a una clave de incidencia Jira (NABF-X)
 */
export function getUseCasesByJiraKey(jiraKey: string): UseCaseDefinition[] {
  return USE_CASES_CATALOG.filter((cu) => cu.jiraKey.toUpperCase() === jiraKey.toUpperCase());
}

/**
 * Obtiene los casos de uso pertenecientes a un módulo funcional (M01 .. M08)
 */
export function getUseCasesByModule(module: string): UseCaseDefinition[] {
  return USE_CASES_CATALOG.filter((cu) => cu.module.toUpperCase() === module.toUpperCase());
}
