const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const parseChat = require('./parse-chat');
const convertDocs = require('./convert-docs');
const parseHechos = require('./parse-hechos');
const findFragments = require('./find-fragments');
const DOCUMENT_REGISTRY = require('./document-registry');
const { getRawOutputForSource } = require('./path-utils');

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
    const merged = new Map();
    (values || []).forEach(fragment => {
        const key = [
            fragment.cita || '',
            fragment.fuente || '',
            fragment.linea || '',
            fragment.fecha || ''
        ].join('|');

        const existing = merged.get(key) || {};
        merged.set(key, {
            ...existing,
            ...fragment,
            cita: fragment.cita || existing.cita || null,
            cita_exacta: fragment.cita_exacta || existing.cita_exacta || null,
            fuente: fragment.fuente || existing.fuente || null,
            linea: fragment.linea ?? existing.linea ?? null,
            fecha: fragment.fecha || existing.fecha || null,
            autor: fragment.autor || existing.autor || null,
            relevancia: fragment.relevancia || existing.relevancia || null
        });
    });
    return [...merged.values()];
}

function sanitizeLegacyPortalPath(value) {
    if (typeof value !== 'string' || value.length === 0) return value;
    return value
        .replace(/\\/g, '/')
        .replace(/^\.\//, '')
        .replace(/^(?:\.\.\/)?dist\//, '');
}

function sanitizePathList(values) {
    if (!Array.isArray(values) || values.length === 0) return null;
    return values.map(sanitizeLegacyPortalPath).filter(Boolean);
}

function sanitizeDocumentRegistry(registry) {
    const sanitized = {};

    for (const [docId, docEntry] of Object.entries(registry || {})) {
        sanitized[docId] = {
            ...docEntry,
            archivo_html: sanitizeLegacyPortalPath(docEntry.archivo_html)
        };
    }

    return sanitized;
}

function resolveByFactId(collection, hecho) {
    if (!collection || !hecho) return null;
    return collection[hecho.id] || collection[hecho.numero] || null;
}

function ensureEvidenceMapCoverage(canonicalCatalog, evidenceMap) {
    const canonicalIds = Object.keys(canonicalCatalog || {}).sort();
    const evidenceIds = Object.keys(evidenceMap || {}).sort();

    const missingIds = canonicalIds.filter(id => !evidenceMap[id]);
    const extraIds = evidenceIds.filter(id => !canonicalCatalog[id]);

    if (missingIds.length || extraIds.length) {
        if (missingIds.length) {
            console.error(`[X] Evidence map incompleto. Faltan IDs canónicos: ${missingIds.join(', ')}`);
        }
        if (extraIds.length) {
            console.error(`[X] Evidence map contiene IDs no canónicos: ${extraIds.join(', ')}`);
        }
        throw new Error('Evidence map desincronizado con el catálogo canónico de pruebas.');
    }
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
                cita_exacta: e.cita_exacta || null,
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
    finalData.documentos = sanitizeDocumentRegistry(DOCUMENT_REGISTRY);

    // 4.6 INYECTAR EVIDENCE MAP ENRIQUECIDO
    const evidenceMap = require('./evidence-map');
    ensureEvidenceMapCoverage(finalData.pruebas_catalogo, evidenceMap);

    // Formato para frontend: pruebas_urls mantiene compatibilidad, pruebas_meta tiene metadata
    finalData.pruebas_urls = {};
    finalData.pruebas_meta = {};
    const orderedProofIds = Object.keys(finalData.pruebas_catalogo || {}).sort();
    for (const pId of orderedProofIds) {
        const pData = evidenceMap[pId] || {};
        const canonicalMeta = finalData.pruebas_catalogo[pId] || {};

        finalData.pruebas_urls[pId] = {
            html: sanitizeLegacyPortalPath(pData.html) || null,
            raw: sanitizeLegacyPortalPath(pData.raw) || null,
            multiplehtml: sanitizePathList(pData.multiplehtml),
            multipleraw: sanitizePathList(pData.multipleraw)
        };
        finalData.pruebas_meta[pId] = {
            descripcion: canonicalMeta.descripcion || pData.desc || null,
            tipo: canonicalMeta.tipo || pData.tipo || null,
            categoria: pData.cat || canonicalMeta.categoria || null
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
                    ruta: sanitizeLegacyPortalPath(getRawOutputForSource(relativePath)),
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
