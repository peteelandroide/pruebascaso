const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://bqigfoolbrrwpuqafxst.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaWdmb29sYnJyd3B1cWFmeHN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3Njc5MjMsImV4cCI6MjA5MTM0MzkyM30.SL7otV5hWtc_EXWMF0s7bP1VRiZ97EBR7zxyMeFpq6Y';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function normalizeTable(tableName, columns) {
    console.log(`--- Normalizing ${tableName} ---`);
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) {
        console.error(`Error fetching ${tableName}:`, error);
        return;
    }

    for (const row of data) {
        const updates = {};
        let needsUpdate = false;
        
        columns.forEach(col => {
            if (row[col]) {
                const normalized = row[col].normalize('NFC');
                if (row[col] !== normalized) {
                    updates[col] = normalized;
                    needsUpdate = true;
                }
            }
        });

        if (needsUpdate) {
            console.log(`Updating ${tableName} ID ${row.id || row.numero}`);
            const { error: updateError } = await supabase
                .from(tableName)
                .update(updates)
                .eq(row.id ? 'id' : 'numero', row.id || row.numero);
            
            if (updateError) {
                console.error(`Error updating ID ${row.id || row.numero}:`, updateError);
            }
        }
    }
}

async function run() {
    await normalizeTable('pruebas', ['url', 'titulo']);
    await normalizeTable('hechos', ['resumen', 'nota_abogado']);
    await normalizeTable('fragmentos_clave', ['cita', 'fuente']);
    console.log('Normalization complete.');
}

run();
