const fs = require('fs');
const content = fs.readFileSync('src/scripts/data.js', 'utf8');
const dataPrefix = "const CASE_DATA = ";
const jsonStart = content.indexOf(dataPrefix) + dataPrefix.length;
let objText = content.substring(jsonStart).trim();
if(objText.endsWith(';')) objText = objText.substring(0, objText.length - 1);
const data = eval('(' + objText + ')');

console.log("pruebas_catalogo 0:", data.pruebas_catalogo[0]);
console.log("pruebas_urls:", data.pruebas_urls ? Object.keys(data.pruebas_urls).slice(0,3) : "no urls");
