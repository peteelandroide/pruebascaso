const fs = require('fs');
const path = require('path');
const { getAssetOutputForSource } = require('./path-utils');

const SOURCE_DIR = path.join(__dirname, '../source');
const DOCS_DIR = path.join(__dirname, '../dist/docs');

// Asegurar que exista dist/docs
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

const CHAT_FILES = [
  { file: 'Chat de WhatsApp con Oscar Maldonado Paretomed.txt', id: 'chat-oscar-pedro' },
  { file: 'Chat de WhatsApp con Equipo de Trabajo - Paretomed 🟠.txt', id: 'chat-equipo' },
  { file: 'Chat de WhatsApp con Correcciones y sugerencias PARETOMED.txt', id: 'chat-correcciones' },
  { file: 'chat-primo/_chat.txt', id: 'chat-primo' } // path relativo a source
];

const CHAT_PATTERNS = [
  /^[\u200e\u200f]?(\d{1,2})[/\\](\d{1,2})[/\\](\d{2,4}),\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([aApP]\.?\s*[mM]\.?)?\s*-\s*(.+?):\s*(.*)$/,
  /^[\u200e\u200f]?\[(\d{1,2})[/\\](\d{1,2})[/\\](\d{2,4}),\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([aApP]\.?\s*[mM]\.?)?\]\s+(.+?):\s*(.*)$/
];

function getClassForParticipant(name) {
  const norm = name.toLowerCase();
  if (norm.includes('oscar')) return 'participant-oscar';
  if (norm.includes('pedro')) return 'participant-pedro';
  if (norm.includes('adriana')) return 'participant-adriana';
  if (norm.includes('isabella')) return 'participant-isabella';
  if (norm.includes('paretomed') || norm.includes('~')) return 'participant-business';
  return 'participant-other';
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function normalizeChatYear(year) {
  const cleanYear = String(year || '').trim();
  return cleanYear.length === 2 ? `20${cleanYear}` : cleanYear;
}

function formatAttachmentLink(fileName, inputFile) {
  const normalizedInput = inputFile.replace(/\\/g, '/');
  const baseDir = path.posix.dirname(normalizedInput);
  const relativeAssetPath = baseDir === '.'
    ? fileName
    : path.posix.join(baseDir, fileName);

  const assetUrl = `../${getAssetOutputForSource(relativeAssetPath)}`;
  const safeName = escapeHtml(fileName);
  return `<a class="chat-attachment" href="${assetUrl}" target="_blank" rel="noopener">Adjunto: ${safeName}</a>`;
}

function formatChatMessage(rawMessage, inputFile) {
  const normalizedMessage = String(rawMessage || '').replace(/[\u200e\u200f]/g, '').trim();
  const attachmentMatch = normalizedMessage.match(/<attached:\s*([^>]+)>/i);

  if (attachmentMatch) {
    const beforeAttachment = normalizedMessage.substring(0, attachmentMatch.index).trim();
    const attachmentHtml = formatAttachmentLink(attachmentMatch[1].trim(), inputFile);
    if (beforeAttachment) {
      return `${escapeHtml(beforeAttachment)} ${attachmentHtml}`;
    }
    return attachmentHtml;
  }

  return escapeHtml(rawMessage).replace(/<Media omitted>|<Multimedia omitido>/i, '<em>[📸 Imagen/Audio omitido]</em>');
}

function parseChatLine(rawLine) {
  const normalizedLine = String(rawLine || '')
    .replace(/[\u202f\u00a0]/g, ' ')
    .replace(/\r/g, '');

  for (const pattern of CHAT_PATTERNS) {
    const match = normalizedLine.match(pattern);
    if (match) {
      const [_, d, m, y, h, min, sec, ampm, author, msg] = match;
      return { d, m, y, h, min, sec, ampm, author, msg };
    }
  }
  return null;
}

function parseChatToHTML(inputFile, outputId) {
  const inputPath = path.join(SOURCE_DIR, inputFile);
  if (!fs.existsSync(inputPath)) {
    console.warn(`[!] Archivo de chat no encontrado: ${inputPath}`);
    return;
  }

  const content = fs.readFileSync(inputPath, 'utf8');
  const lines = content.split('\n');

  let htmlOutput = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Chat: ${outputId}</title>
  <link rel="stylesheet" href="../styles/viewer.css">
  <link rel="stylesheet" href="../styles/chat.css">
</head>
<body>
  <div class="document-container" id="document-root">
<div class="document-header"><h1>Visor de Documento: ${outputId}</h1></div>
<div class="document-content">
`;

  let currentLineHTML = '';
  // Iteramos preservando num de linea original
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    // Evitamos líneas completamente vacías al inicio o fin si no es parte de algo
    if (rawLine.trim() === '' && !currentLineHTML) {
      htmlOutput += `<div id="L${i + 1}" class="chat-line empty-line"></div>\n`;
      continue;
    }

    const parsedLine = parseChatLine(rawLine);
    if (parsedLine) {
      const { d, m, y, h, min, sec, ampm, author, msg } = parsedLine;
      const normalizedDate = `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${normalizeChatYear(y)}`;
      const normalizedAmPm = ampm ? ampm.replace(/\s+/g, ' ').trim() : '';
      const timeSuffix = normalizedAmPm ? ` ${normalizedAmPm}` : '';
      const displayTime = `${h}:${min}${sec ? `:${sec}` : ''}${timeSuffix}`;
      const msgSafe = formatChatMessage(msg, inputFile);
      
      const participantClass = getClassForParticipant(author);
      // Comenzamos nueva línea de chat
      htmlOutput += `<div id="L${i + 1}" class="chat-line"><div class="chat-meta">[${normalizedDate} ${displayTime}] <span class="chat-author ${participantClass}">${escapeHtml(author)}</span>:</div><div class="chat-msg">${msgSafe}</div></div>\n`;
    } else {
      // Línea de continuación de chat o mensaje de sistema
      const msgSafe = formatChatMessage(rawLine, inputFile);
      htmlOutput += `<div id="L${i + 1}" class="chat-line chat-continuation"><div class="chat-msg">${msgSafe}</div></div>\n`;
    }
  }

  htmlOutput += `
</div>
</div>
</body>
</html>`;

  const outputPath = path.join(DOCS_DIR, `${outputId}.html`);
  fs.writeFileSync(outputPath, htmlOutput, 'utf8');
  console.log(`[V] Convertido ${inputFile} -> docs/${outputId}.html (${lines.length} líneas)`);
}

function run() {
  console.log("Iniciando parse-chat.js...");
  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }
  for (const chat of CHAT_FILES) {
    parseChatToHTML(chat.file, chat.id);
  }
}

// Export para uso en extract-data.js
module.exports = { run };

// Permitir correr directo
if (require.main === module) {
  run();
}
