const fs = require('fs');
const path = require('path');

// Mock CASE_DATA or read data.js
const dataContent = fs.readFileSync('dist/scripts/data.js', 'utf8');
const match = dataContent.match(/const CASE_DATA = (\{[\s\S]*?\});/);
if (!match) {
    console.error("No se pudo encontrar CASE_DATA en data.js");
    process.exit(1);
}

let CASE_DATA;
try {
    CASE_DATA = JSON.parse(match[1]);
} catch (e) {
    // If it's not pure JSON (it's a JS object), we have to be careful.
    // In this case it looks like structured JSON in a variable.
    // Try a more relaxed approach if needed, but match[1] should be fine if it's well formed.
    console.error("Error al parsear CASE_DATA. Intentando con eval...");
    CASE_DATA = eval('(' + match[1] + ')');
}

const docsDir = 'dist/docs';
const errors = [];

// Función simplificada de resolución de la app
function resolveUrl(fuente) {
    const docObj = CASE_DATA.documentos[fuente];
    if (docObj) return docObj.archivo_html;
    return `docs/${fuente}.html`;
}

Object.values(CASE_DATA.hechos).forEach(hecho => {
    (hecho.fragmentos_clave || []).forEach(frag => {
        const url = resolveUrl(frag.fuente);
        const fullPath = path.join('dist', url.split('#')[0]);
        
        if (!fs.existsSync(fullPath)) {
            errors.push({
                hecho: hecho.id,
                fuente: frag.fuente,
                attemptedPath: url,
                fullPath: fullPath
            });
        }
    });
});

if (errors.length > 0) {
    console.log(`\n❌ SE ENCONTRARON ${errors.length} FRAGMENTOS ROTOS:`);
    const unique = [...new Set(errors.map(e => e.fuente))];
    console.log(`Fuentes problemáticas (${unique.length}):`, unique);
    
    console.log("\nDetalle de errores (Primeros 10):");
    console.table(errors.slice(0, 10));
} else {
    console.log("\n✅ Todos los fragmentos resuelven correctamente a archivos en dist/docs/");
}
