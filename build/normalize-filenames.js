const fs = require('fs');
const path = require('path');

const DIRS = [
    path.join(__dirname, '..', 'dist', 'docs'),
    path.join(__dirname, '..', 'dist', 'assets')
];

let renamedTotal = 0;

DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const normalized = file.normalize('NFC').toLowerCase();
        if (file !== normalized) {
            const oldPath = path.join(dir, file);
            const newPath = path.join(dir, normalized);
            console.log(`Renaming in ${path.basename(dir)}:\n  FROM: ${file}\n    TO: ${normalized}`);
            fs.renameSync(oldPath, newPath);
            renamedTotal++;
        }
    });
});

if (renamedTotal === 0) {
    console.log('All filenames are already NFC-normalized.');
} else {
    console.log(`\nRenamed ${renamedTotal} files to NFC form.`);
}
