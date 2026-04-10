const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Credenciales extraídas de app.js
const SUPABASE_URL = 'https://bqigfoolbrrwpuqafxst.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaWdmb29sYnJyd3B1cWFmeHN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3Njc5MjMsImV4cCI6MjA5MTM0MzkyM30.SL7otV5hWtc_EXWMF0s7bP1VRiZ97EBR7zxyMeFpq6Y';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function audit() {
    console.log('--- Iniciando Auditoría de Supabase ---');
    
    try {
        const { data: hechos, error: hError } = await supabase
            .from('hechos')
            .select('id, titulo_corto, resumen, capitulo_id')
            .order('id');
            
        const { data: mapping, error: mError } = await supabase
            .from('hecho_pruebas')
            .select('*');

        if (hError || mError) throw (hError || mError);

        // Agrupar pruebas por hecho
        const associations = {};
        mapping.forEach(m => {
            if (!associations[m.hecho_id]) associations[m.hecho_id] = [];
            associations[m.hecho_id].push(m.prueba_id);
        });

        const report = hechos.map(h => ({
            id: h.id,
            titulo: h.titulo_corto,
            resumen: h.resumen,
            pruebas: (associations[h.id] || []).sort()
        }));

        const outputPath = path.join(__dirname, 'supabase_snapshot.json');
        fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
        
        console.log(`✅ Auditoría completada. Snapshot guardado en: ${outputPath}`);
        console.log(`📊 Total hechos: ${hechos.length}`);
        console.log(`🔗 Total asociaciones: ${mapping.length}`);
        
        // Verificación rápida de Hecho 46
        const h46 = report.find(r => r.id === 'hecho-46');
        if (h46) {
            console.log('\n--- Verificación Hecho 46 ---');
            console.log(`Título: ${h46.titulo}`);
            console.log(`Pruebas: ${h46.pruebas.join(', ')}`);
        }

    } catch (err) {
        console.error('❌ Error en auditoría:', err.message);
    }
}

audit();
