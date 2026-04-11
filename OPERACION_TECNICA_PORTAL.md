# OPERACIÓN TÉCNICA DEL PORTAL

## Fuente de verdad

1. `source/HECHOS_DEMANDA_PARETOMED_2026.md`
   El índice canónico legal de hechos y pruebas.

2. `build/evidence-map.js`
   Solo define a qué archivo apunta cada `P-XX`.
   No debe usarse como fuente de descripciones legales.

3. `src/scripts/data.js`
   Archivo generado.
   No debe editarse manualmente.

4. Supabase
   Es una capa de apoyo para enriquecer hechos ya existentes.
   No debe redefinir el catálogo, el orden ni la estructura canónica local.

## Flujo seguro al agregar o corregir una prueba

1. Agregar o corregir el archivo fuente dentro de `source/`.
2. Actualizar el índice canónico en `source/HECHOS_DEMANDA_PARETOMED_2026.md` si cambia la prueba.
3. Ajustar `build/evidence-map.js` para enlazar el `P-XX` al archivo correcto.
4. Ejecutar `npm run build`.
5. Ejecutar `npm run audit` si se quiere una revisión adicional del `dist/`.
6. Si se necesita sincronizar base de datos, usar el `src/scripts/migration.sql` recién generado.

## Reglas operativas

- No editar manualmente `src/scripts/data.js`.
- No editar manualmente `src/scripts/migration.sql`.
- No referenciar archivos en `dist/` desde el código fuente; siempre usar `source/` y el pipeline.
- Si una prueba nueva no aparece en el catálogo canónico, el build debe fallar.
- Si dos archivos generan la misma salida en `dist/`, el build debe fallar.
- Si `evidence-map.js` tiene IDs de más o de menos, el build debe fallar.

## Comandos

- `npm run build`
  Regenera `data.js`, valida integridad, regenera SQL y sincroniza `dist/`.

- `npm run validate`
  Revisa cobertura del catálogo, archivos de salida, colisiones y consistencia de `data.js`.

- `npm run db:generate`
  Regenera `src/scripts/migration.sql` desde el snapshot canónico local.

- `npm run audit`
  Ejecuta build completo y luego audita el contenido final de `dist/`.

## Qué quedó blindado

- `data.js` toma descripción y tipo desde el índice canónico, no desde `evidence-map.js`.
- El frontend usa orden narrativo local (`orden_documento`) para renderizar hechos.
- Supabase ya no puede inyectar hechos remotos nuevos para desordenar la app.
- El build ahora valida rutas rotas, IDs faltantes y colisiones de nombres antes de publicar.
