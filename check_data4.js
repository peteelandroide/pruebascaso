const fs = require('fs');
const content = fs.readFileSync('src/scripts/data.js', 'utf8');
const dataPrefix = "const CASE_DATA = ";
const jsonStart = content.indexOf(dataPrefix) + dataPrefix.length;
let objText = content.substring(jsonStart).trim();
if(objText.endsWith(';')) objText = objText.substring(0, objText.length - 1);
const data = eval('(' + objText + ')');

console.log("pruebas_urls format:", data.pruebas_urls['P-01']);
