const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const EXPECTED_PROJECT_REF = 'bqigfoolbrrwpuqafxst';
const EXPECTED_SUPABASE_URL = `https://${EXPECTED_PROJECT_REF}.supabase.co`;
const DIFF_PATH = path.join(__dirname, 'supabase_resumenes_pruebas_diff.json');

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function getArg(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return null;
  return process.argv[index + 1] || null;
}

function normalizeUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

async function main() {
  const applyMode = process.argv.includes('--apply');
  const forceProject = process.argv.includes('--force-project');
  const limitArg = getArg('--limit');
  const limit = limitArg ? Number(limitArg) : null;

  if (!fs.existsSync(DIFF_PATH)) {
    fail(`No existe el diff requerido: ${DIFF_PATH}`);
  }

  const diff = JSON.parse(fs.readFileSync(DIFF_PATH, 'utf8'));
  const supabaseUrl = normalizeUrl(process.env.SUPABASE_URL || EXPECTED_SUPABASE_URL);
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    fail('Falta SUPABASE_SERVICE_ROLE_KEY en el entorno.');
  }

  if (!forceProject && supabaseUrl !== EXPECTED_SUPABASE_URL) {
    fail(
      `La URL configurada (${supabaseUrl}) no coincide con la esperada (${EXPECTED_SUPABASE_URL}). Usa --force-project solo si ya verificaste el proyecto manualmente.`
    );
  }

  const changedItems = diff.items.filter((item) => item.changed);
  const workItems = limit ? changedItems.slice(0, limit) : changedItems;

  console.log(`Proyecto esperado: ${EXPECTED_PROJECT_REF}`);
  console.log(`URL usada: ${supabaseUrl}`);
  console.log(`Hechos a procesar: ${workItems.length}`);
  console.log(`Modo: ${applyMode ? 'APPLY' : 'DRY RUN'}`);

  if (!applyMode) {
    console.log('No se hicieron cambios. Ejecuta con --apply para escribir en Supabase.');
    return;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  let resumenesActualizados = 0;
  let pruebasReemplazadas = 0;

  for (const item of workItems) {
    console.log(`Procesando ${item.id}...`);

    if (item.resumen_changed) {
      const { error } = await supabase
        .from('hechos')
        .update({ resumen: item.resumen_correcto })
        .eq('id', item.id);

      if (error) {
        fail(`No se pudo actualizar el resumen de ${item.id}: ${error.message}`);
      }
      resumenesActualizados += 1;
    }

    if (item.pruebas_changed) {
      const { error: deleteError } = await supabase
        .from('hecho_pruebas')
        .delete()
        .eq('hecho_id', item.id);

      if (deleteError) {
        fail(`No se pudieron borrar las pruebas de ${item.id}: ${deleteError.message}`);
      }

      if (item.pruebas_correctas.length) {
        const rows = item.pruebas_correctas.map((pruebaId) => ({
          hecho_id: item.id,
          prueba_id: pruebaId
        }));
        const { error: insertError } = await supabase
          .from('hecho_pruebas')
          .insert(rows);

        if (insertError) {
          fail(`No se pudieron insertar las pruebas de ${item.id}: ${insertError.message}`);
        }
      }

      pruebasReemplazadas += 1;
    }
  }

  console.log(`Resumenes actualizados: ${resumenesActualizados}`);
  console.log(`Relaciones hecho_pruebas reemplazadas: ${pruebasReemplazadas}`);
  console.log('Aplicacion completada. Ejecuta node scratch/audit_supabase.js para verificar.');
}

main().catch((error) => fail(error.message));
