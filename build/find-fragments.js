const fs = require('fs');
const path = require('path');
const { slugifyBaseName } = require('./path-utils');
const DOCUMENT_REGISTRY = require('./document-registry');

const SOURCE_DIR = path.join(__dirname, '../source');
const DIST_DIR = path.join(__dirname, '../dist');

function normalizeStr(str) {
    return str.toLowerCase()
              .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita tildes
              .replace(/[…]/g, " ")
              .replace(/[,.;:?!"'«»()\-]/g, " ") // quita puntuacion
              .replace(/\s+/g, " ")
              .trim();
}

function buildSearchNeedles(text) {
    const raw = String(text || '').trim();
    const needles = new Set();

    function addNeedle(value, minLength) {
        const normalized = normalizeStr(value);
        if (normalized.length >= minLength) {
            needles.add(normalized);
        }
    }

    addNeedle(raw, 5);
    raw.split(/(?:\.\.\.|…|\n)+/).forEach(part => addNeedle(part, 14));
    raw.split(/[.!?;:]+/).forEach(part => addNeedle(part, 18));

    const normalized = normalizeStr(raw);
    if (normalized.length > 90) {
        addNeedle(normalized.substring(0, 160), 40);
        addNeedle(normalized.slice(-160), 40);
    }

    return Array.from(needles).sort((a, b) => b.length - a.length);
}

function extractKeywords(text) {
    return Array.from(new Set(
        normalizeStr(text)
            .split(' ')
            .filter(token => token.length >= 4)
    ));
}

function isSubstantiveLine(line) {
    const raw = String(line?.original || '').trim();
    const normalized = normalizeStr(raw);
    return normalized.length >= 8 && !/^\d{2}:\d{2}$/.test(raw) && raw !== '.';
}

function getAnchorLine(lines) {
    return lines.find(isSubstantiveLine) || lines[0] || null;
}

function scoreLineWindow(lines, needles, keywords) {
    if (!lines.length) return null;

    const windowNorm = normalizeStr(lines.map(line => line.original).join(' '));
    if (!windowNorm) return null;

    const exactHits = needles.filter(needle => windowNorm.includes(needle));
    if (exactHits.length > 0) {
        return {
            score: exactHits.reduce((sum, needle) => sum + Math.min(needle.length, 220), 0) + (exactHits.length * 120),
            anchor: getAnchorLine(lines)
        };
    }

    if (keywords.length >= 4) {
        const hits = keywords.filter(keyword => windowNorm.includes(keyword));
        const ratio = hits.length / keywords.length;
        if (hits.length >= Math.min(4, keywords.length) && ratio >= 0.58) {
            return {
                score: Math.round(ratio * 100) + (hits.length * 8),
                anchor: getAnchorLine(lines)
            };
        }
    }

    return null;
}

function findBestLineWindowMatch(docLines, searchText, options = {}) {
    if (!docLines || !docLines.length) return null;

    const needles = buildSearchNeedles(searchText);
    const keywords = extractKeywords(searchText);
    const maxWindow = Math.min(options.maxWindow || 4, docLines.length);
    let bestMatch = null;

    for (let start = 0; start < docLines.length; start++) {
        for (let size = 1; size <= maxWindow && (start + size) <= docLines.length; size++) {
            const lines = docLines.slice(start, start + size);
            const scored = scoreLineWindow(lines, needles, keywords);
            if (!scored || !scored.anchor) continue;

            const candidate = {
                idx: scored.anchor.idx,
                score: scored.score - ((size - 1) * 4)
            };

            if (!bestMatch || candidate.score > bestMatch.score || (candidate.score === bestMatch.score && candidate.idx < bestMatch.idx)) {
                bestMatch = candidate;
            }
        }
    }

    return bestMatch;
}

function levenshteinDistance(s, t) {
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
        arr[i] = [i];
        for (let j = 1; j <= s.length; j++) {
            arr[i][j] = i === 0 ? j
                : Math.min(
                    arr[i - 1][j] + 1,
                    arr[i][j - 1] + 1,
                    arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
                );
        }
    }
    return arr[t.length][s.length];
}

// Mapeo fijo para archivos con IDs conocidos (chats, grabación)
const FIXED_IDS = {
    'Chat de WhatsApp con Oscar Maldonado Paretomed.txt': 'chat-oscar-pedro',
    'Chat de WhatsApp con Equipo de Trabajo - Paretomed 🟠.txt': 'chat-equipo',
    'Chat de WhatsApp con Correcciones y sugerencias PARETOMED.txt': 'chat-correcciones',
    'Grabación de llamada Oscar PARETOMED_250814_184648_original.txt': 'grabacion-llamada-oscar-250814',
    'TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt': 'transcripciones'
};

function decodeEntities(text) {
    return text
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function stripHtml(text) {
    return decodeEntities(
        String(text || '')
            .replace(/<br\s*\/?>/gi, ' ')
            .replace(/<[^>]+>/g, ' ')
    ).replace(/\s+/g, ' ').trim();
}

function loadTextSourcesCache() {
    const allFiles = fs.readdirSync(SOURCE_DIR).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ext === '.txt' && fs.statSync(path.join(SOURCE_DIR, f)).isFile();
    });

    const sourcesCache = {};
    for (const file of allFiles) {
        const id = FIXED_IDS[file] || slugifyBaseName(path.parse(file).name);
        const fp = path.join(SOURCE_DIR, file);
        const lineas = fs.readFileSync(fp, 'utf8').split('\n');
        sourcesCache[id] = lineas.map((txt, idx) => ({ idx: idx + 1, original: txt, norm: normalizeStr(txt) }));
    }

    return { allFiles, sourcesCache };
}

function loadHtmlDocumentCache() {
    const sourcesCache = {};
    const lineRegex = /<([a-z0-9]+)[^>]*id="L(\d+)"[^>]*>([\s\S]*?)<\/\1>/gi;

    for (const [docId, docMeta] of Object.entries(DOCUMENT_REGISTRY)) {
        if (!docMeta.archivo_html || !String(docMeta.archivo_html).startsWith('docs/')) continue;

        const fp = path.join(DIST_DIR, docMeta.archivo_html);
        if (!fs.existsSync(fp)) continue;

        const html = fs.readFileSync(fp, 'utf8');
        const lines = [];
        let match;

        while ((match = lineRegex.exec(html)) !== null) {
            const text = stripHtml(match[3]);
            if (!text) continue;
            lines.push({
                idx: Number(match[2]),
                original: text,
                norm: normalizeStr(text)
            });
        }

        if (lines.length) {
            sourcesCache[docId] = lines;
        }
    }

    return sourcesCache;
}

function searchFragmentsInDocs(hechosData) {
    console.log("Iniciando find-fragments.js (indexación universal)...");

    const { allFiles, sourcesCache } = loadTextSourcesCache();

    console.log(`[V] Archivos indexados para búsqueda: ${Object.keys(sourcesCache).length} (${allFiles.length} archivos)`);

    let foundCount = 0;
    let notFoundCount = 0;

    for (const hId of Object.keys(hechosData.hechos)) {
        const hecho = hechosData.hechos[hId];
        
        for (const frag of hecho.fragmentos_clave) {
            const searchText = frag.cita_exacta || frag.cita;
            const qNorm = normalizeStr(searchText);
            if (qNorm.length < 5) continue; // muy corto

            let bestMatch = null;
            let bestScore = 999;
            let bestSourceId = null;

            for (const sourceId of Object.keys(sourcesCache)) {
                const docLines = sourcesCache[sourceId];
                for (const line of docLines) {
                    if (line.norm.length < 5) continue;
                    
                    // Simple inclusion optimizada
                    if (line.norm.includes(qNorm)) {
                        bestMatch = line;
                        bestScore = 0;
                        bestSourceId = sourceId;
                        break;
                    }
                    
                    // Solo intentar distancia de levenshtein si los largos son parejos (asumimos fragmentos textuales)
                    if (Math.abs(line.norm.length - qNorm.length) < 20) {
                       const dist = levenshteinDistance(qNorm, line.norm);
                       if (dist < 4 && dist < bestScore) { // Permite errores sutiles (typos)
                           bestMatch = line;
                           bestScore = dist;
                           bestSourceId = sourceId;
                       }
                    }
                }
                if (bestScore === 0) break; // Perfect match
            }

            if (bestMatch) {
                foundCount++;
                frag.fuente = bestSourceId;
                frag.linea = bestMatch.idx;
                
                // Extraer un poco de contexto (3 lineas antes, 3 detras)
                const sData = sourcesCache[bestSourceId];
                frag.contexto_antes = sData.slice(Math.max(0, bestMatch.idx - 4), bestMatch.idx - 1).map(x => x.original);
                frag.contexto_despues = sData.slice(bestMatch.idx, Math.min(sData.length, bestMatch.idx + 3)).map(x => x.original);
            } else {
                notFoundCount++;
            }
        }
    }

    console.log(`[V] Búsqueda finalizada. Fragmentos encontrados: ${foundCount}. No encontrados: ${notFoundCount}`);
    return hechosData;
}

/**
 * Segunda pasada: para fragmentos curados que tienen fuente de texto indexable
 * pero sin linea, intentar encontrar la linea exacta.
 */
function fillMissingLines(hechosData) {
    const { sourcesCache: textSourcesCache } = loadTextSourcesCache();
    const htmlSourcesCache = loadHtmlDocumentCache();
    const sourcesCache = { ...htmlSourcesCache, ...textSourcesCache };

    let filled = 0;
    for (const hId of Object.keys(hechosData.hechos)) {
        const hecho = hechosData.hechos[hId];
        for (const frag of (hecho.fragmentos_clave || [])) {
            if (frag.linea) continue; // ya tiene linea
            if (!frag.fuente || !sourcesCache[frag.fuente]) continue; // fuente no indexable

            const searchText = frag.cita_exacta || frag.cita;
            const docLines = sourcesCache[frag.fuente];
            const bestMatch = findBestLineWindowMatch(docLines, searchText);
            if (bestMatch) {
                frag.linea = bestMatch.idx;
                filled++;
            }
        }
    }
    console.log(`[V] fillMissingLines: ${filled} fragmentos curados recibieron línea`);
}

module.exports = { searchFragmentsInDocs, fillMissingLines };
