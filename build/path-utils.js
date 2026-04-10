const path = require('path');

const FIXED_HTML_OUTPUTS = {
    'TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt': 'docs/transcripciones.html',
    'Grabación de llamada Oscar PARETOMED_250814_184648_original.txt': 'docs/grabacion-llamada-oscar-paretomed-250814-184648-original.html'
};

function stripAccents(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function slugifyBaseName(value) {
    const stripped = stripAccents(value)
        .toLowerCase()
        .replace(/&/g, ' y ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-+/g, '-');
    return stripped || 'archivo';
}

function slugifySegment(segment, isFile) {
    if (!isFile) return slugifyBaseName(segment);

    const parsed = path.parse(segment);
    const ext = stripAccents(parsed.ext).toLowerCase();
    return `${slugifyBaseName(parsed.name)}${ext}`;
}

function toPosixPath(value) {
    return value.replace(/\\/g, '/');
}

function canonicalizeRelativePath(relativePath) {
    const cleaned = toPosixPath(relativePath).replace(/^\/+/, '');
    const segments = cleaned.split('/').filter(Boolean);
    return segments
        .map((segment, index) => slugifySegment(segment, index === segments.length - 1))
        .join('/');
}

function getHtmlOutputForSource(relativePath) {
    const normalized = toPosixPath(relativePath);
    if (FIXED_HTML_OUTPUTS[normalized]) return FIXED_HTML_OUTPUTS[normalized];

    const parsed = path.parse(normalized);
    return `docs/${slugifyBaseName(parsed.name)}.html`;
}

function getAssetOutputForSource(relativePath) {
    const normalized = toPosixPath(relativePath);
    if (normalized.startsWith('chat-primo/')) {
        const primoRelative = normalized.substring('chat-primo/'.length);
        return `assets/primo/${canonicalizeRelativePath(primoRelative)}`;
    }
    return `assets/${canonicalizeRelativePath(normalized)}`;
}

function getRawOutputForSource(relativePath) {
    return `raw_source/${canonicalizeRelativePath(toPosixPath(relativePath))}`;
}

module.exports = {
    canonicalizeRelativePath,
    getAssetOutputForSource,
    getHtmlOutputForSource,
    getRawOutputForSource,
    slugifyBaseName,
    stripAccents,
    toPosixPath
};
