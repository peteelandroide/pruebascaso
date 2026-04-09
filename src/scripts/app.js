document.addEventListener('DOMContentLoaded', () => {
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
        if (frag.fuente && frag.linea) {
            const docObj = CASE_DATA.documentos[frag.fuente];
            const docName = docObj ? docObj.titulo : frag.fuente;
            const url = docObj ? `${docObj.archivo_html}#L${frag.linea}` : `docs/${frag.fuente}.html#L${frag.linea}`;
            docBtn = `<button class="btn-doc highlight-doc-btn ver-doc-inline" data-url="${url}" data-title="${docName}">Ver en ${docName} (línea ${frag.linea})</button>`;
        } else if (frag.fuente) {
            const docObj = CASE_DATA.documentos[frag.fuente];
            if (docObj) {
                docBtn = `<button class="btn-doc highlight-doc-btn ver-doc-inline" data-url="${docObj.archivo_html}" data-title="${docObj.titulo}">Abrir ${docObj.titulo}</button>`;
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

    // --- Render HECHOS ---
    function renderHechos() {
        if (!CASE_DATA || !CASE_DATA.capitulos) return;

        let html = '';
        CASE_DATA.capitulos.forEach(capitulo => {
            const hCount = capitulo.hechos.length;
            html += `
            <div class="chapter-block" id="${capitulo.id}">
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
                <div class="hecho-card" id="${h.id}">
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

        DOM.hechosContainer.innerHTML = html;
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

        // Buscar en hechos
        const chapters = document.querySelectorAll('.chapter-block');
        chapters.forEach(chapter => {
            let hasVisible = false;
            const hechos = chapter.querySelectorAll('.hecho-card');
            hechos.forEach(hecho => {
                const text = hecho.innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
            const text = card.innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
            const text = doc.innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            doc.style.display = text.includes(query) ? '' : 'none';
        });
    });

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
                <h3>Línea de Tiempo Clave</h3>
                <div class="timeline-compact">
                    <div class="tl-item"><span class="tl-date">Nov 2023</span><span class="tl-event">Primer contacto Oscar–Pedro en Startup Day Uninorte</span></div>
                    <div class="tl-item"><span class="tl-date">Ene 2024</span><span class="tl-event">Propuesta de colaboración y reunión presencial</span></div>
                    <div class="tl-item"><span class="tl-date">Feb 2024</span><span class="tl-event">Pedro propone 30% en vesting (future stock)</span></div>
                    <div class="tl-item"><span class="tl-date">Mar 2024</span><span class="tl-event">Acuerdo definitivo: Pedro recibe 20% de ingresos netos</span></div>
                    <div class="tl-item tl-highlight"><span class="tl-date">Abr 2024</span><span class="tl-event">Constitución verbal de la sociedad de hecho</span></div>
                    <div class="tl-item"><span class="tl-date">Abr 2024</span><span class="tl-event">Carta de recomendación: Pedro como "Subdirector Académico"</span></div>
                    <div class="tl-item"><span class="tl-date">May 2024</span><span class="tl-event">Primer pago documentado a Pedro ($1.453.160)</span></div>
                    <div class="tl-item"><span class="tl-date">Jul 2024</span><span class="tl-event">Acuerdo de Socios impreso con notas manuscritas de Oscar</span></div>
                    <div class="tl-item tl-highlight"><span class="tl-date">Ene 2025</span><span class="tl-event">Oscar: firma es "mera formalidad", busca socio "no contratado"</span></div>
                    <div class="tl-item tl-danger"><span class="tl-date">Jul 2025</span><span class="tl-event">Oscar exige deberes de socio sobre herramienta de Pedro</span></div>
                    <div class="tl-item tl-danger"><span class="tl-date">Ago 2025</span><span class="tl-event">Último pago a Pedro. Grabación: confesión de sociedad</span></div>
                    <div class="tl-item"><span class="tl-date">Ago 2025</span><span class="tl-event">Oscar propone Contrato de Cuentas en Participación (no firmado)</span></div>
                    <div class="tl-item"><span class="tl-date">Ago 2025</span><span class="tl-event">Pedro notifica cese de explotación de su PI</span></div>
                    <div class="tl-item"><span class="tl-date">Oct 2025</span><span class="tl-event">Pedro ejerce copyright claims en YouTube/TikTok</span></div>
                    <div class="tl-item tl-highlight"><span class="tl-date">Feb 2026</span><span class="tl-event">Constancia de NO Conciliación — Vía judicial expedita</span></div>
                </div>
            </div>

            <div class="resumen-section">
                <h3>Pruebas Más Contundentes</h3>
                <div class="top-evidence">
                    <div class="te-item te-confesion"><span class="te-badge badge-confesion">CONFESIÓN</span><div class="te-content"><strong>[P-01] Grabación telefónica 14/08/2025</strong><p>Oscar admite la sociedad, el pacto de acciones, y que sus propios abogados confirmaron la existencia de sociedad de hecho.</p></div></div>
                    <div class="te-item te-confesion"><span class="te-badge badge-confesion">CONFESIÓN</span><div class="te-content"><strong>[P-50] Audios 13/07/2025</strong><p>Oscar exige deberes de socio: "tu eres socio, no es que vas a sacar tu aplicación propia".</p></div></div>
                    <div class="te-item te-firmado"><span class="te-badge badge-firmado">DOC. FIRMADO</span><div class="te-content"><strong>[P-11] Carta de Recomendación 27/04/2024</strong><p>Oscar nombra a Pedro "Subdirector Académico y Comercial" — cargo directivo incompatible con prestación de servicios.</p></div></div>
                    <div class="te-item te-admision"><span class="te-badge badge-admision">ADMISIÓN</span><div class="te-content"><strong>[P-09] Nota manuscrita en Acuerdo de Socios</strong><p>Oscar admite que el 20% "no se justifican por una labor que es contratable".</p></div></div>
                    <div class="te-item te-admision"><span class="te-badge badge-admision">ADMISIÓN</span><div class="te-content"><strong>[P-41] Audio 08/01/2025</strong><p>"La firma como una mera formalidad" + "no alguien contratado, sino alguien que sepa que eso es suyo".</p></div></div>
                    <div class="te-item"><span class="te-badge badge-posterior">ALTERACIÓN</span><div class="te-content"><strong>[P-06/P-07] Google Doc modificado</strong><p>Cambio de "acciones" por "utilidades" por usuario anónimo evidencia mala fe.</p></div></div>
                    <div class="te-item te-financiero"><span class="te-badge badge-cert">FINANCIERO</span><div class="te-content"><strong>[P-36/P-37] 14 transferencias ($99.3M)</strong><p>Montos variables ($1.4M a $16.7M) = 20% de utilidades netas. Inconsistente con honorarios fijos.</p></div></div>
                    <div class="te-item te-financiero"><span class="te-badge badge-cert">FINANCIERO</span><div class="te-content"><strong>[P-42] 376 comprobantes ($579M)</strong><p>Ingresos brutos documentados. Pedro recibió el 19.52% ≈ 20% pactado.</p></div></div>
                    <div class="te-item"><span class="te-badge badge-cert">CERTIFICACIÓN</span><div class="te-content"><strong>[P-22/P-23] DNDA — 238 obras</strong><p>Pedro registrado como AUTOR/DIRECTOR/PRODUCTOR; Oscar como INTÉRPRETE.</p></div></div>
                    <div class="te-item"><span class="te-badge">PROCESAL</span><div class="te-content"><strong>[P-19] Constancia de No Conciliación</strong><p>Agotamiento del requisito de procedibilidad. Vía judicial expedita.</p></div></div>
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
        openInViewer(btn.getAttribute('data-url'), btn.getAttribute('data-title') || 'Documento');
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

    // --- Helper: scroll + highlight a line inside an iframe, with retry for large files ---
    function scrollToLineWithRetry(iframe, hash, attempt) {
        attempt = attempt || 1;
        var maxAttempts = 6;       // retries: 300, 800, 1500, 2500, 4000, 6000 ms
        var delays = [300, 800, 1500, 2500, 4000, 6000];

        try {
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            if (!doc) {
                console.warn('[DEBUG] iframe.contentDocument is null (attempt ' + attempt + ')');
                if (attempt < maxAttempts) {
                    setTimeout(function() { scrollToLineWithRetry(iframe, hash, attempt + 1); }, delays[attempt]);
                }
                return;
            }

            // Remove previous highlights
            doc.querySelectorAll('.ev-highlight-active').forEach(function(el) {
                el.classList.remove('ev-highlight-active');
            });

            injectHighlightCSS(doc);

            var target = doc.getElementById(hash);
            if (target) {
                console.log('[DEBUG] Target found on attempt ' + attempt + ':', hash);
                target.classList.add('ev-highlight-active');
                setTimeout(function() {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 200);
            } else if (attempt < maxAttempts) {
                console.log('[DEBUG] Target "' + hash + '" not found yet, retry ' + attempt + '/' + maxAttempts);
                setTimeout(function() { scrollToLineWithRetry(iframe, hash, attempt + 1); }, delays[attempt]);
            } else {
                console.warn('[DEBUG] Target "' + hash + '" not found after ' + maxAttempts + ' attempts');
            }
        } catch (e) {
            console.error('[DEBUG] Cross-origin or access error:', e);
        }
    }
    // --- Visor de Pruebas: abrir documento ---
    function openInPruebasViewer(url, title) {
        // Ensure .html extension is present
        if (url && !url.includes('.') && url.includes('docs/')) {
            const parts = url.split('#');
            url = parts[0] + '.html' + (parts[1] ? '#' + parts[1] : '');
        }
        console.log('[DEBUG] openInPruebasViewer called with url:', url);

        const { base: baseUrl, hash } = splitUrlHash(url);

        pvTitleText.textContent = title;
        pvNewtabBtn.href = url;
        pvNewtabBtn.style.display = 'inline-block';
        pvDownloadBtn.href = url;
        pvDownloadBtn.style.display = 'inline-block';

        const currentSrc = pvIframe.getAttribute('data-current-doc') || '';
        const isSameDoc = currentSrc === baseUrl;

        if (isSameDoc) {
            console.log('[DEBUG] Pruebas: same doc, scrolling directly');
            pvPlaceholder.style.display = 'none';
            pvIframe.style.display = 'block';
            if (hash) scrollToLineWithRetry(pvIframe, hash);
        } else {
            console.log('[DEBUG] Pruebas: loading new document:', baseUrl);
            pvPlaceholder.innerHTML = '<div class="placeholder-icon rotating">⏳</div><h3>Cargando...</h3>';
            pvPlaceholder.style.display = 'flex';
            pvIframe.style.display = 'none';
            pvIframe.onerror = () => {
                console.error('[DEBUG] Pruebas iframe onerror for:', baseUrl);
                pvPlaceholder.innerHTML = '<div class="placeholder-icon">❌</div><h3>Error al cargar</h3><p>' + baseUrl + '</p>';
            };
            pvIframe.onload = () => {
                console.log('[DEBUG] Pruebas iframe onload fired');
                pvPlaceholder.style.display = 'none';
                pvIframe.style.display = 'block';
                pvIframe.setAttribute('data-current-doc', baseUrl);
                if (hash) scrollToLineWithRetry(pvIframe, hash);
            };
            pvIframe.src = baseUrl;
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

        openInPruebasViewer(url, title);
        pruebasSplit.classList.add('viewer-open');

        // Marcar card activa
        document.querySelectorAll('.prueba-card-premium').forEach(c => c.classList.remove('active-prueba'));
        const parentCard = btn.closest('.prueba-card-premium');
        if (parentCard) parentCard.classList.add('active-prueba');
    });

    function openInViewer(url, title) {
        // Ensure .html extension is present
        if (url && !url.includes('.') && url.includes('docs/')) {
            const parts = url.split('#');
            url = parts[0] + '.html' + (parts[1] ? '#' + parts[1] : '');
        }
        console.log('[DEBUG] openInViewer called with url:', url, 'title:', title);

        const { base: baseUrl, hash } = splitUrlHash(url);

        viewerTitleText.textContent = title;
        viewerNewtabBtn.href = url;
        viewerNewtabBtn.style.display = 'inline-block';
        viewerDownloadBtn.href = url;
        viewerDownloadBtn.style.display = 'inline-block';

        // Check if same document is already loaded (compare against resolved absolute URL)
        const currentSrc = viewerIframe.getAttribute('data-current-doc') || '';
        const isSameDoc = currentSrc === baseUrl;

        if (isSameDoc) {
            console.log('[DEBUG] Same doc already loaded, scrolling directly');
            viewerPlaceholder.style.display = 'none';
            viewerIframe.style.display = 'block';
            if (hash) scrollToLineWithRetry(viewerIframe, hash);
        } else {
            console.log('[DEBUG] Loading new document:', baseUrl);
            viewerPlaceholder.innerHTML = '<div class="placeholder-icon rotating">⏳</div><h3>Cargando Evidencia...</h3>';
            viewerPlaceholder.style.display = 'flex';
            viewerIframe.style.display = 'none';
            viewerIframe.onerror = () => {
                console.error('[DEBUG] iframe onerror fired for:', baseUrl);
                viewerPlaceholder.innerHTML = '<div class="placeholder-icon">❌</div><h3>Error al cargar documento</h3><p>No se pudo cargar: ' + baseUrl + '</p>';
            };
            viewerIframe.onload = () => {
                console.log('[DEBUG] iframe onload fired for:', baseUrl);
                viewerPlaceholder.style.display = 'none';
                viewerIframe.style.display = 'block';
                viewerIframe.setAttribute('data-current-doc', baseUrl);
                if (hash) scrollToLineWithRetry(viewerIframe, hash);
            };
            viewerIframe.src = baseUrl;
        }
    }

});
