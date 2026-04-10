const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
const sqlPath = path.join(__dirname, 'migration.sql');

const content = fs.readFileSync(dataPath, 'utf8');

// Extraer el objeto CASE_DATA de data.js
// Buscamos desde el primer '{' hasta el último '}' antes del ';'
const start = content.indexOf('{');
const end = content.lastIndexOf('}');
const jsonStr = content.substring(start, end + 1);

// Usamos eval de forma controlada porque data.js es una constante JS, no JSON puro necesariamente
let CASE_DATA;
try {
    CASE_DATA = eval(`(${jsonStr})`);
} catch (e) {
    console.error("Error parsing data.js:", e);
    process.exit(1);
}

const sqlStatements = [];

// 1. Capitulos
if (CASE_DATA.capitulos) {
    CASE_DATA.capitulos.forEach(c => {
        sqlStatements.push(`INSERT INTO public.capitulos (id, numero, titulo) VALUES ('${c.id}', '${c.numero}', '${c.titulo.replace(/'/g, "''")}') ON CONFLICT (id) DO NOTHING;`);
    });
}

// Crear un mapa de hecho_id -> capitulo_id
const hechoACapitulo = {};
if (CASE_DATA.capitulos) {
    CASE_DATA.capitulos.forEach(c => {
        if (c.hechos) {
            c.hechos.forEach(hId => {
                hechoACapitulo[hId] = c.id;
            });
        }
    });
}

// 2. Hechos
if (CASE_DATA.hechos) {
    Object.entries(CASE_DATA.hechos).forEach(([id, h]) => {
        const capituloId = hechoACapitulo[id] || 'null';
        sqlStatements.push(`INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            '${id}', 
            ${h.numero}, 
            '${h.ordinal}', 
            ${capituloId === 'null' ? 'NULL' : `'${capituloId}'`}, 
            '${h.resumen.replace(/'/g, "''")}', 
            '${h.texto_completo.replace(/'/g, "''")}', 
            '${h.texto_completo_html.replace(/'/g, "''")}', 
            '${h.titulo_corto.replace(/'/g, "''")}', 
            ${h.nota_abogado ? `'${h.nota_abogado.replace(/'/g, "''")}'` : 'NULL'}
        ) ON CONFLICT (id) DO NOTHING;`);
    });
}

// 3. Pruebas
if (CASE_DATA.pruebas_catalogo) {
    Object.entries(CASE_DATA.pruebas_catalogo).forEach(([id, p]) => {
        sqlStatements.push(`INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            '${id}', 
            '${p.descripcion.replace(/'/g, "''")}', 
            '${p.tipo.replace(/'/g, "''")}', 
            '${p.categoria || ''}'
        ) ON CONFLICT (id) DO NOTHING;`);
    });
}

// 4. Relación Hecho-Pruebas
if (CASE_DATA.hechos) {
    Object.entries(CASE_DATA.hechos).forEach(([id, h]) => {
        if (h.pruebas && Array.isArray(h.pruebas)) {
            h.pruebas.forEach(pId => {
                sqlStatements.push(`INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('${id}', '${pId}') ON CONFLICT DO NOTHING;`);
            });
        }
    });
}

// 5. Fragmentos Clave
if (CASE_DATA.hechos) {
    Object.entries(CASE_DATA.hechos).forEach(([id, h]) => {
        if (h.fragmentos_clave && Array.isArray(h.fragmentos_clave)) {
            h.fragmentos_clave.forEach(f => {
                sqlStatements.push(`INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    '${id}', 
                    '${f.cita.replace(/'/g, "''")}', 
                    '${f.fuente.replace(/'/g, "''")}', 
                    ${f.linea ? `'${f.linea}'` : 'NULL'}, 
                    '${f.fecha || ''}', 
                    '${f.autor || ''}', 
                    '${f.relevancia || ''}'
                );`);
            });
        }
    });
}

// 6. Documentos
if (CASE_DATA.archivos_crudos) {
    CASE_DATA.archivos_crudos.forEach(d => {
        sqlStatements.push(`INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            '${d.nombre.replace(/'/g, "''")}', 
            '${d.ruta.replace(/'/g, "''")}', 
            ${d.tamano || 0}
        ) ON CONFLICT (nombre) DO NOTHING;`);
    });
}

fs.writeFileSync(sqlPath, sqlStatements.join('\n'));
console.log(`SQL migration generated with ${sqlStatements.length} statements.`);
