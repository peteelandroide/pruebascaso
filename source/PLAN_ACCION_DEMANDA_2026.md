# PLAN DE ACCION PARA COMPLETAR LA DEMANDA
## Pedro Jose Vergara Villanueva vs. Oscar David Maldonado Badran
### Fecha: 8 de abril de 2026

---

# PARTE 1: DIAGNOSTICO DEL BORRADOR ACTUAL

El BORRADOR DEMANDA 2.docx del abogado Alfredo Toledo tiene:
- 14 hechos basicos (necesita minimo 40-50 hechos detallados)
- Montos en blanco (cuantia, juramento estimatorio)
- Fundamentos de derecho correctos pero genericos
- Falta desarrollo probatorio especifico
- No menciona las facturas electronicas ni su contexto
- No desarrolla el tema de rendicion de cuentas incompleta
- No incluye la cronologia detallada de la dilatacion del acuerdo

Ya tenemos dos documentos de soporte:
1. `HECHOS_DEMANDA_PARETOMED_2026.md` — 46 hechos detallados con pruebas indexadas
2. `INVESTIGACION_DEMANDA_PARETOMED_2026.md` — Investigacion completa con analisis

---

# PARTE 2: AREAS QUE FALTAN POR DESARROLLAR

## 2.1 Tema Financiero (CRITICO - INCOMPLETO)

**Problema:** Pedro solo tenia acceso a las capturas de ventas nuevas compartidas en el grupo. No tenia acceso a:
- Recuperacion de cartera (pagos por cuotas de estudiantes)
- Cobros previos que no se reportaban en el grupo
- Consolidado real de ingresos vs. egresos (Oscar solo lo envio 2-3 veces en toda la relacion)

**Lo que necesitamos:**
- [ ] Recopilar TODAS las capturas de venta que Pedro tiene (376 fotos)
- [ ] Cruzar las capturas con los consolidados que Oscar SI envio
- [ ] Identificar meses donde NO hubo consolidado y estimar la diferencia
- [ ] Documentar que Pedro actuaba bajo presuncion de buena fe
- [ ] Solicitar en la demanda exhibicion de documentos contables de Oscar/ParetoMed/NETMED

## 2.2 Facturas Electronicas y su Contexto

**Facturas existentes:**
| Factura | Fecha | Concepto | Base gravable |
|---------|-------|----------|---------------|
| FE1 | ? | ? (no disponible) | ? |
| FE2 | ? | ? (no disponible) | ? |
| FE3 | 18/11/2024 | COMISION | $4.969.256 |
| FE4 | 16/12/2024 | COMISION | $6.970.807 |
| FE5 | 12/01/2025 | COMISION | $7.075.333 |

**Necesitamos:**
- [ ] Obtener FE1 y FE2 (si existen)
- [ ] Documentar que el concepto "COMISION" fue instruido por la contadora de Oscar
- [ ] Buscar en chats de WhatsApp la comunicacion donde Oscar o su contadora indicaron como facturar
- [ ] Preparar argumento: el mecanismo contable no define la naturaleza juridica de la relacion

**Contraargumento a preparar:**
La palabra "comision" fue un requerimiento contable/tributario, no una definicion juridica. Prueba:
1. Los pagos anteriores (mayo-septiembre 2024) se hicieron SIN factura, solo con cuentas de cobro
2. La facturacion inicio en noviembre 2024, 7 meses despues del inicio de la sociedad
3. El cambio a facturacion fue por requerimiento de la contadora de Oscar, no por voluntad de Pedro
4. En derecho tributario colombiano, "comision" es una categoria del IVA (Art. 420 E.T.), no una calificacion contractual

## 2.3 Rendicion de Cuentas del Socio Gestor

**Marco juridico:** Art. 504 C.Co. — Los socios de hecho tienen derechos y obligaciones reciprocos. El socio gestor debe rendir cuentas.

**Hechos a documentar:**
- [ ] Cuantas veces exactamente Oscar envio consolidados de ingresos/egresos
- [ ] Extraer esos consolidados de los chats de WhatsApp
- [ ] Documentar que Pedro tenia acceso a capturas de ventas NUEVAS pero NO a recuperacion de cartera
- [ ] Documentar que Pedro estimaba costos y confiaba en buena fe
- [ ] Argumentar que la falta de rendicion de cuentas sistematica es un incumplimiento de Oscar como socio gestor

## 2.4 Recuperacion de Cartera Oculta

**Problema:** La asesora Adriana solo reportaba ventas nuevas en el grupo. Las cuotas de estudiantes que pagaban a plazos y los cobros de cartera pendiente NO se reportaban. Esto significa que los ingresos reales del negocio podrian ser significativamente mayores que lo que Pedro podia verificar.

**Necesitamos:**
- [ ] Documentar este hecho en los HECHOS de la demanda
- [ ] Solicitar en la demanda exhibicion de estados de cuenta de la plataforma de pagos
- [ ] Solicitar extractos bancarios de las cuentas de Oscar donde recibia pagos de ParetoMed
- [ ] Peritaje contable para reconstruir los ingresos reales

## 2.5 Cuentas de Cobro Previas (Mayo-Septiembre 2024)

Las cuentas de cobro dicen "gestion de redes y campanas publicitarias paretomed_1".
Las facturas electronicas dicen "COMISION".
Ninguno dice "prestacion de servicios".

- [ ] Documentar la evolucion: primero cuentas de cobro informales, luego facturas por requerimiento contable
- [ ] Argumentar que ambos mecanismos fueron requeridos por Oscar, no elegidos por Pedro

---

# PARTE 3: PLAN DE EJECUCION CON INSTANCIAS PARALELAS DE CLAUDE

## Instancia 1: "FISCAL Y FINANCIERO"
**Objetivo:** Analizar todas las pruebas financieras, cruzar datos, identificar discrepancias

## Instancia 2: "HECHOS AMPLIADOS"  
**Objetivo:** Expandir los 14 hechos del borrador a 50+ hechos con citas exactas

## Instancia 3: "PROPIEDAD INTELECTUAL"
**Objetivo:** Desarrollar completamente el componente de PI y derechos de autor

## Instancia 4: "CONTRAARGUMENTOS Y DEBILIDADES"
**Objetivo:** Anticipar la estrategia de defensa de Oscar y preparar refutaciones

## Instancia 5: "PROCESAMIENTO DE 376 COMPROBANTES DE VENTA"
**Objetivo:** Extraer datos de las fotos de comprobantes para reconstruir ingresos

(Los prompts detallados para cada instancia estan en la seccion siguiente)

---

# PARTE 4: PROMPTS PARA INSTANCIAS PARALELAS DE CLAUDE

---

## PROMPT INSTANCIA 1: FISCAL Y FINANCIERO

```
CONTEXTO: Eres un asistente de investigacion legal especializado en derecho comercial y tributario colombiano. Estas ayudando a preparar una demanda de declaracion de existencia y liquidacion de sociedad comercial de hecho.

PARTES:
- Demandante: Pedro Jose Vergara Villanueva (CC 1.045.750.095), empresa Doctor Flight S.A.S. (NIT 901.767.877-2)
- Demandado: Oscar David Maldonado Badran (CC 1.129.573.046), negocio ParetoMed

SITUACION FINANCIERA:
Pedro recibia el 20% de las utilidades netas del negocio ParetoMed (educacion medica virtual). El total acreditado documentado asciende a $122.345.065 COP: 14 transferencias a la cuenta personal por $99.319.834 y pagos canalizados por Doctor Flight S.A.S. por $23.025.231 (mayo 2024 - agosto 2025).

DOCUMENTOS A TU DISPOSICION:
- Cuentas de cobro (mayo-septiembre 2024): concepto "gestion de redes y campanas publicitarias"
- Facturas electronicas FE3, FE4, FE5 (nov 2024 - ene 2025): concepto "COMISION"
- Comprobantes de transferencia bancaria (14 transferencias)
- Consolidados de Oscar (solo 2-3 durante toda la relacion)

PROBLEMAS QUE NECESITO QUE ANALICES:

1. Las facturas dicen "COMISION" como concepto. Fue a solicitud de la contadora de Oscar. Como argumentar que esto no define la relacion como prestacion de servicios sino que fue un mecanismo contable?

2. Oscar solo envio consolidados detallados de ingresos/egresos 2-3 veces en 16 meses. Pedro estimaba sus pagos basado en capturas de ventas nuevas compartidas en grupo de WhatsApp. La recuperacion de cartera y cobros de cuotas previas NO se reportaban. Como argumentar que los ingresos reales podrian ser mayores y que Oscar incumplio su deber de rendir cuentas?

3. Hay una discrepancia entre las cuentas de cobro (mayo-sept 2024), las facturas electronicas (nov 2024 - ene 2025) y las transferencias bancarias. Solo existen FE3-FE5, no FE1-FE2. Que implica esto?

4. Si Pedro recibio $99.3M como 20%, las utilidades netas serian aprox. $496.6M. Los ingresos brutos reportados fueron $709M. Esto implica costos de $212M (30%). Es razonable para un negocio digital?

PREGUNTAS QUE DEBES HACERME para completar tu analisis:
- Hazme al menos 15 preguntas especificas sobre: fechas de pago, como se calculaban los montos, quien decidia los egresos, acceso a cuentas bancarias, plataformas de pago, etc.
- No asumas nada que no este en los documentos
- Si necesitas que te muestre un documento especifico, pidelo
```

---

## PROMPT INSTANCIA 2: HECHOS AMPLIADOS

```
CONTEXTO: Eres un abogado litigante colombiano especializado en derecho comercial. Estas ayudando a expandir la seccion de HECHOS de una demanda verbal de mayor cuantia por declaracion de existencia y liquidacion de sociedad comercial de hecho.

DEMANDA ACTUAL: El borrador del abogado tiene solo 14 hechos basicos. Necesitamos expandirlos a 50+ hechos detallados, cada uno con referencia precisa a la prueba que lo soporta.

PARTES:
- Demandante: Pedro Jose Vergara Villanueva - socio industrial (aporto marketing, edicion audiovisual, estudio de grabacion, estrategia comercial)
- Demandado: Oscar David Maldonado Badran - socio capitalista (aporto producto base medico y capital inicial)
- Negocio: ParetoMed (educacion medica virtual, curso pregrabado)
- Periodo de sociedad: 15 abril 2024 - agosto 2025 (~16 meses)
- Pacto: 20% de utilidades netas + 20% de acciones para Pedro

ELEMENTOS QUE DEBO PROBAR (Art. 498 C.Co.):
1. Aportes reciprocos
2. Animo de lucro (animus lucrandi)
3. Animo de ser socios (affectio societatis)
4. Explotacion conjunta del negocio
5. Duracion en el tiempo

HECHOS CRITICOS A DESARROLLAR:
- Oscar ADMITIO en grabacion (14/08/2025): "nos llamabamos socios SI claramente"
- Oscar FIRMO carta de recomendacion nombrando a Pedro "Subdirector Academico y Comercial"
- Oscar ESCRIBIO que el 20% "no se justifican por una labor que es contratable"
- Se modifico unilateralmente el acuerdo de socios: "acciones" fue tachado y reemplazado por "utilidades"
- Oscar constituyo NETMED S.A.S. (15/10/2025) despues de la ruptura para canalizar activos
- Pedro registro 238 obras audiovisuales unicas en DNDA como autor/director/productor
- Facturas electronicas emitidas con concepto "COMISION" a solicitud de contadora de Oscar

PREGUNTAS QUE DEBES HACERME:
- Hazme al menos 20 preguntas especificas sobre los hechos para completar la seccion
- Preguntame sobre: como era el dia a dia del trabajo, quien tomaba decisiones, como se presentaban ante terceros, que pasaba en las reuniones, como se comunicaban, etc.
- Preguntame sobre detalles que un juez querria saber
- No asumas hechos - pregunta TODO lo que necesites para que los hechos sean precisos y verificables
```

---

## PROMPT INSTANCIA 3: PROPIEDAD INTELECTUAL

```
CONTEXTO: Eres un especialista en propiedad intelectual y derechos de autor en Colombia (Ley 23 de 1982, Decision Andina 351). Estas ayudando a desarrollar el componente de PI de una demanda.

SITUACION:
Pedro Jose Vergara Villanueva creo, edito, produjo y dirigio contenido audiovisual para el negocio ParetoMed (educacion medica virtual) durante 16 meses. Registro 238 obras unicas (476 registros) ante la DNDA como AUTOR, DIRECTOR y PRODUCTOR. Oscar David Maldonado Badran aparece solo como ARTISTA/INTERPRETE.

OBRAS:
- Videoclases medicas editadas por Pedro (Oscar era el interprete/presentador)
- Reels comerciales y educativos para Instagram (guion, edicion y produccion de Pedro)
- Videos comerciales (VSL, video introductorio de la plataforma)
- Material de marketing (campanas publicitarias)
- Guiones escritos (decenas de guiones comerciales y educativos)

HECHOS RELEVANTES:
1. El 29/08/2025 Pedro notifico formalmente la prohibicion de explotar sus obras
2. Oscar retiro el contenido de Instagram (reconociendo falta de titularidad) pero MANTUVO el material en Facebook
3. No existe contrato de cesion de derechos patrimoniales firmado
4. La relacion era una sociedad de hecho (no laboral ni de prestacion de servicios)
5. Pedro usaba su propio estudio de grabacion e infraestructura

PREGUNTAS QUE NECESITO QUE ME HAGAS:
- Preguntame al menos 15 cosas sobre: el proceso creativo, quien dirigia las grabaciones, quien elegia temas, quien editaba, que software usaba Pedro, donde se almacenaba el contenido, si hay evidencia del proceso de edicion (archivos de proyecto, capturas), como se subian los videos a la plataforma, etc.
- Preguntame sobre la Decision Andina 351 Art. 15 y la comunicacion publica no autorizada
- Preguntame sobre el registro DNDA: cuando se hizo, por que en esas fechas, que obras especificas
```

---

## PROMPT INSTANCIA 4: CONTRAARGUMENTOS Y DEBILIDADES

```
CONTEXTO: Eres un abogado defensor que representa a Oscar David Maldonado Badran. Tu trabajo es encontrar TODAS las debilidades del caso del demandante Pedro Jose Vergara Villanueva para que su equipo legal pueda preparar respuestas.

CASO DE PEDRO (demandante):
- Reclama existencia de sociedad comercial de hecho con Oscar para explotar ParetoMed
- Dice que aportaba industria (marketing, edicion, produccion audiovisual, estrategia)
- Pide 20% del patrimonio (~$240M COP) + 20% utilidades pendientes
- Registró 238 obras audiovisuales en DNDA como autor/director/productor
- Tiene grabacion de Oscar diciendo "nos llamabamos socios SI claramente"

EVIDENCIA QUE OSCAR PUEDE USAR EN CONTRA DE PEDRO:
1. Facturas electronicas FE3-FE5 emitidas por Doctor Flight S.A.S. con concepto "COMISION" (servicio)
2. Cuentas de cobro emitidas por Pedro con concepto "gestion de redes y campanas publicitarias"
3. Doctor Flight S.A.S. es una empresa independiente de Pedro que le facturaba a Oscar
4. Oscar tiene el registro de ParetoMed como establecimiento de comercio a su nombre (desde 05/04/2023, antes de Pedro)
5. El acuerdo de socios NUNCA se firmo
6. Pedro registro las obras en DNDA DESPUES de la ruptura (septiembre-octubre 2025)

PREGUNTAS QUE DEBES HACERME:
- Actua como abogado defensor de Oscar y hazme al menos 20 preguntas incomodas
- Preguntame sobre las cosas que podrian debilitar mi caso
- Preguntame sobre: por que Pedro facturo como "comision", por que acepto el mecanismo de pago informal, por que no exigio rendicion de cuentas, por que registro las obras post-ruptura, etc.
- Se agresivo y busca inconsistencias en mi relato
- Preguntame cosas que un juez de circuito experimentado preguntaria
```

---

# PARTE 5: ESTRATEGIA PARA LAS 376 FOTOS DE COMPROBANTES DE VENTA

## Opcion A: Procesamiento con Claude API (RECOMENDADA)
Usar la API de Anthropic con vision para leer cada imagen en batch:
- Costo estimado: ~$5-15 USD (376 imagenes con haiku)
- Se puede hacer un script Python que lea cada imagen, extraiga fecha, monto, nombre del estudiante
- Output: tabla Excel/CSV con todas las ventas

## Opcion B: Procesamiento con OCR dedicado
- Google Cloud Vision API o AWS Textract
- Mas barato para volumen, mas preciso en numeros
- Requiere configurar cuenta cloud

## Opcion C: Lectura manual en esta sesion
- Puedo leer las imagenes una por una, pero 376 imagenes consumirian todo el contexto
- NO recomendado

## Opcion D: Script hibrido
- Usar un script Python que pase las imagenes por la API de Claude en batch mode
- Cada imagen se procesa individualmente
- Los resultados se consolidan en un archivo

**RECOMENDACION:** Opcion A o D. Puedo escribir el script Python para ti.

---

# PARTE 6: DOCUMENTOS/PRUEBAS FALTANTES POR SOLICITAR

## En la demanda (exhibicion de documentos - Art. 265 CGP):
- [ ] Extractos bancarios de Oscar/ParetoMed (cuentas donde recibia pagos de estudiantes)
- [ ] Registros de la plataforma de pagos (Hotmart, PayU, o la que usaran)
- [ ] Contabilidad completa de ParetoMed y NETMED S.A.S.
- [ ] Declaraciones de renta de Oscar 2024-2025
- [ ] Historial de versiones del Google Doc del acuerdo de socios

## Que Pedro debe buscar/recopilar AHORA:
- [ ] FE1 y FE2 (si existen) - revisar en Alegra o en correo
- [ ] Chat donde Oscar o su contadora indicaron facturar como "COMISION"
- [ ] Los 2-3 consolidados de ingresos/egresos que Oscar SI envio (buscar en WhatsApp)
- [ ] Capturas donde Adriana reportaba ventas en el grupo
- [ ] Cualquier comunicacion sobre recuperacion de cartera
- [ ] Las 376 fotos de comprobantes de venta (para procesamiento)
- [ ] Archivos de proyecto de edicion de video (Premiere, Final Cut, etc.) como prueba del proceso creativo

---

# PARTE 7: CHECKLIST DE REVISION FINAL

Antes de entregar al abogado:
- [ ] Cada hecho tiene al menos una prueba documental que lo soporta
- [ ] Los montos del juramento estimatorio estan calculados y justificados
- [ ] Se incluyen las facturas FE3-FE5 con su contexto (solicitud de contadora)
- [ ] Se desarrolla el argumento de rendicion de cuentas incompleta
- [ ] Se menciona la recuperacion de cartera no reportada
- [ ] Se solicita exhibicion de documentos contables
- [ ] Se incluyen medidas cautelares (embargo preventivo, inscripcion de demanda)
- [ ] Se incluye peritaje contable como prueba solicitada
- [ ] Se revisan los hechos por posibles contradicciones internas
- [ ] Se verifica que no haya referencias a la app independiente de Pedro
