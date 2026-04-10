-- Esquema inicial para el Portal de Evidencia ParetoMed

-- 1. Capítulos
CREATE TABLE IF NOT EXISTS public.capitulos (
    id TEXT PRIMARY KEY,
    numero TEXT NOT NULL,
    titulo TEXT NOT NULL,
    orden SERIAL
);

-- 2. Hechos
CREATE TABLE IF NOT EXISTS public.hechos (
    id TEXT PRIMARY KEY,
    numero INTEGER NOT NULL,
    ordinal TEXT NOT NULL,
    capitulo_id TEXT REFERENCES public.capitulos(id),
    resumen TEXT NOT NULL,
    texto_completo TEXT NOT NULL,
    texto_completo_html TEXT NOT NULL,
    titulo_corto TEXT NOT NULL,
    nota_abogado TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Pruebas (Catálogo)
CREATE TABLE IF NOT EXISTS public.pruebas (
    id TEXT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    tipo TEXT NOT NULL,
    categoria TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Relación Hecho-Pruebas (Muchos a Muchos)
CREATE TABLE IF NOT EXISTS public.hecho_pruebas (
    hecho_id TEXT REFERENCES public.hechos(id) ON DELETE CASCADE,
    prueba_id TEXT REFERENCES public.pruebas(id) ON DELETE CASCADE,
    PRIMARY KEY (hecho_id, prueba_id)
);

-- 5. Fragmentos Clave
CREATE TABLE IF NOT EXISTS public.fragmentos_clave (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hecho_id TEXT REFERENCES public.hechos(id) ON DELETE CASCADE,
    cita TEXT NOT NULL,
    fuente TEXT NOT NULL,
    linea TEXT,
    fecha TEXT,
    autor TEXT,
    relevancia TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Documentos (Archivos Crudos)
CREATE TABLE IF NOT EXISTS public.documentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT UNIQUE NOT NULL,
    ruta TEXT NOT NULL,
    tamano BIGINT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar lectura pública (según requerimiento del usuario)
-- Nota: En producción esto debería reemplazarse por RLS más granular si es necesario.
ALTER TABLE public.capitulos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hechos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pruebas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hecho_pruebas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fragmentos_clave ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública para capitulos" ON public.capitulos FOR SELECT USING (true);
CREATE POLICY "Lectura pública para hechos" ON public.hechos FOR SELECT USING (true);
CREATE POLICY "Lectura pública para pruebas" ON public.pruebas FOR SELECT USING (true);
CREATE POLICY "Lectura pública para hecho_pruebas" ON public.hecho_pruebas FOR SELECT USING (true);
CREATE POLICY "Lectura pública para fragmentos_clave" ON public.fragmentos_clave FOR SELECT USING (true);
CREATE POLICY "Lectura pública para documentos" ON public.documentos FOR SELECT USING (true);
