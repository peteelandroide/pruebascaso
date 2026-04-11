const fs = require('fs');
const path = require('path');

const SOURCE_FILE = path.join(__dirname, '../source/HECHOS_DEMANDA_PARETOMED_2026.md');
const ROOT_FILE = path.join(__dirname, '../../HECHOS_DEMANDA_PARETOMED_2026.md');

function normalizeContent(value) {
    return String(value || '').replace(/\r\n/g, '\n');
}

function getFirstDiffLine(a, b) {
    const aLines = normalizeContent(a).split('\n');
    const bLines = normalizeContent(b).split('\n');
    const total = Math.max(aLines.length, bLines.length);

    for (let i = 0; i < total; i++) {
        if ((aLines[i] || '') !== (bLines[i] || '')) {
            return {
                line: i + 1,
                source: aLines[i] || '',
                root: bLines[i] || ''
            };
        }
    }

    return null;
}

if (!fs.existsSync(SOURCE_FILE) || !fs.existsSync(ROOT_FILE)) {
    console.error('[SYNC] No se encontraron ambas copias de HECHOS_DEMANDA_PARETOMED_2026.md.');
    process.exit(1);
}

const sourceContent = fs.readFileSync(SOURCE_FILE, 'utf8');
const rootContent = fs.readFileSync(ROOT_FILE, 'utf8');

if (normalizeContent(sourceContent) !== normalizeContent(rootContent)) {
    const diff = getFirstDiffLine(sourceContent, rootContent);
    console.error('[SYNC] Las copias root/source de HECHOS_DEMANDA_PARETOMED_2026.md no están sincronizadas.');
    if (diff) {
        console.error(`[SYNC] Primera diferencia en la línea ${diff.line}.`);
        console.error(`[SYNC] source: ${diff.source}`);
        console.error(`[SYNC] root:   ${diff.root}`);
    }
    process.exit(1);
}

console.log('[SYNC] OK — ambas copias de HECHOS_DEMANDA_PARETOMED_2026.md están sincronizadas.');
