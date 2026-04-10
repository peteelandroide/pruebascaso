const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const parseChat = require('./parse-chat');
const convertDocs = require('./convert-docs');
const parseHechos = require('./parse-hechos');
const findFragments = require('./find-fragments');
const {
    getAssetOutputForSource,
    getHtmlOutputForSource,
    getRawOutputForSource
} = require('./path-utils');

const md = new MarkdownIt({ breaks: true, linkify: true });

const OUTPUT_DATA_FILE = path.join(__dirname, '../src/scripts/data.js');
const DIST_DIR = path.join(__dirname, '../dist');

function resetGeneratedDirs() {
    ['docs', 'assets', 'raw_source'].forEach(dirName => {
        const target = path.join(DIST_DIR, dirName);
        fs.rmSync(target, { recursive: true, force: true });
        fs.mkdirSync(target, { recursive: true });
    });
}

function uniqueStrings(values) {
    return [...new Set((values || []).filter(Boolean))];
}

function uniqueFragments(values) {
    const seen = new Set();
    return (values || []).filter(fragment => {
        const key = [
            fragment.cita || '',
            fragment.fuente || '',
            fragment.linea || '',
            fragment.fecha || ''
        ].join('|');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function resolveByFactId(collection, hecho) {
    if (!collection || !hecho) return null;
    return collection[hecho.id] || collection[hecho.numero] || null;
}

async function main() {
    console.log("=== INICIANDO BUILD DEL PORTAL DE EVIDENCIA ===");

    resetGeneratedDirs();
    
    // 1. Convertir chats a HTML (para el modo lectura estático)
    parseChat.run();

    // 2. Convertir docx, xlsx, y copiar ASSETS (pdf, jpg, etc)
    await convertDocs.run();

    // 3. Parsear el archivo HECHOS_DEMANDA...md
    const baseObj = parseHechos.parseHechos();
    if (!baseObj) {
        console.error("No se pudo extraer la data base. Abortando.");
        process.exit(1);
    }

    // 4. Buscar fragmentos automáticos (fallback)
    const finalData = findFragments.searchFragmentsInDocs(baseObj);

    // 4.1 INYECTAR FRAGMENTOS CURADOS MANUALMENTE
    const CURATED = require('./curated-fragments');
    for (const hId in finalData.hechos) {
        const hecho = finalData.hechos[hId];
        const curatedEntry = resolveByFactId(CURATED, hecho);
        if (curatedEntry && curatedEntry.extractos && curatedEntry.extractos.length > 0) {
            const curatedFragments = curatedEntry.extractos.map(e => ({
                cita: e.cita,
                fuente: e.fuente === "chat-oscar" ? "chat-oscar-pedro" : e.fuente,
                linea: e.linea || null,
                fecha: e.fecha || null,
                autor: e.autor || null,
                relevancia: e.relevancia || null
            }));
            hecho.fragmentos_clave = uniqueFragments([
                ...curatedFragments,
                ...(hecho.fragmentos_clave || [])
            ]);
        }
    }

    // 4.1b SEGUNDA PASADA: buscar lineas para fragmentos curados sin linea
    findFragments.fillMissingLines(finalData);

    // 4.2 INYECTAR TÍTULOS CURADOS
    const TITLES = require('./hecho-titles');
    for (const hId in finalData.hechos) {
        const hecho = finalData.hechos[hId];
        const title = resolveByFactId(TITLES, hecho);
        if (title) {
            hecho.titulo_corto = title;
        }
    }

    // 4.5. Renderizar texto completo de Markdown a HTML
    for (const hId in finalData.hechos) {
        if (finalData.hechos[hId].texto_completo) {
            finalData.hechos[hId].texto_completo_html = md.render(finalData.hechos[hId].texto_completo);
        }
        if (finalData.hechos[hId].nota_abogado) {
            finalData.hechos[hId].nota_abogado_html = md.render(finalData.hechos[hId].nota_abogado);
        }
    }

    // Complementar JSON base con docs
    finalData.documentos = {
        "chat-oscar-pedro": {
          id: "chat-oscar-pedro", titulo: "Chat WhatsApp: Oscar - Pedro",
          archivo_html: "docs/chat-oscar-pedro.html", tipo: "chat"
        },
        "chat-equipo": {
          id: "chat-equipo", titulo: "Chat WhatsApp: Equipo de Trabajo",
          archivo_html: "docs/chat-equipo.html", tipo: "chat"
        },
        "chat-correcciones": {
            id: "chat-correcciones", titulo: "Chat WhatsApp: Correcciones",
            archivo_html: "docs/chat-correcciones.html", tipo: "chat"
        },
        "transcripciones": {
          id: "transcripciones", titulo: "Transcripciones Consolidadas",
          archivo_html: "docs/transcripciones.html", tipo: "transcripcion"
        },
        "grabacion-llamada-oscar-250814": {
          id: "grabacion-llamada-oscar-250814", titulo: "Grabación telefónica Oscar 14/08/2025 — prueba reina",
          archivo_html: "docs/grabacion-llamada-oscar-paretomed-250814-184648-original.html", tipo: "transcripcion"
        },
        "chat-primo": {
          id: "chat-primo", titulo: "Chat: Contacto ParetoMed (Feb 2026)",
          archivo_html: "docs/chat-primo.html", tipo: "chat"
        },
        "doc-carta-recomendacion": {
          id: "doc-carta-recomendacion", titulo: "Carta de recomendación firmada",
          archivo_html: getHtmlOutputForSource('Paretomed - Educación Médica carta de recomendación.docx'), tipo: "documento"
        },
        "doc-borrador-acuerdo-pedro": {
          id: "doc-borrador-acuerdo-pedro", titulo: "Borrador acuerdo original de Pedro (06/02/2024)",
          archivo_html: getHtmlOutputForSource('BORRADOR ACUERDO ORIGINAL DE PEDRO FECHADO 6 DE FEBRERO 2024.docx'), tipo: "documento"
        },
        "doc-contrato-cp": {
          id: "doc-contrato-cp", titulo: "Contrato de Cuentas en Participación",
          archivo_html: getHtmlOutputForSource('Contrato de Cuentas en Participación Paretomed  APORTADO POR OSCAR VIERNES 22 DE AGOSTO 2025 NUNCA FIRMADO.docx'), tipo: "documento"
        },
        "doc-camara-comercio-doctor-flight": {
          id: "doc-camara-comercio-doctor-flight", titulo: "Certificado Cámara de Comercio Doctor Flight S.A.S.",
          archivo_html: getAssetOutputForSource('certificado EMPRESA PEDRO.pdf'), tipo: "certificacion"
        },
        "doc-sop-reunion": {
          id: "doc-sop-reunion", titulo: "SOP Reunión 1:1",
          archivo_html: getHtmlOutputForSource('SOP REUNION 1_1 REDACTADO 5 DE JUNIO 2024 POR PEDRO.docx'), tipo: "documento"
        },
        "doc-reels-guiones": {
          id: "doc-reels-guiones", titulo: "Reels y guiones 2025",
          archivo_html: getHtmlOutputForSource('Reels y guiones 2025.docx'), tipo: "documento"
        },
        "doc-certificado-dnda": {
          id: "doc-certificado-dnda", titulo: "Certificado DNDA de obras",
          archivo_html: getAssetOutputForSource('Certificado Obras Pedro Vergara.pdf'), tipo: "certificacion"
        },
        "doc-acuerdo-aportes": {
          id: "doc-acuerdo-aportes", titulo: "Acuerdo con aportes de ambos y notas manuscritas",
          archivo_html: getHtmlOutputForSource('acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO APORTADO EN JULIO 2024.docx'), tipo: "documento"
        },
        "doc-hechos": {
          id: "doc-hechos", titulo: "Hechos demanda ParetoMed 2026",
          archivo_html: getRawOutputForSource('HECHOS_DEMANDA_PARETOMED_2026.md'), tipo: "markdown"
        },
        "doc-reuniones": {
          id: "doc-reuniones", titulo: "Investigación demanda ParetoMed 2026",
          archivo_html: getRawOutputForSource('INVESTIGACION_DEMANDA_PARETOMED_2026.md'), tipo: "markdown"
        },
        "doc-acuerdo-original": {
          id: "doc-acuerdo-original", titulo: "Acuerdo de socios original",
          archivo_html: getHtmlOutputForSource('acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO.docx'), tipo: "documento"
        },
        "doc-acuerdo-sas": {
          id: "doc-acuerdo-sas", titulo: "Hechos demanda ParetoMed 2026",
          archivo_html: getRawOutputForSource('HECHOS_DEMANDA_PARETOMED_2026.md'), tipo: "markdown"
        },
        "doc-transaccion-oscar": {
          id: "doc-transaccion-oscar", titulo: "Contrato de transacción propuesto por Oscar",
          archivo_html: getAssetOutputForSource('Contrato de transacción No.10.09.2025.pdf'), tipo: "documento"
        },
        "doc-transaccion-pedro": {
          id: "doc-transaccion-pedro", titulo: "Contrapropuesta de transacción Doctor Flight",
          archivo_html: getHtmlOutputForSource('Contrato de Transacción Dr. Flight 141025.docx'), tipo: "documento"
        },
        "doc-politica-web": {
          id: "doc-politica-web", titulo: "Documento ejecutivo para abogado Toledo",
          archivo_html: getRawOutputForSource('DOCUMENTO_EJECUTIVO_PARA_ABOGADO_TOLEDO.md'), tipo: "markdown"
        },
        "doc-camara-comercio": {
          id: "doc-camara-comercio", titulo: "Certificado Cámara de Comercio ParetoMed",
          archivo_html: getAssetOutputForSource('certificado OSCAR.pdf'), tipo: "certificacion"
        },
        "doc-constancia-conciliacion": {
          id: "doc-constancia-conciliacion", titulo: "Constancia de no conciliación",
          archivo_html: getAssetOutputForSource('CONSTANCIA DE NO CONCILIACIÓN N° 00-1844 REGISTRADA.pdf'), tipo: "certificacion"
        },
        "doc-valoracion": {
          id: "doc-valoracion", titulo: "Valuación ParetoMed 2026",
          archivo_html: getRawOutputForSource('VALUACION_PARETOMED_2026.md'), tipo: "markdown"
        },
        "doc-kpis-2025": {
          id: "doc-kpis-2025", titulo: "KPIs 2025 ParetoMed",
          archivo_html: getHtmlOutputForSource('Copia de KPIS 2025 .xlsx'), tipo: "financiero"
        },
        "doc-pagos-bancolombia": {
          id: "doc-pagos-bancolombia", titulo: "Capturas Bancolombia pagos a Pedro",
          archivo_html: getAssetOutputForSource('PAGOS 1.jpeg'), tipo: "financiero"
        },
        "doc-reunion-14jul": {
          id: "doc-reunion-14jul", titulo: "Hechos demanda ParetoMed 2026",
          archivo_html: getRawOutputForSource('HECHOS_DEMANDA_PARETOMED_2026.md'), tipo: "markdown"
        },
        "doc-comprobantes-excel": {
          id: "doc-comprobantes-excel", titulo: "Comprobantes ParetoMed análisis",
          archivo_html: getHtmlOutputForSource('COMPROBANTES_PARETOMED_ANALISIS.xlsx'), tipo: "financiero"
        },
        "doc-analisis-comprobantes": {
          id: "doc-analisis-comprobantes", titulo: "Análisis fiscal financiero ParetoMed 2026",
          archivo_html: getRawOutputForSource('ANALISIS_FISCAL_FINANCIERO_PARETOMED_2026.md'), tipo: "markdown"
        },
        "doc-proyeccion-financiera": {
          id: "doc-proyeccion-financiera", titulo: "Análisis fiscal financiero ParetoMed 2026",
          archivo_html: getRawOutputForSource('ANALISIS_FISCAL_FINANCIERO_PARETOMED_2026.md'), tipo: "markdown"
        },
        "doc-facturas-avanz": {
          id: "doc-facturas-avanz", titulo: "Factura comparativa Avanz",
          archivo_html: getAssetOutputForSource('FE1 (AVANZ OTRO CLIENTE CON CONCEPTO DISTINTO).pdf'), tipo: "financiero"
        },
        "doc-facturas-doctor-flight": {
          id: "doc-facturas-doctor-flight", titulo: "Cuentas de cobro y facturas Doctor Flight",
          archivo_html: getHtmlOutputForSource('CUENTAS DE COBRO PEDRO VERGARA.docx'), tipo: "financiero"
        },
        "doc-analisis-fiscal": {
          id: "doc-analisis-fiscal", titulo: "Análisis jurídico de solidez del caso",
          archivo_html: getRawOutputForSource('ANALISIS_JURIDICO_SOLIDEZ_DEL_CASO.md'), tipo: "markdown"
        }
    };

    // 4.6 INYECTAR EVIDENCE MAP ENRIQUECIDO
    const evidenceMap = require('./evidence-map');
    // Formato para frontend: pruebas_urls mantiene compatibilidad, pruebas_meta tiene metadata
    finalData.pruebas_urls = {};
    finalData.pruebas_meta = {};
    for (const [pId, pData] of Object.entries(evidenceMap)) {
        finalData.pruebas_urls[pId] = {
            html: pData.html || null,
            raw: pData.raw || null,
            multipleraw: pData.multipleraw || null
        };
        finalData.pruebas_meta[pId] = {
            descripcion: pData.desc,
            tipo: pData.tipo,
            categoria: pData.cat
        };
    }

    for (const hecho of Object.values(finalData.hechos || {})) {
        hecho.pruebas = uniqueStrings(hecho.pruebas);
        hecho.fragmentos_clave = uniqueFragments(hecho.fragmentos_clave);
    }

    // --- NUEVO: Extraer lista de archivos crudos para Descarga directa ---
    const RAW_SOURCE_DIR = path.join(__dirname, '../source');
    finalData.archivos_crudos = [];
    
    function scanDir(dirPath, baseDir) {
        let results = [];
        const items = fs.readdirSync(dirPath);
        for (const item of items) {
            const itemPath = path.join(dirPath, item);
            const stat = fs.statSync(itemPath);
            if (stat.isDirectory()) {
                results = results.concat(scanDir(itemPath, baseDir));
            } else {
                const relativePath = path.relative(baseDir, itemPath).replace(/\\/g, '/');
                results.push({
                    nombre: path.basename(itemPath),
                    ruta: getRawOutputForSource(relativePath),
                    tamano: stat.size
                });
            }
        }
        return results;
    }
    finalData.archivos_crudos = scanDir(RAW_SOURCE_DIR, RAW_SOURCE_DIR);

    // 5. Escribir data.js que el frontend SPA utilizará
    const jsContent = `const CASE_DATA = ${JSON.stringify(finalData, null, 2)};`;
    
    // Asegurar directorio
    const SCRIPTS_DIR = path.dirname(OUTPUT_DATA_FILE);
    if (!fs.existsSync(SCRIPTS_DIR)) {
        fs.mkdirSync(SCRIPTS_DIR, {recursive: true});
    }

    fs.writeFileSync(OUTPUT_DATA_FILE, jsContent);
    console.log(`[V] Data consolidada escrita en ${OUTPUT_DATA_FILE} (${Object.keys(finalData.hechos).length} hechos, ${finalData.capitulos.length} capítulos)`);
    console.log("=== BUILD FINALIZADO EXITOSAMENTE ===");
}

main().catch(console.error);
