const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const parseChat = require('./parse-chat');
const convertDocs = require('./convert-docs');
const parseHechos = require('./parse-hechos');
const findFragments = require('./find-fragments');

const md = new MarkdownIt({ breaks: true, linkify: true });

const OUTPUT_DATA_FILE = path.join(__dirname, '../src/scripts/data.js');

async function main() {
    console.log("=== INICIANDO BUILD DEL PORTAL DE EVIDENCIA ===");
    
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
        const hNum = finalData.hechos[hId].numero;
        if (CURATED[hNum] && CURATED[hNum].extractos && CURATED[hNum].extractos.length > 0) {
            // Reemplazar fragmentos automáticos con los curados
            finalData.hechos[hId].fragmentos_clave = CURATED[hNum].extractos.map(e => ({
                cita: e.cita,
                fuente: e.fuente === "chat-oscar" ? "chat-oscar-pedro" : e.fuente,
                linea: e.linea || null,
                fecha: e.fecha || null,
                autor: e.autor || null,
                relevancia: e.relevancia || null
            }));
        }
    }

    // 4.2 INYECTAR TÍTULOS CURADOS
    const TITLES = require('./hecho-titles');
    for (const hId in finalData.hechos) {
        const hNum = finalData.hechos[hId].numero;
        if (TITLES[hNum]) {
            finalData.hechos[hId].titulo_corto = TITLES[hNum];
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
        "chat-primo": {
          id: "chat-primo", titulo: "Chat: Contacto ParetoMed (Feb 2026)",
          archivo_html: "docs/chat-primo.html", tipo: "chat"
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
                    ruta: 'raw_source/' + relativePath,
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
