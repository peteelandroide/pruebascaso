# PLAN DE DESARROLLO: Portal Web de Evidencia — Caso ParetoMed
## Para: IA Programadora / Desarrollador
## Fecha: 8 de abril de 2026

---

# 1. OBJETIVO

Construir una aplicacion web estatica (single-page app) que permita a los abogados del caso (Dr. Toledo y equipo) navegar de forma rapida e intuitiva los **64 hechos de la demanda**, las **52 pruebas indexadas**, y los **documentos fuente originales** (chats WhatsApp, transcripciones de audio, PDFs, imagenes, contratos).

**Problema que resuelve:** Hoy los abogados tienen que leer un documento de 389 lineas (HECHOS_DEMANDA) y cuando encuentran una referencia como [P-02], deben abrir manualmente un archivo de 32,000 lineas de chat para buscar la cita. Esta web elimina ese salto — el abogado ve el hecho, despliega el fragmento clave, y con un click ve el documento completo con el fragmento resaltado.

**Usuarios:** 2-4 abogados. No requiere autenticacion publica, pero debe ser desplegable como sitio estatico privado (Netlify/Vercel con password, o localhost).

---

# 2. ARQUITECTURA GENERAL

```
paretomed-evidencia/
├── index.html                    ← SPA principal
├── styles/
│   └── main.css
├── scripts/
│   ├── app.js                    ← Logica principal (navegacion, acordeones, busqueda)
│   ├── data.js                   ← JSON con hechos, pruebas, fragmentos (generado por build)
│   └── viewer.js                 ← Visor de documentos con highlight
├── docs/                         ← Documentos fuente convertidos a HTML/texto
│   ├── chat-oscar-pedro.html     ← Chat WhatsApp Oscar-Pedro (32,039 lineas)
│   ├── chat-equipo.html          ← Chat equipo ParetoMed (12,601 lineas)
│   ├── chat-correcciones.html    ← Chat correcciones (1,366 lineas)
│   ├── transcripciones.html      ← Audios transcritos (9,330 lineas)
│   ├── chat-primo.html           ← Chat primo Carlos Vargas (83 lineas)
│   ├── hechos-completo.html      ← HECHOS_DEMANDA completo renderizado
│   ├── valuacion.html            ← VALUACION_PARETOMED_2026 renderizado
│   ├── analisis-juridico.html    ← ANALISIS_JURIDICO renderizado
│   ├── puntos-debiles.html       ← PUNTOS_DEBILES renderizado
│   ├── ejecutivo-toledo.html     ← DOCUMENTO_EJECUTIVO renderizado
│   └── montos.html               ← TAREA_A_MONTOS renderizado
├── assets/
│   ├── pdfs/                     ← PDFs originales (FE3, FE4, FE5, certificados, contratos)
│   ├── images/                   ← Imagenes de pagos (PAGOS 1-4), capturas
│   ├── comprobantes/             ← 376 imagenes de comprobantes (opcional, 27MB)
│   └── primo/                    ← Captura precios ParetoMed + certificado bancario
├── build/
│   └── extract-data.js           ← Script Node.js que parsea los archivos fuente y genera data.js
└── README.md
```

**Stack tecnologico:** HTML + CSS + JavaScript vanilla. Sin frameworks. Los documentos fuente se pre-procesan en un paso de build (Node.js script) que genera el JSON de datos y convierte los .txt/.md a HTML con anclas por linea.

---

# 3. INVENTARIO COMPLETO DE ARCHIVOS FUENTE

## 3.1 Chats WhatsApp (texto plano, formato especifico)

| Archivo | Lineas | Tamano | Formato de linea | ID interno |
|---|---|---|---|---|
| Chat de WhatsApp con Oscar Maldonado Paretomed.txt | 32,039 | 2.9 MB | `DD/MM/YYYY, HH:MM a/p. m. - Nombre: mensaje` | chat-oscar |
| Chat de WhatsApp con Equipo de Trabajo - Paretomed.txt | 12,601 | 1.1 MB | Mismo formato | chat-equipo |
| Chat de WhatsApp con Correcciones y sugerencias PARETOMED.txt | 1,366 | ~100 KB | Mismo formato | chat-correcciones |

**NOTA IMPORTANTE sobre formato:** Las fechas en el chat usan separadores mixtos (`/` y `\`). El parser debe normalizar ambos. Ejemplo real:
```
28\2\2025, 2:31 p. m. - Oscar Maldonado Paretomed: Yo me guío es de la hoja de cálculo personal mía
28/2/2025, 2:31 p. m. - Pedro Vergara: eso altera todo el roas y roi
```

## 3.2 Transcripciones de audio

| Archivo | Lineas | Tamano | ID interno |
|---|---|---|---|
| TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt | 9,330 | 1.6 MB | transcripciones |

## 3.3 Chat del primo (evidencia NETMED/cuenta personal)

| Archivo | Contenido | ID interno |
|---|---|---|
| chat con primo de pedro texto capturas y documentos/_chat.txt | 83 lineas, conversacion simulada con ParetoMed feb 2026 | chat-primo |
| .../00000018-PHOTO-2026-02-10-16-01-26.jpg | Imagen: precios actuales ParetoMed (3, 4, 6 meses) | primo-precios |
| .../00000044-Certificado_20260210.pdf | Certificado bancario enviado — cuenta PERSONAL de Oscar, no NETMED | primo-certificado |

**Relevancia probatoria:** Adriana (asesora) envio certificado bancario de la cuenta personal de Oscar (contrasena: 1129573046 = CC de Oscar) en febrero 2026, NO de NETMED S.A.S. Esto prueba que NETMED es vehiculo de papel. Es la prueba P-49.

## 3.4 Documentos Word (.docx) — convertir a HTML

| Archivo | Descripcion | Prueba |
|---|---|---|
| acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO APORTADO EN JULIO 2024.docx | Acuerdo con notas manuscritas Oscar | P-06, P-09 |
| acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO.docx | Version sin notas | P-06 |
| Contrato de Cuentas en Participacion Paretomed... .docx | Contrato Oscar 22/08/2025 | P-14 |
| Contrato de Transaccion Dr. Flight 141025.docx | Contrato transaccion Oscar | P-15 |
| CUENTAS DE COBRO PEDRO VERGARA.docx | 5 cuentas de cobro | P-12 |
| Paretomed - Educacion Medica carta de recomendacion.docx | Carta firmada: "Subdirector Academico y Comercial" | P-11 |
| SOP REUNION 1_1 REDACTADO 5 DE JUNIO 2024 POR PEDRO.docx | SOP reuniones | P-25 |
| SOP SEGUIMIENTO PARETOMED REDACTADO POR PEDRO.docx | SOP seguimiento | P-25 |
| Explicacion de metodologia fechado 14 de mayo 2024.docx | Metodologia Pedro | P-25 |
| BORRADOR ACUERDO ORIGINAL DE PEDRO FECHADO 6 DE FEBRERO 2024.docx | Propuesta original Pedro | P-04 |
| Bitacora transcripcion chat con Adriana... .docx | Bitacora chat Adriana | P-39 |
| Reels y guiones 2025.docx | Guiones Pedro | P-24 |
| Reels Julio 2024.docx | Guiones julio | P-24 |
| Reels septiembre 2024.docx | Guiones septiembre | P-24 |
| Copia de Documento de Reels - 28 de abril... .docx | Guiones abril | P-24 |
| Copia de Reels Octubre - Noviembre - Diciembre.docx | Guiones oct-dic | P-24 |
| 20251111 PEDRO VERGARA - Solicitud de conciliacion... .docx | Solicitud conciliacion EF Legal | P-30 |
| Contrato de transaccion No.10.09.2025.pdf | Contrato transaccion PDF | P-15 |

## 3.5 PDFs

| Archivo | Descripcion | Prueba |
|---|---|---|
| FE3.pdf | Factura electronica #3 a ParetoMed | P-12 |
| FE4.pdf | Factura electronica #4 a ParetoMed | P-12 |
| FE5.pdf | Factura electronica #5 a ParetoMed | P-12 |
| FE1 (AVANZ OTRO CLIENTE CON CONCEPTO DISTINTO).pdf | Factura a Avanz (comparativa) | P-46 |
| FE15 (ULTIMA DE AVANZ).pdf | Ultima factura Avanz | P-46 |
| certificado OSCAR.pdf | Camara Comercio ParetoMed | P-20 |
| certificado EMPRESA PEDRO.pdf | Camara Comercio Doctor Flight | P-21 |
| Certificado de registro.pdf | DNDA obra individual | P-22 |
| Certificado Obras Pedro Vergara.pdf | DNDA 238 obras (10 paginas) | P-23 |
| Copy of TESIS PEDRO VERGARA 2.pdf | Tesis Pedro (contexto) | — |

## 3.6 Imagenes

| Archivo | Descripcion | Prueba |
|---|---|---|
| PAGOS 1.jpeg ... PAGOS 4.jpeg | Comprobantes de las 14 transferencias Oscar→Pedro | P-36 |
| IMAGENES PAGOS/ (376 archivos, 27MB) | Comprobantes individuales de estudiantes | P-42 |

## 3.7 Hojas de calculo (.xlsx)

| Archivo | Descripcion | Prueba |
|---|---|---|
| COMPROBANTES_PARETOMED_ANALISIS.xlsx | 376 comprobantes procesados | P-42 |
| Copia de KPIS 2025.xlsx | KPIs ventas 2025 (archivo de Oscar) | P-43 |
| CRM SHEETS CAMPANA.xlsx | Hoja de campanas CRM | — |
| Planificador de Reels_Videos.xlsx | Planificador contenido | P-24 |

## 3.8 Documentos de analisis (.md) — renderizar a HTML

| Archivo | Descripcion |
|---|---|
| HECHOS_DEMANDA_PARETOMED_2026.md | 64 hechos, 52 pruebas, 16 capitulos (DOCUMENTO PRINCIPAL) |
| VALUACION_PARETOMED_2026.md | 4 metodos valoracion, pretensiones |
| ANALISIS_JURIDICO_SOLIDEZ_DEL_CASO.md | Solidez por elemento y pretension |
| PUNTOS_DEBILES_Y_PREPARACION.md | 12 puntos debiles con defensa |
| DOCUMENTO_EJECUTIVO_PARA_ABOGADO_TOLEDO.md | Resumen ejecutivo 4 paginas |
| TAREA_A_MONTOS_PARA_BORRADOR_DEMANDA.md | Calculo de montos y juramento |
| INVESTIGACION_DEMANDA_PARETOMED_2026.md | Investigacion completa inicial |

---

# 4. ESTRUCTURA DE DATOS (data.js)

El script de build debe generar un archivo `data.js` con la siguiente estructura:

```javascript
const CASE_DATA = {

  // =============================================
  // CAPITULOS: agrupacion logica de los hechos
  // =============================================
  capitulos: [
    {
      id: "cap-1",
      numero: "I",
      titulo: "Identificacion de las Partes",
      hechos: ["hecho-1", "hecho-2", "hecho-3"]
    },
    {
      id: "cap-2",
      numero: "II",
      titulo: "Origen y Formacion de la Sociedad de Hecho",
      hechos: ["hecho-4", "hecho-5", "hecho-6", "hecho-7", "hecho-8", "hecho-9"]
    },
    // ... hasta capitulo XVI
  ],

  // =============================================
  // HECHOS: cada uno de los 64 hechos de la demanda
  // =============================================
  hechos: {
    "hecho-1": {
      id: "hecho-1",
      numero: 1,
      ordinal: "PRIMERO",
      capitulo: "cap-1",
      // Texto CORTO visible en el acordeon cerrado (1-2 oraciones)
      resumen: "Pedro Jose Vergara Villanueva, CC 1.140.879.122, medico cirujano, representante legal de Doctor Flight S.A.S.",
      // Texto COMPLETO del hecho (el parrafo entero de HECHOS_DEMANDA)
      texto_completo: "HECHO PRIMERO. El demandante, PEDRO JOSE VERGARA VILLANUEVA...",
      // Fragmentos clave: citas textuales que se resaltan al desplegar
      fragmentos_clave: [
        {
          cita: "yo me guio de la hoja de calculo personal mia",
          fuente: "chat-oscar",       // ID del documento fuente
          linea: 20658,               // Linea exacta en el archivo fuente
          contexto_antes: 5,          // Lineas de contexto a mostrar antes
          contexto_despues: 5,        // Lineas de contexto a mostrar despues
          fecha: "28/02/2025",
          autor: "Oscar Maldonado"
        }
      ],
      // Pruebas vinculadas a este hecho
      pruebas: ["P-02", "P-13"],
      // Notas para el abogado (si existen bloques > NOTA PARA EL ABOGADO)
      nota_abogado: null
    },
    // ... 64 hechos
  },

  // =============================================
  // PRUEBAS: cada una de las 52 pruebas indexadas
  // =============================================
  pruebas: {
    "P-01": {
      id: "P-01",
      descripcion: "Grabacion telefonica 14/08/2025 — confesion sociedad de hecho",
      tipo: "Confesion extrajudicial",
      // Categoria visual (para iconos/colores)
      categoria: "audio",  // audio | chat | documento | certificacion | financiero | imagen | testimonial
      // Archivos fuente asociados
      archivos: [
        {
          nombre: "TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt",
          tipo: "texto",
          id_doc: "transcripciones",
          // Rango de lineas relevantes en el archivo
          linea_inicio: null,  // null = buscar por contenido
          linea_fin: null,
          // Texto a buscar para anclar (si no hay linea exacta)
          ancla_texto: "yo quiero honrar el acuerdo contigo"
        }
      ],
      // Hechos que referencian esta prueba
      hechos_vinculados: ["hecho-21", "hecho-22"],
      // Fragmentos destacados de esta prueba
      extractos: [
        {
          cita: "si claramente estaba implicito que tu ibas a formar parte de la SAS. eso yo no te lo niego en ningun momento claramente",
          relevancia: "Oscar reconoce pacto de acciones"
        },
        {
          cita: "los abogados y contadores me dijeron, ey... si que sociedad de hecho con el man, pero tu puedes cortarlo",
          relevancia: "Asesores de Oscar confirman sociedad de hecho"
        }
      ]
    },
    "P-02": {
      id: "P-02",
      descripcion: "Chats WhatsApp Oscar-Pedro (mayo 2024 – agosto 2025)",
      tipo: "Documento electronico",
      categoria: "chat",
      archivos: [
        {
          nombre: "Chat de WhatsApp con Oscar Maldonado Paretomed.txt",
          tipo: "texto",
          id_doc: "chat-oscar"
        }
      ],
      hechos_vinculados: ["hecho-4", "hecho-5", /* ... muchos */],
      extractos: [
        {
          cita: "Ingresos: 10,889,303. Egresos: 3,872,653. Ganancia: 7,016,650. Porcentaje de Pedro: 7,016,650 x 0,20 = 1,403,330",
          relevancia: "Primera liquidacion — reparto 20% de utilidades netas",
          linea: null,  // Se busca en build
          fecha: "07/05/2024"
        }
        // ... mas extractos
      ]
    },
    // ... hasta P-52
  },

  // =============================================
  // DOCUMENTOS FUENTE: archivos completos navegables
  // =============================================
  documentos: {
    "chat-oscar": {
      id: "chat-oscar",
      titulo: "Chat WhatsApp: Oscar Maldonado - Pedro Vergara",
      archivo_original: "Chat de WhatsApp con Oscar Maldonado Paretomed.txt",
      archivo_html: "docs/chat-oscar-pedro.html",
      tipo: "chat",
      lineas: 32039,
      periodo: "Nov 2023 – Ago 2025",
      participantes: ["Oscar Maldonado Paretomed", "Pedro Vergara"]
    },
    "chat-equipo": {
      id: "chat-equipo",
      titulo: "Chat WhatsApp: Equipo de Trabajo ParetoMed",
      archivo_original: "Chat de WhatsApp con Equipo de Trabajo - Paretomed 🟠.txt",
      archivo_html: "docs/chat-equipo.html",
      tipo: "chat",
      lineas: 12601,
      periodo: "2024 – 2025",
      participantes: ["Oscar Maldonado Paretomed", "Pedro Vergara", "Adriana", "otros"]
    },
    "transcripciones": {
      id: "transcripciones",
      titulo: "Transcripciones de Audios Consolidadas",
      archivo_original: "TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt",
      archivo_html: "docs/transcripciones.html",
      tipo: "transcripcion",
      lineas: 9330
    },
    "chat-primo": {
      id: "chat-primo",
      titulo: "Chat: Primo de Pedro simula interes en ParetoMed (Feb 2026)",
      archivo_original: "chat con primo de pedro texto capturas y documentos/_chat.txt",
      archivo_html: "docs/chat-primo.html",
      tipo: "chat",
      lineas: 83,
      periodo: "10 Feb 2026",
      relevancia: "Adriana envia cuenta personal de Oscar (no NETMED) — P-49"
    },
    // ... mas documentos
  }
};
```

---

# 5. DISENO DE INTERFAZ (UI/UX)

## 5.1 Layout general

```
┌─────────────────────────────────────────────────────────┐
│  BARRA SUPERIOR                                         │
│  Logo: "Caso ParetoMed — Portal de Evidencia"           │
│  [Buscar...]  [Hechos] [Pruebas] [Documentos] [Resumen]│
└─────────────────────────────────────────────────────────┘
│                                                         │
│  PANEL PRINCIPAL (contenido segun tab activo)            │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Vista: HECHOS (default)                        │    │
│  │                                                 │    │
│  │  Capitulo I: Identificacion de las Partes   [v] │    │
│  │  ┌─────────────────────────────────────────┐    │    │
│  │  │ H1 ● Pedro Jose Vergara Villanueva...   │    │    │
│  │  │ H2 ● Oscar David Maldonado Badran...    │    │    │
│  │  │ H3 ● ParetoMed, establecimiento...      │    │    │
│  │  └─────────────────────────────────────────┘    │    │
│  │                                                 │    │
│  │  Capitulo II: Origen y Formacion...         [v] │    │
│  │  ┌─────────────────────────────────────────┐    │    │
│  │  │ H4 ● En abril de 2024, Pedro propuso... │    │    │
│  │  │      [click para expandir]               │    │    │
│  │  └─────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## 5.2 Hecho CERRADO (estado default)

```
┌──────────────────────────────────────────────────────────┐
│ ▶ HECHO 18  Reparto de utilidades                        │
│   Desde mayo 2024, Oscar calculaba el 20% de Pedro       │
│   sobre la ganancia neta del negocio.                    │
│                                          Pruebas: P-02 P-13 │
└──────────────────────────────────────────────────────────┘
```

- Icono ▶ indica desplegable
- Numero + ordinal del hecho
- Resumen de 1-2 lineas
- Tags de pruebas a la derecha (clickeables, llevan a la prueba)

## 5.3 Hecho EXPANDIDO (al hacer click)

```
┌──────────────────────────────────────────────────────────┐
│ ▼ HECHO 18  Reparto de utilidades                        │
│                                                          │
│   Texto completo del hecho con formato...                │
│   "Ingresos: 10,889,303. Egresos: 3,872,653.            │
│    Ganancia: 7,016,650. Porcentaje de Pedro:             │
│    7,016,650 x 0,20 = 1,403,330"                        │
│                                                          │
│   ┌── Fragmento clave ──────────────────────────────┐   │
│   │ 📋 Chat Oscar-Pedro, 07/05/2024:                │   │
│   │                                                  │   │
│   │ Oscar: "Ingresos: 10,889,303. Egresos:          │   │
│   │ 3,872,653. Ganancia: 7,016,650. Porcentaje      │   │
│   │ de Pedro: 7,016,650 x 0,20 = 1,403,330"         │   │
│   │                                                  │   │
│   │ [Ver en documento original →]                    │   │
│   └──────────────────────────────────────────────────┘   │
│                                                          │
│   Pruebas vinculadas:                                    │
│   [P-02 Chat Oscar-Pedro] [P-13 Consolidados Oscar]     │
│                                                          │
│   📌 NOTA PARA EL ABOGADO: (si existe)                  │
│   Texto de la nota...                                    │
└──────────────────────────────────────────────────────────┘
```

- Las citas textuales se muestran en un bloque estilizado (fondo gris claro, borde izquierdo color)
- Boton "Ver en documento original" abre nueva pagina con el documento completo, scrolleado y resaltado al fragmento
- Las pruebas son chips clickeables que despliegan la prueba en el panel o navegan a la tab Pruebas

## 5.4 Vista de PRUEBAS

```
┌──────────────────────────────────────────────────────────┐
│ PRUEBAS (52)                                  [Filtrar ▼]│
│                                                          │
│ Filtros: [Todos] [Chat] [Audio] [Documental]             │
│          [Certificacion] [Financiero] [Testimonial]      │
│                                                          │
│ ▶ P-01  🎙 Grabacion telefonica 14/08/2025              │
│         Confesion extrajudicial                          │
│         Hechos: H21, H22                                 │
│                                                          │
│ ▶ P-02  💬 Chats WhatsApp Oscar-Pedro                   │
│         Documento electronico (32,039 lineas)            │
│         Hechos: H4, H5, H6, H8, H10, H12, H16...       │
│                                                          │
│ ▼ P-09  📄 Notas manuscritas de Oscar                   │
│   ┌──────────────────────────────────────────────┐       │
│   │ Descripcion: Oscar admite que el 20% "no se  │       │
│   │ justifican por una labor contratable"         │       │
│   │                                               │       │
│   │ Extractos clave:                              │       │
│   │ • "20% de las utilidades no se justifican     │       │
│   │   por una labor que es contratable"           │       │
│   │ • "discusiones verbales iniciales"            │       │
│   │ • "acuerdo inicial e informal"                │       │
│   │                                               │       │
│   │ Documento: acuerdo socios ORIGINAL...docx     │       │
│   │ [Abrir documento →] [Ver en hechos →]         │       │
│   └──────────────────────────────────────────────┘       │
└──────────────────────────────────────────────────────────┘
```

## 5.5 Vista de DOCUMENTO con highlight (pagina separada)

Cuando el abogado hace click en "Ver en documento original", se abre:

```
┌──────────────────────────────────────────────────────────┐
│ ← Volver | Chat Oscar-Pedro | Linea 20658 de 32039      │
│ [Buscar en este documento...]                            │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ 20653  28/2/2025 - Pedro Vergara: No es que haya         │
│ 20654  un cambio significativo en las ventas,            │
│ 20655  28/2/2025 - Oscar: Que cosa especificamente?      │
│ 20656  28/2/2025 - Pedro: Joda aparecia ventas totales   │
│        97m y paso a 80                                    │
│ 20657  28/2/2025 - Pedro: y la cantidad de cierres       │
│        tambien                                            │
│ ┌────────────────────────────────────────────────────┐   │
│ │ 20658  28/2/2025 - Oscar Maldonado Paretomed:      │   │
│ │ >>>  Yo me guio es de la hoja de calculo personal  │   │
│ │ >>>  mia, la de ventas y contabilidad.             │   │
│ └────────────────────────────────────────────────────┘   │
│ 20659  28/2/2025 - Pedro: eso altera todo el roas y roi  │
│ 20660  28/2/2025 - Oscar: Cual pestana?                  │
│ 20661  28/2/2025 - Pedro: enero 2025                     │
│                                                          │
│ ... (documento continua, scroll libre)                   │
└──────────────────────────────────────────────────────────┘
```

- El fragmento resaltado tiene fondo amarillo y borde
- La pagina hace scroll automatico hasta el fragmento
- Numeros de linea visibles a la izquierda
- Boton "Volver" regresa al hecho/prueba de origen
- Busqueda local dentro del documento (Ctrl+F mejorado con scroll-to)

## 5.6 Vista DOCUMENTOS (biblioteca)

```
┌──────────────────────────────────────────────────────────┐
│ DOCUMENTOS FUENTE                                        │
│                                                          │
│ 💬 Chats WhatsApp                                       │
│   ├── Chat Oscar-Pedro (32,039 lineas, nov 2023 - ago 2025)│
│   ├── Chat Equipo ParetoMed (12,601 lineas)              │
│   ├── Chat Correcciones (1,366 lineas)                   │
│   └── Chat Primo Carlos Vargas (83 lineas, feb 2026)     │
│                                                          │
│ 🎙 Transcripciones de Audio                             │
│   └── Consolidado (9,330 lineas)                         │
│                                                          │
│ 📄 Contratos y Acuerdos                                 │
│   ├── Acuerdo Socios Original (julio 2024)               │
│   ├── Contrato Cuentas Participacion (22/08/2025)        │
│   ├── Contrato Transaccion (sep/oct 2025)                │
│   └── Solicitud Conciliacion EF Legal                    │
│                                                          │
│ 📊 Financieros                                          │
│   ├── Comprobantes 376 estudiantes (Excel)               │
│   ├── KPIs 2025 (Excel)                                  │
│   ├── Facturas FE3, FE4, FE5 (PDF)                      │
│   ├── Facturas Avanz FE1, FE15 (PDF comparativas)        │
│   └── Comprobantes transferencias (PAGOS 1-4)            │
│                                                          │
│ 📜 Certificaciones                                      │
│   ├── DNDA 238 obras (PDF, 10 paginas)                   │
│   ├── DNDA obra individual (PDF)                         │
│   ├── Camara Comercio ParetoMed (PDF)                    │
│   ├── Camara Comercio Doctor Flight (PDF)                │
│   └── Certificado bancario feb 2026 (primo)              │
│                                                          │
│ 📋 Documentos de Pedro                                  │
│   ├── Carta de Recomendacion firmada Oscar               │
│   ├── Cuentas de Cobro (5)                               │
│   ├── SOPs (Reunion 1:1, Seguimiento)                    │
│   ├── Metodologia (mayo 2024)                            │
│   └── Guiones Reels (abril, julio, sep 2024, 2025)       │
│                                                          │
│ 📊 Analisis del Caso                                    │
│   ├── Valoracion ParetoMed 2026                          │
│   ├── Analisis Juridico de Solidez                       │
│   ├── Puntos Debiles y Preparacion                       │
│   ├── Documento Ejecutivo para Toledo                    │
│   └── Montos y Pretensiones                              │
└──────────────────────────────────────────────────────────┘
```

## 5.7 Vista RESUMEN (dashboard)

```
┌──────────────────────────────────────────────────────────┐
│ RESUMEN DEL CASO                                         │
│                                                          │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│ │ 64 Hechos  │ │ 52 Pruebas │ │ $320M      │            │
│ │ 16 Caps.   │ │ 7 tipos    │ │ Juramento  │            │
│ └────────────┘ └────────────┘ └────────────┘            │
│                                                          │
│ PRETENSIONES                                             │
│ ┌────────────────────────────────────────────────┐       │
│ │ 20% patrimonio:     $240,000,000   Solidez 7/10│       │
│ │ Utilidades pendientes: $22,033,479  Solidez 9/10│       │
│ │ Danos PI:            $55,000,000   Solidez 6/10│       │
│ │ TOTAL:              $317,033,479               │       │
│ └────────────────────────────────────────────────┘       │
│                                                          │
│ PRUEBAS MAS CONTUNDENTES (top 11)                        │
│ 1. P-01 Grabacion — confesion sociedad                   │
│ 2. P-11 Carta — "Subdirector Academico y Comercial"      │
│ ... (clickeables)                                        │
│                                                          │
│ CRONOLOGIA CLAVE                                         │
│ Abr 2024 ──── Ago 2025 ──── Feb 2026                    │
│ Inicio        Ruptura        Conciliacion                │
└──────────────────────────────────────────────────────────┘
```

---

# 6. PASO DE BUILD: SCRIPT DE EXTRACCION (build/extract-data.js)

Este script Node.js es CRITICO. Procesa todos los archivos fuente y genera data.js.

## 6.1 Tareas del script

1. **Parsear HECHOS_DEMANDA_PARETOMED_2026.md:**
   - Extraer cada hecho (regex: `**HECHO [ORDINAL].**`)
   - Extraer capitulos (regex: `## CAPITULO [ROMANO]:`)
   - Extraer citas textuales (texto entre `*"..."*` o `*'...'*`)
   - Extraer pruebas vinculadas (regex: `**[P-XX]**` o `[P-XX]`)
   - Extraer notas para abogado (regex: `> **NOTA PARA EL ABOGADO`)
   - Generar resumen corto (primera oracion del hecho)

2. **Parsear indice de pruebas (inicio de HECHOS_DEMANDA):**
   - Extraer tabla de pruebas (P-01 a P-52)
   - Mapear cada prueba a sus archivos fuente (basado en tabla de la seccion 3 de este plan)

3. **Buscar fragmentos citados en documentos fuente:**
   - Para cada cita textual en cada hecho, buscar la linea exacta en los chats/transcripciones
   - Registrar: archivo_fuente, linea, contexto +-5 lineas
   - Si no se encuentra exactamente (por tildes/puntuacion), usar busqueda fuzzy

4. **Convertir chats .txt a .html con anclas:**
   - Cada linea del chat → `<div id="L{numero}" class="chat-line">`
   - Parsear formato: `DD/MM/YYYY, HH:MM a/p. m. - Nombre: mensaje`
   - NOTA: separadores de fecha mixtos (`/` y `\`), normalizar
   - Colorear por participante (Oscar = naranja, Pedro = azul, otros = gris)
   - Multimedia omitido → icono de imagen/video

5. **Convertir .md a .html:**
   - Usar markdown-it o similar
   - Agregar anclas por seccion (capitulos, hechos)
   - Preservar tablas y bloques de cita

6. **Para .docx:** Usar mammoth.js para convertir a HTML limpio

7. **Para .pdf:** Embeber con `<iframe>` o `<object>`, no convertir

8. **Para .xlsx:** Convertir a tabla HTML con SheetJS (xlsx)

## 6.2 Formato de busqueda en chats

El chat de WhatsApp tiene este formato por linea:
```
DD/MM/YYYY, HH:MM a. m.|p. m. - NombreContacto: texto del mensaje
```

Reglas de parseo:
- La fecha puede usar `/` o `\` como separador
- Lineas que NO empiezan con fecha son continuacion del mensaje anterior
- `<Multimedia omitido>` = archivo adjunto no exportado
- Los nombres de contacto son: `Oscar Maldonado Paretomed`, `Pedro Vergara`, `~Paretomed` (business), etc.

---

# 7. MAPEO COMPLETO: HECHOS → FRAGMENTOS → LINEAS EN DOCUMENTOS

Este es el trabajo mas importante. Para cada hecho que contiene una cita textual entre comillas, el build script debe localizar esa cita en el archivo fuente correspondiente.

## 7.1 Fragmentos clave ya localizados (para validar el build)

| Hecho | Cita | Archivo | Linea aprox. |
|---|---|---|---|
| H18 | "Ingresos: 10,889,303. Egresos: 3,872,653..." | chat-oscar | ~linea para 07/05/2024 |
| H22 | "si claramente estaba implicito que tu ibas a formar parte de la SAS" | transcripciones | buscar |
| H22 | "los abogados y contadores me dijeron... sociedad de hecho" | transcripciones | buscar |
| H23 | "tenemos que reunirnos para que hablemos bien de las condiciones" | chat-oscar | ~01/07/2024 |
| H23 | "yo voy pa lante con la sociedad" | chat-oscar | ~28/11/2024 |
| H24 | "yo soy socio, no trabajador tuyo" | chat-oscar | ~18/07/2025 |
| H25 | "discusiones verbales iniciales" | (documento Word P-09) | N/A |
| H47 | "mera formalidad" | transcripciones | buscar |
| H47 | "alguien que sepa que eso es suyo tambien" | transcripciones | buscar |
| H50 | "me sacaron de la cuenta de paretomed@gmail.com" | chat-oscar | ~01/08/2025 |
| H56 | "yo me guio de la hoja de calculo personal mia" | chat-oscar | linea 20658 |
| H56 | "Joda, no tengo porque hacerlo y me ofende" | chat-oscar | ~05/08/2025 |

## 7.2 Estrategia de busqueda fuzzy

Las citas en HECHOS_DEMANDA a veces NO son identicas al texto del chat (tildes removidas, puntuacion ajustada). El script debe:

1. Normalizar: quitar tildes, bajar a minusculas, quitar puntuacion extra
2. Buscar substring mas largo que matchee (al menos 60% de la cita)
3. Si hay multiples matches, preferir el que este en la fecha indicada en el hecho
4. Registrar confianza del match: "exacto", "fuzzy", "no encontrado"
5. Si no se encuentra, dejar linea = null y el fragmento se mostrara sin link a documento

---

# 8. INTERACCIONES DETALLADAS

## 8.1 Click en hecho cerrado → se expande

1. Animar apertura (slide-down, 200ms)
2. Mostrar texto completo del hecho
3. Mostrar fragmentos clave en bloques estilizados
4. Mostrar tags de pruebas como chips clickeables
5. Si hay nota para abogado, mostrar en bloque destacado (fondo amarillo claro)

## 8.2 Click en "Ver en documento original" (desde fragmento)

1. Abrir nueva pestana del navegador con: `docs/chat-oscar-pedro.html#L20658`
2. La pagina del documento:
   - Carga el HTML pre-generado del chat completo
   - Hace scroll automatico a `#L20658`
   - Aplica clase CSS `.highlighted` a la linea (fondo amarillo, borde izquierdo naranja)
   - Muestra contexto de +-20 lineas visibles en viewport
   - Barra superior fija con: boton Volver, nombre del documento, indicador de posicion
3. El abogado puede scrollear libremente para leer mas contexto
4. Busqueda local (input en barra superior) que resalta matches y permite navegar con flechas

## 8.3 Click en tag de prueba (P-XX)

1. Si esta en tab Hechos: scroll suave a la prueba (cambia a tab Pruebas)
2. Despliega automaticamente esa prueba
3. Muestra todos los extractos y documentos vinculados

## 8.4 Click en prueba → desplegar

1. Mostrar descripcion completa
2. Listar extractos clave con citas
3. Mostrar hechos que la referencian (chips clickeables, llevan de vuelta)
4. Boton para abrir cada archivo fuente asociado:
   - .txt/.html → visor de documento con highlight
   - .pdf → abrir PDF en nueva pestana (embebido o nativo del navegador)
   - .xlsx → abrir tabla HTML renderizada
   - .docx → abrir HTML convertido por mammoth.js
   - .jpg/.jpeg → abrir imagen en nueva pestana/lightbox

## 8.5 Busqueda global

1. Input en barra superior, busca en:
   - Texto de hechos
   - Descripcion de pruebas
   - Fragmentos/citas
2. Resultados agrupados por tipo: "3 hechos, 2 pruebas"
3. Al seleccionar un resultado, navega y resalta el match
4. Debounce de 300ms en el input

## 8.6 Deep linking (URLs compartibles)

- `#hecho-18` → abre tab Hechos, scrollea a H18, lo expande
- `#prueba-P-01` → abre tab Pruebas, scrollea a P-01, lo expande
- `#doc/chat-oscar/L20658` → abre visor de documento en linea 20658
- Los abogados pueden copiar y pegar URLs para referenciarse entre ellos

---

# 9. DATOS DEL CHAT DEL PRIMO (P-49) — PARA INTEGRAR

El chat en `chat con primo de pedro texto capturas y documentos/` contiene:

**Hechos relevantes extraidos:**
1. **Fecha:** 10 de febrero de 2026
2. **"Carlos Vargas"** (primo de Pedro) contacto a ParetoMed simulando interes
3. **Isabella** (nueva asesora, no Adriana) atendio — ParetoMed tiene personal nuevo post-ruptura
4. **Precios actuales (feb 2026):** Plan basico 3 meses = $2,100,000 / Plan plus 4 meses = $3,600,000 (con promo 5 meses por pago contado = $2,650,000) / Plan premium 6 meses = $6,300,000
5. **CRITICO:** Al pedir certificado bancario para transferencia, Adriana (no Isabella) envio certificado con **contrasena: 1129573046** (= CC de Oscar Maldonado). La cuenta es la PERSONAL de Oscar, NO de NETMED S.A.S.
6. Esto confirma que en febrero 2026, 4 meses despues de constituir NETMED, los ingresos de ParetoMed SIGUEN yendo a la cuenta personal de Oscar

**Archivos adjuntos:**
- `00000018-PHOTO-2026-02-10-16-01-26.jpg` → Imagen con tabla de precios ParetoMed (3 planes)
- `00000044-Certificado_20260210.pdf` → Certificado bancario cuenta personal Oscar

**NOTA CONFIDENCIAL:** No revelar en la web que "Carlos Vargas" es primo de Pedro. Presentar como "persona que contacto a ParetoMed en febrero 2026" o simplemente como la prueba P-49 sin explicar el origen.

---

# 10. ESTILOS Y DISENO VISUAL

## 10.1 Paleta de colores

| Uso | Color | Hex |
|---|---|---|
| Primario (barra, titulos) | Azul marino oscuro | #1a2332 |
| Acento | Naranja ParetoMed | #e67e22 |
| Fondo pagina | Gris muy claro | #f8f9fa |
| Fondo tarjetas | Blanco | #ffffff |
| Texto principal | Gris oscuro | #2c3e50 |
| Highlight (fragmento resaltado) | Amarillo claro | #fff3cd |
| Borde highlight | Naranja | #e67e22 |
| Nota abogado | Azul claro fondo | #d1ecf1 |
| Prueba tipo chat | Verde | #28a745 |
| Prueba tipo audio | Morado | #6f42c1 |
| Prueba tipo documento | Azul | #007bff |
| Prueba tipo certificacion | Dorado | #ffc107 |
| Prueba tipo financiero | Rojo oscuro | #dc3545 |
| Prueba tipo testimonial | Teal | #20c997 |

## 10.2 Tipografia

- Titulos: system-ui, -apple-system, sans-serif (peso 600-700)
- Cuerpo: misma familia, peso 400
- Citas textuales: Georgia, serif, italica, fondo gris claro
- Codigo/lineas de chat: monospace (Consolas, Monaco, monospace)
- Tamano base: 15px (legible para abogados, no tiny)

## 10.3 Responsividad

- Desktop-first (los abogados usaran laptop/monitor)
- Min-width util: 900px
- El visor de documentos debe aprovechar todo el ancho
- En tablets: colapsar sidebar si existe, mantener funcionalidad

---

# 11. CONSIDERACIONES TECNICAS

## 11.1 Performance

- El chat de Oscar tiene 32,039 lineas (~2.9 MB de HTML generado). Opciones:
  - **Opcion A (recomendada):** Virtual scrolling — solo renderizar las ~100 lineas visibles + buffer. Usar libreria como `virtual-scroller` o implementar con IntersectionObserver.
  - **Opcion B:** Paginar en bloques de 500 lineas con lazy loading
  - **NO** cargar 32K divs de golpe — el DOM se congela

- Las 376 imagenes de comprobantes (27MB) son opcionales. Si se incluyen, usar lazy loading con `loading="lazy"`.

## 11.2 Archivos DOCX

- Usar mammoth.js (npm: mammoth) para convertir .docx → HTML en el paso de build
- Los archivos .docx no se pueden servir directamente en el navegador
- Alternativa: convertir a PDF en build y servir como PDF

## 11.3 Archivos XLSX

- Usar SheetJS (npm: xlsx) para leer hojas y generar tablas HTML en build
- Los archivos relevantes son:
  - COMPROBANTES_PARETOMED_ANALISIS.xlsx (376 filas)
  - Copia de KPIS 2025.xlsx (12 meses)
  - Ambos son pequenos, la tabla HTML resultante sera manejable

## 11.4 PDFs

- Embeber con `<iframe src="archivo.pdf">` — funciona en todos los navegadores modernos
- Alternativa: usar pdf.js para renderizado custom (probablemente innecesario)

## 11.5 Despliegue

- **Opcion 1 (mas simple):** `npx serve .` en localhost — el abogado abre en su navegador
- **Opcion 2:** Netlify/Vercel con password protection
- **Opcion 3:** GitHub Pages privado (requiere repo privado)
- Todo el sitio debe funcionar SIN servidor — es 100% estatico post-build

---

# 12. ESTRUCTURA DE ARCHIVOS FINALES DEL PROYECTO

```
paretomed-evidencia/
├── package.json                  ← Dependencias: mammoth, xlsx, markdown-it, glob
├── build/
│   ├── extract-data.js           ← Script principal de build
│   ├── parse-chat.js             ← Parser de formato WhatsApp → HTML
│   ├── parse-hechos.js           ← Parser de HECHOS_DEMANDA.md → JSON
│   ├── convert-docs.js           ← Conversor .docx/.xlsx → HTML
│   └── find-fragments.js         ← Buscador de fragmentos citados en fuentes
├── src/
│   ├── index.html                ← SPA principal
│   ├── viewer.html               ← Template del visor de documentos
│   ├── styles/
│   │   ├── main.css              ← Estilos principales (acordeones, tabs, tags)
│   │   ├── viewer.css            ← Estilos del visor de documentos
│   │   └── chat.css              ← Estilos especificos para chats (colores por persona)
│   └── scripts/
│       ├── app.js                ← Logica SPA (tabs, acordeones, busqueda, deep-links)
│       ├── viewer.js             ← Logica visor (scroll-to, highlight, busqueda local)
│       └── data.js               ← (generado por build)
├── dist/                         ← Output del build (servir esto)
│   ├── index.html
│   ├── viewer.html
│   ├── styles/
│   ├── scripts/
│   ├── docs/                     ← HTMLs generados de chats, transcripciones, docs
│   └── assets/                   ← PDFs, imagenes copiadas
├── source/                       ← COPIAR AQUI los archivos originales del caso
│   ├── (todos los .txt, .md, .docx, .pdf, .xlsx, .jpg del directorio del caso)
│   └── chat-primo/               ← Subcarpeta del chat del primo
└── README.md
```

---

# 13. INSTRUCCIONES PARA LA IA PROGRAMADORA

## Paso 1: Configurar proyecto
```bash
mkdir paretomed-evidencia && cd paretomed-evidencia
npm init -y
npm install mammoth xlsx markdown-it glob
```

## Paso 2: Copiar archivos fuente
Copiar todo el contenido de `c:\Users\Usuario\Documents\Carpeta Oscar Maldonado\` a `source/`.

## Paso 3: Implementar build scripts (en orden)
1. `parse-chat.js` — parsea los 4 chats .txt a HTML con anclas por linea
2. `parse-hechos.js` — parsea HECHOS_DEMANDA.md extrayendo hechos, capitulos, citas, pruebas
3. `convert-docs.js` — convierte .docx a HTML, .xlsx a tablas HTML, copia PDFs e imagenes
4. `find-fragments.js` — busca cada cita textual en los documentos fuente, registra lineas
5. `extract-data.js` — orquesta todo y genera data.js final

## Paso 4: Implementar frontend
1. `index.html` + `main.css` — layout con tabs
2. Tab Hechos: acordeones por capitulo, hechos desplegables
3. Tab Pruebas: lista filtrable con desplegables
4. Tab Documentos: arbol de archivos con links
5. Tab Resumen: dashboard con metricas y cronologia
6. `app.js` — logica de interaccion, deep linking, busqueda
7. `viewer.html` + `viewer.js` — visor de documentos con highlight

## Paso 5: Testing
- Verificar que TODOS los 64 hechos aparecen y son desplegables
- Verificar que las 52 pruebas aparecen con sus archivos
- Verificar que al menos 10 fragmentos clave navegan correctamente al documento original
- Verificar que los PDFs se abren
- Verificar deep links (#hecho-18, #prueba-P-01)
- Verificar busqueda global

---

# 14. PRIORIDADES DE IMPLEMENTACION

| Prioridad | Feature | Justificacion |
|---|---|---|
| P0 (critico) | Hechos desplegables con texto completo | Core del producto |
| P0 (critico) | Fragmentos clave con citas resaltadas | Core del producto |
| P0 (critico) | Link "Ver en documento original" → visor con highlight | Core del producto |
| P0 (critico) | Pruebas desplegables con extractos | Core del producto |
| P1 (importante) | Visor de chats con scroll virtual (32K lineas) | Performance |
| P1 (importante) | Build script parse chats + find fragments | Automatizacion |
| P1 (importante) | Filtros de pruebas por tipo | Usabilidad |
| P1 (importante) | Deep linking (URLs compartibles) | Colaboracion abogados |
| P2 (nice to have) | Busqueda global | Conveniencia |
| P2 (nice to have) | Tab Resumen/Dashboard | Vista ejecutiva |
| P2 (nice to have) | Visor de PDFs embebido | Ya funciona nativo en browser |
| P3 (opcional) | 376 comprobantes individuales navegables | Volumen excesivo |
| P3 (opcional) | Cronologia visual interactiva | Estetica |

---

# 15. DATOS CLAVE PARA EL BUILD (referencia rapida)

**Nombres de participantes en chats:**
- `Oscar Maldonado Paretomed` (demandado)
- `Pedro Vergara` (demandante)
- `~Paretomed` (cuenta business WhatsApp)
- `Carlos Vargas` (primo, en chat-primo)
- Otros en chat equipo: Adriana, Isabella, etc.

**Formato fecha WhatsApp (REGEX):**
```regex
^(\d{1,2})[/\\](\d{1,2})[/\\](\d{4}),\s+(\d{1,2}):(\d{2})\s+(a\.\s*m\.|p\.\s*m\.)\s*-\s*(.+?):\s*(.*)$
```

**Total hechos:** 64 (PRIMERO a SEXAGESIMOCUARTO)
**Total pruebas:** 52 (P-01 a P-52)
**Total capitulos:** 16 (I a XVI)
**Total documentos fuente unicos:** ~40 archivos

---

**Elaborado por:** Sesion de Claude Code (Opus 4.6)
**Fecha:** 8 de abril de 2026
