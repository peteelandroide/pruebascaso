const fs = require('fs');
const content = fs.readFileSync('src/scripts/data.js', 'utf8');
const dataPrefix = "const CASE_DATA = ";
const startIndex = content.indexOf(dataPrefix);
if (startIndex !== -1) {
    const jsonStart = startIndex + dataPrefix.length;
    let objText = content.substring(jsonStart).trim();
    if(objText.endsWith(';')) objText = objText.substring(0, objText.length - 1);
    
    try {
        const data = eval('(' + objText + ')');
        console.log("Keys of CASE_DATA:", Object.keys(data));
        console.log("First of pruebas:", data.pruebas ? data.pruebas[0] : "no pruebas");
    } catch(e) {
        console.log("Eval failed", e.message);
    }
}
