document.addEventListener('DOMContentLoaded', async () => {

    // ────────────────────────────────────────────────────
    // Supabase Client
    // ────────────────────────────────────────────────────
    const SUPABASE_URL = 'https://bqigfoolbrrwpuqafxst.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaWdmb29sYnJyd3B1cWFmeHN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3Njc5MjMsImV4cCI6MjA5MTM0MzkyM30.SL7otV5hWtc_EXWMF0s7bP1VRiZ97EBR7zxyMeFpq6Y';
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // ────────────────────────────────────────────────────
    // Cargar datos desde Supabase y reconstruir CASE_DATA
    // ────────────────────────────────────────────────────
    async function loadFromSupabase() {
        try {
            const [capRes, hechosRes, pruebasRes, mappingRes, fragRes] = await Promise.all([
                supabase.from('capitulos').select('*').order('orden'),
                supabase.from('hechos').select('*').order('numero'),
                supabase.from('pruebas').select('*'),
                supabase.from('hecho_pruebas').select('*'),
                supabase.from('fragmentos_clave').select('*')
            ]);

            if (capRes.error) throw capRes.error;
            if (hechosRes.error) throw hechosRes.error;
            if (pruebasRes.error) throw pruebasRes.error;
            if (mappingRes.error) throw mappingRes.error;
            if (fragRes.error) throw fragRes.error;

            // Build mapping: hecho_id → array of prueba_ids
            const hechoToPruebas = {};
            mappingRes.data.forEach(m => {
                if (!hechoToPruebas[m.hecho_id]) hechoToPruebas[m.hecho_id] = [];
                hechoToPruebas[m.hecho_id].push(m.prueba_id);
            });

            // Build mapping: hecho_id → array of fragmentos
            const hechoToFragmentos = {};
            fragRes.data.forEach(f => {
                if (!hechoToFragmentos[f.hecho_id]) hechoToFragmentos[f.hecho_id] = [];
                hechoToFragmentos[f.hecho_id].push({
                    cita: f.cita,
                    fuente: f.fuente,
                    linea: f.linea,
                    fecha: f.fecha,
                    autor: f.autor,
                    relevancia: f.relevancia
                });
            });

            // Build mapping: capitulo_id → array of hecho_ids (preserving order)
            const capToHechos = {};
            hechosRes.data.forEach(h => {
                if (h.capitulo_id) {
                    if (!capToHechos[h.capitulo_id]) capToHechos[h.capitulo_id] = [];
                    capToHechos[h.capitulo_id].push(h.id);
                }
            });

            // Reconstruct capitulos with their hecho arrays
            const capitulos = capRes.data.map(c => ({
                id: c.id,
                numero: c.numero,
                titulo: c.titulo,
                hechos: capToHechos[c.id] || []
            }));

            // Reconstruct hechos as object keyed by id
            const hechos = {};
            hechosRes.data.forEach(h => {
                hechos[h.id] = {
                    id: h.id,
                    numero: h.numero,
                    ordinal: h.ordinal,
                    capitulo_id: h.capitulo_id,
                    resumen: h.resumen,
                    texto_completo: h.texto_completo,
                    texto_completo_html: h.texto_completo_html,
                    titulo_corto: h.titulo_corto,
                    nota_abogado: h.nota_abogado,
                    pruebas: hechoToPruebas[h.id] || [],
                    fragmentos_clave: hechoToFragmentos[h.id] || []
                };
            });

            // Reconstruct pruebas_catalogo keyed by id
            const pruebas_catalogo = {};
            pruebasRes.data.forEach(p => {
                pruebas_catalogo[p.id] = {
                    descripcion: p.descripcion,
                    tipo: p.tipo,
                    categoria: p.categoria
                };
            });

            // Merge with existing CASE_DATA (from data.js) which has documentos, pruebas_urls, pruebas_meta, archivos_crudos
            if (typeof CASE_DATA !== 'undefined') {
                CASE_DATA.capitulos = capitulos;
                CASE_DATA.hechos = hechos;
                CASE_DATA.pruebas_catalogo = pruebas_catalogo;
            } else {
                window.CASE_DATA = {
                    capitulos,
                    hechos,
                    pruebas_catalogo,
                    documentos: {},
                    pruebas_urls: {},
                    pruebas_meta: {},
                    archivos_crudos: []
                };
            }

            console.log(`[Supabase] Data loaded: ${capitulos.length} capitulos, ${Object.keys(hechos).length} hechos, ${Object.keys(pruebas_catalogo).length} pruebas`);
        } catch (err) {
            console.error('[Supabase] Error loading data:', err);
            console.log('[Supabase] Falling back to static data.js');
        }
    }

    // Load data from Supabase before rendering
    await loadFromSupabase();

    const DOM = {
        tabs: document.querySelectorAll('.tab-btn'),
        panes: document.querySelectorAll('.tab-pane'),
        hechosContainer: document.getElementById('hechos-container'),
        pruebasContainer: document.getElementById('pruebas-container'),
        documentosList: document.getElementById('documentos-list'),
        resumenDashboard: document.getElementById('resumen-dashboard'),
        globalSearch: document.getElementById('global-search')
    };

    // --- Navegación por tabs ---
    DOM.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            DOM.tabs.forEach(t => t.classList.remove('active'));
            DOM.panes.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.target).classList.add('active');
        });
    });

    // --- Helper: icono por categoría ---
    function catIcon(cat) {
        const icons = { audio:'🎙', chat:'💬', documento:'📄', certificacion:'📜', financiero:'📊', imagen:'🖼', testimonial:'👤' };
        return icons[cat] || '📎';
    }

    // --- Helper: etiqueta legible por categoría ---
    function catLabel(cat) {
        const labels = {
            audio: 'Confesión / Audio',
            chat: 'Chat / Electrónico',
            documento: 'Documental',
            certificacion: 'Certificación',
            financiero: 'Financiero',
            imagen: 'Imagen',
            testimonial: 'Testimonial'
        };
        return labels[cat] || cat;
    }

    // --- Helper: parse fragment date string → Date ---
    function parseFragDate(dateStr) {
        if (!dateStr) return null;
        const dmy = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (dmy) return new Date(parseInt(dmy[3]), parseInt(dmy[2]) - 1, parseInt(dmy[1]));
        const mm = { ene:0,feb:1,mar:2,abr:3,may:4,jun:5,jul:6,ago:7,sep:8,oct:9,nov:10,dic:11,
            enero:0,febrero:1,marzo:2,abril:3,mayo:4,junio:5,julio:6,agosto:7,septiembre:8,octubre:9,noviembre:10,diciembre:11 };
        const my = dateStr.match(/^([a-záéíóú]+)\s+(\d{4})$/i);
        if (my && mm[my[1].toLowerCase()] !== undefined) return new Date(parseInt(my[2]), mm[my[1].toLowerCase()], 15);
        const y = dateStr.match(/^(\d{4})$/);
        if (y) return new Date(parseInt(y[1]), 6, 1);
        const rng = dateStr.match(/([a-záéíóú]+)\s+(\d{4})\s*-/i);
        if (rng && mm[rng[1].toLowerCase()] !== undefined) return new Date(parseInt(rng[2]), mm[rng[1].toLowerCase()], 1);
        return null;
    }

    // --- Helper: detect evidence badge type from fragment ---
    function detectBadgeType(frag) {
        const r = ((frag.relevancia || '') + ' ' + (frag.cita || '')).toLowerCase();
        if (r.includes('confesión') || r.includes('confesion extrajudicial') || r.includes('confesion:')) return { label: 'CONFESIÓN', cls: 'badge-confesion' };
        if (r.includes('reconoce') || r.includes('admite') || r.includes('reconocimiento') || r.includes('si reconozco')) return { label: 'ADMISIÓN', cls: 'badge-admision' };
        if (r.includes('firmad') || r.includes('firma de')) return { label: 'DOC. FIRMADO', cls: 'badge-firmado' };
        if (r.includes('testigo') || r.includes('tercero')) return { label: 'TESTIGO', cls: 'badge-testigo' };
        if (r.includes('constancia') || r.includes('certificad')) return { label: 'CERTIFICACIÓN', cls: 'badge-cert' };
        return null;
    }

    // --- Helper: compute hecho probative strength 0-5 ---
    function computeStrength(h) {
        let s = 0;
        const all = JSON.stringify(h).toLowerCase();
        if (all.includes('confesión') || all.includes('confesion extrajudicial')) s += 2;
        else if (all.includes('reconoce') || all.includes('admite')) s += 1;
        if (all.includes('firmad')) s += 1;
        if (h.pruebas && h.pruebas.length >= 3) s += 2;
        else if (h.pruebas && h.pruebas.length >= 1) s += 1;
        if (h.fragmentos_clave && h.fragmentos_clave.length >= 3) s += 1;
        return Math.min(s, 5);
    }

    // --- Helper: render single fragment box ---
    function renderFragment(frag, isPosterior) {
        const badge = detectBadgeType(frag);
        let meta = '<div class="frag-meta">';
        if (badge) meta += `<span class="frag-badge ${badge.cls}">${badge.label}</span>`;
        if (isPosterior) meta += `<span class="frag-badge badge-posterior">POSTERIOR</span>`;
        if (frag.autor) meta += `<span class="frag-autor">${frag.autor}</span>`;
        if (frag.fecha) meta += `<span class="frag-fecha">${frag.fecha}</span>`;
        meta += '</div>';

        let rel = '';
        if (frag.relevancia) {
            rel = `<div class="frag-relevancia"><strong>Relevancia:</strong> ${frag.relevancia}</div>`;
        }

        let docBtn = '';
        const citaEncoded = frag.cita ? frag.cita.replace(/"/g, '&quot;').substring(0, 120) : '';
        if (frag.fuente && frag.linea) {
            const docObj = CASE_DATA.documentos[frag.fuente];
            const docName = docObj ? docObj.titulo : frag.fuente;
            const url = docObj ? `${docObj.archivo_html}#L${frag.linea}` : `docs/${frag.fuente}.html#L${frag.linea}`;
            docBtn = `<button class="btn-doc highlight-doc-btn ver-doc-inline" data-url="${url}" data-title="${docName}" data-cita="${citaEncoded}">🔗 Ver en ${docName} (línea ${frag.linea})</button>`;
        } else if (frag.fuente) {
            const docObj = CASE_DATA.documentos[frag.fuente];
            if (docObj && docObj.archivo_html) {
                docBtn = `<button class="btn-doc highlight-doc-btn ver-doc-inline" data-url="${docObj.archivo_html}" data-title="${docObj.titulo}" data-cita="${citaEncoded}">🔗 Ver en ${docObj.titulo}</button>`;
            }
        }

        return `<div class="fragment-box${isPosterior ? ' frag-posterior' : ''}">
            ${meta}
            <blockquote>"${frag.cita}"</blockquote>
            ${rel}
            ${docBtn ? `<div class="frag-actions">${docBtn}</div>` : ''}
        </div>`;
    }

    // --- Helper: generar link a documento ---
    function buildDocLink(pId) {
        const urls = CASE_DATA.pruebas_urls ? CASE_DATA.pruebas_urls[pId] : null;
        if (!urls) return `<span class="ev-no-link">Pendiente de digitalización</span>`;

        const meta = CASE_DATA.pruebas_meta ? CASE_DATA.pruebas_meta[pId] : null;
        const baseTitle = meta ? meta.descripcion : pId;

        let links = '';
        if (urls.multipleraw && urls.multipleraw.length > 0) {
            links = urls.multipleraw.map((u, i) =>
                `<button class="btn-doc ver-doc-inline" data-url="${u}" data-title="${baseTitle} (Anexo ${i+1})">📄 Anexo ${i+1}</button>`
            ).join('');
            if (urls.html) {
                links = `<button class="btn-doc ver-doc-inline" data-url="${urls.html}" data-title="${baseTitle}">📄 Documento Principal</button>` + links;
            }
        } else if (urls.html) {
            links = `<button class="btn-doc ver-doc-inline" data-url="${urls.html}" data-title="${baseTitle}">📄 Abrir Documento</button>`;
        } else if (urls.raw) {
            links = `<button class="btn-doc ver-doc-inline" data-url="${urls.raw}" data-title="${baseTitle}">📎 Abrir Archivo</button>`;
        }
        return links || `<span class="ev-no-link">Archivo no disponible digitalmente</span>`;
    }

    // --- Render TIMELINE (strip horizontal en sidebar Hechos) ---
    function renderTimeline() {
        const tl = [
            { fecha: 'Nov 2023', label: 'Primer contacto', capId: 'cap-2', tipo: 'neutral' },
            { fecha: 'Ene 2024', label: 'Reunión presencial', capId: 'cap-2', tipo: 'neutral' },
            { fecha: 'Feb 2024', label: 'Propuesta 30%', capId: 'cap-2', tipo: 'neutral' },
            { fecha: 'Mar 2024', label: 'Acuerdo 20%', capId: 'cap-2', tipo: 'key' },
            { fecha: 'Abr 2024', label: 'Sociedad de hecho', capId: 'cap-2', tipo: 'key' },
            { fecha: 'Abr 2024', label: 'Subdirector', capId: 'cap-2', tipo: 'key' },
            { fecha: 'May 2024', label: 'Primer pago', capId: 'cap-4', tipo: 'neutral' },
            { fecha: 'Jun 2024', label: 'SOPs', capId: 'cap-3', tipo: 'neutral' },
            { fecha: 'Jul 2024', label: 'Acuerdo manuscrito', capId: 'cap-8', tipo: 'neutral' },
            { fecha: 'Ene 2025', label: 'Mera formalidad', capId: 'cap-5', tipo: 'key' },
            { fecha: 'Jul 2025', label: 'Exige deberes socio', capId: 'cap-16', tipo: 'danger' },
            { fecha: 'Ago 2025', label: 'Grabación — confesión', capId: 'cap-9', tipo: 'danger' },
            { fecha: 'Ago 2025', label: 'Último pago', capId: 'cap-9', tipo: 'danger' },
            { fecha: 'Oct 2025', label: 'Copyright claims', capId: 'cap-11', tipo: 'danger' },
            { fecha: 'Feb 2026', label: 'No conciliación', capId: 'cap-12', tipo: 'key' },
        ];

        const items = tl.map(item => `
            <div class="tl-strip-item tl-strip-${item.tipo}" data-cap="${item.capId}" title="${item.label}">
                <span class="tl-strip-dot"></span>
                <span class="tl-strip-date">${item.fecha}</span>
                <span class="tl-strip-label">${item.label}</span>
            </div>`).join('');

        return `<div class="hechos-timeline-strip">
            <div class="tl-strip-track">${items}</div>
        </div>`;
    }

    // --- Render HECHOS ---
    function renderHechos() {
        if (!CASE_DATA || !CASE_DATA.capitulos) return;

        let html = '';
        CASE_DATA.capitulos.forEach(capitulo => {
            const hCount = capitulo.hechos.length;
            html += `
            <div class="chapter-block" id="cap-${capitulo.numero}" data-id="${capitulo.id}">
                <div class="chapter-header" onclick="this.parentElement.classList.toggle('expanded')">
                    <span>CAPÍTULO ${capitulo.numero}: ${capitulo.titulo}</span>
                    <span class="chapter-meta"><span class="chapter-count">${hCount} hecho${hCount !== 1 ? 's' : ''}</span> <span class="indicator">▼</span></span>
                </div>
                <div class="chapter-content">`;

            capitulo.hechos.forEach(hid => {
                const h = CASE_DATA.hechos[hid];
                if (!h) return;

                // Título: usar titulo_corto curado, fallback a resumen truncado
                const title = h.titulo_corto || (h.resumen ? h.resumen.substring(0, 80) + '...' : 'Hecho ' + h.numero);

                // Tags de prueba compactos
                const tags = h.pruebas.map(p => {
                    const meta = CASE_DATA.pruebas_meta ? CASE_DATA.pruebas_meta[p] : null;
                    const cat = meta ? meta.categoria : '';
                    return `<span class="tag tag-${cat}" title="${meta ? meta.descripcion : p}">${catIcon(cat)} ${p}</span>`;
                }).join('');

                // === CONTENIDO EXPANDIDO ===

                // Texto legal completo
                let bodyText = h.texto_completo_html || h.texto_completo || '';

                // Nota del abogado
                let notaHtml = '';
                if (h.nota_abogado_html) {
                    notaHtml = `<div class="nota-abogado"><span class="nota-label">📌 NOTA PARA EL ABOGADO:</span>${h.nota_abogado_html}</div>`;
                }

                // Extractos curados — ordenados cronológicamente, agrupados
                let fragHtml = '';
                if (h.fragmentos_clave && h.fragmentos_clave.length > 0) {
                    const sorted = [...h.fragmentos_clave].sort((a, b) => {
                        const da = parseFragDate(a.fecha), db = parseFragDate(b.fecha);
                        if (!da && !db) return 0;
                        if (!da) return 1;
                        if (!db) return -1;
                        return da - db;
                    });

                    // Split: contemporary vs posterior (>6 months after earliest)
                    const earliest = sorted.reduce((min, f) => {
                        const d = parseFragDate(f.fecha);
                        return d && (!min || d < min) ? d : min;
                    }, null);
                    const SIX_MONTHS = 180 * 86400000;
                    const contemporary = [], posterior = [];
                    if (earliest && sorted.length > 1) {
                        sorted.forEach(f => {
                            const d = parseFragDate(f.fecha);
                            if (d && (d - earliest > SIX_MONTHS)) posterior.push(f);
                            else contemporary.push(f);
                        });
                    } else {
                        contemporary.push(...sorted);
                    }

                    fragHtml += `<div class="fragmentos-extractos">`;
                    if (contemporary.length > 0) {
                        fragHtml += `<h4 class="section-label">EXTRACTOS DE EVIDENCIA <span class="frag-count">${sorted.length} extracto${sorted.length > 1 ? 's' : ''}</span></h4>`;
                        contemporary.forEach(f => { fragHtml += renderFragment(f, false); });
                    }
                    if (posterior.length > 0) {
                        fragHtml += `<h4 class="section-label section-label-posterior">CORROBORACIONES POSTERIORES <span class="frag-count">${posterior.length}</span></h4>`;
                        posterior.forEach(f => { fragHtml += renderFragment(f, true); });
                    }
                    fragHtml += `</div>`;
                }

                // Documentos de evidencia
                let evidHtml = '';
                if (h.pruebas && h.pruebas.length > 0) {
                    evidHtml += `<div class="evidencias-section"><h4 class="section-label">DOCUMENTOS DE EVIDENCIA</h4>`;
                    h.pruebas.forEach(pId => {
                        const meta = CASE_DATA.pruebas_meta ? CASE_DATA.pruebas_meta[pId] : null;
                        const cat = meta ? meta.categoria : '';
                        evidHtml += `
                        <div class="evidencia-card ev-cat-${cat}">
                            <div class="ev-header">
                                <span class="ev-badge">${catIcon(cat)} ${pId}</span>
                                <span class="ev-desc">${meta ? meta.descripcion : 'Documento de Soporte'}</span>
                            </div>
                            <div class="ev-tipo">${meta ? meta.tipo : 'Anexo'}</div>
                            <div class="ev-actions">${buildDocLink(pId)}</div>
                        </div>`;
                    });
                    evidHtml += `</div>`;
                }

                // Estado vacío
                let emptyMsg = '';
                if (!evidHtml && !fragHtml) {
                    emptyMsg = `<div class="empty-evidence-msg">⚖️ Este hecho se sustenta en la declaración general; no se han vinculado anexos digitales específicos.</div>`;
                }

                const strength = computeStrength(h);
                const strengthDots = Array.from({length: 5}, (_, i) =>
                    `<span class="str-dot${i < strength ? ' str-filled' : ''}"></span>`
                ).join('');
                const strengthLabels = ['', 'Baja', 'Media', 'Media-Alta', 'Alta', 'Muy Alta'];

                html += `
                <div class="hecho-card" id="hecho-${h.numero}" data-id="${h.id}">
                    <div class="hecho-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <span class="h-num">${(h.numero < 10 ? '0' : '') + h.numero}</span>
                        <span class="h-title">${title}</span>
                        <div class="h-strength" title="Fuerza probatoria: ${strengthLabels[strength]}">${strengthDots}</div>
                        <div class="h-tags">${tags}</div>
                    </div>
                    <div class="hecho-body">
                        <div class="hecho-text content-markdown">${bodyText}</div>
                        ${notaHtml}
                        ${fragHtml}
                        ${evidHtml}
                        ${emptyMsg}
                    </div>
                </div>`;
            });

            html += `</div></div>`;
        });

        // Inject timeline strip before the accordion
        const timelineEl = document.getElementById('hechos-timeline');
        if (timelineEl) timelineEl.outerHTML = renderTimeline();
        else {
            const strip = document.createElement('div');
            strip.id = 'hechos-timeline';
            strip.innerHTML = renderTimeline();
            DOM.hechosContainer.parentElement.insertBefore(strip.firstElementChild, DOM.hechosContainer);
        }

        DOM.hechosContainer.innerHTML = html;

        // Click handler for timeline strip items
        document.querySelector('.hechos-timeline-strip')?.addEventListener('click', (e) => {
            const item = e.target.closest('.tl-strip-item');
            if (!item) return;
            const capId = item.dataset.cap;
            const capEl = document.getElementById(capId);
            if (!capEl) return;
            capEl.classList.add('expanded');
            setTimeout(() => capEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
            // Highlight briefly
            capEl.style.outline = '2px solid #2563eb';
            setTimeout(() => { capEl.style.outline = ''; }, 1500);
        });
    }

    // --- Render PRUEBAS (Catálogo Premium) ---
    function renderPruebas() {
        const pruebas = CASE_DATA.pruebas_meta || {};
        const urls = CASE_DATA.pruebas_urls || {};
        const count = Object.keys(pruebas).length;

        let gridHtml = '';
        const sortedIds = Object.keys(pruebas).sort((a, b) => {
            const numA = parseInt(a.replace('P-', ''), 10);
            const numB = parseInt(b.replace('P-', ''), 10);
            return numA - numB;
        });

        sortedIds.forEach(pId => {
            const meta = pruebas[pId];
            const u = urls[pId] || {};
            const cat = meta.categoria || '';

            let actionBtns = '';
            if (u.multipleraw && u.multipleraw.length > 0) {
                if (u.html) {
                    actionBtns += `<button class="btn-doc ver-doc-inline" data-url="${u.html}" data-title="${meta.descripcion}">📄 Ver Documento</button>`;
                }
                actionBtns += u.multipleraw.map((r, i) =>
                    `<button class="btn-doc ver-doc-inline" data-url="${r}" data-title="${meta.descripcion} — Anexo ${i+1}">📎 Anexo ${i+1}</button>`
                ).join('');
            } else if (u.html) {
                actionBtns = `<button class="btn-doc ver-doc-inline" data-url="${u.html}" data-title="${meta.descripcion}">📄 Ver Documento</button>`;
            } else if (u.raw) {
                actionBtns = `<button class="btn-doc ver-doc-inline" data-url="${u.raw}" data-title="${meta.descripcion}">📎 Abrir Archivo</button>`;
            } else {
                actionBtns = `<span class="prueba-no-link">⏳ Pendiente de digitalización</span>`;
            }

            gridHtml += `
            <div class="prueba-card-premium" data-cat="${cat}">
                <div class="prueba-cat-strip cat-${cat}"></div>
                <div class="prueba-card-body">
                    <div class="prueba-card-top">
                        <span class="prueba-id-badge">${catIcon(cat)} ${pId}</span>
                        <span class="prueba-cat-label cat-${cat}">${catLabel(cat)}</span>
                    </div>
                    <div class="prueba-desc">${meta.descripcion}</div>
                    <div class="prueba-tipo">${meta.tipo}</div>
                </div>
                <div class="prueba-card-actions">${actionBtns}</div>
            </div>`;
        });

        DOM.pruebasContainer.innerHTML = `
            <div class="pruebas-page">
                <div class="pruebas-header">
                    <h2>Catálogo de Pruebas — ${count} elementos</h2>
                    <p class="pruebas-subtitle">Corpus documental completo del caso ParetoMed. Haga clic en cualquier documento para abrirlo en el visor.</p>
                </div>
                <div class="pruebas-grid">${gridHtml}</div>
            </div>`;

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                document.querySelectorAll('.prueba-card-premium').forEach(card => {
                    if (filter === 'all' || card.dataset.cat === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // --- Render DOCUMENTOS ---
    function renderDocumentos() {
        let html = '<h2>Documentos Preprocesados (Vista Web)</h2><ul class="doc-list">';
        Object.values(CASE_DATA.documentos || {}).forEach(doc => {
            let docUrl = doc.archivo_html;
            if (docUrl && !docUrl.endsWith('.html') && !docUrl.includes('#')) {
                docUrl += '.html';
            }
            const encodedUrl = docUrl || `docs/${doc.id}.html`;
            html += `<li class="doc-item">
                <a href="${encodedUrl}" target="_blank" class="doc-link">🔍 ${doc.titulo}</a>
                <em class="doc-type">${doc.tipo}</em>
            </li>`;
        });
        html += '</ul><hr class="doc-divider"><h2>Archivos Originales (Descargas)</h2><ul class="doc-list">';

        if (CASE_DATA.archivos_crudos) {
            CASE_DATA.archivos_crudos.forEach(file => {
               const sizeMB = file.tamano > 1024*1024 ? (file.tamano / (1024*1024)).toFixed(2) + ' MB' : (file.tamano / 1024).toFixed(1) + ' KB';
               html += `<li class="doc-item doc-raw">
                   <span class="doc-name">📄 <strong>${file.nombre}</strong> <span class="doc-size">(${sizeMB})</span></span>
                   <a href="${file.ruta}" download class="btn-doc">⬇ Descargar</a>
               </li>`;
            });
        }

        html += '</ul>';
        DOM.documentosList.innerHTML = html;
    }

    // --- BÚSQUEDA GLOBAL ---
    DOM.globalSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Buscar en hechos (textContent incluye elementos colapsados con display:none)
        const chapters = document.querySelectorAll('.chapter-block');
        chapters.forEach(chapter => {
            let hasVisible = false;
            const hechos = chapter.querySelectorAll('.hecho-card');
            hechos.forEach(hecho => {
                const text = hecho.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (text.includes(query)) {
                    hecho.style.display = '';
                    hasVisible = true;
                } else {
                    hecho.style.display = 'none';
                }
            });

            if (query.trim() !== '') {
                chapter.classList.add('expanded');
                chapter.style.display = hasVisible ? '' : 'none';
            } else {
                chapter.classList.remove('expanded');
                chapter.style.display = '';
            }
        });

        // Buscar en pruebas
        document.querySelectorAll('.prueba-card-premium').forEach(card => {
            const text = card.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const activeFilter = document.querySelector('.filter-btn.active');
            const filterCat = activeFilter ? activeFilter.dataset.filter : 'all';
            const catMatch = filterCat === 'all' || card.dataset.cat === filterCat;
            if (query.trim() === '') {
                card.classList.toggle('hidden', !catMatch);
            } else {
                card.classList.toggle('hidden', !text.includes(query) || !catMatch);
            }
        });

        // Buscar en documentos
        const docs = document.querySelectorAll('#documentos-list li');
        docs.forEach(doc => {
            const text = doc.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            doc.style.display = text.includes(query) ? '' : 'none';
        });
    });

    // --- RENDER TIMELINE INTERACTIVO (Resumen) ---
    function renderTimelineInteractive() {
        const tl = [
            { fecha: 'Nov 2023', cap: 2, titulo: 'Primer contacto Oscar–Pedro', desc: 'Encuentro en Startup Day Uninorte para discutir la colaboración inicial.', tipo: 'neutral' },
            { fecha: 'Mar 2024', cap: 2, titulo: 'Acuerdo 20%', desc: 'Se pacta que Pedro reciba el 20% de los ingresos netos de ParetoMed.', tipo: 'neutral' },
            { fecha: 'Abr 2024', cap: 2, titulo: 'Sociedad de hecho conformada', desc: 'Constitución verbal de la sociedad basada en la suma de esfuerzos y reparto de utilidades.', tipo: 'highlight' },
            { fecha: 'May 2024', cap: 4, titulo: 'Primer pago a Pedro', desc: 'Transferencia por concepto de utilidades ascendente a $1.453.160.', tipo: 'neutral' },
            { fecha: 'Jul 2024', cap: 8, titulo: 'Manuscrito "Acuerdo de Socios"', desc: 'Documento impreso con notas manuscritas de Oscar admitiendo el estatus de socio no contratable de Pedro.', tipo: 'neutral' },
            { fecha: 'Ene 2025', cap: 5, titulo: '"La firma es mera formalidad"', desc: 'Confesión en audio revelando que no firman por temas contables y que Pedro "es su socio, no alguien contratado".', tipo: 'highlight' },
            { fecha: 'Jul 2025', cap: 16, titulo: 'Oscar exige deberes de socio', desc: 'Reprimenda por audios donde Oscar exige lealtad societaria y dedicación exclusiva a Pedro, probando control jerárquico horizontal.', tipo: 'danger' },
            { fecha: 'Ago 2025', cap: 1, titulo: 'Último pago y grabación clave', desc: 'Último pago de utilidades. Llamada telefónica de 34 min con múltiples confesiones extrajudiciales por parte de Oscar.', tipo: 'danger' },
            { fecha: 'Oct 2025', cap: 11, titulo: 'Copyright claims de PI', desc: 'Pedro notifica el cese de licencia sobre su propiedad intelectual y ejerce acciones por DMCA.', tipo: 'danger' },
            { fecha: 'Feb 2026', cap: 12, titulo: 'Constancia de No Conciliación', desc: 'Agotamiento del requisito de procedibilidad en Centro de Conciliación. Vía judicial abierta.', tipo: 'highlight' }
        ];

        let html = '';
        tl.forEach(item => {
            html += `
            <details class="resumen-tl-item atl-${item.tipo}">
                <summary class="resumen-tl-summary">
                    <div class="rtl-header">
                        <span class="rtl-date">${item.fecha}</span>
                        <span class="rtl-title">${item.titulo}</span>
                    </div>
                    <span class="rtl-icon">▼</span>
                </summary>
                <div class="resumen-tl-content">
                    <p class="rtl-desc">${item.desc}</p>
                    <button class="btn-jump-hecho" data-cap="cap-${item.cap}">
                        <span class="jump-icon">↳</span> Ver hechos y evidencia de esta etapa
                    </button>
                </div>
            </details>`;
        });
        return html;
    }

    // --- Render RESUMEN EJECUTIVO ---
    function renderResumen() {
        const hechos = CASE_DATA.hechos || {};
        const pruebas = CASE_DATA.pruebas_meta || {};
        const hechosCount = Object.keys(hechos).length;
        const pruebasCount = Object.keys(pruebas).length;
        const capsCount = (CASE_DATA.capitulos || []).length;

        // Count confesiones across all hechos
        let confesiones = 0;
        Object.values(hechos).forEach(h => {
            const all = JSON.stringify(h).toLowerCase();
            if (all.includes('confesión') || all.includes('confesion extrajudicial')) confesiones++;
        });

        DOM.resumenDashboard.innerHTML = `
            <h2 class="resumen-title">Resumen Ejecutivo del Caso</h2>
            <p class="resumen-sub">ParetoMed — Sociedad de Hecho | Pedro Vergara vs. Oscar Maldonado</p>

            <div class="metric-cards">
                <div class="card"><h3>Hechos</h3><div class="value">${hechosCount}</div><div class="card-sub">${capsCount} capítulos temáticos</div></div>
                <div class="card"><h3>Pruebas</h3><div class="value">${pruebasCount}</div><div class="card-sub">corpus documental</div></div>
                <div class="card card-accent"><h3>Confesiones</h3><div class="value">${confesiones}</div><div class="card-sub">extrajudiciales del demandado</div></div>
                <div class="card"><h3>Ingresos Est.</h3><div class="value">$765M</div><div class="card-sub">COP (abr 2024 – ago 2025)</div></div>
            </div>

            <div class="resumen-section">
                <h3>Línea de Tiempo Interactiva</h3>
                <div class="timeline-interactive" id="resumen-timeline">
                    ${renderTimelineInteractive()}
                </div>
            </div>

            <div class="resumen-section">
                <h3>Pruebas Más Contundentes</h3>
                    ${[
                        {id:'P-01', cls:'te-confesion', badgeCls:'badge-confesion', badge:'CONFESIÓN', title:'[P-01] Grabación telefónica 14/08/2025', desc:'Oscar admite la sociedad, el pacto de acciones, y que sus propios abogados confirmaron la existencia de sociedad de hecho.', cita:'existencia de sociedad de hecho'},
                        {id:'P-50', cls:'te-confesion', badgeCls:'badge-confesion', badge:'CONFESIÓN', title:'[P-50] Audios 13/07/2025', desc:'Oscar exige deberes de socio: "tu eres socio, no es que vas a sacar tu aplicación propia".', cita:'tu eres socio, no es que vas a sacar tu aplicación propia'},
                        {id:'P-11', cls:'te-firmado', badgeCls:'badge-firmado', badge:'DOC. FIRMADO', title:'[P-11] Carta de Recomendación 27/04/2024', desc:'Oscar nombra a Pedro "Subdirector Académico y Comercial" — cargo directivo incompatible con prestación de servicios.', cita:'Subdirector Académico y Comercial'},
                        {id:'P-09', cls:'te-admision', badgeCls:'badge-admision', badge:'ADMISIÓN', title:'[P-09] Nota manuscrita en Acuerdo de Socios', desc:'Oscar admite que el 20% "no se justifican por una labor que es contratable".', cita:'no se justifican por una labor que es contratable'},
                        {id:'P-41', cls:'te-admision', badgeCls:'badge-admision', badge:'ADMISIÓN', title:'[P-41] Audio 08/01/2025', desc:'"La firma como una mera formalidad" + "no alguien contratado, sino alguien que sepa que eso es suyo".', cita:'sino alguien que sepa que eso es suyo'},
                        {id:'P-06', cls:'', badgeCls:'badge-posterior', badge:'ALTERACIÓN', title:'[P-06/P-07] Google Doc modificado', desc:'Cambio de "acciones" por "utilidades" por usuario anónimo evidencia mala fe.', cita:'utilidades'},
                        {id:'P-36', cls:'te-financiero', badgeCls:'badge-cert', badge:'FINANCIERO', title:'[P-36/P-37] 14 transferencias ($99.3M)', desc:'Montos variables ($1.4M a $16.7M) = 20% de utilidades netas. Inconsistente con honorarios fijos.', cita:'1.4'},
                        {id:'P-42', cls:'te-financiero', badgeCls:'badge-cert', badge:'FINANCIERO', title:'[P-42] 376 comprobantes ($579M)', desc:'Ingresos brutos documentados. Pedro recibió el 19.52% ≈ 20% pactado.', cita:'20'},
                        {id:'P-22', cls:'', badgeCls:'badge-cert', badge:'CERTIFICACIÓN', title:'[P-22/P-23] DNDA — 238 obras', desc:'Pedro registrado como AUTOR/DIRECTOR/PRODUCTOR; Oscar como INTÉRPRETE.', cita:'PRODUCTOR'},
                        {id:'P-19', cls:'', badgeCls:'', badge:'PROCESAL', title:'[P-19] Constancia de No Conciliación', desc:'Agotamiento del requisito de procedibilidad. Vía judicial expedita.', cita:'Agotamiento'}
                    ].map(p => `
                    <details class="te-details ${p.cls}">
                        <summary class="te-summary">
                            <span class="te-badge ${p.badgeCls}">${p.badge}</span>
                            <div class="te-content-header"><strong>${p.title}</strong></div>
                            <span class="rtl-icon" style="margin-left: auto;">▼</span>
                        </summary>
                        <div class="te-content-hidden">
                            <p>${p.desc}</p>
                            <button class="btn-jump-prueba" data-prueba="${p.id}" data-title="${p.title}" data-cita="${p.cita}" style="background:transparent; color: var(--accent-blue); border: 1px solid #cbd5e1; padding: 6px 16px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; margin-top: 10px; transition: all 0.2s;">
                                <span class="jump-icon">↳</span> Ver Prueba en Visor
                            </button>
                        </div>
                    </details>
                    `).join('')}
                </div>
            </div>

            <div class="resumen-section">
                <h3>Resumen Financiero</h3>
                <div class="financial-grid">
                    <div class="fin-card"><div class="fin-label">Ingresos Documentados</div><div class="fin-value">$579.2M</div><div class="fin-sub">376 comprobantes (feb 2024 – sep 2025)</div></div>
                    <div class="fin-card"><div class="fin-label">Ingresos Estimados</div><div class="fin-value">$765M</div><div class="fin-sub">Proyección: 20% a Pedro + margen 65%</div></div>
                    <div class="fin-card"><div class="fin-label">Pagos a Pedro</div><div class="fin-value">$99.3M</div><div class="fin-sub">14 transferencias (may 2024 – ago 2025)</div></div>
                    <div class="fin-card fin-accent"><div class="fin-label">Pretensión (20%)</div><div class="fin-value">$240M</div><div class="fin-sub">Valoración ParetoMed: $1,200M</div></div>
                    <div class="fin-card fin-danger"><div class="fin-label">Utilidades Post-Ruptura</div><div class="fin-value">$22M+</div><div class="fin-sub">Ago–Oct 2025 adeudadas a Pedro</div></div>
                    <div class="fin-card"><div class="fin-label">Activos Declarados (CC)</div><div class="fin-value">$20M</div><div class="fin-sub">vs. $709M+ reales — subvaloración</div></div>
                </div>
            </div>
        `;
    }

    // --- RENDERIZACIÓN INICIAL ---
    renderHechos();
    renderPruebas();
    renderDocumentos();
    renderResumen();

    // Event listener para saltar a hechos desde la línea de tiempo interactiva
    document.addEventListener('click', (e) => {
        const jumpBtn = e.target.closest('.btn-jump-hecho');
        if (jumpBtn) {
            const capId = jumpBtn.dataset.cap;
            // Activar la pestaña Hechos
            document.querySelector('[data-target="tab-hechos"]').click();
            
            // Pausa breve para permitir la transición de visibilidad del DOM
            setTimeout(() => {
                const capEl = document.getElementById(capId);
                if (capEl) {
                    capEl.open = true; // Expande el elemento <details> nativo
                    capEl.classList.add('expanded');
                    capEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Resaltar visualmente el capítulo al que saltamos
                    capEl.style.outline = '3px solid #2563eb';
                    capEl.style.transition = 'outline 0.3s ease';
                    setTimeout(() => { capEl.style.outline = 'none'; }, 2000);
                }
            }, 100);
        }
    });

    // Event listener para saltar a visor de Pruebas desde Resumen
    document.addEventListener('click', (e) => {
        const jumpPruebaBtn = e.target.closest('.btn-jump-prueba');
        if (jumpPruebaBtn) {
            const pid = jumpPruebaBtn.dataset.prueba;
            const pTitle = jumpPruebaBtn.dataset.title;
            const pCita = jumpPruebaBtn.dataset.cita || null;
            let pUrl = null;
            
            const pidKey = pid.split('/')[0];
            
            // 1. Intentar desde pruebas_urls (mapeo directo a HTML)
            if (CASE_DATA.pruebas_urls && CASE_DATA.pruebas_urls[pidKey]) {
                const mapping = CASE_DATA.pruebas_urls[pidKey];
                pUrl = mapping.html || (mapping.raw ? mapping.raw : null);
            } 
            
            // 2. Fallbacks especiales (P-50 es crucial y a veces falta en data.js)
            if (!pUrl && pidKey === 'P-50') pUrl = 'docs/transcripciones.html';
            
            // 3. Intentar desde catálogo si aún no hay URL
            if (!pUrl && CASE_DATA.pruebas_catalogo) {
                const cat = CASE_DATA.pruebas_catalogo;
                const doc = cat[pid] || cat[pidKey];
                if (doc && doc.archivo_url) pUrl = doc.archivo_url;
            }
            
            document.querySelector('[data-target="tab-pruebas"]').click();
            
            setTimeout(() => {
                if (pUrl) {
                    openInPruebasViewer(pUrl, pTitle, pCita);
                    pruebasSplit.classList.add('viewer-open');
                } else {
                    console.error("No se encontró URL para la prueba:", pid);
                    alert("No se encontró el archivo para la prueba " + pid);
                }
            }, 150);
        }
    });

    // --- LÓGICA DE VISOR INLINE ---
    const viewerIframe = document.getElementById('doc-iframe');
    const viewerPlaceholder = document.getElementById('viewer-placeholder');
    const viewerTitleText = document.getElementById('v-title-text');
    const viewerNewtabBtn = document.getElementById('viewer-newtab-btn');
    const viewerDownloadBtn = document.getElementById('viewer-download-btn');
    const closeViewerBtn = document.getElementById('close-viewer-btn');
    const mainSplitLayout = document.querySelector('.split-layout');

    // --- VISOR DE PRUEBAS (pestaña Pruebas) ---
    const pvIframe = document.getElementById('pv-iframe');
    const pvPlaceholder = document.getElementById('pv-placeholder');
    const pvTitleText = document.getElementById('pv-title-text');
    const pvNewtabBtn = document.getElementById('pv-newtab-btn');
    const pvDownloadBtn = document.getElementById('pv-download-btn');
    const pvCloseBtn = document.getElementById('pv-close-btn');
    const pruebasSplit = document.getElementById('pruebas-split');

    // --- Helper: split URL into base path and hash fragment ---
    function splitUrlHash(rawUrl) {
        const idx = rawUrl.indexOf('#');
        if (idx === -1) return { base: rawUrl, hash: null };
        return { base: rawUrl.substring(0, idx), hash: rawUrl.substring(idx + 1) };
    }

    closeViewerBtn.addEventListener('click', () => {
        mainSplitLayout.classList.remove('viewer-open');
        viewerIframe.src = 'about:blank';
        viewerIframe.removeAttribute('data-current-doc');
        document.querySelectorAll('.hecho-card').forEach(c => c.classList.remove('active-fact'));
    });

    // Visor en pestaña Hechos
    document.getElementById('tab-hechos').addEventListener('click', (e) => {
        const btn = e.target.closest('.ver-doc-inline');
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();
        const cita = btn.getAttribute('data-cita') || null;
        openInViewer(btn.getAttribute('data-url'), btn.getAttribute('data-title') || 'Documento', cita);
        const parentCard = btn.closest('.hecho-card');
        document.querySelectorAll('.hecho-card').forEach(c => c.classList.remove('active-fact'));
        if (parentCard) parentCard.classList.add('active-fact');
        mainSplitLayout.classList.add('viewer-open');
    });

    // --- Helper: inject highlight CSS into iframe document (once) ---
    function injectHighlightCSS(doc) {
        if (doc.getElementById('ev-highlight-css')) return;
        const style = doc.createElement('style');
        style.id = 'ev-highlight-css';
        style.textContent = `
            .ev-highlight-active {
                background-color: #fff3cd !important;
                border-left: 5px solid #e67e22 !important;
                padding-left: 8px !important;
                animation: ev-pulse 1.5s ease-in-out 4;
                position: relative;
                z-index: 10;
                box-shadow: 0 0 12px rgba(230, 126, 34, 0.35);
                border-radius: 3px;
            }
            @keyframes ev-pulse {
                0%   { background-color: #fff3cd; box-shadow: 0 0 12px rgba(230, 126, 34, 0.35); }
                50%  { background-color: #ffe08a; box-shadow: 0 0 20px rgba(230, 126, 34, 0.55); }
                100% { background-color: #fff3cd; box-shadow: 0 0 12px rgba(230, 126, 34, 0.35); }
            }
        `;
        doc.head.appendChild(style);
    }

    // --- Helper: find best matching element for a cita string in the iframe doc ---
    function findCitaElement(doc, cita) {
        if (!cita) return null;
        // Limpiar espacios extra, saltos de línea y normalizar para búsqueda robusta
        const needle = cita.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ' ').trim().substring(0, 40);
        
        // Prefer specific line containers; fall back to any element
        const selectors = ['.chat-line', '.doc-line', 'p', 'tr', 'li', 'span', 'div'];
        for (const sel of selectors) {
            const els = doc.querySelectorAll(sel);
            for (const el of els) {
                // Saltar divs muy grandes que contienen a toda la página
                if (sel === 'div' && el.children.length > 5) continue;
                
                const t = el.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ' ');
                if (t.includes(needle)) return el;
            }
        }
        return null;
    }

    // --- Helper: scroll + highlight inside an iframe, by line id or cita text ---
    function scrollToLineWithRetry(iframe, hash, cita, attempt) {
        attempt = attempt || 1;
        const maxAttempts = 6;
        const delays = [300, 800, 1500, 2500, 4000, 6000];

        try {
            const win = iframe.contentWindow;
            const doc = win ? win.document : iframe.contentDocument;
            if (!doc || !doc.body) {
                if (attempt < maxAttempts)
                    setTimeout(() => scrollToLineWithRetry(iframe, hash, cita, attempt + 1), delays[attempt - 1]);
                return;
            }

            // Clear previous highlights
            doc.querySelectorAll('.ev-highlight-active').forEach(el => el.classList.remove('ev-highlight-active'));
            injectHighlightCSS(doc);

            let target = hash ? doc.getElementById(hash) : null;
            let foundNatively = false;

            if (!target && cita) {
                // Native search (selection jump) - Funciona como Ctrl+F en Chrome!
                try {
                    const sel = win.getSelection();
                    sel.removeAllRanges();
                    foundNatively = win.find(cita, false, false, true, false, false, false);
                    if (!foundNatively) {
                        const needle = cita.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 40);
                        if (needle !== cita) foundNatively = win.find(needle, false, false, true, false, false, false);
                    }
                    
                    if (foundNatively) {
                        try {
                            const range = win.getSelection().getRangeAt(0);
                            const span = doc.createElement('span');
                            span.className = 'ev-highlight-active';
                            range.surroundContents(span);
                            target = span;
                        } catch(err) {} 
                    }
                } catch(e) {}
                
                // Fallback clásico si la API falla
                if (!target && !foundNatively) target = findCitaElement(doc, cita);
            }

            if (target) {
                if (!foundNatively) target.classList.add('ev-highlight-active');
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            } else if (!foundNatively && attempt < maxAttempts) {
                setTimeout(() => scrollToLineWithRetry(iframe, hash, cita, attempt + 1), delays[attempt - 1]);
            }
        } catch (e) {
            // Cross-origin — silent fail
        }
    }
    // --- Visor de Pruebas: abrir documento ---
    function openInPruebasViewer(url, title, cita) {
        if (!url) return;
        url = url.normalize('NFC'); // Normalización de seguridad para compatibilidad con Linux/Nginx
        if (url && !url.includes('.') && url.includes('docs/')) {
            const parts = url.split('#');
            url = parts[0] + '.html' + (parts[1] ? '#' + parts[1] : '');
        }

        const { base: baseUrl, hash } = splitUrlHash(url);

        let nativeSearchUrl = url;
        if (cita) {
            const citaClean = cita.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 70);
            nativeSearchUrl = baseUrl + '#:~:text=' + encodeURIComponent(citaClean);
        }

        pvTitleText.textContent = title;
        pvNewtabBtn.href = nativeSearchUrl;
        pvNewtabBtn.style.display = 'inline-block';
        pvDownloadBtn.href = baseUrl; // Descarga el archivo base sin fragmentos
        const fileName = (title || 'Prueba').replace(/[^a-z0-9]/gi, '_').substring(0, 50) + (baseUrl.endsWith('.pdf') ? '.pdf' : '.html');
        pvDownloadBtn.setAttribute('download', fileName);
        pvDownloadBtn.style.display = 'inline-block';

        const currentSrc = pvIframe.getAttribute('data-current-doc') || '';
        const isSameDoc = currentSrc === baseUrl;

        if (isSameDoc) {
            pvPlaceholder.style.display = 'none';
            pvIframe.style.display = 'block';
            scrollToLineWithRetry(pvIframe, hash, cita);
        } else {
            pvPlaceholder.innerHTML = '<div class="placeholder-icon rotating">⏳</div><h3>Cargando...</h3>';
            pvPlaceholder.style.display = 'flex';
            pvIframe.style.display = 'none';
            pvIframe.onerror = () => {
                pvPlaceholder.innerHTML = '<div class="placeholder-icon">❌</div><h3>Error al cargar</h3>';
            };
            pvIframe.onload = () => {
                pvPlaceholder.style.display = 'none';
                pvIframe.style.display = 'block';
                pvIframe.setAttribute('data-current-doc', baseUrl);
                scrollToLineWithRetry(pvIframe, hash, cita);
            };
            // Usamos la URL base para el iframe para máxima estabilidad
            pvIframe.src = url; 
        }
    }

    // --- Visor de Pruebas: cerrar ---
    pvCloseBtn.addEventListener('click', () => {
        pruebasSplit.classList.remove('viewer-open');
        pvIframe.src = 'about:blank';
        pvIframe.removeAttribute('data-current-doc');
        document.querySelectorAll('.prueba-card-premium').forEach(c => c.classList.remove('active-prueba'));
    });

    // Visor desde pestaña Pruebas (abre en visor local)
    document.getElementById('tab-pruebas').addEventListener('click', (e) => {
        const btn = e.target.closest('.ver-doc-inline');
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();

        const url = btn.getAttribute('data-url');
        const title = btn.getAttribute('data-title') || 'Documento';
        const cita = btn.getAttribute('data-cita') || null;

        openInPruebasViewer(url, title, cita);
        pruebasSplit.classList.add('viewer-open');

        // Marcar card activa
        document.querySelectorAll('.prueba-card-premium').forEach(c => c.classList.remove('active-prueba'));
        const parentCard = btn.closest('.prueba-card-premium');
        if (parentCard) parentCard.classList.add('active-prueba');
    });

    function openInViewer(url, title, cita) {
        if (!url) return;
        url = url.normalize('NFC'); // Normalización de seguridad para compatibilidad con Linux/Nginx
        if (url && !url.includes('.') && url.includes('docs/')) {
            const parts = url.split('#');
            url = parts[0] + '.html' + (parts[1] ? '#' + parts[1] : '');
        }

        const { base: baseUrl, hash } = splitUrlHash(url);

        let nativeSearchUrl = url;
        if (cita) {
            const citaClean = cita.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 70);
            nativeSearchUrl = baseUrl + '#:~:text=' + encodeURIComponent(citaClean);
        }

        viewerTitleText.textContent = title;
        viewerNewtabBtn.href = nativeSearchUrl;
        viewerNewtabBtn.style.display = 'inline-block';
        viewerDownloadBtn.href = baseUrl; // Descarga el archivo base sin fragmentos
        const fileName = (title || 'Prueba').replace(/[^a-z0-9]/gi, '_').substring(0, 50) + (baseUrl.endsWith('.pdf') ? '.pdf' : '.html');
        viewerDownloadBtn.setAttribute('download', fileName);
        viewerDownloadBtn.style.display = 'inline-block';

        const currentSrc = viewerIframe.getAttribute('data-current-doc') || '';
        const isSameDoc = (currentSrc === baseUrl);

        if (isSameDoc) {
            viewerPlaceholder.style.display = 'none';
            viewerIframe.style.display = 'block';
            scrollToLineWithRetry(viewerIframe, hash, cita);
        } else {
            viewerPlaceholder.innerHTML = '<div class="placeholder-icon rotating">⏳</div><h3>Cargando Evidencia...</h3>';
            viewerPlaceholder.style.display = 'flex';
            viewerIframe.style.display = 'none';
            viewerIframe.onerror = () => {
                viewerPlaceholder.innerHTML = '<div class="placeholder-icon">❌</div><h3>Error al cargar documento</h3>';
            };
            viewerIframe.onload = () => {
                viewerPlaceholder.style.display = 'none';
                viewerIframe.style.display = 'block';
                viewerIframe.setAttribute('data-current-doc', baseUrl);
                scrollToLineWithRetry(viewerIframe, hash, cita);
            };
            viewerIframe.src = url;
        }
    }

});
