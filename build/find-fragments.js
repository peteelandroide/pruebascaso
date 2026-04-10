const fs = require('fs');
const path = require('path');
const { slugifyBaseName } = require('./path-utils');

const SOURCE_DIR = path.join(__dirname, '../source');

function normalizeStr(str) {
    return str.toLowerCase()
              .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita tildes
              .replace(/[,.;:?!"'«»()\-]/g, "") // quita puntuacion
              .replace(/\s+/g, " ")
              .trim();
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

function searchFragmentsInDocs(hechosData) {
    console.log("Iniciando find-fragments.js (indexación universal)...");

    // Escanear TODOS los .txt y .md del directorio source/
    const allFiles = fs.readdirSync(SOURCE_DIR).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return (ext === '.txt' || ext === '.md') && fs.statSync(path.join(SOURCE_DIR, f)).isFile();
    });

    const sourcesCache = {};
    for (const file of allFiles) {
        const id = FIXED_IDS[file] || slugifyBaseName(path.parse(file).name);
        const fp = path.join(SOURCE_DIR, file);
        const lineas = fs.readFileSync(fp, 'utf8').split('\n');
        sourcesCache[id] = lineas.map((txt, idx) => ({ idx: idx + 1, original: txt, norm: normalizeStr(txt) }));
    }

    console.log(`[V] Archivos indexados para búsqueda: ${Object.keys(sourcesCache).length} (${allFiles.length} archivos)`);

    let foundCount = 0;
    let notFoundCount = 0;

    for (const hId of Object.keys(hechosData.hechos)) {
        const hecho = hechosData.hechos[hId];
        
        for (const frag of hecho.fragmentos_clave) {
            const qNorm = normalizeStr(frag.cita);
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
    // Recargar las fuentes de texto indexables
    const allFiles = fs.readdirSync(SOURCE_DIR).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return (ext === '.txt' || ext === '.md') && fs.statSync(path.join(SOURCE_DIR, f)).isFile();
    });

    const sourcesCache = {};
    for (const file of allFiles) {
        const id = FIXED_IDS[file] || slugifyBaseName(path.parse(file).name);
        const fp = path.join(SOURCE_DIR, file);
        const lineas = fs.readFileSync(fp, 'utf8').split('\n');
        sourcesCache[id] = lineas.map((txt, idx) => ({ idx: idx + 1, original: txt, norm: normalizeStr(txt) }));
    }

    let filled = 0;
    for (const hId of Object.keys(hechosData.hechos)) {
        const hecho = hechosData.hechos[hId];
        for (const frag of (hecho.fragmentos_clave || [])) {
            if (frag.linea) continue; // ya tiene linea
            if (!frag.fuente || !sourcesCache[frag.fuente]) continue; // fuente no indexable

            const qNorm = normalizeStr(frag.cita);
            if (qNorm.length < 5) continue;

            const docLines = sourcesCache[frag.fuente];
            for (const line of docLines) {
                if (line.norm.length < 5) continue;
                if (line.norm.includes(qNorm)) {
                    frag.linea = line.idx;
                    filled++;
                    break;
                }
                // Buscar si la cita es substring parcial (primeras 80 chars)
                const shortQ = qNorm.substring(0, 80);
                if (shortQ.length >= 15 && line.norm.includes(shortQ)) {
                    frag.linea = line.idx;
                    filled++;
                    break;
                }
            }
        }
    }
    console.log(`[V] fillMissingLines: ${filled} fragmentos curados recibieron línea`);
}

module.exports = { searchFragmentsInDocs, fillMissingLines };
