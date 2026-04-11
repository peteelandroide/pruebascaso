const fs = require('fs');
const path = require('path');

// Cargar data.js
const dataFile = 'src/scripts/data.js';
const content = fs.readFileSync(dataFile, 'utf8');
const jsonStr = content.replace(/^const CASE_DATA = /, '').replace(/;$/, '');
const data = JSON.parse(jsonStr);

const DIST_DIR = 'dist';
const audit = {
    missingDocs: [],
    missingAssets: [],
    brokenFragments: [],
    orphans: []
};

// 1. Verificar documentos referenciados
for (const [docId, docMeta] of Object.entries(data.documentos)) {
    if (docMeta.archivo_html) {
        const fp = path.join(DIST_DIR, docMeta.archivo_html);
        if (!fs.existsSync(fp)) {
            audit.missingDocs.push({ id: docId, path: docMeta.archivo_html, type: 'HTML' });
        }
    }
}

// 2. Verificar pruebas (P-xx)
for (const [pId, urls] of Object.entries(data.pruebas_urls)) {
    if (urls.html) {
        const fp = path.join(DIST_DIR, urls.html);
        if (!fs.existsSync(fp)) {
            audit.brokenFragments.push({ pId, path: urls.html, type: 'Prueba HTML' });
        }
    }
    if (urls.raw) {
        const fp = path.join(DIST_DIR, urls.raw);
        if (!fs.existsSync(fp)) {
            audit.brokenFragments.push({ pId, path: urls.raw, type: 'Prueba RAW' });
        }
    }
}

// 3. Reportar hallazgos iniciales
console.log('--- AUDITORÍA DE ARCHIVOS FÍSICOS ---');
console.log(`Documentos Totales: ${Object.keys(data.documentos).length}`);
console.log(`Pruebas Totales: ${Object.keys(data.pruebas_urls).length}`);
console.log('\n[!] DOCUMENTOS FALTANTES (404):');
audit.missingDocs.forEach(d => console.log(`- ${d.id}: ${d.path}`));

console.log('\n[!] PRUEBAS ROTAS (404):');
audit.brokenFragments.forEach(p => console.log(`- ${p.pId}: ${p.path} (${p.type})`));
