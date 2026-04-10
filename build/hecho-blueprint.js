const FACT_BLUEPRINT = Object.freeze({
  'I|PRIMERO': { id: 'hecho-1', numero: 1 },
  'I|SEGUNDO': { id: 'hecho-2', numero: 2 },
  'I|TERCERO': { id: 'hecho-3', numero: 3 },
  'II|CUARTO': { id: 'hecho-4', numero: 4 },
  'II|QUINTO': { id: 'hecho-5', numero: 5 },
  'II|SEXTO': { id: 'hecho-6', numero: 6 },
  'II|SEPTIMO': { id: 'hecho-7', numero: 7 },
  'II|OCTAVO': { id: 'hecho-8', numero: 8 },
  'II|NOVENO': { id: 'hecho-9', numero: 9 },
  'III|DECIMO': { id: 'hecho-10', numero: 10 },
  'III|DECIMOPRIMERO': { id: 'hecho-11', numero: 11 },
  'III|DECIMOSEGUNDO': { id: 'hecho-12', numero: 12 },
  'III|DECIMOTERCERO': { id: 'hecho-13', numero: 13 },
  'III|DECIMOCUARTO': { id: 'hecho-14', numero: 14 },
  'III|DECIMOQUINTO': { id: 'hecho-15', numero: 15 },
  'III|DECIMOSEXTO': { id: 'hecho-16', numero: 16 },
  'III|DECIMOSEPTIMO': { id: 'hecho-17', numero: 17 },
  'III|DECIMOCTAVO': { id: 'hecho-18-canales', numero: 18 },
  'III|DECIMONOVENO': { id: 'hecho-19-capcut', numero: 19 },
  'III|VIGESIMO': { id: 'hecho-20-dnda', numero: 20 },
  'IV|DECIMOCTAVO': { id: 'hecho-18', numero: 18 },
  'IV|DECIMONOVENO': { id: 'hecho-19', numero: 19 },
  'IV|VIGESIMO': { id: 'hecho-20', numero: 20 },
  'V|VIGESIMOPRIMERO': { id: 'hecho-21', numero: 21 },
  'V|VIGESIMOSEGUNDO': { id: 'hecho-22', numero: 22 },
  'V|VIGESIMOTERCERO': { id: 'hecho-23', numero: 23 },
  'V|VIGESIMOCUARTO': { id: 'hecho-24', numero: 24 },
  'V|VIGESIMOQUINTO': { id: 'hecho-25', numero: 25 },
  'VI|VIGESIMOSEXTO': { id: 'hecho-26', numero: 26 },
  'VI|VIGESIMOSEPTIMO': { id: 'hecho-27', numero: 27 },
  'VI|VIGESIMOCTAVO': { id: 'hecho-28', numero: 28 },
  'VII|VIGESIMONOVENO': { id: 'hecho-29', numero: 29 },
  'VIII|TRIGESIMO': { id: 'hecho-30', numero: 30 },
  'VIII|TRIGESIMOPRIMERO': { id: 'hecho-31', numero: 31 },
  'VIII|TRIGESIMOSEGUNDO': { id: 'hecho-32', numero: 32 },
  'VIII|TRIGESIMOTERCERO': { id: 'hecho-33', numero: 33 },
  'IX|TRIGESIMOCUARTO': { id: 'hecho-34', numero: 34 },
  'IX|TRIGESIMOQUINTO': { id: 'hecho-35', numero: 35 },
  'X|TRIGESIMOSEXTO': { id: 'hecho-36', numero: 36 },
  'X|TRIGESIMOSEPTIMO': { id: 'hecho-37', numero: 37 },
  'X|TRIGESIMOCTAVO': { id: 'hecho-38', numero: 38 },
  'XI|TRIGESIMONOVENO': { id: 'hecho-39', numero: 39 },
  'XI|CUADRAGESIMO': { id: 'hecho-40', numero: 40 },
  'XII|CUADRAGESIMOPRIMERO': { id: 'hecho-41', numero: 41 },
  'XII|CUADRAGESIMOSEGUNDO': { id: 'hecho-42', numero: 42 },
  'XIII|CUADRAGESIMOTERCERO': { id: 'hecho-43', numero: 43 },
  'XIII|CUADRAGESIMOCUARTO': { id: 'hecho-44', numero: 44 },
  'XIII|CUADRAGESIMOQUINTO': { id: 'hecho-45', numero: 45 },
  'XIII|CUADRAGESIMOSEXTO': { id: 'hecho-46', numero: 46 },
  'XIV|CUADRAGESIMOSEPTIMO': { id: 'hecho-47', numero: 47 },
  'XIV|CUADRAGESIMOCTAVO': { id: 'hecho-48', numero: 48 },
  'XIV|CUADRAGESIMONOVENO': { id: 'hecho-49', numero: 49 },
  'XIV|QUINCUAGESIMO': { id: 'hecho-50', numero: 50 },
  'XIV|QUINCUAGESIMOPRIMERO': { id: 'hecho-51', numero: 51 },
  'XIV|QUINCUAGESIMOSEGUNDO': { id: 'hecho-52', numero: 52 },
  'XV|QUINCUAGESIMOTERCERO': { id: 'hecho-53', numero: 53 },
  'XV|QUINCUAGESIMOCUARTO': { id: 'hecho-54', numero: 54 },
  'XV|QUINCUAGESIMOQUINTO': { id: 'hecho-55', numero: 55 },
  'XV|QUINCUAGESIMOSEXTO': { id: 'hecho-56', numero: 56 },
  'XV|QUINCUAGESIMOSEPTIMO': { id: 'hecho-57', numero: 57 },
  'XV|QUINCUAGESIMOCTAVO': { id: 'hecho-58', numero: 58 },
  'XVI|QUINCUAGESIMONOVENO': { id: 'hecho-59', numero: 59 },
  'XVI|SEXAGESIMO': { id: 'hecho-60', numero: 60 },
  'XVI|SEXAGESIMOPRIMERO': { id: 'hecho-61', numero: 61 },
  'XVI|SEXAGESIMOSEGUNDO': { id: 'hecho-62', numero: 62 },
  'XVI|SEXAGESIMOTERCERO': { id: 'hecho-63', numero: 63 },
  'XVI|SEXAGESIMOCUARTO': { id: 'hecho-64', numero: 64 }
});

const SOURCE_KEY_ALIASES = Object.freeze({
  'XIV|CUADRAGESIMSEPTIMO': 'XIV|CUADRAGESIMOSEPTIMO'
});

function normalizeOrdinalKey(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '');
}

function buildSourceKey(chapter, ordinal) {
  const chapterKey = String(chapter || '').trim().toUpperCase();
  const rawKey = `${chapterKey}|${normalizeOrdinalKey(ordinal)}`;
  return SOURCE_KEY_ALIASES[rawKey] || rawKey;
}

const ORDINAL_TO_NUMBER = Object.freeze(
  Object.entries(FACT_BLUEPRINT).reduce((acc, [sourceKey, meta]) => {
    const ordinalKey = sourceKey.split('|')[1];
    if (typeof meta.numero === 'number' && acc[ordinalKey] === undefined) {
      acc[ordinalKey] = meta.numero;
    }
    return acc;
  }, {})
);

function getFactMeta(chapter, ordinal) {
  const sourceKey = buildSourceKey(chapter, ordinal);
  const known = FACT_BLUEPRINT[sourceKey];
  if (known) {
    return { ...known, sourceKey, known: true };
  }

  const ordinalKey = normalizeOrdinalKey(ordinal);
  const derivedNumber = ORDINAL_TO_NUMBER[ordinalKey] ?? null;
  const chapterSlug = String(chapter || 'general').trim().toLowerCase() || 'general';
  const slug = ordinalKey ? ordinalKey.toLowerCase() : 'sin-ordinal';

  return {
    id: derivedNumber !== null
      ? `hecho-${derivedNumber}-${chapterSlug}-${slug}`
      : `hecho-${chapterSlug}-${slug}`,
    numero: derivedNumber,
    sourceKey,
    known: false
  };
}

module.exports = {
  FACT_BLUEPRINT,
  EXPECTED_FACT_COUNT: Object.keys(FACT_BLUEPRINT).length,
  ORDINAL_TO_NUMBER,
  normalizeOrdinalKey,
  buildSourceKey,
  getFactMeta
};
