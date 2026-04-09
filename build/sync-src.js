/**
 * sync-src.js — Copies src/scripts/ and src/styles/ into dist/
 * Run: node build/sync-src.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const pairs = [
    { src: 'src/scripts', dest: 'dist/scripts' },
    { src: 'src/styles',  dest: 'dist/styles'  }
];

let copied = 0;

pairs.forEach(({ src, dest }) => {
    const srcDir = path.join(ROOT, src);
    const destDir = path.join(ROOT, dest);
    if (!fs.existsSync(srcDir)) return;
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    fs.readdirSync(srcDir).forEach(file => {
        const srcFile = path.join(srcDir, file);
        if (fs.statSync(srcFile).isDirectory()) return;
        fs.copyFileSync(srcFile, path.join(destDir, file));
        copied++;
        console.log('[SYNC] ' + src + '/' + file + ' -> ' + dest + '/' + file);
    });
});

console.log('[SYNC] Done — ' + copied + ' files copied.');
