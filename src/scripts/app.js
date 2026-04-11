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
            const localCaseData = typeof CASE_DATA !== 'undefined' ? CASE_DATA : null;

            function hasText(value) {
                return typeof value === 'string' && value.trim().length > 0;
            }

            function toFiniteNumber(value) {
                const parsed = Number(value);
                return Number.isFinite(parsed) ? parsed : null;
            }

            function mergeUniqueStrings(...arrays) {
                return [...new Set(arrays.flat().filter(Boolean))];
            }

            function mergeFragments(localFragments, remoteFragments) {
                // Los extractos curados del build local son la fuente canónica.
                // Supabase solo debe suplir fragmentos cuando el hecho local no trae ninguno.
                if (Array.isArray(localFragments) && localFragments.length > 0) {
                    return dedupeFragmentList(localFragments);
                }
                return dedupeFragmentList(remoteFragments || []);
            }

            function mergeHecho(localHecho, remoteHecho, allowedProofIds) {
                // El relato canónico vive en el build local. Supabase solo puede
                // suplir pruebas o fragmentos cuando el build local no los trae,
                // nunca sobreescribir títulos ni textos porque allí quedaron
                // datos viejos y mezclados.
                const merged = { ...(remoteHecho || {}), ...(localHecho || {}) };
                merged.id = localHecho?.id || remoteHecho?.id;
                merged.numero = toFiniteNumber(localHecho?.numero) ?? toFiniteNumber(remoteHecho?.numero) ?? null;
                merged.orden_documento = toFiniteNumber(localHecho?.orden_documento) ?? toFiniteNumber(remoteHecho?.orden_documento) ?? null;
                merged.ordinal = hasText(localHecho?.ordinal) ? localHecho.ordinal : remoteHecho?.ordinal;
                merged.capitulo_id = hasText(localHecho?.capitulo_id) ? localHecho.capitulo_id : (remoteHecho?.capitulo_id || localHecho?.capitulo);
                merged.capitulo = merged.capitulo_id;
                merged.source_key = hasText(localHecho?.source_key) ? localHecho.source_key : remoteHecho?.source_key;
                merged.resumen = hasText(localHecho?.resumen) ? localHecho.resumen : remoteHecho?.resumen;
                merged.texto_completo = hasText(localHecho?.texto_completo) ? localHecho.texto_completo : remoteHecho?.texto_completo;
                merged.texto_completo_html = hasText(localHecho?.texto_completo_html) ? localHecho.texto_completo_html : remoteHecho?.texto_completo_html;
                merged.titulo_corto = hasText(localHecho?.titulo_corto) ? localHecho.titulo_corto : remoteHecho?.titulo_corto;
                merged.nota_abogado = hasText(localHecho?.nota_abogado) ? localHecho.nota_abogado : remoteHecho?.nota_abogado;
                const filteredRemoteProofs = (remoteHecho?.pruebas || []).filter(proofId => allowedProofIds.has(proofId));
                merged.pruebas = (localHecho?.pruebas && localHecho.pruebas.length > 0)
                    ? [...localHecho.pruebas]
                    : filteredRemoteProofs;
                merged.fragmentos_clave = mergeFragments(localHecho?.fragmentos_clave || [], remoteHecho?.fragmentos_clave || []);
                return merged;
            }

            function mergeChapterHechos(localIds, remoteIds) {
                const merged = [];
                const seen = new Set();
                [...(localIds || []), ...(remoteIds || [])].forEach(id => {
                    if (!id || seen.has(id)) return;
                    seen.add(id);
                    merged.push(id);
                });
                return merged;
            }

            function buildAugmentedCaseData(localData, remoteData) {
                const localHechos = localData?.hechos || {};
                const remoteHechos = remoteData?.hechos || {};
                const mergedHechos = {};
                const allowedProofIds = new Set(Object.keys(localData?.pruebas_catalogo || {}));
                const ignoredRemoteIds = Object.keys(remoteHechos).filter(id => !localHechos[id]);

                Object.keys(localHechos).forEach(id => {
                    mergedHechos[id] = mergeHecho(localHechos[id], remoteHechos[id], allowedProofIds);
                });

                const localCapitulos = localData?.capitulos || [];

                return {
                    ...localData,
                    capitulos: localCapitulos.map(localCap => ({
                        ...localCap,
                        hechos: mergeChapterHechos(localCap.hechos, [])
                    })),
                    hechos: mergedHechos,
                    pruebas_catalogo: { ...(localData?.pruebas_catalogo || {}) },
                    pruebas_urls: { ...(localData?.pruebas_urls || {}) },
                    pruebas_meta: { ...(localData?.pruebas_meta || {}) },
                    documentos: { ...(localData?.documentos || {}) },
                    archivos_crudos: [...(localData?.archivos_crudos || [])],
                    ignored_remote_hechos: ignoredRemoteIds
                };
            }

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
                    cita_exacta: f.cita_exacta || null,
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
                    numero: toFiniteNumber(h.numero),
                    orden_documento: toFiniteNumber(h.orden_documento),
                    ordinal: h.ordinal,
                    capitulo_id: h.capitulo_id,
                    source_key: h.source_key || null,
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

            const remoteSnapshot = {
                capitulos,
                hechos,
                pruebas_catalogo
            };

            // Mezcla resiliente y local-first:
            // lo canónico (estructura, catálogo, URLs y metadatos de pruebas) permanece local;
            // Supabase solo enriquece hechos existentes y aporta hechos remotos faltantes.
            if (localCaseData) {
                const mergedCaseData = buildAugmentedCaseData(localCaseData, remoteSnapshot);
                CASE_DATA.capitulos = mergedCaseData.capitulos;
                CASE_DATA.hechos = mergedCaseData.hechos;
                CASE_DATA.pruebas_catalogo = mergedCaseData.pruebas_catalogo;
                CASE_DATA.pruebas_urls = mergedCaseData.pruebas_urls;
                CASE_DATA.pruebas_meta = mergedCaseData.pruebas_meta;
                CASE_DATA.documentos = mergedCaseData.documentos;
                CASE_DATA.archivos_crudos = mergedCaseData.archivos_crudos;
                CASE_DATA.ignored_remote_hechos = mergedCaseData.ignored_remote_hechos;
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

            const finalCaseData = typeof CASE_DATA !== 'undefined' ? CASE_DATA : window.CASE_DATA;
            const finalFactsCount = Object.keys((finalCaseData || {}).hechos || {}).length;
            const ignoredRemoteCount = (finalCaseData?.ignored_remote_hechos || []).length;
            console.log(`[Supabase] Data loaded: ${capitulos.length} capitulos remotos, ${Object.keys(hechos).length} hechos remotos, ${finalFactsCount} hechos finales tras merge local-first`);
            if (ignoredRemoteCount > 0) {
                console.warn(`[Supabase] ${ignoredRemoteCount} hechos remotos fueron ignorados para no desincronizar la estructura local.`);
            }
        } catch (err) {
            console.error('[Supabase] Error loading data:', err);
            console.log('[Supabase] Falling back to static data.js');
        }
    }

    // Load data from Supabase before rendering
    await loadFromSupabase();
    normalizeCaseDataPortalPaths(typeof CASE_DATA !== 'undefined' ? CASE_DATA : window.CASE_DATA);

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
        const uniqueFragments = dedupeFragmentList(h.fragmentos_clave || []);
        if (all.includes('confesión') || all.includes('confesion extrajudicial')) s += 2;
        else if (all.includes('reconoce') || all.includes('admite')) s += 1;
        if (all.includes('firmad')) s += 1;
        if (h.pruebas && h.pruebas.length >= 3) s += 2;
        else if (h.pruebas && h.pruebas.length >= 1) s += 1;
        if (uniqueFragments.length >= 3) s += 1;
        return Math.min(s, 5);
    }

    function stripAccents(value) {
        return (value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function normalizeSearchText(value) {
        return stripAccents(String(value || '').toLowerCase())
            .replace(/[…]/g, ' ')
            .replace(/[,.;:?!"'«»()\-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function mergeFragmentFieldSet(baseFragment, incomingFragment) {
        return {
            ...baseFragment,
            ...incomingFragment,
            cita: incomingFragment?.cita || baseFragment?.cita || null,
            cita_exacta: incomingFragment?.cita_exacta || baseFragment?.cita_exacta || null,
            fuente: incomingFragment?.fuente || baseFragment?.fuente || null,
            linea: incomingFragment?.linea ?? baseFragment?.linea ?? null,
            fecha: incomingFragment?.fecha || baseFragment?.fecha || null,
            autor: incomingFragment?.autor || baseFragment?.autor || null,
            relevancia: incomingFragment?.relevancia || baseFragment?.relevancia || null
        };
    }

    function buildFragmentIdentityKey(fragment) {
        const quote = normalizeSearchText(fragment?.cita_exacta || fragment?.cita || '');
        const source = normalizeSearchText(fragment?.fuente || '');
        const author = normalizeSearchText(fragment?.autor || '');

        if (quote) {
            return [quote, source, author].join('|');
        }

        const date = normalizeSearchText(fragment?.fecha || '');
        const line = String(fragment?.linea ?? '').trim();
        const relevance = normalizeSearchText(fragment?.relevancia || '');
        return [source, author, date, line, relevance].join('|');
    }

    function dedupeFragmentList(fragments) {
        const merged = new Map();

        (fragments || []).forEach(fragment => {
            const key = buildFragmentIdentityKey(fragment);
            merged.set(key, mergeFragmentFieldSet(merged.get(key), fragment));
        });

        return [...merged.values()];
    }

    let portalAssetPrefix = '';

    function sanitizeLegacyPortalPath(path) {
        if (typeof path !== 'string' || path.length === 0) return path;
        if (/^(?:https?:)?\/\//i.test(path) || /^(?:blob|data):/i.test(path)) {
            return path;
        }

        return String(path)
            .replace(/\\/g, '/')
            .replace(/^\.\//, '')
            .replace(/^(?:\.\.\/)?dist\//, '');
    }

    function isPortalAssetPath(path) {
        return /^(docs|assets|raw_source)\//.test(String(path || '').replace(/\\/g, '/').replace(/^\.\//, ''));
    }

    function stripKnownPortalPrefix(path) {
        return sanitizeLegacyPortalPath(path);
    }

    function normalizeCaseDataPortalPaths(caseData) {
        if (!caseData || caseData.__portal_paths_normalized) return;

        Object.values(caseData.pruebas_urls || {}).forEach(urls => {
            if (!urls) return;
            urls.html = sanitizeLegacyPortalPath(urls.html) || null;
            urls.raw = sanitizeLegacyPortalPath(urls.raw) || null;
            urls.multiplehtml = Array.isArray(urls.multiplehtml)
                ? urls.multiplehtml.map(sanitizeLegacyPortalPath).filter(Boolean)
                : null;
            urls.multipleraw = Array.isArray(urls.multipleraw)
                ? urls.multipleraw.map(sanitizeLegacyPortalPath).filter(Boolean)
                : null;
        });

        Object.values(caseData.documentos || {}).forEach(doc => {
            if (!doc) return;
            doc.archivo_html = sanitizeLegacyPortalPath(doc.archivo_html) || null;
        });

        Object.values(caseData.pruebas_catalogo || {}).forEach(proof => {
            if (!proof || !proof.archivo_url) return;
            proof.archivo_url = sanitizeLegacyPortalPath(proof.archivo_url);
        });

        (caseData.archivos_crudos || []).forEach(file => {
            if (!file) return;
            file.ruta = sanitizeLegacyPortalPath(file.ruta) || null;
        });

        caseData.__portal_paths_normalized = true;
    }

    function inferPortalAssetPrefix() {
        const pathname = decodeURIComponent(String(window.location.pathname || '')).replace(/\\/g, '/');
        const pagePath = pathname.replace(/\/+$/, '');
        const appScript = document.querySelector('script[src$="scripts/app.js"]')?.getAttribute('src') || '';

        if (pagePath.includes('/src/') || /^src\//.test(appScript)) return '../dist/';
        if (pagePath.includes('/dist/') || /^dist\//.test(appScript)) return '';
        if (window.location.protocol === 'file:') {
            if (/(^|\/)src(\/|$)/.test(pagePath)) return '../dist/';
            if (/(^|\/)dist(\/|$)/.test(pagePath)) return '';
        }
        return '';
    }

    function buildPortalPathCandidates(normalizedPath) {
        const cleanedPath = String(normalizedPath || '').replace(/\\/g, '/').replace(/^\.\//, '');
        const baseAssetPath = stripKnownPortalPrefix(cleanedPath);

        if (!isPortalAssetPath(baseAssetPath)) {
            return [cleanedPath];
        }

        const inferredPrefix = portalAssetPrefix || inferPortalAssetPrefix();
        const candidates = [
            inferredPrefix ? `${inferredPrefix}${baseAssetPath}` : baseAssetPath,
            baseAssetPath,
            `../dist/${baseAssetPath}`
        ];

        if (/^(?:\.\.\/)?dist\//.test(cleanedPath)) {
            candidates.unshift(cleanedPath);
        }

        return [...new Set(candidates.filter(Boolean))];
    }

    async function probeViewerUrl(url) {
        if (!url || typeof fetch !== 'function' || /^(?:https?:)?\/\//i.test(url) || /^(?:blob|data):/i.test(url)) {
            return true;
        }

        try {
            const headResponse = await fetch(url, { method: 'HEAD', cache: 'no-store' });
            if (headResponse.ok) return true;
            if (headResponse.status !== 405) return false;
        } catch (error) {
            // Algunos servidores locales no soportan HEAD. Intentamos GET liviano.
        }

        try {
            const getResponse = await fetch(url, {
                method: 'GET',
                cache: 'no-store',
                headers: { Range: 'bytes=0-0' }
            });
            return getResponse.ok || getResponse.status === 206;
        } catch (error) {
            return false;
        }
    }

    async function detectPortalAssetPrefix() {
        portalAssetPrefix = inferPortalAssetPrefix();

        const probePath = 'docs/chat-oscar-pedro.html';
        const probeCandidates = buildPortalPathCandidates(probePath);

        for (const probeUrl of probeCandidates) {
            const isReachable = await probeViewerUrl(probeUrl);
            if (isReachable) {
                portalAssetPrefix = probeUrl.slice(0, -probePath.length);
                return;
            }
        }
    }

    function slugifyPathSegment(segment, isFile) {
        if (!segment) return segment;

        let base = segment;
        let ext = '';
        if (isFile) {
            const dotIndex = segment.lastIndexOf('.');
            if (dotIndex > 0) {
                base = segment.substring(0, dotIndex);
                ext = stripAccents(segment.substring(dotIndex).toLowerCase());
            }
        }

        const slug = stripAccents(base)
            .toLowerCase()
            .replace(/&/g, ' y ')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/-+/g, '-');

        return `${slug || 'archivo'}${ext}`;
    }

    function getResolvedPortalUrlParts(rawUrl) {
        if (!rawUrl) return rawUrl;
        if (/^(?:https?:)?\/\//i.test(rawUrl) || /^(?:blob|data):/i.test(rawUrl)) {
            return {
                candidates: [rawUrl],
                primary: rawUrl
            };
        }

        const hashIndex = rawUrl.indexOf('#');
        const baseWithQuery = hashIndex === -1 ? rawUrl : rawUrl.substring(0, hashIndex);
        const hash = hashIndex === -1 ? '' : rawUrl.substring(hashIndex);

        const queryIndex = baseWithQuery.indexOf('?');
        const pathOnly = queryIndex === -1 ? baseWithQuery : baseWithQuery.substring(0, queryIndex);
        const query = queryIndex === -1 ? '' : baseWithQuery.substring(queryIndex);

        const normalizedPath = pathOnly
            .replace(/\\/g, '/')
            .split('/')
            .map((segment, index, allSegments) => {
                if (!segment) return segment;
                if (['docs', 'assets', 'raw_source'].includes(segment)) return segment;
                return slugifyPathSegment(segment, index === allSegments.length - 1);
            })
            .join('/');

        const candidates = buildPortalPathCandidates(normalizedPath)
            .map(candidatePath => `${candidatePath}${query}${hash}`);

        return {
            candidates,
            primary: candidates[0]
        };
    }

    function resolvePortalUrl(rawUrl) {
        const resolved = getResolvedPortalUrlParts(rawUrl);
        return resolved?.primary || rawUrl;
    }

    async function resolveAccessiblePortalUrl(rawUrl) {
        const resolved = getResolvedPortalUrlParts(rawUrl);
        const candidates = resolved?.candidates || [];

        for (const candidate of candidates) {
            const { base } = splitUrlHash(candidate);
            const isReachable = await probeViewerUrl(base);
            if (isReachable) {
                if (candidate.startsWith('../dist/')) portalAssetPrefix = '../dist/';
                else if (isPortalAssetPath(candidate)) portalAssetPrefix = '';
                return candidate;
            }
        }

        return resolved?.primary || rawUrl;
    }

    function humanizeViewerResourceLabel(url, fallbackLabel) {
        if (!url) return fallbackLabel;

        const cleanUrl = String(url).split('#')[0].split('?')[0];
        const fileName = cleanUrl.split('/').pop() || '';
        const baseName = fileName.replace(/\.[^.]+$/, '');
        const humanized = baseName
            .replace(/[-_]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        if (!humanized) return fallbackLabel;
        return humanized.charAt(0).toUpperCase() + humanized.slice(1);
    }

    function getHechoDisplayOrder(hecho) {
        if (Number.isFinite(hecho?.orden_documento)) return hecho.orden_documento;
        if (Number.isFinite(hecho?.numero)) return hecho.numero;
        return Number.MAX_SAFE_INTEGER;
    }

    function compareHechosForDisplay(left, right) {
        const orderDiff = getHechoDisplayOrder(left) - getHechoDisplayOrder(right);
        if (orderDiff !== 0) return orderDiff;

        const numberDiff = (left?.numero || 0) - (right?.numero || 0);
        if (numberDiff !== 0) return numberDiff;

        return String(left?.id || '').localeCompare(String(right?.id || ''));
    }

    function sortHechoIdsForDisplay(hechoIds) {
        return [...(hechoIds || [])].sort((leftId, rightId) =>
            compareHechosForDisplay(CASE_DATA.hechos?.[leftId], CASE_DATA.hechos?.[rightId])
        );
    }

    function getCapituloDisplayOrder(capitulo) {
        const orders = sortHechoIdsForDisplay(capitulo?.hechos)
            .map(hechoId => getHechoDisplayOrder(CASE_DATA.hechos?.[hechoId]))
            .filter(Number.isFinite);

        return orders.length ? Math.min(...orders) : Number.MAX_SAFE_INTEGER;
    }

    function sortCapitulosForDisplay(capitulos) {
        return [...(capitulos || [])].sort((left, right) => {
            const orderDiff = getCapituloDisplayOrder(left) - getCapituloDisplayOrder(right);
            if (orderDiff !== 0) return orderDiff;
            return String(left?.id || '').localeCompare(String(right?.id || ''));
        });
    }

    function renderProofLinksInHtml(html) {
        if (!html) return '';

        return String(html).replace(/\[((?:P-\d{2}(?:-[A-Za-z0-9]+)?)(?:\s*,\s*P-\d{2}(?:-[A-Za-z0-9]+)?)*)\]/g, (_, group) => (
            group
                .split(/\s*,\s*/)
                .filter(Boolean)
                .map(pruebaId => `<a href="#" class="prueba-link inline-prueba-link" data-prueba="${pruebaId}">${pruebaId}</a>`)
                .join(', ')
        ));
    }

    function buildViewerActionButton(url, title, label) {
        return `<button class="btn-doc ver-doc-inline" data-url="${url}" data-title="${title}">${label}</button>`;
    }

    function buildProofActionButtons(urls, baseTitle) {
        if (!urls) return '';

        const buttons = [];

        if (urls.multiplehtml && urls.multiplehtml.length > 0) {
            if (urls.html) {
                buttons.push(buildViewerActionButton(urls.html, baseTitle, `📄 ${humanizeViewerResourceLabel(urls.html, 'Documento principal')}`));
            }

            urls.multiplehtml.forEach((url, index) => {
                buttons.push(buildViewerActionButton(
                    url,
                    `${baseTitle} — Documento ${index + 1}`,
                    `📄 ${humanizeViewerResourceLabel(url, `Documento ${index + 1}`)}`
                ));
            });

            if (urls.multipleraw && urls.multipleraw.length > 0) {
                urls.multipleraw.forEach((url, index) => {
                    buttons.push(buildViewerActionButton(
                        url,
                        `${baseTitle} — Soporte ${index + 1}`,
                        `📎 ${humanizeViewerResourceLabel(url, `Soporte ${index + 1}`)}`
                    ));
                });
            }

            return buttons.join('');
        }

        if (urls.multipleraw && urls.multipleraw.length > 0) {
            if (urls.html) {
                buttons.push(buildViewerActionButton(urls.html, baseTitle, `📄 ${humanizeViewerResourceLabel(urls.html, 'Documento principal')}`));
            }

            urls.multipleraw.forEach((url, index) => {
                buttons.push(buildViewerActionButton(
                    url,
                    `${baseTitle} — Anexo ${index + 1}`,
                    `📎 ${humanizeViewerResourceLabel(url, `Anexo ${index + 1}`)}`
                ));
            });

            return buttons.join('');
        }

        if (urls.raw) {
            buttons.push(buildViewerActionButton(urls.raw, `${baseTitle} — Soporte original`, '📎 Abrir Soporte'));
        }

        if (urls.html) {
            buttons.push(buildViewerActionButton(urls.html, baseTitle, urls.raw ? '💬 Ver Contexto' : '📄 Abrir Documento'));
        }

        return buttons.join('');
    }

    function resolvePruebaTarget(pruebaId) {
        if (!pruebaId) return null;

        const pid = String(pruebaId).trim();
        const pidKey = pid.split('/')[0];
        const urls = CASE_DATA.pruebas_urls?.[pidKey];
        const meta = CASE_DATA.pruebas_meta?.[pidKey];

        let url = null;
        if (urls) {
            if (urls.multiplehtml && urls.multiplehtml.length > 0) {
                url = urls.html || urls.multiplehtml[0] || urls.raw || urls.multipleraw?.[0];
            } else if (urls.multipleraw && urls.multipleraw.length > 0) {
                url = urls.html || urls.multipleraw[0];
            } else {
                url = urls.raw || urls.html || null;
            }
        }

        if (!url && pidKey === 'P-50') {
            url = 'docs/transcripciones.html';
        }

        if (!url) {
            const catalogDoc = CASE_DATA.pruebas_catalogo?.[pid] || CASE_DATA.pruebas_catalogo?.[pidKey];
            if (catalogDoc?.archivo_url) {
                url = catalogDoc.archivo_url;
            }
        }

        if (!url) return null;

        return {
            id: pidKey,
            url,
            title: meta?.descripcion || pidKey
        };
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
        const citaBusqueda = frag.cita_exacta || frag.cita || '';
        const citaEncoded = citaBusqueda ? citaBusqueda.replace(/"/g, '&quot;').substring(0, 180) : '';
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
            <blockquote>"${frag.cita || frag.cita_exacta || ''}"</blockquote>
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
        const links = buildProofActionButtons(urls, baseTitle);
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
        sortCapitulosForDisplay(CASE_DATA.capitulos).forEach(capitulo => {
            const hechoIds = sortHechoIdsForDisplay(capitulo.hechos);
            const hCount = hechoIds.length;
            html += `
            <div class="chapter-block" id="cap-${capitulo.numero}" data-id="${capitulo.id}">
                <div class="chapter-header" onclick="this.parentElement.classList.toggle('expanded')">
                    <span>CAPÍTULO ${capitulo.numero}: ${capitulo.titulo}</span>
                    <span class="chapter-meta"><span class="chapter-count">${hCount} hecho${hCount !== 1 ? 's' : ''}</span> <span class="indicator">▼</span></span>
                </div>
                <div class="chapter-content">`;

            hechoIds.forEach(hid => {
                const h = CASE_DATA.hechos[hid];
                if (!h) return;

                // Título: usar titulo_corto curado, fallback a resumen truncado
                const title = h.titulo_corto || (h.resumen ? h.resumen.substring(0, 80) + '...' : 'Hecho ' + h.numero);

                // Tags de prueba compactos
                const tags = h.pruebas.map(p => {
                    const meta = CASE_DATA.pruebas_meta ? CASE_DATA.pruebas_meta[p] : null;
                    const cat = meta ? meta.categoria : '';
                    return `<button type="button" class="tag tag-${cat} prueba-link tag-link" data-prueba="${p}" title="${meta ? meta.descripcion : p}">${catIcon(cat)} ${p}</button>`;
                }).join('');

                // === CONTENIDO EXPANDIDO ===

                // Texto legal completo
                let bodyText = renderProofLinksInHtml(h.texto_completo_html || h.texto_completo || '');

                // Nota del abogado
                let notaHtml = '';
                if (h.nota_abogado_html) {
                    notaHtml = `<div class="nota-abogado"><span class="nota-label">📌 NOTA PARA EL ABOGADO:</span>${h.nota_abogado_html}</div>`;
                }

                // Extractos curados — ordenados cronológicamente, agrupados
                let fragHtml = '';
                const displayFragments = dedupeFragmentList(h.fragmentos_clave || []);
                if (displayFragments.length > 0) {
                    const sorted = [...displayFragments].sort((a, b) => {
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
                <div class="hecho-card" id="hecho-${h.id}" data-id="${h.id}">
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
            const [, numA, suffixA = ''] = String(a).match(/^P-(\d{2})(.*)$/) || [];
            const [, numB, suffixB = ''] = String(b).match(/^P-(\d{2})(.*)$/) || [];
            const diff = Number(numA || 0) - Number(numB || 0);
            if (diff !== 0) return diff;
            return suffixA.localeCompare(suffixB);
        });

        sortedIds.forEach(pId => {
            const meta = pruebas[pId];
            const u = urls[pId] || {};
            const cat = meta.categoria || '';

            const actionBtns = buildProofActionButtons(u, meta.descripcion) || `<span class="prueba-no-link">⏳ Pendiente de digitalización</span>`;

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
            const encodedUrl = resolvePortalUrl(docUrl || `docs/${doc.id}.html`);
            html += `<li class="doc-item">
                <a href="${encodedUrl}" target="_blank" class="doc-link">🔍 ${doc.titulo}</a>
                <em class="doc-type">${doc.tipo}</em>
            </li>`;
        });
        html += '</ul><hr class="doc-divider"><h2>Archivos Originales (Descargas)</h2><ul class="doc-list">';

        if (CASE_DATA.archivos_crudos) {
            CASE_DATA.archivos_crudos.forEach(file => {
               const sizeMB = file.tamano > 1024*1024 ? (file.tamano / (1024*1024)).toFixed(2) + ' MB' : (file.tamano / 1024).toFixed(1) + ' KB';
               const rawUrl = resolvePortalUrl(file.ruta);
               html += `<li class="doc-item doc-raw">
                   <span class="doc-name">📄 <strong>${file.nombre}</strong> <span class="doc-size">(${sizeMB})</span></span>
                   <a href="${rawUrl}" download class="btn-doc">⬇ Descargar</a>
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
                <div class="card"><h3>Ingresos Est.</h3><div class="value">~$941M</div><div class="card-sub">COP estimados (abr 2024 – ago 2025)</div></div>
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
                        {id:'P-36', cls:'te-financiero', badgeCls:'badge-cert', badge:'FINANCIERO', title:'[P-36/P-37] 14 transferencias personales ($99.3M subtotal)', desc:'Ese subtotal personal ya refleja pagos variables; al sumar Doctor Flight el total acreditado asciende a $122.3M.', cita:'122.3'},
                        {id:'P-42', cls:'te-financiero', badgeCls:'badge-cert', badge:'FINANCIERO', title:'[P-42] 376 comprobantes ($579M)', desc:'Los comprobantes documentan ingresos mínimos; frente a $122.3M acreditados a Pedro, confirman que la muestra es parcial.', cita:'579'},
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
                    <div class="fin-card"><div class="fin-label">Ingresos Estimados</div><div class="fin-value">~$941M</div><div class="fin-sub">Proyección: total acreditado a Pedro + margen 65%</div></div>
                    <div class="fin-card"><div class="fin-label">Pagos a Pedro</div><div class="fin-value">$122.3M</div><div class="fin-sub">14 transferencias personales + 4 pagos vía Doctor Flight</div></div>
                    <div class="fin-card fin-accent"><div class="fin-label">Pretensión (20%)</div><div class="fin-value">$240M</div><div class="fin-sub">Valoración ParetoMed: $1,200M</div></div>
                    <div class="fin-card fin-danger"><div class="fin-label">Utilidades Post-Ruptura</div><div class="fin-value">$22M+</div><div class="fin-sub">Ago–Oct 2025 adeudadas a Pedro</div></div>
                    <div class="fin-card"><div class="fin-label">Activos Declarados (CC)</div><div class="fin-value">$20M</div><div class="fin-sub">vs. $709M+ reales — subvaloración</div></div>
                </div>
            </div>
        `;
    }

    // --- RENDERIZACIÓN INICIAL ---
    await detectPortalAssetPrefix();
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
            const pCita = jumpPruebaBtn.dataset.cita || null;
            const target = resolvePruebaTarget(pid);
            
            document.querySelector('[data-target="tab-pruebas"]').click();
            
            setTimeout(() => {
                if (target) {
                    openInPruebasViewer(target.url, target.title, pCita);
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
    let viewerLoadRequestId = 0;

    // --- VISOR DE PRUEBAS (pestaña Pruebas) ---
    const pvIframe = document.getElementById('pv-iframe');
    const pvPlaceholder = document.getElementById('pv-placeholder');
    const pvTitleText = document.getElementById('pv-title-text');
    const pvNewtabBtn = document.getElementById('pv-newtab-btn');
    const pvDownloadBtn = document.getElementById('pv-download-btn');
    const pvCloseBtn = document.getElementById('pv-close-btn');
    const pruebasSplit = document.getElementById('pruebas-split');
    let pruebasViewerLoadRequestId = 0;

    function openProofInHechosViewer(pruebaId, sourceElement) {
        const target = resolvePruebaTarget(pruebaId);
        if (!target) {
            console.error("No se encontró URL para la prueba:", pruebaId);
            alert("No se encontró el archivo para la prueba " + pruebaId);
            return;
        }

        openInViewer(target.url, target.title, null);
        mainSplitLayout.classList.add('viewer-open');

        document.querySelectorAll('.hecho-card').forEach(card => card.classList.remove('active-fact'));
        const parentCard = sourceElement?.closest('.hecho-card');
        if (parentCard) parentCard.classList.add('active-fact');
    }

    // --- Helper: split URL into base path and hash fragment ---
    function splitUrlHash(rawUrl) {
        const idx = rawUrl.indexOf('#');
        if (idx === -1) return { base: rawUrl, hash: null };
        return { base: rawUrl.substring(0, idx), hash: rawUrl.substring(idx + 1) };
    }

    function normalizeViewerUrl(rawUrl) {
        if (!rawUrl) return rawUrl;

        let resolved = resolvePortalUrl(rawUrl.normalize('NFC'));
        if (resolved && !resolved.includes('.') && resolved.includes('docs/')) {
            const parts = resolved.split('#');
            resolved = parts[0] + '.html' + (parts[1] ? '#' + parts[1] : '');
        }
        return resolved;
    }

    closeViewerBtn.addEventListener('click', () => {
        viewerLoadRequestId += 1;
        mainSplitLayout.classList.remove('viewer-open');
        viewerIframe.src = 'about:blank';
        viewerIframe.removeAttribute('data-current-doc');
        document.querySelectorAll('.hecho-card').forEach(c => c.classList.remove('active-fact'));
    });

    // Visor en pestaña Hechos
    document.getElementById('tab-hechos').addEventListener('click', (e) => {
        const proofLink = e.target.closest('.prueba-link');
        if (proofLink) {
            e.preventDefault();
            e.stopPropagation();
            openProofInHechosViewer(proofLink.dataset.prueba, proofLink);
            return;
        }

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
    function elementHasLayout(element) {
        if (!element) return false;
        if (typeof element.getClientRects === 'function' && element.getClientRects().length > 0) return true;
        return !!(element.offsetWidth || element.offsetHeight);
    }

    function findCitaElement(doc, cita) {
        if (!cita) return null;

        const fullNeedle = normalizeSearchText(cita);
        const shortNeedle = fullNeedle.substring(0, 120).trim();
        const selectors = ['.line', '.chat-line', '.doc-line', 'blockquote', 'p', 'li', 'td', 'th', 'tr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div'];

        function findBestMatch(needle) {
            if (!needle) return null;

            let bestElement = null;
            let bestScore = Number.POSITIVE_INFINITY;

            for (const selector of selectors) {
                const elements = doc.querySelectorAll(selector);
                for (const element of elements) {
                    const text = normalizeSearchText(element.textContent);
                    if (!text || !text.includes(needle)) continue;

                    const childPenalty = element.querySelectorAll('*').length * 2;
                    const containerPenalty = selector === 'div' && element.children.length > 5 ? 50 : 0;
                    const score = Math.max(text.length - needle.length, 0) + childPenalty + containerPenalty;

                    if (score < bestScore) {
                        bestScore = score;
                        bestElement = element;
                    }
                }
                if (bestElement) return bestElement;
            }

            return null;
        }

        function buildSearchNeedles(text) {
            const raw = String(text || '').trim();
            const needles = new Set();
            const addNeedle = (value, minLength) => {
                const normalized = normalizeSearchText(value);
                if (normalized.length >= minLength) {
                    needles.add(normalized);
                }
            };

            addNeedle(raw, 5);
            raw.split(/(?:\.\.\.|…|\n)+/).forEach(part => addNeedle(part, 14));
            raw.split(/[.!?;:]+/).forEach(part => addNeedle(part, 18));

            const normalized = normalizeSearchText(raw);
            if (normalized.length > 90) {
                addNeedle(normalized.substring(0, 160), 40);
                addNeedle(normalized.slice(-160), 40);
            }

            return Array.from(needles).sort((a, b) => b.length - a.length);
        }

        function extractSearchKeywords(text) {
            return Array.from(new Set(
                normalizeSearchText(text)
                    .split(' ')
                    .filter(token => token.length >= 4)
            ));
        }

        function isSubstantiveLineElement(element) {
            const raw = String(element?.textContent || '').trim();
            const normalized = normalizeSearchText(raw);
            return normalized.length >= 8 && !/^\d{2}:\d{2}$/.test(raw) && raw !== '.';
        }

        function findWindowedLineMatch() {
            const lineElements = Array.from(doc.querySelectorAll('.line, .chat-line, .doc-line'));
            if (!lineElements.length) return null;

            const needles = buildSearchNeedles(cita);
            const keywords = extractSearchKeywords(cita);
            const maxWindow = Math.min(4, lineElements.length);
            let bestMatch = null;

            for (let start = 0; start < lineElements.length; start++) {
                for (let size = 1; size <= maxWindow && (start + size) <= lineElements.length; size++) {
                    const windowElements = lineElements.slice(start, start + size);
                    const windowText = normalizeSearchText(windowElements.map(element => element.textContent).join(' '));
                    if (!windowText) continue;

                    const exactHits = needles.filter(needle => windowText.includes(needle));
                    let score = null;

                    if (exactHits.length > 0) {
                        score = exactHits.reduce((sum, needle) => sum + Math.min(needle.length, 220), 0) + (exactHits.length * 120);
                    } else if (keywords.length >= 4) {
                        const hits = keywords.filter(keyword => windowText.includes(keyword));
                        const ratio = hits.length / keywords.length;
                        if (hits.length >= Math.min(4, keywords.length) && ratio >= 0.58) {
                            score = Math.round(ratio * 100) + (hits.length * 8);
                        }
                    }

                    if (score === null) continue;

                    const anchor = windowElements.find(isSubstantiveLineElement) || windowElements[0];
                    const candidate = {
                        element: anchor,
                        score: score - ((size - 1) * 4)
                    };

                    if (!bestMatch || candidate.score > bestMatch.score) {
                        bestMatch = candidate;
                    }
                }
            }

            return bestMatch ? bestMatch.element : null;
        }

        return findBestMatch(fullNeedle) || findBestMatch(shortNeedle) || findWindowedLineMatch();
    }

    function findViaNativeSelection(win, cita) {
        if (!win || !cita || typeof win.find !== 'function') return null;

        const attempts = [
            cita,
            cita.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
            cita.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 120)
        ].filter(Boolean);

        try {
            const selection = win.getSelection();
            selection.removeAllRanges();
            for (const attempt of attempts) {
                if (!attempt) continue;
                if (win.find(attempt, false, false, true, false, false, false)) {
                    const anchor = selection.anchorNode;
                    return anchor && anchor.parentElement ? anchor.parentElement : null;
                }
            }
        } catch (error) {
            return null;
        }

        return null;
    }

    function scheduleScrollRetry(iframe, hash, cita, attempt, delays) {
        if (attempt >= delays.length) return;
        setTimeout(() => scrollToLineWithRetry(iframe, hash, cita, attempt + 1), delays[attempt - 1]);
    }

    // --- Helper: scroll + highlight inside an iframe, by line id or cita text ---
    function scrollToLineWithRetry(iframe, hash, cita, attempt) {
        attempt = attempt || 1;
        const delays = [250, 600, 1000, 1500, 2200, 3200, 4500, 6500];

        try {
            const win = iframe.contentWindow;
            const doc = win ? win.document : iframe.contentDocument;

            if (!doc || !doc.body || doc.readyState === 'loading') {
                scheduleScrollRetry(iframe, hash, cita, attempt, delays);
                return;
            }

            doc.querySelectorAll('.ev-highlight-active').forEach(el => el.classList.remove('ev-highlight-active'));
            injectHighlightCSS(doc);

            let target = hash ? doc.getElementById(hash) : null;

            if (target && !elementHasLayout(target)) {
                scheduleScrollRetry(iframe, hash, cita, attempt, delays);
                return;
            }

            if (!target && cita) {
                target = findCitaElement(doc, cita) || findViaNativeSelection(win, cita);
            }

            const textReady = normalizeSearchText(doc.body.innerText || doc.body.textContent).length > 40;
            if (!textReady) {
                scheduleScrollRetry(iframe, hash, cita, attempt, delays);
                return;
            }

            if (target) {
                if (target.classList) target.classList.add('ev-highlight-active');
                requestAnimationFrame(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                });
            } else if (hash || cita) {
                scheduleScrollRetry(iframe, hash, cita, attempt, delays);
            }
        } catch (e) {
            scheduleScrollRetry(iframe, hash, cita, attempt, delays);
        }
    }
    // --- Visor de Pruebas: abrir documento ---
    async function openInPruebasViewer(url, title, cita) {
        if (!url) return;
        const requestId = ++pruebasViewerLoadRequestId;
        pvTitleText.textContent = title;
        pvPlaceholder.innerHTML = '<div class="placeholder-icon rotating">⏳</div><h3>Resolviendo ruta del archivo...</h3>';
        pvPlaceholder.style.display = 'flex';
        pvIframe.style.display = 'none';
        const resolvedUrl = await resolveAccessiblePortalUrl(url);
        if (requestId !== pruebasViewerLoadRequestId) return;

        url = normalizeViewerUrl(resolvedUrl);

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
                if (requestId !== pruebasViewerLoadRequestId) return;
                pvPlaceholder.innerHTML = '<div class="placeholder-icon">❌</div><h3>Error al cargar</h3>';
            };
            pvIframe.onload = () => {
                if (requestId !== pruebasViewerLoadRequestId) return;
                pvPlaceholder.style.display = 'none';
                pvIframe.style.display = 'block';
                pvIframe.setAttribute('data-current-doc', baseUrl);
                scrollToLineWithRetry(pvIframe, hash, cita);
            };
            pvIframe.src = baseUrl;
        }
    }

    // --- Visor de Pruebas: cerrar ---
    pvCloseBtn.addEventListener('click', () => {
        pruebasViewerLoadRequestId += 1;
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

    async function openInViewer(url, title, cita) {
        if (!url) return;
        const requestId = ++viewerLoadRequestId;
        viewerTitleText.textContent = title;
        viewerPlaceholder.innerHTML = '<div class="placeholder-icon rotating">⏳</div><h3>Resolviendo ruta del archivo...</h3>';
        viewerPlaceholder.style.display = 'flex';
        viewerIframe.style.display = 'none';
        const resolvedUrl = await resolveAccessiblePortalUrl(url);
        if (requestId !== viewerLoadRequestId) return;

        url = normalizeViewerUrl(resolvedUrl);

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
                if (requestId !== viewerLoadRequestId) return;
                viewerPlaceholder.innerHTML = '<div class="placeholder-icon">❌</div><h3>Error al cargar documento</h3>';
            };
            viewerIframe.onload = () => {
                if (requestId !== viewerLoadRequestId) return;
                viewerPlaceholder.style.display = 'none';
                viewerIframe.style.display = 'block';
                viewerIframe.setAttribute('data-current-doc', baseUrl);
                scrollToLineWithRetry(viewerIframe, hash, cita);
            };
            viewerIframe.src = baseUrl;
        }
    }

});
