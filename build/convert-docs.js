const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const XLSX = require('xlsx');

const SOURCE_DIR = path.join(__dirname, '../source');
const DOCS_DIR = path.join(__dirname, '../dist/docs');
const ASSETS_DIR = path.join(__dirname, '../dist/assets');

if (!fs.existsSync(DOCS_DIR)) fs.mkdirSync(DOCS_DIR, { recursive: true });
if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });

async function processDocx(filePath, fileName) {
    const outputHtmlPath = path.join(DOCS_DIR, fileName.replace('.docx', '.html'));
    try {
        const result = await mammoth.convertToHtml({path: filePath});
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
        fs.writeFileSync(outputHtmlPath, html);
        console.log(`[V] Convertido DOCX: ${fileName}`);
    } catch (e) {
        console.error(`[X] Error convirtiendo ${fileName}: `, e);
    }
}

function processXlsx(filePath, fileName) {
    const outputHtmlPath = path.join(DOCS_DIR, fileName.replace('.xlsx', '.html'));
    try {
        const workbook = XLSX.readFile(filePath);
        let contentHtml = '';
        workbook.SheetNames.forEach(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            if (!sheet['!ref']) return; // saltar hojas vacías
            contentHtml += `<h2>Hoja: ${sheetName}</h2>`;
            const htmlTable = XLSX.utils.sheet_to_html(sheet);
            contentHtml += htmlTable;
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
        fs.writeFileSync(outputHtmlPath, html);
        console.log(`[V] Convertido XLSX: ${fileName}`);
    } catch(e) {
        console.error(`[X] Error convirtiendo ${fileName}: `, e);
    }
}

function copyFile(filePath, fileName) {
    const destPath = path.join(ASSETS_DIR, fileName);
    fs.copyFileSync(filePath, destPath);
    console.log(`[V] Copiado ASSET: ${fileName}`);
}

function processPlainText(filePath, outputName) {
    const text = fs.readFileSync(filePath, 'utf8');
    const escaped = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const lines = escaped.split('\n').map((l,i) =>
        `<div class="line" id="L${i+1}"><span class="ln">${i+1}</span>${l}</div>`
    ).join('\n');
    const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><title>Transcripciones</title>
<link rel="stylesheet" href="../styles/viewer.css">
<link rel="stylesheet" href="../styles/chat.css">
</head><body><div class="document-container">${lines}</div></body></html>`;
    fs.writeFileSync(path.join(DOCS_DIR, outputName), html);
    console.log('[V] Convertido TXT: ' + outputName);
}

async function run() {
    console.log("Iniciando convert-docs.js...");
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
            copyFile(fullPath, file);
        }
    }

    // Convertir transcripciones TXT a HTML
    const transcPath = path.join(SOURCE_DIR, 'TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt');
    if (fs.existsSync(transcPath)) {
        processPlainText(transcPath, 'transcripciones.html');
    }

    // Copiar subcarpeta primo/ a assets/
    const primoSrc = path.join(SOURCE_DIR, 'chat-primo');
    const primoDest = path.join(ASSETS_DIR, 'primo');
    if (fs.existsSync(primoSrc) && !fs.existsSync(primoDest)) {
        fs.mkdirSync(primoDest, { recursive: true });
        for (const f of fs.readdirSync(primoSrc)) {
            const ext = path.extname(f).toLowerCase();
            if (['.pdf','.jpg','.jpeg','.png'].includes(ext)) {
                fs.copyFileSync(path.join(primoSrc, f), path.join(primoDest, f));
                console.log('[V] Copiado primo/' + f);
            }
        }
    }
}

module.exports = { run };

if (require.main === module) {
    run();
}
