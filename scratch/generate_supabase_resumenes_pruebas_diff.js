const fs = require('fs');
const path = require('path');

const EXPECTED_PROJECT_REF = 'bqigfoolbrrwpuqafxst';
const EXPECTED_SUPABASE_URL = `https://${EXPECTED_PROJECT_REF}.supabase.co`;

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const DOC_PATH = path.join(ROOT_DIR, 'HECHOS_DEMANDA_PARETOMED_2026.md');
const SNAPSHOT_PATH = path.join(__dirname, 'supabase_snapshot.json');
const DIFF_JSON_PATH = path.join(__dirname, 'supabase_resumenes_pruebas_diff.json');
const DIFF_MD_PATH = path.join(__dirname, 'SUPABASE_DIFF_HECHO_POR_HECHO.md');
const SQL_PATH = path.join(__dirname, 'supabase_fix_resumenes_pruebas.sql');

const ordinalMap = new Map(Object.entries({
  PRIMERO: 1,
  SEGUNDO: 2,
  TERCERO: 3,
  CUARTO: 4,
  QUINTO: 5,
  SEXTO: 6,
  SEPTIMO: 7,
  'SÉPTIMO': 7,
  OCTAVO: 8,
  NOVENO: 9,
  DECIMO: 10,
  'DÉCIMO': 10,
  DECIMOPRIMERO: 11,
  UNDECIMO: 11,
  'UNDÉCIMO': 11,
  DECIMOSEGUNDO: 12,
  DUODECIMO: 12,
  'DUODÉCIMO': 12,
  DECIMOTERCERO: 13,
  DECIMOCUARTO: 14,
  DECIMOQUINTO: 15,
  DECIMOSEXTO: 16,
  DECIMOSEPTIMO: 17,
  'DECIMOSÉPTIMO': 17,
  DECIMOCTAVO: 18,
  DECIMONOVENO: 19,
  VIGESIMO: 20,
  'VIGÉSIMO': 20,
  VIGESIMOPRIMERO: 21,
  'VIGÉSIMOPRIMERO': 21,
  VIGESIMOSEGUNDO: 22,
  'VIGÉSIMOSEGUNDO': 22,
  VIGESIMOTERCERO: 23,
  'VIGÉSIMOTERCERO': 23,
  VIGESIMOCUARTO: 24,
  'VIGÉSIMOCUARTO': 24,
  VIGESIMOQUINTO: 25,
  'VIGÉSIMOQUINTO': 25,
  VIGESIMOSEXTO: 26,
  'VIGÉSIMOSEXTO': 26,
  VIGESIMOSEPTIMO: 27,
  'VIGÉSIMOSEPTIMO': 27,
  VIGESIMOCTAVO: 28,
  'VIGÉSIMOCTAVO': 28,
  VIGESIMONOVENO: 29,
  'VIGÉSIMONOVENO': 29,
  TRIGESIMO: 30,
  'TRIGÉSIMO': 30,
  TRIGESIMOPRIMERO: 31,
  'TRIGÉSIMOPRIMERO': 31,
  TRIGESIMOSEGUNDO: 32,
  'TRIGÉSIMOSEGUNDO': 32,
  TRIGESIMOTERCERO: 33,
  'TRIGÉSIMOTERCERO': 33,
  TRIGESIMOCUARTO: 34,
  'TRIGÉSIMOCUARTO': 34,
  TRIGESIMOQUINTO: 35,
  'TRIGÉSIMOQUINTO': 35,
  TRIGESIMOSEXTO: 36,
  'TRIGÉSIMOSEXTO': 36,
  TRIGESIMOSEPTIMO: 37,
  'TRIGÉSIMOSEPTIMO': 37,
  TRIGESIMOOCTAVO: 38,
  'TRIGÉSIMOOCTAVO': 38,
  TRIGESIMOCTAVO: 38,
  'TRIGÉSIMOCTAVO': 38,
  TRIGESIMONOVENO: 39,
  'TRIGÉSIMONOVENO': 39,
  CUADRAGESIMO: 40,
  'CUADRAGÉSIMO': 40,
  CUADRAGESIMOPRIMERO: 41,
  'CUADRAGÉSIMOPRIMERO': 41,
  CUADRAGESIMOSEGUNDO: 42,
  'CUADRAGÉSIMOSEGUNDO': 42,
  CUADRAGESIMOTERCERO: 43,
  'CUADRAGÉSIMOTERCERO': 43,
  CUADRAGESIMOCUARTO: 44,
  'CUADRAGÉSIMOCUARTO': 44,
  CUADRAGESIMOQUINTO: 45,
  'CUADRAGÉSIMOQUINTO': 45,
  CUADRAGESIMOSEXTO: 46,
  'CUADRAGÉSIMOSEXTO': 46,
  CUADRAGESIMSEPTIMO: 47,
  'CUADRAGÉSIMSEPTIMO': 47,
  CUADRAGESIMOSEPTIMO: 47,
  'CUADRAGÉSIMOSEPTIMO': 47,
  CUADRAGESIMOOCTAVO: 48,
  'CUADRAGÉSIMOOCTAVO': 48,
  CUADRAGESIMOCTAVO: 48,
  'CUADRAGÉSIMOCTAVO': 48,
  CUADRAGESIMONOVENO: 49,
  'CUADRAGÉSIMONOVENO': 49,
  QUINCUAGESIMO: 50,
  'QUINCUAGÉSIMO': 50,
  QUINCUAGESIMOPRIMERO: 51,
  'QUINCUAGÉSIMOPRIMERO': 51,
  QUINCUAGESIMOSEGUNDO: 52,
  'QUINCUAGÉSIMOSEGUNDO': 52,
  QUINCUAGESIMOTERCERO: 53,
  'QUINCUAGÉSIMOTERCERO': 53,
  QUINCUAGESIMOCUARTO: 54,
  'QUINCUAGÉSIMOCUARTO': 54,
  QUINCUAGESIMOQUINTO: 55,
  'QUINCUAGÉSIMOQUINTO': 55,
  QUINCUAGESIMOSEXTO: 56,
  'QUINCUAGÉSIMOSEXTO': 56,
  QUINCUAGESIMOSEPTIMO: 57,
  'QUINCUAGÉSIMOSEPTIMO': 57,
  QUINCUAGESIMOOCTAVO: 58,
  'QUINCUAGÉSIMOOCTAVO': 58,
  QUINCUAGESIMOCTAVO: 58,
  'QUINCUAGÉSIMOCTAVO': 58,
  QUINCUAGESIMONOVENO: 59,
  'QUINCUAGÉSIMONOVENO': 59,
  SEXAGESIMO: 60,
  'SEXAGÉSIMO': 60,
  SEXAGESIMOPRIMERO: 61,
  'SEXAGÉSIMOPRIMERO': 61,
  SEXAGESIMOSEGUNDO: 62,
  'SEXAGÉSIMOSEGUNDO': 62,
  SEXAGESIMOTERCERO: 63,
  'SEXAGÉSIMOTERCERO': 63,
  SEXAGESIMOCUARTO: 64,
  'SEXAGÉSIMOCUARTO': 64
}));

function ensureExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Archivo no encontrado: ${filePath}`);
  }
}

function toSummary(text) {
  if (text.length > 250) {
    return `${text.substring(0, 250)}...`;
  }
  return text;
}

function sqlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function parseDocument() {
  const lines = fs.readFileSync(DOC_PATH, 'utf8').split(/\r?\n/);
  const facts = [];
  let current = null;

  function isFactStart(line) {
    return /^\*\*HECHO\s+.+?\.\*\*/i.test(line);
  }

  function isBoundary(line) {
    if (/^##\s+/i.test(line)) return true;
    if (/^###\s+/i.test(line) && !/^###\s+Tabla\b/i.test(line)) return true;
    return false;
  }

  function closeCurrent() {
    if (!current) return;
    current.block = current.block.trim();
    current.pruebas = [...new Set((current.block.match(/P-\d{2}/g) || []).sort())];
    facts.push(current);
    current = null;
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (isFactStart(line)) {
      closeCurrent();
      const match = line.match(/^\*\*HECHO\s+(.+?)\.\*\*\s*(.*)$/i);
      const ordinalRaw = match[1].trim();
      const ordinalKey = ordinalRaw.replace(/\s*\(.*?\)\s*/g, '').replace(/\s+/g, '').toUpperCase();
      const numero = ordinalMap.get(ordinalKey);
      if (!numero) {
        throw new Error(`Ordinal no reconocido en linea ${index + 1}: ${ordinalRaw}`);
      }
      current = {
        line: index + 1,
        ordinal: ordinalRaw,
        numero,
        firstLineText: match[2].trim(),
        resumen: toSummary(match[2].trim()),
        block: `${line}\n`
      };
      continue;
    }
    if (current && isBoundary(line)) {
      closeCurrent();
    }
    if (current) {
      current.block += `${line}\n`;
    }
  }

  closeCurrent();

  const repeatedOrdinals = {};
  const byId = {};
  for (const fact of facts) {
    repeatedOrdinals[fact.numero] = (repeatedOrdinals[fact.numero] || 0) + 1;
    let id = `hecho-${fact.numero}`;
    if (fact.numero === 18 && repeatedOrdinals[fact.numero] === 1) id = 'hecho-18-canales';
    if (fact.numero === 18 && repeatedOrdinals[fact.numero] === 2) id = 'hecho-18';
    if (fact.numero === 19 && repeatedOrdinals[fact.numero] === 1) id = 'hecho-19-capcut';
    if (fact.numero === 19 && repeatedOrdinals[fact.numero] === 2) id = 'hecho-19';
    if (fact.numero === 20 && repeatedOrdinals[fact.numero] === 1) id = 'hecho-20-dnda';
    if (fact.numero === 20 && repeatedOrdinals[fact.numero] === 2) id = 'hecho-20';
    fact.id = id;
    byId[id] = fact;
  }

  return { facts, byId };
}

function buildDiff(documentFacts, snapshot) {
  return snapshot.map((item) => {
    const docFact = documentFacts.byId[item.id];
    if (!docFact) {
      throw new Error(`El snapshot contiene un hecho no mapeado: ${item.id}`);
    }

    const currentPruebas = [...new Set(item.pruebas)].sort();
    const targetPruebas = [...new Set(docFact.pruebas)].sort();
    const pruebasToAdd = targetPruebas.filter((prueba) => !currentPruebas.includes(prueba));
    const pruebasToRemove = currentPruebas.filter((prueba) => !targetPruebas.includes(prueba));
    const resumenChanged = item.resumen !== docFact.resumen;
    const pruebasChanged = JSON.stringify(currentPruebas) !== JSON.stringify(targetPruebas);

    return {
      id: item.id,
      numero: docFact.numero,
      ordinal: docFact.ordinal,
      line: docFact.line,
      titulo_actual: item.titulo,
      resumen_actual: item.resumen,
      resumen_correcto: docFact.resumen,
      resumen_changed: resumenChanged,
      pruebas_actuales: currentPruebas,
      pruebas_correctas: targetPruebas,
      pruebas_to_add: pruebasToAdd,
      pruebas_to_remove: pruebasToRemove,
      pruebas_changed: pruebasChanged,
      changed: resumenChanged || pruebasChanged
    };
  });
}

function writeDiffJson(diffItems) {
  const output = {
    generated_at: new Date().toISOString(),
    source_document: path.relative(ROOT_DIR, DOC_PATH),
    snapshot_file: path.relative(ROOT_DIR, SNAPSHOT_PATH),
    supabase_project_ref: EXPECTED_PROJECT_REF,
    supabase_url: EXPECTED_SUPABASE_URL,
    totals: {
      hechos: diffItems.length,
      resumenes_a_corregir: diffItems.filter((item) => item.resumen_changed).length,
      pruebas_a_corregir: diffItems.filter((item) => item.pruebas_changed).length,
      hechos_sin_cambios: diffItems.filter((item) => !item.changed).length
    },
    items: diffItems
  };
  fs.writeFileSync(DIFF_JSON_PATH, `${JSON.stringify(output, null, 2)}\n`);
}

function formatProofList(items) {
  if (!items.length) return '(ninguna)';
  return items.join(', ');
}

function buildMarkdown(diffItems) {
  const lines = [];
  const totalResumen = diffItems.filter((item) => item.resumen_changed).length;
  const totalPruebas = diffItems.filter((item) => item.pruebas_changed).length;
  const totalSinCambios = diffItems.filter((item) => !item.changed).length;

  lines.push('# Diff Supabase vs HECHOS_DEMANDA_PARETOMED_2026');
  lines.push('');
  lines.push(`- Proyecto Supabase objetivo: \`${EXPECTED_PROJECT_REF}\``);
  lines.push(`- URL esperada: \`${EXPECTED_SUPABASE_URL}\``);
  lines.push(`- Documento fuente: \`${path.relative(ROOT_DIR, DOC_PATH)}\``);
  lines.push(`- Snapshot auditado: \`${path.relative(ROOT_DIR, SNAPSHOT_PATH)}\``);
  lines.push(`- Hechos totales: \`${diffItems.length}\``);
  lines.push(`- Resumenes a corregir: \`${totalResumen}\``);
  lines.push(`- Pruebas a corregir: \`${totalPruebas}\``);
  lines.push(`- Hechos sin cambios: \`${totalSinCambios}\``);
  lines.push('');

  for (const item of diffItems) {
    const status = !item.changed
      ? 'SIN CAMBIOS'
      : item.resumen_changed && item.pruebas_changed
        ? 'CORREGIR RESUMEN Y PRUEBAS'
        : item.resumen_changed
          ? 'CORREGIR RESUMEN'
          : 'CORREGIR PRUEBAS';

    lines.push(`## ${item.id}`);
    lines.push('');
    lines.push(`- Estado: \`${status}\``);
    lines.push(`- Documento: linea \`${item.line}\` del archivo \`${path.relative(ROOT_DIR, DOC_PATH)}\``);
    lines.push(`- Titulo actual en Supabase: \`${item.titulo_actual}\``);
    lines.push(`- Resumen actual: \`${item.resumen_actual}\``);
    lines.push(`- Resumen correcto: \`${item.resumen_correcto}\``);
    lines.push(`- Pruebas actuales: \`${formatProofList(item.pruebas_actuales)}\``);
    lines.push(`- Pruebas correctas: \`${formatProofList(item.pruebas_correctas)}\``);
    lines.push(`- Agregar pruebas: \`${formatProofList(item.pruebas_to_add)}\``);
    lines.push(`- Quitar pruebas: \`${formatProofList(item.pruebas_to_remove)}\``);
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
}

function buildSql(diffItems) {
  const lines = [];
  const resumenItems = diffItems.filter((item) => item.resumen_changed);
  const pruebasItems = diffItems.filter((item) => item.pruebas_changed);

  lines.push('-- Correcciones de resumenes y pruebas para Supabase');
  lines.push(`-- Proyecto objetivo: ${EXPECTED_PROJECT_REF}`);
  lines.push(`-- URL esperada: ${EXPECTED_SUPABASE_URL}`);
  lines.push(`-- Documento fuente: ${path.relative(ROOT_DIR, DOC_PATH)}`);
  lines.push(`-- Snapshot auditado: ${path.relative(ROOT_DIR, SNAPSHOT_PATH)}`);
  lines.push('');
  lines.push('BEGIN;');
  lines.push('');

  if (resumenItems.length) {
    lines.push('-- 1. Actualizar resumenes en public.hechos');
    for (const item of resumenItems) {
      lines.push(
        `UPDATE public.hechos SET resumen = ${sqlString(item.resumen_correcto)} WHERE id = ${sqlString(item.id)};`
      );
    }
    lines.push('');
  }

  if (pruebasItems.length) {
    lines.push('-- 2. Reemplazar asociaciones en public.hecho_pruebas');
    lines.push(
      `DELETE FROM public.hecho_pruebas WHERE hecho_id IN (${pruebasItems.map((item) => sqlString(item.id)).join(', ')});`
    );
    lines.push('');
    for (const item of pruebasItems) {
      if (!item.pruebas_correctas.length) {
        continue;
      }
      for (const pruebaId of item.pruebas_correctas) {
        lines.push(
          `INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES (${sqlString(item.id)}, ${sqlString(pruebaId)});`
        );
      }
    }
    lines.push('');
  }

  lines.push('COMMIT;');
  lines.push('');
  return lines.join('\n');
}

function main() {
  ensureExists(DOC_PATH);
  ensureExists(SNAPSHOT_PATH);

  const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
  const documentFacts = parseDocument();
  const diffItems = buildDiff(documentFacts, snapshot).sort((left, right) => left.line - right.line);

  writeDiffJson(diffItems);
  fs.writeFileSync(DIFF_MD_PATH, buildMarkdown(diffItems));
  fs.writeFileSync(SQL_PATH, buildSql(diffItems));

  const resumenCount = diffItems.filter((item) => item.resumen_changed).length;
  const pruebasCount = diffItems.filter((item) => item.pruebas_changed).length;
  const unchangedCount = diffItems.filter((item) => !item.changed).length;

  console.log(`Proyecto Supabase objetivo: ${EXPECTED_PROJECT_REF}`);
  console.log(`Hechos procesados: ${diffItems.length}`);
  console.log(`Resumenes a corregir: ${resumenCount}`);
  console.log(`Pruebas a corregir: ${pruebasCount}`);
  console.log(`Hechos sin cambios: ${unchangedCount}`);
  console.log(`JSON: ${DIFF_JSON_PATH}`);
  console.log(`Markdown: ${DIFF_MD_PATH}`);
  console.log(`SQL: ${SQL_PATH}`);
}

main();
