const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'dist', 'docs');

// Get all files
const files = fs.readdirSync(DOCS_DIR);

let renamed = 0;
files.forEach(file => {
    // Normalize to NFC (composed form)
    const normalized = file.normalize('NFC');
    if (file !== normalized) {
        const oldPath = path.join(DOCS_DIR, file);
        const newPath = path.join(DOCS_DIR, normalized);
        console.log(`Renaming:\n  FROM: ${file}\n    TO: ${normalized}`);
        fs.renameSync(oldPath, newPath);
        renamed++;
    }
});

if (renamed === 0) {
    console.log('All filenames are already NFC-normalized.');
} else {
    console.log(`\nRenamed ${renamed} files to NFC form.`);
}
