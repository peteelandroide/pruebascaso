const fs = require('fs');
const path = 'dist/scripts/data.js';
let content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const fixes = {
  1046: '"P-02", "P-03"',
  1148: '"P-06", "P-08", "P-09"',
  1186: '"P-06", "P-07", "P-02"',
  1240: '"P-01", "P-02"',
  1262: '"P-02", "P-18"',
  1348: '"P-15", "P-16", "P-17"',
  1378: '"P-24", "P-01"',
  1520: '"P-17", "P-16", "P-35"',
  1628: '"P-05", "P-41"',
  1780: '"P-02", "P-03", "P-25", "P-26", "P-27"',
  1802: '"P-02", "P-03", "P-39"',
  1864: '"P-42", "P-36", "P-37"',
  1894: '"P-42", "P-02", "P-13"',
  1924: '"P-02", "P-13"',
  1954: '"P-42", "P-46"',
  1984: '"P-43", "P-02"',
  2014: '"P-05", "P-02"',
  2044: '"P-34", "P-02"',
  2132: '"P-24", "P-01", "P-49"',
  2162: '"P-02", "P-01"'
};

let fixed = 0;
for (const [lineNum, pruebas] of Object.entries(fixes)) {
  const idx = parseInt(lineNum) - 1;
  const line = lines[idx];
  if (line && line.includes('"pruebas": []')) {
    lines[idx] = line.replace('"pruebas": []', `"pruebas": [${pruebas}]`);
    console.log(`Fixed line ${lineNum}`);
    fixed++;
  } else {
    console.log(`WARNING: line ${lineNum} not matched: ${line ? line.trim() : 'undefined'}`);
  }
}

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log(`Done. Fixed ${fixed} of ${Object.keys(fixes).length} lines.`);
