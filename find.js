const fs = require('fs');
const dataStr = fs.readFileSync('src/scripts/data.js', 'utf8');
const dataPrefix = "const CASE_DATA = ";
const jsonStr = dataStr.substring(dataPrefix.length);
const data = eval("(" + jsonStr + ")");

console.log(Object.keys(data.pruebas_meta || {}).slice(0, 20));

Object.values(data.pruebas_meta || {}).forEach(p => {
   if(["P-01", "P-50", "P-11", "P-09", "P-41"].includes(p.id_interno)) {
       console.log(p.id_interno + " -> " + p.archivo_url);
   }
});
