# Informe de Diagnóstico: Errores de Nginx y Fallos del Visor

Tras realizar una auditoría profunda del sistema de build, la lógica del frontend y el entorno de servidor (Nginx/Docker), se han identificado las causas raíz de los problemas reportados.

---

## 1. Errores de Nginx (404 Not Found)

Aunque los archivos existen físicamente en la carpeta `dist/`, se producen errores 404 por dos razones técnicas principales:

### A. Sensibilidad a Mayúsculas/Minúsculas (Case Sensitivity)
*   **Contexto**: El servidor local (Windows) es insensible a mayúsculas, pero el contenedor Docker (Alpine Linux) es **estrictamente sensible**.
*   **Problema**: Algunos scripts de conversión (como `convert-docs.js`) podrían generar nombres de archivo con variaciones mínimas respecto a lo que `data.js` espera. 
*   **Ejemplo**: Si el archivo se genera como `Carta-Recomendacion.html` pero el código solicita `carta-recomendacion.html`, Nginx devolverá 404.

### B. Resolución de Rutas Relativas
*   **Problema**: El visor utiliza rutas relativas como `docs/archivo.html`. 
*   **Riesgo**: Si el portal se accede desde una URL con subdirectorios (ej. `midominio.com/portal/`), el navegador intentará buscar los documentos en `midominio.com/docs/` (fuera de la carpeta del portal) en lugar de `midominio.com/portal/docs/`.
*   **Estado**: Se ha verificado que no existe una etiqueta `<base>` en `index.html` que unifique estas peticiones.

---

## 2. Fallos en Autoscroll y Resaltado (Highlight)

Incluso cuando el documento carga (evitando el 404), el visor no salta a la línea ni resalta el texto. Esto se debe a un error crítico en el "Pipeline de Datos":

### A. Omisión de Documentos en la Búsqueda
*   El script `build/find-fragments.js` tiene **hardcodeada** una lista de solo 4 archivos de texto (chats principales).
*   **Impacto**: Los otros 29 documentos (PDFs convertidos, DOCX, Excels) **no son indexados**.
*   **Resultado**: Al no encontrarse el fragmento en el build, el archivo `data.js` queda con valores `linea: null` y `texto: null`, haciendo imposible que el visor sepa a dónde hacer scroll.

### B. Inyección de IDs en HTML
*   Para que el autoscroll funcione, los archivos HTML en `dist/docs` deben tener etiquetas de línea (ej. `<span id="L123">`). 
*   Se ha detectado que `convert-docs.js` no garantiza esta inyección en todos los tipos de archivos convertidos.

---

## 3. Estado de la Auditoría Local

*   **Sincronización**: Se ha realizado un `git push` con el estado actual del repositorio.
*   **Verificación de Archivos**: Se confirmó mediante `ls dist/docs` que los 33 documentos están presentes.
*   **Servidor**: Se reinició el servidor local en el puerto 8080. Localmente, la carga de documentos funciona, lo que confirma que el problema **no es la ausencia de archivos**, sino la forma en que el navegador los solicita al servidor Linux.

---

## Recomendaciones Técnicas (Próximos Pasos)

1.  **Normalización Total**: Forzar todos los nombres de archivo a minúsculas y sin acentos tanto en el disco como en el JSON de datos.
2.  **Referenciación Absoluta**: Cambiar las rutas en el visor para que sean relativas a la raíz del dominio (ej. `/docs/...`).
3.  **Indexación Universal**: Corregir `find-fragments.js` para que busque en todos los archivos del directorio `dist/docs`.
