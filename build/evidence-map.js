/**
 * EVIDENCE MAP — Mapeo P-XX a archivos, metadata y categoría
 * Basado en HANDOFF_INSTANCIA_FINAL.md sección 8 y PLAN_WEB sección 3
 */
const {
  getAssetOutputForSource,
  getHtmlOutputForSource
} = require('./path-utils');

const doc = (sourcePath) => getHtmlOutputForSource(sourcePath);
const asset = (sourcePath) => getAssetOutputForSource(sourcePath);

module.exports = {
  "P-01": { desc: "Grabación telefónica 14/08/2025 — confesión sociedad de hecho", tipo: "Confesión extrajudicial", cat: "audio", html: doc('Grabación de llamada Oscar PARETOMED_250814_184648_original.txt') },
  "P-02": { desc: "Chats WhatsApp Oscar-Pedro (mayo 2024 – agosto 2025)", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-oscar-pedro.html" },
  "P-03": { desc: "Chats grupo equipo ParetoMed (con Adriana)", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-equipo.html" },
  "P-04": { desc: "Propuesta de valor Doctor Flight para ParetoMed, abril 2024", tipo: "Documental", cat: "documento", html: doc('BORRADOR ACUERDO ORIGINAL DE PEDRO FECHADO 6 DE FEBRERO 2024.docx') },
  "P-05": { desc: "Notas de voz WhatsApp Oscar (varias fechas)", tipo: "Confesión extrajudicial", cat: "audio", html: doc('TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt') },
  "P-06": { desc: "Acuerdo de Socios Original (Google Docs, julio 2024)", tipo: "Documental", cat: "documento", html: doc('acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO.docx') },
  "P-07": { desc: "Historial de edición — alteración 'acciones' → 'utilidades'", tipo: "Documento electrónico", cat: "documento", html: doc('acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO APORTADO EN JULIO 2024.docx') },
  "P-08": { desc: "Segundo borrador acuerdo (noviembre 2024)", tipo: "Documental", cat: "documento", html: doc('acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO.docx') },
  "P-09": { desc: "Notas manuscritas de Oscar en acuerdo de socios", tipo: "Confesión extrajudicial", cat: "documento", html: doc('acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO APORTADO EN JULIO 2024.docx') },
  "P-10": { desc: "Contrapropuesta de Pedro (agosto 2025)", tipo: "Documental", cat: "documento" },
  "P-11": { desc: "Carta de Recomendación firmada: 'Subdirector Académico y Comercial'", tipo: "Documental", cat: "documento", html: doc('Paretomed - Educación Médica carta de recomendación.docx') },
  "P-12": { desc: "5 cuentas de cobro de Pedro + Facturas FE3-FE5", tipo: "Documental", cat: "financiero", html: doc('CUENTAS DE COBRO PEDRO VERGARA.docx'), multipleraw: [asset('FE3.pdf'), asset('FE4.pdf'), asset('FE5.pdf')] },
  "P-13": { desc: "Consolidados financieros de Oscar (capturas chat)", tipo: "Documento electrónico", cat: "financiero", html: "docs/chat-oscar-pedro.html" },
  "P-14": { desc: "Contrato Cuentas en Participación (Oscar, 22/08/2025)", tipo: "Documental", cat: "documento", html: doc('Contrato de Cuentas en Participación Paretomed  APORTADO POR OSCAR VIERNES 22 DE AGOSTO 2025 NUNCA FIRMADO.docx') },
  "P-15": { desc: "Oferta de transacción de Oscar: $40M por renunciar a todo", tipo: "Documento electrónico", cat: "documento", raw: asset('Contrato de transacción No.10.09.2025.pdf') },
  "P-16": { desc: "Facturas Doctor Flight variables a ParetoMed", tipo: "Documental", cat: "financiero", html: doc('Contrato de Transacción Dr. Flight 141025.docx') },
  "P-17": { desc: "Tabla de valoración 20% = $240M (Pedro)", tipo: "Documental", cat: "financiero" },
  "P-18": { desc: "Capturas accesos removidos (correo, redes)", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-oscar-pedro.html" },
  "P-19": { desc: "Constancia No Conciliación N° 00-1844, 20/02/2026", tipo: "Certificación", cat: "certificacion" },
  "P-20": { desc: "Certificado Cámara de Comercio ParetoMed (Mat. 865.875)", tipo: "Certificación", cat: "certificacion", raw: asset('certificado OSCAR.pdf') },
  "P-21": { desc: "Certificado Cámara de Comercio Doctor Flight S.A.S.", tipo: "Certificación", cat: "certificacion", raw: asset('certificado EMPRESA PEDRO.pdf') },
  "P-22": { desc: "Certificado DNDA — obra individual", tipo: "Certificación", cat: "certificacion", raw: asset('Certificado de registro.pdf') },
  "P-23": { desc: "Certificado DNDA — 238 obras (Pedro = AUTOR/DIRECTOR/PRODUCTOR)", tipo: "Certificación", cat: "certificacion", raw: asset('Certificado Obras Pedro Vergara.pdf') },
  "P-24": { desc: "Reels y guiones 2025 de Pedro", tipo: "Documental", cat: "documento", html: doc('Reels y guiones 2025.docx') },
  "P-25": { desc: "SOPs creados por Pedro", tipo: "Documental", cat: "documento", html: doc('SOP REUNION 1_1 REDACTADO 5 DE JUNIO 2024 POR PEDRO.docx'), multipleraw: [doc('SOP SEGUIMIENTO PARETOMED REDACTADO POR PEDRO.docx'), doc('Explicación de metodología fechado 14 de mayo 2024.docx')] },
  "P-26": { desc: "Dashboard React / herramientas tecnológicas de Pedro", tipo: "Documental", cat: "documento" },
  "P-27": { desc: "Capturas redes sociales: Instagram, TikTok, YouTube", tipo: "Documento electrónico", cat: "imagen" },
  "P-28": { desc: "Propuesta de valor para tutores", tipo: "Documental", cat: "documento" },
  "P-29": { desc: "Estructuras de precios propuestas por Pedro", tipo: "Documental", cat: "documento" },
  "P-30": { desc: "Solicitudes conciliación extrajudicial", tipo: "Documental", cat: "documento", html: doc('20251111 PEDRO VERGARA - Solicitud de conciliación por antiguos abogados EF LEGAL nunca radicada ni enviada.docx') },
  "P-31": { desc: "Audio reunión 28/07/2025 — negociación precios", tipo: "Confesión extrajudicial", cat: "audio", html: doc('TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt') },
  "P-32": { desc: "Consolidado mayo 2024 (primera liquidación)", tipo: "Documento electrónico", cat: "financiero", html: "docs/chat-oscar-pedro.html" },
  "P-33": { desc: "Capturas Facebook — contenido de Pedro usado post-ruptura", tipo: "Documento electrónico", cat: "imagen" },
  "P-34": { desc: "Tabla cronológica participación Pedro en decisiones estratégicas", tipo: "Documental", cat: "documento" },
  "P-35": { desc: "Valoración EF Legal: 20% = $330M", tipo: "Documental", cat: "financiero" },
  "P-36": { desc: "Capturas SMS Bancolombia — 14 transferencias", tipo: "Documento electrónico", cat: "financiero", multipleraw: [asset('PAGOS 1.jpeg'), asset('PAGOS 2.jpeg'), asset('PAGOS 3.jpeg'), asset('PAGOS 4.jpeg')] },
  "P-37": { desc: "Certificación bancaria cuenta Pedro **4483", tipo: "Certificación", cat: "certificacion" },
  "P-38": { desc: "Solicitud rendición de cuentas por Pedro (chat)", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-oscar-pedro.html" },
  "P-39": { desc: "Chats Adriana — trato como co-decisores", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-equipo.html" },
  "P-40": { desc: "Mensajes discusión/acuerdo precios Oscar y Pedro", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-oscar-pedro.html" },
  "P-41": { desc: "Audios 08/01/2025: 'mera formalidad' y 'alguien que sepa que eso es suyo'", tipo: "Confesión extrajudicial", cat: "audio", html: doc('TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt') },
  "P-42": { desc: "Excel 376 comprobantes estudiantes ($579M)", tipo: "Prueba financiera", cat: "financiero", html: doc('COMPROBANTES_PARETOMED_ANALISIS.xlsx') },
  "P-43": { desc: "KPIs 2025 de ParetoMed (hoja de Oscar)", tipo: "Prueba financiera", cat: "financiero", html: doc('Copia de KPIS 2025 .xlsx') },
  "P-44": { desc: "Testimonio Efraín — pendiente datos", tipo: "Testimonial", cat: "testimonial" },
  "P-45": { desc: "Testimonio Paul — pendiente confirmación", tipo: "Testimonial", cat: "testimonial" },
  "P-46": { desc: "Facturas FE1-FE15 a Avanz (comparativa facturación)", tipo: "Documental", cat: "financiero", multipleraw: [asset('FE1 (AVANZ OTRO CLIENTE CON CONCEPTO DISTINTO).pdf'), asset('FE15 (ULTIMA DE AVANZ).pdf')] },
  "P-47": { desc: "Chat 28/02/2025: Oscar revela 'hoja de cálculo personal'", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-oscar-pedro.html" },
  "P-48": { desc: "Chat 05/08/2025: Oscar se niega a rendir cuentas", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-oscar-pedro.html" },
  "P-49": { desc: "Captura feb 2026: Adriana envía cuenta personal Oscar (no NETMED)", tipo: "Documental", cat: "financiero", html: "docs/chat-primo.html", raw: asset('chat-primo/00000044-Certificado_20260210.pdf') },
  "P-50": { desc: "Audios 13/07/2025: Oscar exige deberes de socio sobre herramienta", tipo: "Confesión extrajudicial", cat: "audio", html: doc('TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt') },
  "P-51": { desc: "Resumen reunión 14/07/2025: Oscar confirma aportes metodológicos", tipo: "Documentación interna", cat: "documento", html: "docs/chat-equipo.html" },
  "P-52": { desc: "Política de privacidad web ParetoMed con NETMED S.A.S.", tipo: "Documental", cat: "documento" }
};
