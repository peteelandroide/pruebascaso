/**
 * sync-src.js — Copies src/scripts/ and src/styles/ into dist/
 * Run: node build/sync-src.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const pairs = [
    { src: 'src/scripts', dest: 'dist/scripts' },
    { src: 'src/styles',  dest: 'dist/styles'  },
    { src: 'src/index.html', dest: 'dist/index.html' }
];

let copied = 0;

pairs.forEach(({ src, dest }) => {
    const srcPath = path.join(ROOT, src);
    const destPath = path.join(ROOT, dest);
    if (!fs.existsSync(srcPath)) return;

    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
        if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
        fs.readdirSync(srcPath).forEach(file => {
            const sFile = path.join(srcPath, file);
            if (fs.statSync(sFile).isDirectory()) return;
            fs.copyFileSync(sFile, path.join(destPath, file));
            copied++;
            console.log('[SYNC] ' + src + '/' + file + ' -> ' + dest + '/' + file);
        });
    } else {
        const parentDest = path.dirname(destPath);
        if (!fs.existsSync(parentDest)) fs.mkdirSync(parentDest, { recursive: true });
        fs.copyFileSync(srcPath, destPath);
        copied++;
        console.log('[SYNC] ' + src + ' -> ' + dest);
    }
});

console.log('[SYNC] Done — ' + copied + ' files copied.');
