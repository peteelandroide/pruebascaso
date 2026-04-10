const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const XLSX = require('xlsx');
const {
    getAssetOutputForSource,
    getHtmlOutputForSource,
    getRawOutputForSource,
    toPosixPath
} = require('./path-utils');

const ROOT = path.join(__dirname, '..');
const DIST_ROOT = path.join(ROOT, 'dist');
const SOURCE_DIR = path.join(ROOT, 'source');
const DOCS_DIR = path.join(ROOT, 'dist', 'docs');
const ASSETS_DIR = path.join(ROOT, 'dist', 'assets');
const RAW_DIR = path.join(ROOT, 'dist', 'raw_source');

const TEXT_DOCUMENTS = [
    {
        source: 'TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt',
        title: 'Transcripciones Consolidadas'
    },
    {
        source: 'Grabación de llamada Oscar PARETOMED_250814_184648_original.txt',
        title: 'Grabación telefónica Oscar 14/08/2025 — prueba reina'
    }
];

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function ensureParentDir(filePath) {
    ensureDir(path.dirname(filePath));
}

function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function writeHtml(relativeOutputPath, html) {
    const outputPath = path.join(DIST_ROOT, relativeOutputPath);
    ensureParentDir(outputPath);
    fs.writeFileSync(outputPath, html, 'utf8');
}

async function processDocx(filePath, relativeSourcePath) {
    const fileName = path.basename(relativeSourcePath);
    const outputRelativePath = getHtmlOutputForSource(relativeSourcePath);
    try {
        const result = await mammoth.convertToHtml({ path: filePath });
        const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>${fileName}</title>
          <link rel="stylesheet" href="../styles/viewer.css">
        </head>
        <body>
          <div class="document-container document-viewer-mode">
            ${result.value}
          </div>
        </body>
        </html>
        `;
        writeHtml(outputRelativePath, html);
        console.log(`[V] Convertido DOCX: ${relativeSourcePath} -> ${outputRelativePath}`);
    } catch (error) {
        console.error(`[X] Error convirtiendo ${relativeSourcePath}: `, error);
    }
}

function processXlsx(filePath, relativeSourcePath) {
    const fileName = path.basename(relativeSourcePath);
    const outputRelativePath = getHtmlOutputForSource(relativeSourcePath);
    try {
        const workbook = XLSX.readFile(filePath);
        let contentHtml = '';
        workbook.SheetNames.forEach(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            if (!sheet['!ref']) return;
            contentHtml += `<h2>Hoja: ${sheetName}</h2>`;
            contentHtml += XLSX.utils.sheet_to_html(sheet);
        });

        const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>${fileName}</title>
          <link rel="stylesheet" href="../styles/viewer.css">
          <style>table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #ddd; padding: 4px 8px; font-size: 13px; }</style>
        </head>
        <body>
          <div class="document-container">
            ${contentHtml}
          </div>
        </body>
        </html>
        `;
        writeHtml(outputRelativePath, html);
        console.log(`[V] Convertido XLSX: ${relativeSourcePath} -> ${outputRelativePath}`);
    } catch (error) {
        console.error(`[X] Error convirtiendo ${relativeSourcePath}: `, error);
    }
}

function copyAsset(filePath, relativeSourcePath) {
    const outputRelativePath = getAssetOutputForSource(relativeSourcePath);
    const destination = path.join(DIST_ROOT, outputRelativePath);
    ensureParentDir(destination);
    fs.copyFileSync(filePath, destination);
    console.log(`[V] Copiado ASSET: ${relativeSourcePath} -> ${outputRelativePath}`);
}

function processPlainText(filePath, sourceRelativePath, title) {
    const outputRelativePath = getHtmlOutputForSource(sourceRelativePath);
    const text = fs.readFileSync(filePath, 'utf8');
    const lines = escapeHtml(text)
        .split('\n')
        .map((line, index) => `<div class="line" id="L${index + 1}"><span class="ln">${index + 1}</span>${line}</div>`)
        .join('\n');

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <link rel="stylesheet" href="../styles/viewer.css">
  <link rel="stylesheet" href="../styles/chat.css">
</head>
<body>
  <div class="document-container">
    <div class="document-header"><h1>${title}</h1></div>
    <div class="document-content">${lines}</div>
  </div>
</body>
</html>`;

    writeHtml(outputRelativePath, html);
    console.log(`[V] Convertido TXT: ${sourceRelativePath} -> ${outputRelativePath}`);
}

function walkFiles(dirPath, baseDir) {
    let results = [];
    for (const item of fs.readdirSync(dirPath)) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(walkFiles(fullPath, baseDir));
            continue;
        }
        results.push({
            fullPath,
            relativePath: toPosixPath(path.relative(baseDir, fullPath))
        });
    }
    return results;
}

function copyRawSourceTree() {
    ensureDir(RAW_DIR);
    const files = walkFiles(SOURCE_DIR, SOURCE_DIR);
    files.forEach(({ fullPath, relativePath }) => {
        const outputRelativePath = getRawOutputForSource(relativePath);
        const destination = path.join(DIST_ROOT, outputRelativePath);
        ensureParentDir(destination);
        fs.copyFileSync(fullPath, destination);
    });
    console.log(`[V] Copiado raw_source/: ${files.length} archivos`);
}

async function run() {
    console.log('Iniciando convert-docs.js...');

    ensureDir(DOCS_DIR);
    ensureDir(ASSETS_DIR);
    ensureDir(RAW_DIR);

    const files = fs.readdirSync(SOURCE_DIR);
    for (const file of files) {
        const fullPath = path.join(SOURCE_DIR, file);
        if (fs.statSync(fullPath).isDirectory()) continue;

        const ext = path.extname(file).toLowerCase();
        if (ext === '.docx') {
            await processDocx(fullPath, file);
        } else if (ext === '.xlsx') {
            processXlsx(fullPath, file);
        } else if (ext === '.pdf' || ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
            copyAsset(fullPath, file);
        }
    }

    const primoDir = path.join(SOURCE_DIR, 'chat-primo');
    if (fs.existsSync(primoDir)) {
        walkFiles(primoDir, SOURCE_DIR).forEach(({ fullPath, relativePath }) => {
            const ext = path.extname(relativePath).toLowerCase();
            if (['.pdf', '.jpg', '.jpeg', '.png'].includes(ext)) {
                copyAsset(fullPath, relativePath);
            }
        });
    }

    TEXT_DOCUMENTS.forEach(({ source, title }) => {
        const sourcePath = path.join(SOURCE_DIR, source);
        if (fs.existsSync(sourcePath)) {
            processPlainText(sourcePath, source, title);
        }
    });

    copyRawSourceTree();
}

module.exports = { run };

if (require.main === module) {
    run();
}
