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
  "P-01": { desc: "Grabacion de llamada telefonica Oscar-Pedro, 14/08/2025", tipo: "Confesión extrajudicial", cat: "audio", html: doc('Grabación de llamada Oscar PARETOMED_250814_184648_original.txt') },
  "P-02": { desc: "Chat de WhatsApp Oscar-Pedro (conversación directa)", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-oscar-pedro.html" },
  "P-03": { desc: "Chat de WhatsApp Equipo de Trabajo ParetoMed", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-equipo.html" },
  "P-04": { desc: "Chat de WhatsApp Correcciones y Sugerencias Paretomed", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-correcciones.html" },
  "P-05": { desc: "Transcripciones Consolidadas de Audios WhatsApp", tipo: "Documento electrónico", cat: "audio", html: doc('TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt') },
  "P-06": { desc: "Acuerdo de Socios ORIGINAL (no modificado), inicios 2024", tipo: "Borrador contractual", cat: "documento", html: doc('acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO.docx') },
  "P-07": { desc: "Acuerdo de Socios MODIFICADO (acciones -> utilidades), Google Docs", tipo: "Borrador alterado", cat: "documento", html: doc('acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO APORTADO EN JULIO 2024.docx') },
  "P-08": { desc: "Acuerdo de Socios propuesto por Oscar (version SAS)", tipo: "Propuesta contractual", cat: "documento", html: doc('ACUERDO DE SOCIOS PARA LA CONSTITUCIÓN DE LA SOCIEDAD COMERCIAL A DENOMINARSE (enviado por padre de Oscar maldonado en 29 de noviembre 2024).docx') },
  "P-09": { desc: "Acuerdo de Socios Original con Aportes de Ambos (julio 2024, nunca firmado)", tipo: "Borrador contractual colaborativo", cat: "documento", html: doc('acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO APORTADO EN JULIO 2024.docx') },
  "P-09-bis": { desc: "Capturas de pantalla de comentarios digitales en Google Docs del Acuerdo de Socios (Oscar Maldonado, Pedro Vergara y Asesor Paretomed)", tipo: "Prueba documental con metadata digital", cat: "imagen", multipleraw: [asset('comentarios-google-docs/foto 1.png'), asset('comentarios-google-docs/foto 2.png'), asset('comentarios-google-docs/foto 3.png'), asset('comentarios-google-docs/foto 4.png'), asset('comentarios-google-docs/foto 5.png'), asset('comentarios-google-docs/foto 6.png'), asset('comentarios-google-docs/foto 7.png'), asset('comentarios-google-docs/foto 8.png')] },
  "P-10": { desc: "Borrador de Acuerdo Original de Pedro, 06/02/2024", tipo: "Propuesta contractual", cat: "documento", html: doc('BORRADOR ACUERDO ORIGINAL DE PEDRO FECHADO 6 DE FEBRERO 2024.docx') },
  "P-11": { desc: "Carta de Recomendación firmada por Oscar Maldonado, 27/04/2024", tipo: "Documento firmado por el demandado", cat: "documento", html: doc('Paretomed - Educación Médica carta de recomendación.docx') },
  "P-12": { desc: "Cuentas de Cobro de Pedro Vergara (mayo-septiembre 2024)", tipo: "Documentos financieros", cat: "financiero", html: doc('CUENTAS DE COBRO PEDRO VERGARA.docx'), multipleraw: [asset('FE3.pdf'), asset('FE4.pdf'), asset('FE5.pdf')] },
  "P-13": { desc: "Liquidaciones mensuales detalladas en WhatsApp", tipo: "Comunicaciones electrónicas", cat: "financiero", html: "docs/chat-oscar-pedro.html" },
  "P-14": { desc: "Contrato de Cuentas en Participación aportado por Oscar, 22/08/2025, nunca firmado", tipo: "Propuesta contractual", cat: "documento", html: doc('Contrato de Cuentas en Participación Paretomed  APORTADO POR OSCAR VIERNES 22 DE AGOSTO 2025 NUNCA FIRMADO.docx') },
  "P-15": { desc: "Contrato de Transacción propuesto por Oscar, ~12/09/2025, no firmado", tipo: "Propuesta contractual", cat: "documento", raw: asset('Contrato de transacción No.10.09.2025.pdf') },
  "P-16": { desc: "Contrato de Transacción Dr. Flight (contrapropuesta de Pedro), 14/10/2025", tipo: "Propuesta contractual", cat: "documento", html: doc('Contrato de Transacción Dr. Flight 141025.docx') },
  "P-17": { desc: "Valuación ParetoMed 2026 y propuesta económica de liquidación elaborada por Pedro", tipo: "Informe financiero / propuesta económica", cat: "financiero", html: doc('VALUACION_PARETOMED_2026.md') },
  "P-18": { desc: "Notificación Formal de Cese de Explotación, 29/08/2025", tipo: "Comunicación formal", cat: "documento", html: "docs/chat-oscar-pedro.html" },
  "P-19": { desc: "Constancia de No Conciliación N 00-1844, 20/02/2026", tipo: "Documento público", cat: "certificacion", raw: asset('CONSTANCIA DE NO CONCILIACIÓN N° 00-1844 REGISTRADA.pdf') },
  "P-20": { desc: "Certificado Cámara de Comercio - Establecimiento PARETOMED (Matrícula 865.875), 17/08/2025", tipo: "Documento público", cat: "certificacion", raw: asset('certificado OSCAR.pdf') },
  "P-21": { desc: "Certificado de Existencia y Representación Legal DOCTOR FLIGHT S.A.S. (NIT 901.767.877-2), 17/09/2025", tipo: "Documento público", cat: "certificacion", raw: asset('certificado EMPRESA PEDRO.pdf') },
  "P-22": { desc: "Certificado DNDA - 238 obras audiovisuales (476 registros), 28/10/2025", tipo: "Documento público", cat: "certificacion", raw: asset('Certificado Obras Pedro Vergara.pdf') },
  "P-23": { desc: "Certificado DNDA - Ejemplo obra \"Disfuncion Neuromuscular Pregunta\" (4-34-115), 02/09/2025", tipo: "Documento público", cat: "certificacion", raw: asset('Certificado de registro.pdf') },
  "P-24": { desc: "Certificado de Existencia NETMED S.A.S.", tipo: "Documento público", cat: "certificacion", raw: asset('certificado netmed sas.pdf') },
  "P-25": { desc: "SOP de Reunion 1:1 redactado por Pedro, 05/06/2024", tipo: "Documentación operativa", cat: "documento", html: doc('SOP REUNION 1_1 REDACTADO 5 DE JUNIO 2024 POR PEDRO.docx') },
  "P-26": { desc: "SOP de Seguimiento Paretomed redactado por Pedro", tipo: "Documentación operativa", cat: "documento", html: doc('SOP SEGUIMIENTO PARETOMED REDACTADO POR PEDRO.docx') },
  "P-27": { desc: "Explicación de Metodología (version comparativa Oscar vs. Pedro), 14/05/2024", tipo: "Documento comparativo", cat: "documento", html: doc('Explicación de metodología fechado 14 de mayo 2024.docx') },
  "P-28": { desc: "Reels y Guiones 2025 redactados por Pedro", tipo: "Propiedad intelectual", cat: "documento", html: doc('Reels y guiones 2025.docx') },
  "P-29": { desc: "Reels Julio 2024 redactados por Pedro", tipo: "Propiedad intelectual", cat: "documento", html: doc('Reels Julio 2024.docx') },
  "P-30": { desc: "Reels Septiembre 2024 redactados por Pedro", tipo: "Propiedad intelectual", cat: "documento", html: doc('Reels septiembre 2024.docx') },
  "P-31": { desc: "Documento de Reels - 28 de abril 2024 redactado por Pedro", tipo: "Propiedad intelectual", cat: "documento", html: doc('Copia de Documento de Reels - 28 de abril, 14_12.docx') },
  "P-32": { desc: "Reels Octubre-Noviembre-Diciembre 2024 redactados por Pedro", tipo: "Propiedad intelectual", cat: "documento", html: doc('Copia de Reels Octubre - Noviembre - Diciembre.docx') },
  "P-33": { desc: "Bitácora de transcripción chat con Adriana (asesora de ventas)", tipo: "Documento electrónico", cat: "documento", html: doc('Bitácora transcripción chat con Adriana asesora de ventas paretomed.docx') },
  "P-34": { desc: "Actas de 8 reuniones documentadas (mayo-julio 2025): 16 mayo, 2 junio, 11 junio, 13 junio, 16 junio, 27 junio, 14 julio, 18 julio", tipo: "Documentación interna", cat: "documento", html: doc('REUNION 16 MAYO PARETOMED.docx'), multiplehtml: [doc('REUNION APLICACION paretomed.docx'), doc('11 junio paretomed.docx'), doc('13 junio paretomed.docx'), doc('16 junio paretomed.docx'), doc('27 junio paretomed.docx'), doc('Reunión iniciada a las 2025_07_14 14_30 GMT-05_00 - Notas de Gemini.docx'), doc('REUNIÓN CON LINA 18 JULIO PARETOMED.docx')] },
  "P-35": { desc: "Solicitud de Conciliación EF Legal, 11/11/2025, nunca radicada", tipo: "Estrategia legal previa", cat: "documento", html: doc('20251111 PEDRO VERGARA - Solicitud de conciliación por antiguos abogados EF LEGAL nunca radicada ni enviada.docx') },
  "P-36": { desc: "Transferencias bancarias Bancolombia cuenta 4483 de Pedro Vergara (14 transferencias a cuenta personal, $99.319.834 subtotal)", tipo: "Prueba financiera", cat: "financiero", multipleraw: [asset('PAGOS 1.jpeg'), asset('PAGOS 2.jpeg'), asset('PAGOS 3.jpeg'), asset('PAGOS 4.jpeg')] },
  "P-37": { desc: "Capturas de pantalla SMS Bancolombia (PAGOS 1, 2, 3 y 4)", tipo: "Prueba documental fotográfica", cat: "financiero", multipleraw: [asset('PAGOS 1.jpeg'), asset('PAGOS 2.jpeg'), asset('PAGOS 3.jpeg'), asset('PAGOS 4.jpeg')] },
  "P-38": { desc: "Borrador de Demanda (BORRADOR DEMANDA 2.docx) del apoderado Alfredo A. Toledo Vergara", tipo: "Documento procesal", cat: "documento", html: doc('BORRADOR DEMANDA 2.docx') },
  "P-39": { desc: "Mensajes de WhatsApp referentes a Efrain (fotógrafo) y Paul (comunicador social) trabajando para ParetoMed", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-oscar-pedro.html" },
  "P-40": { desc: "Mensajes de WhatsApp donde se discuten y acuerdan precios del programa entre Oscar y Pedro", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-oscar-pedro.html" },
  "P-41": { desc: "Transcripción de audio Oscar Maldonado, 08/01/2025 (PTT-20250108-WA0003 y PTT-20250108-WA0012) — \"mera formalidad\" y \"alguien que sepa que eso es suyo\"", tipo: "Confesión extrajudicial", cat: "audio", html: doc('TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt') },
  "P-42": { desc: "Excel COMPROBANTES_PARETOMED_ANALISIS.xlsx — 376 comprobantes de pago de estudiantes procesados (feb 2024 - sep 2025), ingresos brutos $579.217.496 COP", tipo: "Prueba financiera / Pericial contable", cat: "financiero", html: doc('COMPROBANTES_PARETOMED_ANALISIS.xlsx') },
  "P-43": { desc: "Copia de KPIS 2025.xlsx — Hoja de cálculo de KPIs de ventas de ParetoMed (ene-dic 2025), archivo del demandado en poder del demandante", tipo: "Prueba financiera", cat: "financiero", html: doc('Copia de KPIS 2025 .xlsx') },
  "P-44": { desc: "Testimonio de Efrain (fotógrafo y editor audiovisual, empleado de Doctor Flight S.A.S.) — pendiente datos completos", tipo: "Prueba testimonial", cat: "testimonial" },
  "P-45": { desc: "Testimonio de Paul (comunicador social, empleado de Doctor Flight S.A.S.) — pendiente confirmación", tipo: "Prueba testimonial", cat: "testimonial" },
  "P-46": { desc: "Facturas electronicas FE1 a FE15 emitidas por Doctor Flight S.A.S. a Avanz Finanzas & Seguros Ltda (NIT 901286973-7) — Demuestran que Pedro facturaba servicios de contenido de manera distinta a la relacion con ParetoMed", tipo: "Prueba documental comparativa", cat: "financiero", multipleraw: [asset('FE1 (AVANZ OTRO CLIENTE CON CONCEPTO DISTINTO).pdf'), asset('FE15 (ULTIMA DE AVANZ).pdf')] },
  "P-47": { desc: "Mensaje WhatsApp Oscar-Pedro, 28/02/2025 — Oscar revela existencia de \"hoja de calculo personal mia\" con contabilidad del negocio y se niega a compartirla", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-oscar-pedro.html" },
  "P-48": { desc: "Mensaje WhatsApp Oscar-Pedro, 05/08/2025 — Oscar se niega a rendir consolidado: \"Joda, no tengo porque hacerlo y me ofende que me lo pidas\"", tipo: "Documento electrónico", cat: "chat", html: "docs/chat-oscar-pedro.html" },
  "P-49": { desc: "Chat feb 2026 con interesado + certificación bancaria personal de Oscar enviada por Paretomed (no de NETMED)", tipo: "Prueba documental", cat: "financiero", html: "docs/chat-primo.html", multipleraw: [asset('chat-primo/00000044-Certificado_20260210.pdf')] },
  "P-50": { desc: "Audios WhatsApp Oscar 13/07/2025 (PTT-20250713-WA0007 a WA0010) — Oscar exige deberes de socio: \"tu eres socio... lo que desarrolles es para ParetoMed\"", tipo: "Confesión extrajudicial", cat: "audio", html: doc('TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt') },
  "P-51": { desc: "Resumen reunión 14/07/2025 — Oscar confirma que simulacros pre/post, mensajes post-simulacro y grupo WhatsApp fueron ideas de Pedro", tipo: "Documentación interna", cat: "documento", html: doc('Reunión iniciada a las 2025_07_14 14_30 GMT-05_00 - Notas de Gemini.docx') },
  "P-52": { desc: "Política de privacidad actual sitio web ParetoMed — aparece NETMED S.A.S. en lugar de Oscar persona natural", tipo: "Prueba documental", cat: "documento", raw: asset('foto politica de privacidad paretomed bajo netmed sas.png') },
  "P-53": { desc: "Contrapropuesta de Oscar para Pedro, 22/03/2024, nunca firmada", tipo: "Propuesta contractual", cat: "documento", raw: asset('Contrapropuesta para Pedro-1 (enviado por Oscar día 222 de marzo 2024 nunca firmado).pdf') },
  "P-54": { desc: "Acuerdo SAS propuesto por padre de Oscar, 29/11/2024", tipo: "Propuesta contractual", cat: "documento", html: doc('ACUERDO DE SOCIOS PARA LA CONSTITUCIÓN DE LA SOCIEDAD COMERCIAL A DENOMINARSE (enviado por padre de Oscar maldonado en 29 de noviembre 2024).docx') },
  "P-55": { desc: "Propuesta \"Nueva Version\" de Oscar, 08/04/2025 — version diluida con control mayoritario y metas de productividad", tipo: "Propuesta contractual", cat: "documento", html: doc('PROPUESTA DE ACUERDO DE SOCIOS - NUEVA VERSIÓN (enviado por Oscar día 8 de abril 2025).docx') },
  "P-56": { desc: "Transcripción corregida reunión 14/08/2025 (día) — Oscar presenta contrato preparado con abogados, intenta reclasificar a Pedro como \"socio de trabajo\", admite sociedad y carga de la prueba", tipo: "Confesión extrajudicial / Documentación interna", cat: "documento", html: doc('TRANSCRIPCION_REUNION_14_AGOSTO_2025_CORREGIDA.md') }
};
