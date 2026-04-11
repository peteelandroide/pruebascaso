const {
    getAssetOutputForSource,
    getHtmlOutputForSource
} = require('./path-utils');

const doc = (sourcePath) => getHtmlOutputForSource(sourcePath);
const asset = (sourcePath) => getAssetOutputForSource(sourcePath);

module.exports = {
    "chat-oscar-pedro": {
        id: "chat-oscar-pedro",
        titulo: "Chat WhatsApp: Oscar - Pedro",
        archivo_html: "docs/chat-oscar-pedro.html",
        tipo: "chat"
    },
    "chat-equipo": {
        id: "chat-equipo",
        titulo: "Chat WhatsApp: Equipo de Trabajo",
        archivo_html: "docs/chat-equipo.html",
        tipo: "chat"
    },
    "chat-correcciones": {
        id: "chat-correcciones",
        titulo: "Chat WhatsApp: Correcciones",
        archivo_html: "docs/chat-correcciones.html",
        tipo: "chat"
    },
    "transcripciones": {
        id: "transcripciones",
        titulo: "Transcripciones Consolidadas",
        archivo_html: "docs/transcripciones.html",
        tipo: "transcripcion"
    },
    "grabacion-llamada-oscar-250814": {
        id: "grabacion-llamada-oscar-250814",
        titulo: "Grabación telefónica Oscar 14/08/2025 — prueba reina",
        archivo_html: "docs/grabacion-llamada-oscar-paretomed-250814-184648-original.html",
        tipo: "transcripcion"
    },
    "chat-primo": {
        id: "chat-primo",
        titulo: "Chat: Contacto ParetoMed (Feb 2026)",
        archivo_html: "docs/chat-primo.html",
        tipo: "chat"
    },
    "doc-carta-recomendacion": {
        id: "doc-carta-recomendacion",
        titulo: "Carta de recomendación firmada",
        archivo_html: doc('Paretomed - Educación Médica carta de recomendación.docx'),
        tipo: "documento"
    },
    "doc-borrador-acuerdo-pedro": {
        id: "doc-borrador-acuerdo-pedro",
        titulo: "Borrador acuerdo original de Pedro (06/02/2024)",
        archivo_html: doc('BORRADOR ACUERDO ORIGINAL DE PEDRO FECHADO 6 DE FEBRERO 2024.docx'),
        tipo: "documento"
    },
    "doc-contrato-cp": {
        id: "doc-contrato-cp",
        titulo: "Contrato de Cuentas en Participación",
        archivo_html: doc('Contrato de Cuentas en Participación Paretomed  APORTADO POR OSCAR VIERNES 22 DE AGOSTO 2025 NUNCA FIRMADO.docx'),
        tipo: "documento"
    },
    "doc-camara-comercio-doctor-flight": {
        id: "doc-camara-comercio-doctor-flight",
        titulo: "Certificado Cámara de Comercio Doctor Flight S.A.S.",
        archivo_html: asset('certificado EMPRESA PEDRO.pdf'),
        tipo: "certificacion"
    },
    "doc-sop-reunion": {
        id: "doc-sop-reunion",
        titulo: "SOP Reunión 1:1",
        archivo_html: doc('SOP REUNION 1_1 REDACTADO 5 DE JUNIO 2024 POR PEDRO.docx'),
        tipo: "documento"
    },
    "doc-reels-guiones": {
        id: "doc-reels-guiones",
        titulo: "Reels y guiones 2025",
        archivo_html: doc('Reels y guiones 2025.docx'),
        tipo: "documento"
    },
    "doc-certificado-dnda": {
        id: "doc-certificado-dnda",
        titulo: "Certificado DNDA de obras",
        archivo_html: asset('Certificado Obras Pedro Vergara.pdf'),
        tipo: "certificacion"
    },
    "doc-acuerdo-aportes": {
        id: "doc-acuerdo-aportes",
        titulo: "Acuerdo con aportes de ambos y comentarios digitales",
        archivo_html: doc('acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO APORTADO EN JULIO 2024.docx'),
        tipo: "documento"
    },
    "doc-contrapropuesta-oscar-mar24": {
        id: "doc-contrapropuesta-oscar-mar24",
        titulo: "Contrapropuesta de Oscar para Pedro (22 de marzo 2024)",
        archivo_html: asset('Contrapropuesta para Pedro-1 (enviado por Oscar día 222 de marzo 2024 nunca firmado).pdf'),
        tipo: "documento"
    },
    "doc-acuerdo-original": {
        id: "doc-acuerdo-original",
        titulo: "Acuerdo de socios original",
        archivo_html: doc('acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO.docx'),
        tipo: "documento"
    },
    "doc-acuerdo-sas": {
        id: "doc-acuerdo-sas",
        titulo: "Acuerdo SAS propuesto por padre de Oscar (29 noviembre 2024)",
        archivo_html: doc('ACUERDO DE SOCIOS PARA LA CONSTITUCIÓN DE LA SOCIEDAD COMERCIAL A DENOMINARSE (enviado por padre de Oscar maldonado en 29 de noviembre 2024).docx'),
        tipo: "documento"
    },
    "doc-transaccion-oscar": {
        id: "doc-transaccion-oscar",
        titulo: "Contrato de transacción propuesto por Oscar",
        archivo_html: asset('Contrato de transacción No.10.09.2025.pdf'),
        tipo: "documento"
    },
    "doc-transaccion-pedro": {
        id: "doc-transaccion-pedro",
        titulo: "Contrapropuesta de transacción Doctor Flight",
        archivo_html: doc('Contrato de Transacción Dr. Flight 141025.docx'),
        tipo: "documento"
    },
    "doc-propuesta-oscar-abr25": {
        id: "doc-propuesta-oscar-abr25",
        titulo: "Propuesta de acuerdo 'Nueva Versión' de Oscar (8 abril 2025)",
        archivo_html: doc('PROPUESTA DE ACUERDO DE SOCIOS - NUEVA VERSIÓN (enviado por Oscar día 8 de abril 2025).docx'),
        tipo: "documento"
    },
    "doc-camara-comercio": {
        id: "doc-camara-comercio",
        titulo: "Certificado Cámara de Comercio ParetoMed",
        archivo_html: asset('certificado OSCAR.pdf'),
        tipo: "certificacion"
    },
    "doc-constancia-conciliacion": {
        id: "doc-constancia-conciliacion",
        titulo: "Constancia de no conciliación",
        archivo_html: asset('CONSTANCIA DE NO CONCILIACIÓN N° 00-1844 REGISTRADA.pdf'),
        tipo: "certificacion"
    },
    "doc-kpis-2025": {
        id: "doc-kpis-2025",
        titulo: "KPIs 2025 ParetoMed",
        archivo_html: doc('Copia de KPIS 2025 .xlsx'),
        tipo: "financiero"
    },
    "doc-pagos-bancolombia": {
        id: "doc-pagos-bancolombia",
        titulo: "Capturas Bancolombia pagos a Pedro",
        archivo_html: asset('PAGOS 1.jpeg'),
        tipo: "financiero"
    },
    "doc-comprobantes-excel": {
        id: "doc-comprobantes-excel",
        titulo: "Comprobantes ParetoMed análisis",
        archivo_html: doc('COMPROBANTES_PARETOMED_ANALISIS.xlsx'),
        tipo: "financiero"
    },
    "doc-facturas-avanz": {
        id: "doc-facturas-avanz",
        titulo: "Factura comparativa Avanz",
        archivo_html: asset('FE1 (AVANZ OTRO CLIENTE CON CONCEPTO DISTINTO).pdf'),
        tipo: "financiero"
    },
    "doc-facturas-doctor-flight": {
        id: "doc-facturas-doctor-flight",
        titulo: "Cuentas de cobro y facturas Doctor Flight",
        archivo_html: doc('CUENTAS DE COBRO PEDRO VERGARA.docx'),
        tipo: "financiero"
    }
};
