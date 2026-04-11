const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { EXPECTED_FACT_COUNT } = require('./hecho-blueprint');

const DIST = path.join(__dirname, '..', 'dist');
const FORBIDDEN_FRAGMENT_SOURCES = new Set([
    'doc-hechos',
    'doc-reuniones',
    'doc-valoracion',
    'doc-reunion-14jul',
    'doc-analisis-comprobantes',
    'doc-proyeccion-financiera',
    'doc-analisis-fiscal',
    'doc-politica-web'
]);

// Load data.js in an isolated context for deterministic audits
const dataContent = fs.readFileSync(path.join(DIST, 'scripts', 'data.js'), 'utf8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(`${dataContent}\nthis.__RESULT__ = CASE_DATA;`, sandbox);
const CASE_DATA = sandbox.__RESULT__;

console.log('=== AUDIT: ParetoMed dist/ folder ===\n');

// 1. Check core files
const coreFiles = ['index.html', 'scripts/data.js', 'scripts/app.js', 'styles/main.css'];
console.log('--- Core Files ---');
coreFiles.forEach(f => {
    const exists = fs.existsSync(path.join(DIST, f));
    console.log(`  ${exists ? '✓' : '✗'} ${f}`);
});

// 2. Check styles referenced in docs
const viewerCss = path.join(DIST, 'styles', 'viewer.css');
const chatCss = path.join(DIST, 'styles', 'chat.css');
console.log(`\n--- Viewer Styles ---`);
console.log(`  ${fs.existsSync(viewerCss) ? '✓' : '✗'} styles/viewer.css`);
console.log(`  ${fs.existsSync(chatCss) ? '✓' : '✗'} styles/chat.css`);

// 3. Check all documento archivo_html paths
console.log('\n--- Documentos (archivo_html) ---');
let missingDocs = [];
let foundDocs = 0;
for (const [key, doc] of Object.entries(CASE_DATA.documentos)) {
    const htmlPath = doc.archivo_html;
    const fullPath = path.join(DIST, htmlPath);
    const exists = fs.existsSync(fullPath);
    if (!exists) {
        missingDocs.push({ key, path: htmlPath });
        console.log(`  ✗ MISSING: [${key}] ${htmlPath}`);
    } else {
        foundDocs++;
    }
}
console.log(`  Found: ${foundDocs}/${Object.keys(CASE_DATA.documentos).length}`);

// 4. Check all pruebas_urls html paths
console.log('\n--- Prueba URLs (html) ---');
let missingPruebas = [];
let foundPruebas = 0;
const pruebasUrls = CASE_DATA.pruebas_urls || {};
for (const [key, urls] of Object.entries(pruebasUrls)) {
    if (urls.html) {
        const fullPath = path.join(DIST, urls.html);
        const exists = fs.existsSync(fullPath);
        if (!exists) {
            missingPruebas.push({ key, path: urls.html });
            console.log(`  ✗ MISSING: [${key}] ${urls.html}`);
        } else {
            foundPruebas++;
        }
    }
    if (urls.raw) {
        const fp = path.join(DIST, urls.raw);
        if (!fs.existsSync(fp)) console.log(`  ✗ MISSING RAW: [${key}] ${urls.raw}`);
    }
    if (urls.multiplehtml) {
        urls.multiplehtml.forEach((r, i) => {
            const fp = path.join(DIST, r);
            if (!fs.existsSync(fp)) {
                console.log(`  ✗ MISSING HTML: [${key}] documento ${i+1}: ${r}`);
            }
        });
    }
    if (urls.multipleraw) {
        urls.multipleraw.forEach((r, i) => {
            const fp = path.join(DIST, r);
            if (!fs.existsSync(fp)) {
                console.log(`  ✗ MISSING RAW: [${key}] anexo ${i+1}: ${r}`);
            }
        });
    }
}
const withHtml = Object.values(pruebasUrls).filter(u => u.html).length;
console.log(`  Found: ${foundPruebas}/${withHtml} (pruebas with html link)`);

// 5. Check fragment fuentes point to valid documentos
console.log('\n--- Fragment fuentes → documentos mapping ---');
let unmapped = new Set();
let forbiddenSources = [];
let hechosSinFragmentos = [];
let hechosSinPruebas = [];
let fragmentsWithExactSearch = 0;
for (const [hId, hecho] of Object.entries(CASE_DATA.hechos || {})) {
    const fragmentos = hecho.fragmentos_clave || hecho.extractos || [];
    if (!fragmentos.length) hechosSinFragmentos.push({ id: hId, titulo: hecho.titulo_corto || hecho.resumen || 'Sin título' });
    if (!(hecho.pruebas || []).length) hechosSinPruebas.push({ id: hId, titulo: hecho.titulo_corto || hecho.resumen || 'Sin título' });
    fragmentos.forEach(frag => {
        if (frag.cita_exacta) fragmentsWithExactSearch++;
        if (frag.fuente && !CASE_DATA.documentos[frag.fuente]) {
            unmapped.add(frag.fuente);
        }
        if (frag.fuente && FORBIDDEN_FRAGMENT_SOURCES.has(frag.fuente)) {
            forbiddenSources.push({ hecho: hId, fuente: frag.fuente, cita: frag.cita || frag.cita_exacta || '' });
        }
    });
}
if (unmapped.size > 0) {
    console.log(`  ✗ Unmapped fuentes (no entry in documentos):`, [...unmapped]);
} else {
    console.log(`  ✓ All fragment fuentes map to a documento`);
}
if (forbiddenSources.length > 0) {
    console.log(`  ✗ Fragmentos con fuentes IA o deshabilitadas (${forbiddenSources.length}):`);
    forbiddenSources.forEach(item => console.log(`    - ${item.hecho}: ${item.fuente} :: ${item.cita.substring(0, 90)}`));
} else {
    console.log('  ✓ No hay fragmentos apuntando a documentos IA o fuentes prohibidas');
}
console.log(`  ℹ Fragmentos con búsqueda dual (cita_exacta): ${fragmentsWithExactSearch}`);

console.log('\n--- Hechos y cobertura ---');
console.log(`  Hechos en data.js: ${Object.keys(CASE_DATA.hechos || {}).length}/${EXPECTED_FACT_COUNT}`);
if (hechosSinFragmentos.length > 0) {
    console.log(`  ✗ Hechos sin fragmentos (${hechosSinFragmentos.length}):`);
    hechosSinFragmentos.forEach(item => console.log(`    - ${item.id}: ${item.titulo}`));
} else {
    console.log('  ✓ Todos los hechos tienen al menos un fragmento documental');
}
if (hechosSinPruebas.length > 0) {
    console.log(`  ✗ Hechos sin pruebas (${hechosSinPruebas.length}):`);
    hechosSinPruebas.forEach(item => console.log(`    - ${item.id}: ${item.titulo}`));
}

// 6. Check docs directory for files NOT in data.js
console.log('\n--- Orphan files in dist/docs/ ---');
const docsDir = path.join(DIST, 'docs');
const docsOnDisk = fs.readdirSync(docsDir);
const referencedFiles = new Set(Object.values(CASE_DATA.documentos).map(d => path.basename(d.archivo_html)));
// Also consider pruebas_urls html paths as referenced
Object.values(CASE_DATA.pruebas_urls || {}).forEach(u => {
    if (u.html) referencedFiles.add(path.basename(u.html));
    if (u.multiplehtml) u.multiplehtml.forEach(r => referencedFiles.add(path.basename(r)));
    if (u.multipleraw) u.multipleraw.forEach(r => referencedFiles.add(path.basename(r)));
});
docsOnDisk.forEach(f => {
    if (!referencedFiles.has(f)) {
        console.log(`  ? Unreferenced: ${f}`);
    }
});

// 7. List all files in dist/docs with their sizes
console.log('\n--- File sizes in dist/docs/ ---');
docsOnDisk.forEach(f => {
    const stat = fs.statSync(path.join(docsDir, f));
    const sizeKB = (stat.size / 1024).toFixed(1);
    console.log(`  ${sizeKB.padStart(8)} KB  ${f}`);
});

// Summary
console.log('\n=== SUMMARY ===');
console.log(`Core files: ${coreFiles.length} checked`);
console.log(`Documentos: ${foundDocs} found, ${missingDocs.length} missing`);
console.log(`Prueba URLs: ${foundPruebas} found, ${missingPruebas.length} missing`);
console.log(`Unmapped fuentes: ${unmapped.size}`);
console.log(`Forbidden fuentes: ${forbiddenSources.length}`);
console.log(`Fragmentos con cita_exacta: ${fragmentsWithExactSearch}`);
console.log(`Hechos sin fragmentos: ${hechosSinFragmentos.length}`);
console.log(`Hechos sin pruebas: ${hechosSinPruebas.length}`);
if (missingDocs.length > 0 || missingPruebas.length > 0 || hechosSinFragmentos.length > 0 || forbiddenSources.length > 0) {
    console.log('\n!!! ACTION REQUIRED: Fix missing files above !!!');
}
