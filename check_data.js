const fs = require('fs');
const content = fs.readFileSync('src/scripts/data.js', 'utf8');
const dataPrefix = "const CASE_DATA = ";
const startIndex = content.indexOf(dataPrefix);
if (startIndex !== -1) {
    const jsonStart = startIndex + dataPrefix.length;
    // We try to parse everything after "const CASE_DATA = "
    // Using eval to parse the JS object literal, but safely wrapping it
    let objText = content.substring(jsonStart).trim();
    if(objText.endsWith(';')) objText = objText.substring(0, objText.length - 1);
    
    try {
        const data = eval('(' + objText + ')');
        console.log("Is array?", Array.isArray(data.pruebas_meta));
        console.log("Keys if object:", Object.keys(data.pruebas_meta || {}).slice(0,5));
        console.log("First element:", Array.isArray(data.pruebas_meta) ? data.pruebas_meta[0] : Object.values(data.pruebas_meta)[0]);
    } catch(e) {
        console.log("Eval failed", e.message);
    }
}
