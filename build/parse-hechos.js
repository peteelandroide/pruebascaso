const fs = require('fs');
const path = require('path');
const { getFactMeta } = require('./hecho-blueprint');

const HECHOS_FILE = path.join(__dirname, '../source/HECHOS_DEMANDA_PARETOMED_2026.md');

function parseHechos() {
  console.log('Iniciando parse-hechos.js...');
  if (!fs.existsSync(HECHOS_FILE)) {
    console.error('[!] Archivo HECHOS_DEMANDA_PARETOMED_2026.md no encontrado');
    return null;
  }

  const content = fs.readFileSync(HECHOS_FILE, 'utf8');
  const lines = content.split('\n');

  const result = {
    capitulos: [],
    hechos: {},
    pruebas: {},
    pruebas_catalogo: {}
  };

  let currentCapitulo = null;
  let currentHecho = null;
  let idxCapitulo = 1;
  let idxHechoGeneral = 1;
  const warnings = [];

  function extractPruebas(line) {
    return [...new Set((line.match(/P-\d{2}/g) || []).filter(Boolean))];
  }

  function finalizeCurrentHecho() {
    if (!currentHecho) return;
    currentHecho.texto_completo = currentHecho.texto_completo.trim();
    result.hechos[currentHecho.id] = currentHecho;
    currentHecho = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const capMatch = line.match(/^## CAP[IÍ]TULO ([IVX]+):\s*(.+)$/i) || line.match(/<h2[^>]*>\s*CAP[IÍ]TULO ([IVX]+):\s*(.+)<\/h2>/i);
    if (capMatch) {
      finalizeCurrentHecho();
      currentCapitulo = {
        id: `cap-${idxCapitulo++}`,
        numero: capMatch[1],
        titulo: capMatch[2].trim(),
        hechos: []
      };
      result.capitulos.push(currentCapitulo);
      continue;
    }

    const pruebaTableMatch = line.match(/^\|\s*\*\*(P-\d{2})\*\*\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|/i);
    if (pruebaTableMatch) {
      result.pruebas_catalogo[pruebaTableMatch[1]] = {
        id: pruebaTableMatch[1],
        descripcion: pruebaTableMatch[2].trim(),
        tipo: pruebaTableMatch[3].trim()
      };
      continue;
    }

    const hechoMatch = line.match(/^\*\*HECHO ([A-ZÁÉÍÓÚ ]+?)(?:\s+\([^)]+\))?\.\*\*/i);
    if (hechoMatch) {
      finalizeCurrentHecho();

      const ordinalStr = hechoMatch[1].trim().toUpperCase();
      const factMeta = getFactMeta(currentCapitulo ? currentCapitulo.numero : 'GENERAL', ordinalStr);

      let hId = factMeta.id;
      if (result.hechos[hId]) {
        const dedupedId = `${hId}-dup-${idxHechoGeneral}`;
        warnings.push(`[WARN] ID duplicado ${hId}; se usará ${dedupedId} para no sobrescribir datos.`);
        hId = dedupedId;
      }
      if (!factMeta.known) {
        warnings.push(`[WARN] Hecho fuera del blueprint: ${factMeta.sourceKey}. Se generó ${hId}.`);
      }

      let resumenStr = line.replace(/^\*\*HECHO [A-ZÁÉÍÓÚ ]+(?:\s+\([^)]+\))?\.\*\*\s*/i, '').trim();
      if (resumenStr.length > 250) {
        resumenStr = resumenStr.substring(0, 250) + '...';
      }

      currentHecho = {
        id: hId,
        numero: factMeta.numero ?? idxHechoGeneral,
        orden_documento: idxHechoGeneral,
        ordinal: ordinalStr,
        source_key: factMeta.sourceKey,
        capitulo: currentCapitulo ? currentCapitulo.id : 'cap-general',
        capitulo_id: currentCapitulo ? currentCapitulo.id : 'cap-general',
        resumen: resumenStr,
        texto_completo: `${line}\n`,
        fragmentos_clave: [],
        pruebas: [],
        nota_abogado: null
      };

      if (currentCapitulo) {
        currentCapitulo.hechos.push(hId);
      }

      extractPruebas(line).forEach(testId => {
        if (!currentHecho.pruebas.includes(testId)) currentHecho.pruebas.push(testId);
      });

      idxHechoGeneral++;
      continue;
    }

    if (currentHecho) {
      currentHecho.texto_completo += `${line}\n`;

      extractPruebas(line).forEach(testId => {
        if (!currentHecho.pruebas.includes(testId)) currentHecho.pruebas.push(testId);
      });

      if (line.match(/^>\s*\*\*NOTA PARA EL ABOGADO\*\*:/i) || line.match(/^>\s*NOTA.*?:/i)) {
        currentHecho.nota_abogado = line.replace(/^>.*?:\s*/, '');
      } else if (currentHecho.nota_abogado && line.startsWith('>')) {
        currentHecho.nota_abogado += `\n${line.substring(1).trim()}`;
      }

      const citationPattern1 = /\*"(.*?)"\*/g;
      const citationPattern2 = /"\*(.*?)\*"/g;
      const citationPattern3 = /\*'(.*?)'\*/g;

      let cMatch;
      while ((cMatch = citationPattern1.exec(line)) !== null) {
        currentHecho.fragmentos_clave.push({ cita: cMatch[1] });
      }
      while ((cMatch = citationPattern2.exec(line)) !== null) {
        currentHecho.fragmentos_clave.push({ cita: cMatch[1] });
      }
      while ((cMatch = citationPattern3.exec(line)) !== null) {
        currentHecho.fragmentos_clave.push({ cita: cMatch[1] });
      }
    }
  }

  finalizeCurrentHecho();

  console.log(`[V] Parseados ${result.capitulos.length} Capítulos y ${Object.keys(result.hechos).length} Hechos`);
  warnings.forEach(msg => console.warn(msg));
  return result;
}

module.exports = { parseHechos };

if (require.main === module) {
  const result = parseHechos();
  if (result) {
    fs.writeFileSync(path.join(__dirname, 'test-hechos.json'), JSON.stringify(result, null, 2));
  }
}
