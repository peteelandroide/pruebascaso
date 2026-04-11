const fs = require('fs');
const path = require('path');
const vm = require('vm');
const parseHechos = require('./parse-hechos');
const evidenceMap = require('./evidence-map');
const documentRegistry = require('./document-registry');
const {
    getAssetOutputForSource,
    getHtmlOutputForSource,
    getRawOutputForSource,
    toPosixPath
} = require('./path-utils');
const { EXPECTED_FACT_COUNT } = require('./hecho-blueprint');

const ROOT = path.join(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'source');
const DIST_DIR = path.join(ROOT, 'dist');
const DATA_JS_PATH = path.join(ROOT, 'src', 'scripts', 'data.js');

const SPECIAL_SOURCE_FILES = new Set([
    'Chat de WhatsApp con Oscar Maldonado Paretomed.txt',
    'Chat de WhatsApp con Equipo de Trabajo - Paretomed 🟠.txt',
    'Chat de WhatsApp con Correcciones y sugerencias PARETOMED.txt',
    'chat-primo/_chat.txt'
]);

const HTML_EXTENSIONS = new Set(['.docx', '.xlsx', '.txt', '.md']);
const ASSET_EXTENSIONS = new Set(['.pdf', '.jpg', '.jpeg', '.png']);
const LEGACY_DIST_PREFIX_RE = /^(?:\.\.\/)?dist\//;

function normalizeComparableText(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/["'`´]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

function hasLegacyDistPrefix(value) {
    if (typeof value !== 'string') return false;
    const normalized = value.replace(/\\/g, '/').replace(/^\.\//, '');
    return LEGACY_DIST_PREFIX_RE.test(normalized);
}

function walkFiles(dirPath, baseDir = dirPath) {
    let results = [];
    for (const item of fs.readdirSync(dirPath)) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(walkFiles(fullPath, baseDir));
            continue;
        }
        results.push({
            fullPath,
            relativePath: toPosixPath(path.relative(baseDir, fullPath))
        });
    }
    return results;
}

function loadCaseData(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(`${content}\nthis.__CASE_DATA__ = CASE_DATA;`, sandbox);
    return sandbox.__CASE_DATA__;
}

function recordCollision(map, outputPath, sourcePath) {
    if (!outputPath) return;
    if (!map.has(outputPath)) {
        map.set(outputPath, new Set());
    }
    map.get(outputPath).add(sourcePath);
}

function collectGeneratedPathCollisions() {
    const collisions = [];
    const generatedOutputs = new Map();
    const rawOutputs = new Map();

    walkFiles(SOURCE_DIR).forEach(({ relativePath }) => {
        if (SPECIAL_SOURCE_FILES.has(relativePath)) return;

        const ext = path.extname(relativePath).toLowerCase();
        if (HTML_EXTENSIONS.has(ext)) {
            recordCollision(generatedOutputs, getHtmlOutputForSource(relativePath), relativePath);
        } else if (ASSET_EXTENSIONS.has(ext)) {
            recordCollision(generatedOutputs, getAssetOutputForSource(relativePath), relativePath);
        }

        recordCollision(rawOutputs, getRawOutputForSource(relativePath), relativePath);
    });

    [generatedOutputs, rawOutputs].forEach(map => {
        for (const [outputPath, sourcePaths] of map.entries()) {
            if (sourcePaths.size > 1) {
                collisions.push({
                    outputPath,
                    sourcePaths: [...sourcePaths].sort()
                });
            }
        }
    });

    return collisions;
}

function compareCanonicalCatalog(canonicalCatalog) {
    const issues = [];
    const warnings = [];
    const canonicalIds = Object.keys(canonicalCatalog || {}).sort();
    const evidenceIds = Object.keys(evidenceMap || {}).sort();

    const missingInMap = canonicalIds.filter(id => !evidenceMap[id]);
    const extraInMap = evidenceIds.filter(id => !canonicalCatalog[id]);

    if (missingInMap.length) {
        issues.push(`Faltan IDs canónicos en evidence-map: ${missingInMap.join(', ')}`);
    }

    if (extraInMap.length) {
        issues.push(`Sobran IDs no canónicos en evidence-map: ${extraInMap.join(', ')}`);
    }

    canonicalIds.forEach(proofId => {
        const canonical = canonicalCatalog[proofId];
        const mapped = evidenceMap[proofId];
        if (!mapped) return;

        if (!mapped.cat) {
            issues.push(`${proofId} no tiene categoría en evidence-map.`);
        }

        if (normalizeComparableText(mapped.desc) !== normalizeComparableText(canonical.descripcion)) {
            warnings.push(`${proofId} tiene descripción divergente entre índice canónico y evidence-map.`);
        }

        if (normalizeComparableText(mapped.tipo) !== normalizeComparableText(canonical.tipo)) {
            warnings.push(`${proofId} tiene tipo divergente entre índice canónico y evidence-map.`);
        }
    });

    return { issues, warnings };
}

function validateReferencedOutputFiles() {
    const issues = [];

    for (const [proofId, proofEntry] of Object.entries(evidenceMap)) {
        const paths = [
            proofEntry.html,
            proofEntry.raw,
            ...(proofEntry.multiplehtml || []),
            ...(proofEntry.multipleraw || [])
        ].filter(Boolean);

        paths.forEach(relativeOutputPath => {
            const targetPath = path.join(DIST_DIR, relativeOutputPath);
            if (!fs.existsSync(targetPath)) {
                issues.push(`${proofId} apunta a ${relativeOutputPath} pero ese archivo no existe en dist/.`);
            }
        });
    }

    for (const [docId, docEntry] of Object.entries(documentRegistry)) {
        if (!docEntry.archivo_html) continue;
        const targetPath = path.join(DIST_DIR, docEntry.archivo_html);
        if (!fs.existsSync(targetPath)) {
            issues.push(`document-registry[${docId}] apunta a ${docEntry.archivo_html} pero no existe en dist/.`);
        }
    }

    return issues;
}

function validateGeneratedCaseData(canonicalCatalog) {
    const issues = [];
    const caseData = loadCaseData(DATA_JS_PATH);
    if (!caseData) {
        issues.push('No se encontró src/scripts/data.js generado.');
        return issues;
    }

    const factCount = Object.keys(caseData.hechos || {}).length;
    if (factCount !== EXPECTED_FACT_COUNT) {
        issues.push(`data.js tiene ${factCount} hechos, pero el blueprint espera ${EXPECTED_FACT_COUNT}.`);
    }

    const metaIds = Object.keys(caseData.pruebas_meta || {}).sort();
    const canonicalIds = Object.keys(canonicalCatalog || {}).sort();
    if (metaIds.join('|') !== canonicalIds.join('|')) {
        issues.push('pruebas_meta en data.js no coincide exactamente con el catálogo canónico.');
    }

    const urlIds = Object.keys(caseData.pruebas_urls || {}).sort();
    if (urlIds.join('|') !== canonicalIds.join('|')) {
        issues.push('pruebas_urls en data.js no coincide exactamente con el catálogo canónico.');
    }

    canonicalIds.forEach(proofId => {
        const canonical = canonicalCatalog[proofId];
        const generated = caseData.pruebas_meta?.[proofId];
        if (!generated) {
            issues.push(`data.js no contiene pruebas_meta para ${proofId}.`);
            return;
        }

        if (normalizeComparableText(generated.descripcion) !== normalizeComparableText(canonical.descripcion)) {
            issues.push(`data.js quedó con descripción no canónica para ${proofId}.`);
        }

        if (normalizeComparableText(generated.tipo) !== normalizeComparableText(canonical.tipo)) {
            issues.push(`data.js quedó con tipo no canónico para ${proofId}.`);
        }
    });

    Object.entries(evidenceMap).forEach(([proofId, proofEntry]) => {
        const urlFields = [
            ['html', proofEntry.html],
            ['raw', proofEntry.raw],
            ...((proofEntry.multiplehtml || []).map((value, index) => [`multiplehtml[${index}]`, value])),
            ...((proofEntry.multipleraw || []).map((value, index) => [`multipleraw[${index}]`, value]))
        ];

        urlFields.forEach(([fieldName, value]) => {
            if (hasLegacyDistPrefix(value)) {
                issues.push(`evidence-map.${proofId}.${fieldName} usa un prefijo legado dist/.`);
            }
        });
    });

    Object.entries(documentRegistry).forEach(([docId, docEntry]) => {
        if (hasLegacyDistPrefix(docEntry.archivo_html)) {
            issues.push(`document-registry.${docId}.archivo_html usa un prefijo legado dist/.`);
        }
    });

    Object.entries(caseData.pruebas_urls || {}).forEach(([proofId, urls]) => {
        const urlFields = [
            ['html', urls?.html],
            ['raw', urls?.raw],
            ...(((urls?.multiplehtml) || []).map((value, index) => [`multiplehtml[${index}]`, value])),
            ...(((urls?.multipleraw) || []).map((value, index) => [`multipleraw[${index}]`, value]))
        ];

        urlFields.forEach(([fieldName, value]) => {
            if (hasLegacyDistPrefix(value)) {
                issues.push(`data.js pruebas_urls.${proofId}.${fieldName} conserva un prefijo legado dist/.`);
            }
        });
    });

    Object.entries(caseData.documentos || {}).forEach(([docId, docEntry]) => {
        if (hasLegacyDistPrefix(docEntry?.archivo_html)) {
            issues.push(`data.js documentos.${docId}.archivo_html conserva un prefijo legado dist/.`);
        }
    });

    (caseData.archivos_crudos || []).forEach((fileEntry, index) => {
        if (hasLegacyDistPrefix(fileEntry?.ruta)) {
            issues.push(`data.js archivos_crudos[${index}].ruta conserva un prefijo legado dist/.`);
        }
    });

    return issues;
}

function main() {
    console.log('=== VALIDACIÓN DE INTEGRIDAD DEL CASO ===');

    const parsed = parseHechos.parseHechos();
    if (!parsed) {
        throw new Error('No se pudo parsear el índice canónico de hechos.');
    }

    const canonicalCatalog = parsed.pruebas_catalogo || {};
    const issues = [];
    const warnings = [];

    if (Object.keys(parsed.hechos || {}).length !== EXPECTED_FACT_COUNT) {
        issues.push(`El parser produjo ${Object.keys(parsed.hechos || {}).length} hechos, pero se esperaban ${EXPECTED_FACT_COUNT}.`);
    }

    const catalogValidation = compareCanonicalCatalog(canonicalCatalog);
    issues.push(...catalogValidation.issues);
    warnings.push(...catalogValidation.warnings);
    issues.push(...validateReferencedOutputFiles());
    issues.push(...validateGeneratedCaseData(canonicalCatalog));

    const collisions = collectGeneratedPathCollisions();
    collisions.forEach(collision => {
        issues.push(`Colisión de salida detectada en ${collision.outputPath}: ${collision.sourcePaths.join(' | ')}`);
    });

    console.log(`Hechos esperados: ${EXPECTED_FACT_COUNT}`);
    console.log(`Hechos parseados: ${Object.keys(parsed.hechos || {}).length}`);
    console.log(`Pruebas canónicas: ${Object.keys(canonicalCatalog).length}`);
    console.log(`Entradas evidence-map: ${Object.keys(evidenceMap).length}`);
    console.log(`Colisiones detectadas: ${collisions.length}`);

    if (warnings.length > 0) {
        console.warn('\n[!] Advertencias no bloqueantes:');
        warnings.forEach(warning => console.warn(`  - ${warning}`));
        console.warn('    data.js sigue tomando descripciones y tipos desde el índice canónico.');
    }

    if (issues.length > 0) {
        console.error('\n[X] Se detectaron problemas de integridad:');
        issues.forEach(issue => console.error(`  - ${issue}`));
        process.exit(1);
    }

    console.log('\n[V] Integridad OK — catálogo canónico, build local y salidas generadas están coordinados.');
}

main();
