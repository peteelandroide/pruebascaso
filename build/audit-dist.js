const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIST = path.join(__dirname, '..', 'dist');

// Load data.js
const dataContent = fs.readFileSync(path.join(DIST, 'scripts', 'data.js'), 'utf8');
vm.runInThisContext(dataContent); // Defines CASE_DATA in global scope

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
for (const [hId, hecho] of Object.entries(CASE_DATA.hechos || {})) {
    (hecho.extractos || []).forEach(frag => {
        if (frag.fuente && !CASE_DATA.documentos[frag.fuente]) {
            unmapped.add(frag.fuente);
        }
    });
}
if (unmapped.size > 0) {
    console.log(`  ✗ Unmapped fuentes (no entry in documentos):`, [...unmapped]);
} else {
    console.log(`  ✓ All fragment fuentes map to a documento`);
}

// 6. Check docs directory for files NOT in data.js
console.log('\n--- Orphan files in dist/docs/ ---');
const docsDir = path.join(DIST, 'docs');
const docsOnDisk = fs.readdirSync(docsDir);
const referencedFiles = new Set(Object.values(CASE_DATA.documentos).map(d => path.basename(d.archivo_html)));
// Also consider pruebas_urls html paths as referenced
Object.values(CASE_DATA.pruebas_urls || {}).forEach(u => {
    if (u.html) referencedFiles.add(path.basename(u.html));
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
if (missingDocs.length > 0 || missingPruebas.length > 0) {
    console.log('\n!!! ACTION REQUIRED: Fix missing files above !!!');
}
