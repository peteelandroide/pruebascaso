const fs = require('fs');

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let d = fs.readFileSync(filePath, 'utf8');

    // Fix P-14 (double space and correct encoding)
    const p14_bad = '"html": "docs/Contrato de Cuentas en Participación Paretomed APORTADO POR OSCAR VIERNES 22 DE AGOSTO 2025 NUNCA FIRMADO.html"';
    const p14_good = '"html": "docs/Contrato de Cuentas en Participación Paretomed  APORTADO POR OSCAR VIERNES 22 DE AGOSTO 2025 NUNCA FIRMADO.html"';
    
    // Fallback if the bad one had another encoding
    const p14_bad2 = '"html": "docs/Contrato de Cuentas en Participación Paretomed APORTADO POR OSCAR VIERNES 22 DE AGOSTO 2025 NUNCA FIRMADO.html"';
    
    // Fix P-30 (encoding mismatch)
    const p30_bad = '"html": "docs/20251111 PEDRO VERGARA - Solicitud de conciliación por antiguos abogados EF LEGAL nunca radicada ni enviada.html"';
    const p30_good = '"html": "docs/20251111 PEDRO VERGARA - Solicitud de conciliación por antiguos abogados EF LEGAL nunca radicada ni enviada.html"';
    
    // Fix P-15 (encoding mismatch)
    const p15_bad = '"raw": "assets/Contrato de transacción No.10.09.2025.pdf"';
    const p15_good = '"raw": "assets/Contrato de transacción No.10.09.2025.pdf"';

    d = d.replace(p14_bad, p14_good);
    d = d.replace(p14_bad2, p14_good);
    d = d.replace(p30_bad, p30_good);
    d = d.replace(p15_bad, p15_good);

    // Also add the transcripciones html for P-01, P-05, P-31, P-41, P-50
    // They are currently pointing to -> "html": "docs/transcripciones.html"
    // So if convert-docs generated it, it's already working, no path change needed.

    fs.writeFileSync(filePath, d);
    console.log(`Updated ${filePath}`);
}

fixFile('dist/scripts/data.js');
fixFile('build/evidence-map.js');
