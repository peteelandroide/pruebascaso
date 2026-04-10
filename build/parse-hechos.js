const fs = require('fs');
const path = require('path');

const HECHOS_FILE = path.join(__dirname, '../source/HECHOS_DEMANDA_PARETOMED_2026.md');

// Map de ordinales a números para IDs
const ordinalMap = {
  "PRIMERO": 1, "SEGUNDO": 2, "TERCERO": 3, "CUARTO": 4, "QUINTO": 5,
  "SEXTO": 6, "SÉPTIMO": 7, "SEPTIMO": 7, "OCTAVO": 8, "NOVENO": 9, "DÉCIMO": 10, "DECIMO": 10,
  "UNDÉCIMO": 11, "UNDECIMO": 11, "DUODÉCIMO": 12, "DUODECIMO": 12, "DECIMOTERCERO": 13, "DÉCIMO TERCERO": 13,
  "DECIMOCUARTO": 14, "DÉCIMO CUARTO": 14, "DECIMOQUINTO": 15, "DÉCIMO QUINTO": 15,
  "DECIMOSEXTO": 16, "DÉCIMO SEXTO": 16, "DECIMOSÉPTIMO": 17, "DÉCIMO SÉPTIMO": 17, "DECIMO SEPTIMO": 17,
  "DECIMOCTAVO": 18, "DÉCIMO OCTAVO": 18, "DECIMONOVENO": 19, "DÉCIMO NOVENO": 19, "VIGÉSIMO": 20, "VIGESIMO": 20,
  "VIGÉSIMO PRIMERO": 21, "VIGESIMO PRIMERO": 21, "VIGÉSIMO SEGUNDO": 22, "VIGESIMO SEGUNDO": 22,
  "VIGÉSIMO TERCERO": 23, "VIGESIMO TERCERO": 23, "VIGÉSIMO CUARTO": 24, "VIGESIMO CUARTO": 24,
  "VIGÉSIMO QUINTO": 25, "VIGESIMO QUINTO": 25, "VIGÉSIMO SEXTO": 26, "VIGESIMO SEXTO": 26,
  "VIGÉSIMO SÉPTIMO": 27, "VIGESIMO SEPTIMO": 27, "VIGÉSIMO OCTAVO": 28, "VIGESIMO OCTAVO": 28,
  "VIGÉSIMO NOVENO": 29, "VIGESIMO NOVENO": 29, "TRIGÉSIMO": 30, "TRIGESIMO": 30,
  "TRIGÉSIMO PRIMERO": 31, "TRIGESIMO PRIMERO": 31, "TRIGÉSIMO SEGUNDO": 32, "TRIGESIMO SEGUNDO": 32,
  "TRIGÉSIMO TERCERO": 33, "TRIGESIMO TERCERO": 33, "TRIGÉSIMO CUARTO": 34, "TRIGESIMO CUARTO": 34,
  "TRIGÉSIMO QUINTO": 35, "TRIGESIMO QUINTO": 35, "TRIGÉSIMO SEXTO": 36, "TRIGESIMO SEXTO": 36,
  "TRIGÉSIMO SÉPTIMO": 37, "TRIGESIMO SEPTIMO": 37, "TRIGÉSIMO OCTAVO": 38, "TRIGESIMO OCTAVO": 38,
  "TRIGÉSIMO NOVENO": 39, "TRIGESIMO NOVENO": 39, "CUADRAGÉSIMO": 40, "CUADRAGESIMO": 40,
  "CUADRAGÉSIMO PRIMERO": 41, "CUADRAGESIMO PRIMERO": 41, "CUADRAGÉSIMO SEGUNDO": 42, "CUADRAGESIMO SEGUNDO": 42,
  "CUADRAGÉSIMO TERCERO": 43, "CUADRAGESIMO TERCERO": 43, "CUADRAGÉSIMO CUARTO": 44, "CUADRAGESIMO CUARTO": 44,
  "CUADRAGÉSIMO QUINTO": 45, "CUADRAGESIMO QUINTO": 45, "CUADRAGÉSIMO SEXTO": 46, "CUADRAGESIMO SEXTO": 46,
  "CUADRAGÉSIMO SÉPTIMO": 47, "CUADRAGESIMO SEPTIMO": 47, "CUADRAGÉSIMO OCTAVO": 48, "CUADRAGESIMO OCTAVO": 48,
  "CUADRAGÉSIMO NOVENO": 49, "CUADRAGESIMO NOVENO": 49, "QUINCUAGÉSIMO": 50, "QUINCUAGESIMO": 50,
  "QUINCUAGÉSIMO PRIMERO": 51, "QUINCUAGESIMO PRIMERO": 51, "QUINCUAGÉSIMO SEGUNDO": 52, "QUINCUAGESIMO SEGUNDO": 52,
  "QUINCUAGÉSIMO TERCERO": 53, "QUINCUAGESIMO TERCERO": 53, "QUINCUAGÉSIMO CUARTO": 54, "QUINCUAGESIMO CUARTO": 54,
  "QUINCUAGÉSIMO QUINTO": 55, "QUINCUAGESIMO QUINTO": 55, "QUINCUAGÉSIMO SEXTO": 56, "QUINCUAGESIMO SEXTO": 56,
  "QUINCUAGÉSIMO SÉPTIMO": 57, "QUINCUAGESIMO SEPTIMO": 57, "QUINCUAGÉSIMO OCTAVO": 58, "QUINCUAGESIMO OCTAVO": 58,
  "QUINCUAGÉSIMO NOVENO": 59, "QUINCUAGESIMO NOVENO": 59, "SEXAGÉSIMO": 60, "SEXAGESIMO": 60,
  "SEXAGÉSIMO PRIMERO": 61, "SEXAGESIMO PRIMERO": 61, "SEXAGÉSIMO SEGUNDO": 62, "SEXAGESIMO SEGUNDO": 62,
  "SEXAGÉSIMO TERCERO": 63, "SEXAGESIMO TERCERO": 63, "SEXAGÉSIMO CUARTO": 64, "SEXAGESIMO CUARTO": 64
};

function parseHechos() {
  console.log("Iniciando parse-hechos.js...");
  if (!fs.existsSync(HECHOS_FILE)) {
    console.error("[!] Archivo HECHOS_DEMANDA_PARETOMED_2026.md no encontrado");
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

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Buscar Capítulos
    const capMatch = line.match(/^## CAP[IÍ]TULO ([IVX]+):\s*(.+)$/i) || line.match(/<h2[^>]*>\s*CAP[IÍ]TULO ([IVX]+):\s*(.+)<\/h2>/i);
    if (capMatch) {
      if (currentHecho) {
        currentHecho.texto_completo = currentHecho.texto_completo.trim();
        result.hechos[currentHecho.id] = currentHecho;
        currentHecho = null;
      }
      const numRomano = capMatch[1];
      const titulo = capMatch[2].trim();
      const capId = `cap-${idxCapitulo++}`;
      currentCapitulo = {
        id: capId,
        numero: numRomano,
        titulo: titulo,
        hechos: []
      };
      result.capitulos.push(currentCapitulo);
      continue;
    }

    // Buscar items tabla de Pruebas
    const pruebaTableMatch = line.match(/^\|\s*\*\*(P-\d{2})\*\*\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|/i);
    if (pruebaTableMatch) {
        result.pruebas_catalogo[pruebaTableMatch[1]] = {
            id: pruebaTableMatch[1],
            descripcion: pruebaTableMatch[2].trim(),
            tipo: pruebaTableMatch[3].trim()
        };
        continue;
    }

    // Buscar Hechos
    const hechoMatch = line.match(/^\*\*HECHO ([A-ZÁÉÍÓÚ ]+?)(?:\s+\([^)]+\))?\.\*\*/i);
    if (hechoMatch) {
      // Guardar anterior si existe
      if (currentHecho) {
        currentHecho.texto_completo = currentHecho.texto_completo.trim();
        result.hechos[currentHecho.id] = currentHecho;
      }

      const ordinalStr = hechoMatch[1].trim().toUpperCase();
      const mappedOrdinal = ordinalMap[ordinalStr];
      const preferredNumber = mappedOrdinal || idxHechoGeneral;
      const numOriginal = result.hechos[`hecho-${preferredNumber}`] ? idxHechoGeneral : preferredNumber;
      const hId = `hecho-${numOriginal}`;
      
      idxHechoGeneral = Math.max(idxHechoGeneral, numOriginal) + 1; // mantener secuencial incluso si el ordinal del documento repite números

      // El resumen será toda la primera oración o línea de contexto
      let resumenStr = line.replace(/^\*\*HECHO [A-ZÁÉÍÓÚ ]+\.\*\*\s*/i, "").trim();
      if (resumenStr.length > 250) {
        resumenStr = resumenStr.substring(0, 250) + "...";
      }

      currentHecho = {
        id: hId,
        numero: numOriginal,
        ordinal: ordinalStr,
        capitulo: currentCapitulo ? currentCapitulo.id : "cap-general",
        resumen: resumenStr,
        texto_completo: line + '\n',
        fragmentos_clave: [],
        pruebas: [],
        nota_abogado: null
      };

      if (currentCapitulo) {
        currentCapitulo.hechos.push(hId);
      }
      
      // Extract inline proofs from first line
      const prMatch = line.match(/\[(P-\d{2})\]/g);
      if (prMatch) {
        prMatch.forEach(p => {
          let testId = p.replace(/[\[\]]/g, '');
          if (!currentHecho.pruebas.includes(testId)) currentHecho.pruebas.push(testId);
        });
      }
      
      continue;
    }

    if (currentHecho) {
      currentHecho.texto_completo += line + '\n';
      
      // Extract inline proofs
      const prMatch = line.match(/\[(P-\d{2})\]/g);
      if (prMatch) {
        prMatch.forEach(p => {
          let testId = p.replace(/[\[\]]/g, '');
          if (!currentHecho.pruebas.includes(testId)) currentHecho.pruebas.push(testId);
        });
      }

      // Extract notas de abogado
      if (line.match(/^>\s*\*\*NOTA PARA EL ABOGADO\*\*:/i) || line.match(/^>\s*NOTA.*?:/i)) {
         currentHecho.nota_abogado = line.replace(/^>.*?:\s*/, "");
      } else if (currentHecho.nota_abogado && line.startsWith('>')) {
         currentHecho.nota_abogado += '\n' + line.substring(1).trim();
      }

      // Extract fragmentos (citas textuales en cursiva y entre comillas)
      // "*cita*" o '*cita*' o "cita"
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

  // Final push
  if (currentHecho) {
    currentHecho.texto_completo = currentHecho.texto_completo.trim();
    result.hechos[currentHecho.id] = currentHecho;
  }

  console.log(`[V] Parseados ${result.capitulos.length} Capítulos y ${Object.keys(result.hechos).length} Hechos`);
  return result;
}

module.exports = { parseHechos };

if (require.main === module) {
  const result = parseHechos();
  if (result) {
    fs.writeFileSync(path.join(__dirname, 'test-hechos.json'), JSON.stringify(result, null, 2));
  }
}
