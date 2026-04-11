# AUDITORÍA DE CORRELACIÓN HECHO-PRUEBA
## Portal de Evidencia ParetoMed — 11 de abril de 2026

**Auditor:** Claude Opus 4.6  
**Alcance:** Verificación exhaustiva de que cada referencia [P-XX] en los 67 hechos apunte al documento correcto en el visor.  
**Resultado:** ❌ CRÍTICO — Se detectó una desincronización sistémica entre el índice canónico del documento fuente y el mapa técnico de evidencia.

---

## DIAGNÓSTICO RAÍZ

### El problema fundamental: DOS sistemas de numeración

Existen **dos fuentes de verdad** que usan numeración P-XX diferente:

1. **`HECHOS_DEMANDA_PARETOMED_2026.md`** (líneas 12-70): El índice canónico legal. Es la fuente de verdad para la demanda. El parser `parse-hechos.js` extrae de aquí las descripciones hacia `pruebas_catalogo` en `data.js`.

2. **`evidence-map.js`**: El mapa técnico que asigna archivos a cada P-XX. Fue construido independientemente y tiene **descripciones y numeración diferentes** a partir de P-04.

**Consecuencia:** `data.js` tiene `pruebas_catalogo` con las descripciones CORRECTAS (del fuente) pero `pruebas_urls` con los archivos INCORRECTOS (del evidence-map). Cuando un hecho referencia `[P-24]` esperando el "Certificado NETMED", el visor abre "Reels y Guiones 2025".

---

## SECCIÓN 1: TABLA DE DESINCRONIZACIÓN P-XX (Fuente vs. Evidence-Map)

### ✅ Coincidencias (no requieren acción)

| P-XX | Descripción (ambas fuentes coinciden) | Archivo OK |
|------|---------------------------------------|------------|
| P-01 | Grabación telefónica 14/08/2025 | `docs/grabacion-llamada-oscar-paretomed...html` |
| P-02 | Chat WhatsApp Oscar-Pedro | `docs/chat-oscar-pedro.html` |
| P-03 | Chat equipo ParetoMed | `docs/chat-equipo.html` |
| P-05 | Transcripciones consolidadas audios | `docs/transcripciones.html` |
| P-11 | Carta de Recomendación | `docs/paretomed-educacion-medica-carta-de-recomendacion.html` |
| P-12 | Cuentas de Cobro Pedro | `docs/cuentas-de-cobro-pedro-vergara.html` + FE3-5 |
| P-14 | Contrato Cuentas en Participación | `docs/contrato-de-cuentas-en-participacion...html` |
| P-15 | Contrato de Transacción Oscar | `assets/contrato-de-transaccion-no-10-09-2025.pdf` |
| P-20 | Certificado Cámara Comercio ParetoMed | `assets/certificado-oscar.pdf` |
| P-21 | Certificado Doctor Flight S.A.S. | `assets/certificado-empresa-pedro.pdf` |
| P-40 | Mensajes discusión precios | `docs/chat-oscar-pedro.html` |
| P-41 | Audio 08/01/2025 "mera formalidad" | `docs/transcripciones.html` |
| P-42 | Excel comprobantes estudiantes | `docs/comprobantes-paretomed-analisis.html` |
| P-43 | KPIs 2025 | `docs/copia-de-kpis-2025.html` |
| P-44 | Testimonio Efraín (pendiente) | null (correcto) |
| P-45 | Testimonio Paul (pendiente) | null (correcto) |
| P-46 | Facturas FE1-FE15 Avanz | `assets/fe1...pdf`, `assets/fe15...pdf` |
| P-47 | Chat "hoja de cálculo personal" | `docs/chat-oscar-pedro.html` |
| P-48 | Chat Oscar se niega a rendir cuentas | `docs/chat-oscar-pedro.html` |
| P-50 | Audios 13/07/2025 deberes socio | `docs/transcripciones.html` |
| P-53 | Contrapropuesta Oscar 22/03/2024 | `assets/contrapropuesta-para-pedro-1...pdf` |
| P-55 | Propuesta "Nueva Versión" 08/04/2025 | `docs/propuesta-de-acuerdo-de-socios-nueva-version...html` |

### ❌ DESINCRONIZACIONES CRÍTICAS

| P-XX | Fuente (CORRECTO) | Evidence-map (INCORRECTO) | Archivo actual en visor | Hechos afectados |
|------|--------------------|---------------------------|------------------------|------------------|
| **P-04** | Chat WhatsApp Correcciones y Sugerencias | "Propuesta original de Pedro (30% vesting)" | `docs/borrador-acuerdo-original-de-pedro...html` | 7, 17, 18-canales |
| **P-06** | Acuerdo Socios ORIGINAL (no modificado) | Mismo nombre PERO apunta al archivo CON aportes | `docs/acuerdo-socios-original-con-aportes-de-ambos-nunca-firmado.html` | 31, 32 |
| **P-07** | Acuerdo MODIFICADO (acciones→utilidades) | "Historial de edición" | `docs/acuerdo-socios-original-con-aportes-de-ambos-nunca-firmado-aportado-en-julio-2024.html` | 31, 32 |
| **P-08** | Acuerdo Socios Oscar (versión SAS) | "Acuerdo SAS padre de Oscar (nov 2024)" — mismo archivo que P-54 | `docs/acuerdo-de-socios-para-la-constitucion...html` | 11, 62 |
| **P-10** | Borrador Acuerdo Pedro 06/02/2024 | "Contrapropuesta de Pedro (agosto 2025)" — null | null (sin archivo) | 6 |
| **P-13** | Liquidaciones mensuales en WhatsApp | "Consolidados financieros (capturas chat)" | `docs/chat-oscar-pedro.html` | 18, 19 |
| **P-16** | Contrato Transacción Dr. Flight 14/10/2025 | "Facturas Doctor Flight variables" — desc incorrecta, archivo correcto | `docs/contrato-de-transaccion-dr-flight-141025.html` | 20, 37, 38, 45 |
| **P-17** | Contrato de Liquidación Pedro agosto 2025 | "Tabla de valoración 20% = $240M" | null (sin archivo) | 38, 43, 44 |
| **P-18** | Notificación Formal Cese Explotación 29/08/2025 | "Capturas accesos removidos (correo, redes)" | `docs/chat-oscar-pedro.html` | 35, 45, 50 |
| **P-22** | Certificado DNDA 238 obras (476 registros) | "Certificado DNDA — obra individual" — **INVERTIDO con P-23** | `assets/certificado-de-registro.pdf` (obra individual) | 20-dnda |
| **P-23** | Certificado DNDA ejemplo obra individual | "Certificado DNDA — 238 obras" — **INVERTIDO con P-22** | `assets/certificado-obras-pedro-vergara.pdf` (238 obras) | 20-dnda |
| **P-24** | **Certificado Existencia NETMED S.A.S.** | "Reels y guiones 2025 de Pedro" | `docs/reels-y-guiones-2025.html` | **39, 63** |
| **P-25** | SOP Reunión 1:1 (solo) | Agrupa P-25+P-26+P-27 del fuente en una sola entrada | `docs/sop-reunion-1-1...html` + multipleraw con SOP seguimiento y metodología | 14 |
| **P-26** | SOP Seguimiento ParetoMed | "Dashboard React / herramientas tecnológicas" — null | null | 14 |
| **P-27** | Explicación de Metodología 14/05/2024 | "Capturas redes sociales: Instagram, TikTok, YouTube" — null | null | 3, 15 |
| **P-28** | Reels y Guiones 2025 | "Propuesta de valor para tutores" — null | null | 16 |
| **P-29** | Reels Julio 2024 | "Estructuras de precios propuestas por Pedro" — null | null | 16 |
| **P-30** | Reels Septiembre 2024 | "Solicitudes conciliación extrajudicial" — abre doc EF Legal | `docs/20251111-pedro-vergara-solicitud...html` | 16 |
| **P-31** | Documento Reels 28 abril 2024 | "Audio reunión 28/07/2025 — negociación precios" — abre transcripciones | `docs/transcripciones.html` | 16 |
| **P-32** | Reels Oct-Nov-Dic 2024 | "Consolidado mayo 2024 (primera liquidación)" — abre chat | `docs/chat-oscar-pedro.html` | 16 |
| **P-33** | Bitácora transcripción chat Adriana | "Capturas Facebook — contenido post-ruptura" — null | null | 26 |
| **P-34** | Actas 7 reuniones mayo-julio 2025 | "Tabla cronológica participación Pedro" — null | null | 26, 27, 60 |
| **P-35** | Solicitud Conciliación EF Legal | "Valoración EF Legal: 20% = $330M" — null | null | 44 |
| **P-36** | Transferencias bancarias (14 transf.) | "Capturas SMS Bancolombia — 14 transf." — PAGOS jpgs | `assets/pagos-1..4.jpeg` | 19, 20, 45, 46, 54 |
| **P-37** | Capturas SMS Bancolombia (PAGOS 1-4) | "Certificación bancaria cuenta Pedro **4483" — null | null | 45, 46 |
| **P-38** | Borrador Demanda 2 (Apoderado Toledo) | "Solicitud rendición de cuentas (chat)" — abre chat | `docs/chat-oscar-pedro.html` | — |
| **P-39** | Mensajes WhatsApp Efraín y Paul | "Chats Adriana — trato co-decisores" — abre chat equipo | `docs/chat-equipo.html` | 17, 52 |
| **P-49** | Captura Adriana envía cuenta Oscar | "Captura feb 2026 (misma desc)" — abre chat-primo | `docs/chat-primo.html` | 63 |
| **P-51** | Resumen reunión 14/07/2025 | Misma desc — abre chat-equipo | `docs/chat-equipo.html` | 60 |
| **P-54** | Acuerdo SAS padre Oscar 29/11/2024 | Misma desc — **mismo archivo que P-08** | `docs/acuerdo-de-socios-para-la-constitucion...html` | 31 |

---

## SECCIÓN 2: PRUEBAS CON ARCHIVO DISPONIBLE PERO NO VINCULADO

Estos archivos existen en `source/` o `dist/` pero no están mapeados en `evidence-map.js`:

| P-XX (fuente) | Descripción | Archivo disponible | Ruta |
|---------------|-------------|-------------------|------|
| **P-04** | Chat Correcciones y Sugerencias | ✅ Existe | `source/Chat de WhatsApp con Correcciones y sugerencias PARETOMED.txt` → `dist/docs/chat-correcciones.html` |
| **P-10** | Borrador Pedro 06/02/2024 | ✅ Existe (mapeado como P-04 en evidence-map) | `source/BORRADOR ACUERDO ORIGINAL DE PEDRO FECHADO 6 DE FEBRERO 2024.docx` → `dist/docs/borrador-acuerdo-original-de-pedro...html` |
| **P-19** | Constancia No Conciliación | ✅ Existe en assets | `dist/assets/constancia-de-no-conciliacion-n-00-1844-registrada.pdf` |
| **P-26** | SOP Seguimiento | ✅ Existe (mapeado como multipleraw de P-25 en evidence-map) | `dist/docs/sop-seguimiento-paretomed-redactado-por-pedro.html` |
| **P-27** | Explicación Metodología | ✅ Existe (mapeado como multipleraw de P-25 en evidence-map) | `dist/docs/explicacion-de-metodologia-fechado-14-de-mayo-2024.html` |
| **P-28** | Reels y Guiones 2025 | ✅ Existe (mapeado como P-24 en evidence-map) | `dist/docs/reels-y-guiones-2025.html` |
| **P-29** | Reels Julio 2024 | ✅ Existe | `dist/docs/reels-julio-2024.html` |
| **P-30** | Reels Septiembre 2024 | ✅ Existe | `dist/docs/reels-septiembre-2024.html` |
| **P-31** | Reels 28 abril 2024 | ✅ Existe | `dist/docs/copia-de-documento-de-reels-28-de-abril-14-12.html` |
| **P-32** | Reels Oct-Nov-Dic 2024 | ✅ Existe | `dist/docs/copia-de-reels-octubre-noviembre-diciembre.html` |
| **P-33** | Bitácora Adriana | ✅ Existe | `dist/docs/bitacora-transcripcion-chat-con-adriana-asesora-de-ventas-paretomed.html` |
| **P-37** | Capturas SMS PAGOS 1-4 | ✅ Existen (mapeados en P-36 de evidence-map) | `assets/pagos-1..4.jpeg` |
| **P-38** | Borrador Demanda 2 | ✅ Existe | `dist/docs/borrador-demanda-2.html` |

---

## SECCIÓN 3: PRUEBAS SIN ARCHIVO DIGITAL (REALMENTE FALTANTES)

| P-XX | Descripción | Estado | Acción requerida |
|------|-------------|--------|-----------------|
| P-17 | Contrato de Liquidación / Tabla Valoración | ❌ Sin archivo | Digitalizar desde `source/VALUACION_PARETOMED_2026.md` o solicitar documento físico |
| P-24 | Certificado Existencia NETMED S.A.S. | ❌ Sin archivo | Obtener certificado de Cámara de Comercio de NETMED (NIT 902.004.012-9) |
| P-27 (redes) | Capturas Instagram/TikTok/YouTube — evidence-map | ❌ Sin archivo | N/A — este ID no existe en la fuente canónica |
| P-28 (valor) | Propuesta de valor tutores — evidence-map | ❌ Sin archivo | N/A — este ID no existe en la fuente canónica |
| P-34 | Actas de reuniones | ❌ Sin archivo | Digitalizar actas o extraer del chat con citas textuales |
| P-35 | Solicitud Conciliación EF Legal | ⚠️ Parcial | Existe `docs/20251111-pedro-vergara-solicitud...html` pero está mapeada a P-30 en evidence-map |
| P-37 | Certificación bancaria (fuente canónica dice: capturas SMS) | ⚠️ Conflicto de identidad | Las capturas PAGOS están en P-36 del evidence-map. Si P-37 es realmente la certificación bancaria, falta el documento |
| P-52 | Política privacidad web con NETMED | ❌ Sin archivo | Capturar screenshot del sitio web actual de ParetoMed mostrando NETMED en la política |

---

## SECCIÓN 4: IMPACTO POR HECHO (Hechos con pruebas rotas)

### HECHOS CON TODAS SUS PRUEBAS OK ✅

Hechos: 1, 2, 9, 11, 21, 25, 29, 33, 41, 42, 48, 53, 54, 55, 56, 57, 58

### HECHOS CON AL MENOS UNA PRUEBA ROTA ❌

| Hecho | Pruebas referenciadas | Pruebas rotas | Naturaleza del fallo |
|-------|----------------------|---------------|---------------------|
| 3 | P-20, P-27, P-28 | P-27 (null), P-28 (null) | evidence-map reasignó P-27 y P-28 a otros conceptos |
| 4-8 | P-02, P-04, P-05, P-10, P-19, P-53 | P-04 (archivo incorrecto), P-10 (null) | P-04 abre borrador en vez de chat; P-10 sin archivo |
| 6 | P-10, P-02, P-05 | P-10 (null) | Borrador Pedro sin mapear |
| 7 | P-02, P-04, P-53 | P-04 (archivo incorrecto) | Abre borrador en vez de chat-correcciones |
| 10 | P-20, P-14 | — | OK |
| 12-13 | P-02 | — | Archivo correcto pero puede 404 por visor (ruta relativa) |
| 14 | P-25, P-26 | P-26 (null) | SOP Seguimiento sin mapear independientemente |
| 15 | P-27 | P-27 (null) | Explicación Metodología sin mapear |
| 16 | P-28-P-32 | **P-28 a P-32 TODOS ROTOS** | Archivos existen pero están mapeados a conceptos diferentes |
| 17 | P-02, P-03, P-04, P-39 | P-04 (incorrecto), P-39 (parcial) | P-04 abre borrador; P-39 abre chat-equipo en vez de mensajes específicos |
| 18-canales | P-02, P-04 | P-04 (incorrecto) | — |
| 18 (Cap.IV) | P-02, P-13 | P-13 (chat genérico sin scroll) | — |
| 19 (Cap.IV) | P-12, P-13, P-02, P-36, PAGOS | P-36 (desc incorrecta, archivos parciales), P-37 (null) | PAGOS están pero mapeados con ID erróneo |
| 20 (Cap.IV) | P-36, PAGOS, P-16 | P-16 (desc incorrecta) | — |
| 20-dnda | P-22, P-23 | **P-22/P-23 INVERTIDOS** | El visor muestra el certificado equivocado en cada caso |
| 22 | P-01 | — | OK |
| 23 | P-02 | — | OK si chat carga |
| 24 | P-02 | — | OK si chat carga |
| 26 | P-02, P-03, P-33, P-34 | P-33 (null), P-34 (null) | Bitácora Adriana y actas sin mapear |
| 27 | P-34 | P-34 (null) | Actas sin mapear |
| 30-31 | P-02, P-06, P-07, P-09, P-53-P-55 | P-06 (puede apuntar a archivo con aportes en vez del original puro) | Verificar si hay dos versiones del acuerdo |
| 32 | P-06, P-07, P-02 | P-06 (ídem arriba) | — |
| 34 | P-01, P-02 | — | OK si chat carga |
| 35 | P-02, P-18 | P-18 (desc incorrecta, abre chat) | Debería abrir notificación formal |
| 37 | P-16 | P-16 (desc incorrecta, archivo correcto) | — |
| 38 | P-15, P-16, P-17 | P-17 (null) | Tabla de valoración no digitalizada |
| **39** | **P-24**, P-01 | **P-24 CRÍTICO** | Abre "Reels y Guiones" en vez de "Certificado NETMED" |
| 43-44 | P-17, P-16, P-35 | P-17 (null), P-35 (null) | — |
| 45 | P-16, P-18, P-36, P-37, P-43 | P-18 (incorrecto), P-37 (null) | — |
| 46 | P-36, P-37 | P-37 (null) | — |
| 47 | P-05, P-41 | — | OK |
| 49 | P-02, P-03, P-05, P-40 | — | OK |
| 50 | P-02, P-18 | P-18 (incorrecto) | — |
| 51 | P-02, P-03, P-25-P-27 | P-26 (null), P-27 (null) | — |
| 52 | P-02, P-03, P-39 | P-39 (parcial) | — |
| 59 | P-05, P-02, P-50 | — | OK |
| 60 | P-34, P-02 | P-34 (null) | — |
| 61 | P-14, P-01 | — | OK |
| 62 | P-08, P-15, P-02 | P-08 (apunta a doc del padre, no al SAS original de Oscar) | Posible mismatch |
| **63** | **P-24**, P-01, P-49 | **P-24 CRÍTICO** | Abre "Reels" en vez de "NETMED" |
| 64 | P-02, P-01 | — | OK |

---

## SECCIÓN 5: PLAN DE CORRECCIÓN PARA LA IA EJECUTORA

### PRIORIDAD 1: Reescribir `evidence-map.js` (BLOQUEANTE)

El `evidence-map.js` debe alinearse con la numeración del documento fuente `HECHOS_DEMANDA_PARETOMED_2026.md`. A continuación la tabla de correcciones exactas:

```
ACCIÓN: Reemplazar las entradas de evidence-map.js con estos valores:

P-04: {
  desc: "Chat de WhatsApp Correcciones y Sugerencias Paretomed",
  tipo: "Documento electrónico",
  cat: "chat",
  html: "docs/chat-correcciones.html"
}

P-06: {
  desc: "Acuerdo de Socios ORIGINAL (no modificado), inicios 2024",
  tipo: "Borrador contractual",
  cat: "documento",
  html: doc('acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO.docx')
  // NOTA: Verificar que este archivo es realmente el ORIGINAL sin modificar.
  // Si el archivo "NUNCA FIRMADO" es el que tiene aportes de ambos (P-09),
  // entonces P-06 necesita un archivo diferente: el borrador puro SIN notas.
  // Si solo existe una versión, documentar que P-06 y P-09 comparten archivo.
}

P-07: {
  desc: "Acuerdo de Socios MODIFICADO (acciones -> utilidades), Google Docs",
  tipo: "Borrador alterado",
  cat: "documento",
  html: doc('acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO APORTADO EN JULIO 2024.docx')
  // NOTA: Verificar que este archivo muestra el historial de edición
  // con el cambio "acciones" → "utilidades". Si no, se necesita captura
  // del historial de Google Docs.
}

P-08: {
  desc: "Acuerdo de Socios propuesto por Oscar (versión SAS)",
  tipo: "Propuesta contractual",
  cat: "documento",
  // INVESTIGAR: ¿Existe un archivo SAS diferente al del padre de Oscar?
  // Si P-08 y P-54 son realmente el mismo documento (propuesto por padre
  // pero entregado por Oscar), dejar mismo archivo y documentar.
  // Si son diferentes, localizar el archivo de P-08.
  html: doc('ACUERDO DE SOCIOS PARA LA CONSTITUCIÓN DE LA SOCIEDAD COMERCIAL A DENOMINARSE (enviado por padre de Oscar maldonado en 29 de noviembre 2024).docx')
}

P-10: {
  desc: "Borrador de Acuerdo Original de Pedro, 06/02/2024",
  tipo: "Propuesta contractual",
  cat: "documento",
  html: doc('BORRADOR ACUERDO ORIGINAL DE PEDRO FECHADO 6 DE FEBRERO 2024.docx')
}

P-13: {
  desc: "Liquidaciones mensuales detalladas en WhatsApp",
  tipo: "Comunicaciones electrónicas",
  cat: "financiero",
  html: "docs/chat-oscar-pedro.html"
  // OK — las liquidaciones están dentro del chat
}

P-16: {
  desc: "Contrato de Transacción Dr. Flight (contrapropuesta de Pedro), 14/10/2025",
  tipo: "Propuesta contractual",
  cat: "documento",
  html: doc('Contrato de Transacción Dr. Flight 141025.docx')
  // Archivo correcto, solo corregir la descripción
}

P-17: {
  desc: "Contrato de Liquidación propuesto por Pedro, agosto 2025",
  tipo: "Propuesta contractual",
  cat: "financiero"
  // SIN ARCHIVO — Pendiente digitalización
  // Candidato: source/VALUACION_PARETOMED_2026.md (convertir a HTML)
}

P-18: {
  desc: "Notificación Formal de Cese de Explotación, 29/08/2025",
  tipo: "Comunicación formal",
  cat: "documento",
  html: "docs/chat-oscar-pedro.html"
  // La notificación fue enviada por chat, se puede extraer como fragmento
  // o crear un documento HTML independiente con la notificación específica
}

P-19: {
  desc: "Constancia de No Conciliación N° 00-1844, 20/02/2026",
  tipo: "Certificación",
  cat: "certificacion",
  raw: asset('CONSTANCIA DE NO CONCILIACIÓN N° 00-1844 REGISTRADA.pdf')
  // ¡ARCHIVO EXISTE! Solo falta vincularlo
}

P-22: {
  desc: "Certificado DNDA — 238 obras audiovisuales (476 registros), 28/10/2025",
  tipo: "Documento público",
  cat: "certificacion",
  raw: asset('Certificado Obras Pedro Vergara.pdf')
  // SWAP: era P-23 en evidence-map, ahora es P-22 como dice el fuente
}

P-23: {
  desc: "Certificado DNDA — Ejemplo obra 'Disfunción Neuromuscular' (4-34-115), 02/09/2025",
  tipo: "Documento público",
  cat: "certificacion",
  raw: asset('Certificado de registro.pdf')
  // SWAP: era P-22 en evidence-map, ahora es P-23 como dice el fuente
}

P-24: {
  desc: "Certificado de Existencia NETMED S.A.S.",
  tipo: "Documento público",
  cat: "certificacion"
  // SIN ARCHIVO — CRÍTICO. Obtener certificado de Cámara de Comercio
  // de NETMED S.A.S. (NIT 902.004.012-9, Matrícula 926.784)
}

P-25: {
  desc: "SOP de Reunión 1:1 redactado por Pedro, 05/06/2024",
  tipo: "Documentación operativa",
  cat: "documento",
  html: doc('SOP REUNION 1_1 REDACTADO 5 DE JUNIO 2024 POR PEDRO.docx')
  // Solo este SOP, sin agrupar los otros
}

P-26: {
  desc: "SOP de Seguimiento Paretomed redactado por Pedro",
  tipo: "Documentación operativa",
  cat: "documento",
  html: doc('SOP SEGUIMIENTO PARETOMED REDACTADO POR PEDRO.docx')
}

P-27: {
  desc: "Explicación de Metodología (versión comparativa Oscar vs. Pedro), 14/05/2024",
  tipo: "Documento comparativo",
  cat: "documento",
  html: doc('Explicación de metodología fechado 14 de mayo 2024.docx')
}

P-28: {
  desc: "Reels y Guiones 2025 redactados por Pedro",
  tipo: "Propiedad intelectual",
  cat: "documento",
  html: doc('Reels y guiones 2025.docx')
  // Este archivo estaba mapeado como P-24 en evidence-map
}

P-29: {
  desc: "Reels Julio 2024 redactados por Pedro",
  tipo: "Propiedad intelectual",
  cat: "documento",
  html: doc('Reels Julio 2024.docx')
}

P-30: {
  desc: "Reels Septiembre 2024 redactados por Pedro",
  tipo: "Propiedad intelectual",
  cat: "documento",
  html: doc('Reels septiembre 2024.docx')
}

P-31: {
  desc: "Documento de Reels - 28 de abril 2024 redactado por Pedro",
  tipo: "Propiedad intelectual",
  cat: "documento",
  html: doc('Copia de Documento de Reels - 28 de abril, 14_12.docx')
}

P-32: {
  desc: "Reels Octubre-Noviembre-Diciembre 2024 redactados por Pedro",
  tipo: "Propiedad intelectual",
  cat: "documento",
  html: doc('Copia de Reels Octubre - Noviembre - Diciembre.docx')
}

P-33: {
  desc: "Bitácora de transcripción chat con Adriana (asesora de ventas)",
  tipo: "Documento electrónico",
  cat: "documento",
  html: doc('Bitácora transcripción chat con Adriana asesora de ventas paretomed.docx')
}

P-34: {
  desc: "Actas de 7 reuniones documentadas (mayo-julio 2025)",
  tipo: "Documentación interna",
  cat: "documento"
  // SIN ARCHIVO — Necesita digitalización o extracción del chat
}

P-35: {
  desc: "Solicitud de Conciliación EF Legal, 11/11/2025, nunca radicada",
  tipo: "Estrategia legal previa",
  cat: "documento",
  html: doc('20251111 PEDRO VERGARA - Solicitud de conciliación por antiguos abogados EF LEGAL nunca radicada ni enviada.docx')
  // Este archivo estaba mapeado como P-30 en evidence-map
}

P-36: {
  desc: "Transferencias bancarias Bancolombia cuenta 4483 de Pedro Vergara (14 transferencias a cuenta personal, $99.319.834 subtotal)",
  tipo: "Prueba financiera",
  cat: "financiero",
  multipleraw: [asset('PAGOS 1.jpeg'), asset('PAGOS 2.jpeg'), asset('PAGOS 3.jpeg'), asset('PAGOS 4.jpeg')]
  // Los PAGOS jpgs SÍ corresponden a P-36 según el fuente
  // (el fuente dice que P-36 = transferencias Y P-37 = capturas SMS,
  //  pero los PAGOS jpgs son las capturas de SMS de las transferencias)
  // Decisión: mantener PAGOS en P-36, agregar también a P-37 si aplica
}

P-37: {
  desc: "Capturas de pantalla SMS Bancolombia (PAGOS 1, 2, 3 y 4)",
  tipo: "Prueba documental fotográfica",
  cat: "financiero",
  multipleraw: [asset('PAGOS 1.jpeg'), asset('PAGOS 2.jpeg'), asset('PAGOS 3.jpeg'), asset('PAGOS 4.jpeg')]
  // P-36 y P-37 en el fuente son complementarios:
  // P-36 = las transferencias (concepto), P-37 = las capturas (soporte)
  // Ambos apuntan a los mismos archivos PAGOS
}

P-38: {
  desc: "Borrador de Demanda (BORRADOR DEMANDA 2.docx) del apoderado Alfredo A. Toledo Vergara",
  tipo: "Documento procesal",
  cat: "documento",
  html: doc('BORRADOR DEMANDA 2.docx')
}

P-39: {
  desc: "Mensajes de WhatsApp referentes a Efraín (fotógrafo) y Paul (comunicador social)",
  tipo: "Documento electrónico",
  cat: "chat",
  html: "docs/chat-oscar-pedro.html"
  // Los mensajes sobre Efraín y Paul están en el chat Oscar-Pedro,
  // no en el chat de equipo. Cambiar de chat-equipo a chat-oscar-pedro.
  // Complementar con chat-equipo si también hay referencias allí.
}

P-49: {
  desc: "Captura feb 2026: Adriana envía cuenta personal Oscar (no NETMED)",
  tipo: "Prueba documental",
  cat: "financiero",
  html: "docs/chat-primo.html",
  raw: asset('chat-primo/00000044-Certificado_20260210.pdf')
  // VERIFICAR: ¿chat-primo.html realmente contiene esta captura?
  // El ticket original reporta que abre "chat de un tercero".
  // Si chat-primo NO contiene la captura de Adriana, se necesita un
  // archivo diferente. Revisar contenido de chat-primo.html.
}

P-54: {
  desc: "Acuerdo SAS propuesto por padre de Oscar (29 noviembre 2024)",
  tipo: "Propuesta contractual",
  cat: "documento",
  html: doc('ACUERDO DE SOCIOS PARA LA CONSTITUCIÓN DE LA SOCIEDAD COMERCIAL A DENOMINARSE (enviado por padre de Oscar maldonado en 29 de noviembre 2024).docx')
  // Mismo archivo que P-08 si son el mismo documento
}
```

### PRIORIDAD 2: Regenerar `data.js` después de corregir evidence-map

Después de corregir `evidence-map.js`, ejecutar:
```bash
cd paretomed-evidencia
node build/extract-data.js
```

Esto regenerará `src/scripts/data.js` con `pruebas_urls` alineado al nuevo mapa.

### PRIORIDAD 3: Vincular P-19 (Constancia No Conciliación)

El archivo `assets/constancia-de-no-conciliacion-n-00-1844-registrada.pdf` existe pero P-19 no tiene `raw` en evidence-map. Agregar:
```js
"P-19": { ..., raw: asset('CONSTANCIA DE NO CONCILIACIÓN N° 00-1844 REGISTRADA.pdf') }
```

### PRIORIDAD 4: Invertir P-22/P-23

Este es un swap simple pero de alto impacto legal:
- P-22 debe apuntar a `Certificado Obras Pedro Vergara.pdf` (238 obras)
- P-23 debe apuntar a `Certificado de registro.pdf` (obra individual)
- Actualmente están al revés en evidence-map

### PRIORIDAD 5: Obtener documentos faltantes

| P-XX | Documento necesario | Urgencia |
|------|--------------------|---------| 
| P-24 | Certificado Cámara Comercio NETMED S.A.S. | **ALTA** — referenciado en hechos 39 y 63 sobre actos post-ruptura |
| P-17 | Tabla de valoración / contrato de liquidación | MEDIA — referenciado en hechos 38, 43, 44 |
| P-34 | Actas de reuniones | MEDIA — referenciado en hechos 26, 27, 60 |
| P-52 | Screenshot política privacidad NETMED | BAJA — fácil de obtener |

### PRIORIDAD 6: Verificaciones manuales pendientes

La IA ejecutora debe verificar antes de aplicar los cambios:

1. **P-06 vs P-09**: ¿Los archivos `acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO.docx` y `acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO APORTADO EN JULIO 2024.docx` son realmente documentos diferentes? Si sí, ¿cuál es el original sin modificar (P-06) y cuál tiene las notas manuscritas (P-09)?

2. **P-08 vs P-54**: ¿Son el mismo documento o versiones diferentes del acuerdo SAS?

3. **P-49 / chat-primo.html**: Verificar que `chat-primo.html` realmente contiene la captura de Adriana enviando la cuenta de Oscar. Si es un chat con el primo de Pedro sobre otro tema, P-49 necesita un archivo diferente.

4. **P-39**: Los mensajes sobre Efraín y Paul aparecen tanto en chat-oscar-pedro como en chat-equipo. Determinar cuál chat es más relevante o si P-39 debería referenciar ambos.

---

## SECCIÓN 6: BUGS ADICIONALES DEL PORTAL (No relacionados con evidence-map)

### 6.1 Orden de hechos roto en el frontend

El hecho 46 (CUADRAGESIMOSEXTO) aparece después del hecho 52 en el listado. Causa probable: `parse-hechos.js` usa `orden_documento` (orden de aparición en el markdown) que difiere del número del hecho. El hecho 46 aparece en el Capítulo XIII, después de los hechos 43-45, pero en el documento fuente el Capítulo XIV empieza en el hecho 47.

**Corrección:** Verificar que el frontend ordena por `numero` y no por `orden_documento`.

### 6.2 Hechos "65-67" no existen

El ticket de auditoría anterior menciona "hecho-65-67: MISSING". Esto es un **falso positivo**: el blueprint define 67 hechos TOTALES pero la numeración llega hasta 64 (SEXAGESIMOCUARTO). Los tres hechos adicionales son `hecho-18-canales`, `hecho-19-capcut` y `hecho-20-dnda` del Capítulo III. No hay hechos 65, 66 ni 67.

**Corrección:** Si el frontend espera IDs secuenciales hecho-1 a hecho-67, cambiar la lógica para iterar sobre las claves reales del objeto `hechos{}`.

### 6.3 Hechos 18-canales, 19-capcut, 20-dnda posiblemente no se parsean

Estos hechos usan ordinales duplicados (DECIMOCTAVO, DECIMONOVENO, VIGÉSIMO) que ya aparecen en el Capítulo IV. El `hecho-blueprint.js` los maneja con claves `'III|DECIMOCTAVO'` vs `'IV|DECIMOCTAVO'`, pero el parser necesita que el capítulo actual sea correcto al momento de parsear. 

**Verificación:** Ejecutar `node build/parse-hechos.js` y revisar que los 67 hechos se generen sin warnings de duplicados.

### 6.4 Etiquetas [P-XX] no son interactivas

Las etiquetas de prueba en los headers de hechos son texto plano. El frontend debería convertir `[P-XX]` en enlaces clickeables que abran la prueba en el visor.

**Corrección:** En `app.js`, al renderizar el texto del hecho, aplicar regex para convertir `[P-XX]` o `**[P-XX]**` en `<a class="prueba-link" data-prueba="P-XX">P-XX</a>` con un event listener que abra la prueba.

---

## SECCIÓN 7: RESUMEN EJECUTIVO

| Categoría | Total | Rotas | % |
|-----------|-------|-------|---|
| Pruebas con archivo correcto | 55 | 24 con mismatch | 44% roto |
| Pruebas con archivo disponible pero mal mapeado | — | 13 | — |
| Pruebas sin archivo digital | — | 4 (P-17, P-24, P-34, P-52) | — |
| Hechos con al menos 1 prueba rota | 67 | ~35 | 52% afectado |

### Esfuerzo estimado de corrección:
- **evidence-map.js**: Reescribir ~30 entradas siguiendo la tabla de esta auditoría
- **Rebuild**: `node build/extract-data.js` para regenerar data.js
- **Documentos faltantes**: 4 documentos por digitalizar/obtener
- **Frontend**: 2 bugs de ordenamiento + 1 feature (enlaces interactivos)

---

*Documento generado el 11 de abril de 2026 por Claude Opus 4.6*
*Basado en análisis de: HECHOS_DEMANDA_PARETOMED_2026.md, evidence-map.js, data.js, hecho-blueprint.js, parse-hechos.js, y verificación de archivos en dist/*
