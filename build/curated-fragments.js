/**
 * CURATED FRAGMENTS — Mapeo manual exhaustivo de extractos por hecho
 * Cada hecho tiene sus citas textuales con fuente, documento y relevancia jurídica
 * Fuentes: HECHOS_DEMANDA, HANDOFF_FINAL, TRANSCRIPCIONES, CHATS
 * Última actualización: 08/04/2026
 */
const CURATED = {
  // ========== CAPITULO I: IDENTIFICACION ==========
  1: { extractos: [
    { cita: "DOCTOR FLIGHT S.A.S. (NIT 901.767.877-2)", fuente: "doc-camara-comercio-doctor-flight", relevancia: "Identificacion registral del vehiculo societario de Pedro soportada en el certificado de existencia y representacion legal — P-21" },
    { cita: "representante legal y controlante de la sociedad DOCTOR FLIGHT S.A.S.", fuente: "doc-camara-comercio-doctor-flight", relevancia: "Certificado de existencia y representación legal de Doctor Flight S.A.S. — P-21" }
  ]},
  2: { extractos: [
    { cita: "SERVICIOS EDUCATIVOS AUTOMATIZADOS MEDIANTE CLOUD COMPUTING", fuente: "doc-camara-comercio", relevancia: "Actividad economica registrada de ParetoMed en Camara de Comercio — P-20" },
    { cita: "ParetoMed (Matricula 865.875, registrado 05/04/2023, renovado 09/08/2025)", fuente: "doc-camara-comercio", relevancia: "Certificado mercantil que identifica a Oscar como titular del establecimiento comercial — P-20" }
  ]},
  3: { extractos: [
    { cita: "Nuestro programa esta compuesto por 14 modulos de temas clinicos, compuestos por videoclases y simulacros explicados que se encuentran en una plataforma virtual, ademas contamos con GRUPOS DE ESTUDIO y ACOMPANAMIENTO PERSONALIZADO", fuente: "chat-equipo", fecha: "08/06/2024", autor: "Oscar PARETOMED", relevancia: "Descripcion directa del producto ParetoMed por parte de Oscar ante el equipo comercial — coincide con la estructura expuesta en el hecho tercero" },
    { cita: "Nuestro programa esta disenado para que revises UN MODULO POR SEMANA de la siguiente manera: de lunes a viernes entras a la plataforma virtual en donde ves las videoclases y haces los simulacros", fuente: "chat-equipo", fecha: "08/06/2024", autor: "Oscar PARETOMED", relevancia: "Detalle operacional del programa: plataforma, videoclases, simulacros, grupo de estudio y retroalimentacion — soporte documental del modelo educativo descrito en el hecho tercero" }
  ]},

  // ========== CAPITULO II: ORIGEN Y FORMACION ==========
  4: { extractos: [
    { cita: "nos conocimos en el startup day uninorte, me presente con mi empresa Dr flight de turismo médico", fuente: "chat-oscar-pedro", fecha: "04/01/2024", autor: "Pedro Vergara", relevancia: "Primer contacto documentado entre las partes — origen del vínculo societario" },
    { cita: "Si te interesa sumarte al proyecto me avisas, siempre es bueno tener apoyo, a mi me ha tocado todo solo", fuente: "chat-oscar-pedro", fecha: "04/01/2024", autor: "Oscar Maldonado", relevancia: "Oscar invita a Pedro a sumarse al proyecto — voluntad inicial de asociarse" }
  ]},
  5: { extractos: [
    { cita: "Además si vamos a trabajar juntos como socios tengo que conocer todo el material a fondo", fuente: "chat-oscar-pedro", fecha: "10/01/2024", autor: "Pedro Vergara", relevancia: "Pedro usa la palabra 'socios' desde enero 2024 — affectio societatis original" },
    { cita: "miramos el tema de la sociedad, ¿qué opinas?", fuente: "chat-oscar-pedro", fecha: "10/01/2024", autor: "Oscar Maldonado", relevancia: "Oscar abre formalmente la puerta a la constitución de sociedad" }
  ]},
  6: { extractos: [
    { cita: "Vesting future stock a 30% Cliff 12 meses Consolidación trimestral", fuente: "chat-oscar-pedro", fecha: "06/02/2024", autor: "Pedro Vergara", relevancia: "Propuesta original de Pedro con 30% de acciones — incompatible con prestación de servicios" }
  ]},
  7: { extractos: [
    { cita: "Pedro propuso iniciar desde abril bajo un esquema del 20% de ingresos netos como resultado de la negociacion del 28/03/2024", cita_exacta: "Forma de trabajo 20% ingresos netos inicio desde abril", fuente: "chat-correcciones", fecha: "28/03/2024", autor: "Pedro Vergara", relevancia: "El mensaje documenta el punto de cierre de la reunion del 28/03/2024 — P-04. Prueba que el 20% fue el resultado de una negociacion expresa y no de una aceptacion pasiva" },
    { cita: "Oscar ya habia enviado una contrapropuesta escrita seis dias antes de esa reunion", cita_exacta: "Entonces revisa la contrapropuesta con calma y me avisas", fuente: "chat-oscar-pedro", fecha: "22/03/2024", autor: "Oscar Maldonado", relevancia: "La existencia de una contrapropuesta formal previa acredita que el porcentaje y las condiciones venian renegociandose desde marzo — P-02, P-53" }
  ]},
  8: { extractos: [
    { cita: "te presento a mi socio", cita_exacta: "Espérate, cómo, cómo te presenté yo con el man de alla de de coventus, le dije ey te presento a mi socios", fuente: "grabacion-llamada-oscar-250814", fecha: "14/08/2025", autor: "Oscar Maldonado", relevancia: "Confesión extrajudicial: presentación de Pedro como socio ante Coventus — P-01" }
  ]},
  9: { extractos: [
    { cita: "Subdirector Académico y Comercial de Paretomed", fuente: "doc-carta-recomendacion", fecha: "27/04/2024", autor: "Oscar Maldonado", relevancia: "Cargo directivo en carta de recomendación FIRMADA por Oscar — P-11. Un cargo de Subdirector es incompatible con simple prestación de servicios" }
  ]},

  // ========== CAPITULO III: APORTES RECIPROCOS ==========
  10: { extractos: [
    { cita: "No es el interes de las Partes constituir una persona juridica distinta de estas individualmente consideradas, ni una sociedad de hecho", fuente: "doc-contrato-cp", fecha: "22/08/2025", autor: "Oscar Maldonado", relevancia: "El Contrato de Cuentas en Participación reconoce implícitamente los aportes de Oscar al describir el objeto de la relación — P-14. Si Oscar no tuviera aportes, no habría nada que regular" },
    { cita: "estructura que tiene 90% de seguridad... tributaria", cita_exacta: "creamos al final alguna estructura que tiene 90% de digamos de de seguridad o de que o de que me resulte la vaina tributaria y no pagar tanto impuesto", fuente: "grabacion-llamada-oscar-250814", fecha: "14/08/2025", autor: "Oscar Maldonado", relevancia: "Oscar reconoce que él aportó el capital y la estructura legal del negocio, buscando optimizarla — P-01" }
  ]},
  11: { extractos: [
    { cita: "experiencia en manejo de redes, edicion de videos, redaccion de guiones, grabacion de videoclases, asesoria en creacion de contenido y marketing, gestion de cuentas, optimizacion del tunel de ventas", fuente: "doc-contrato-cp", fecha: "22/08/2025", autor: "Oscar Maldonado", relevancia: "Oscar RECONOCE TEXTUALMENTE los aportes de Pedro en el Contrato de Cuentas en Participación — P-14. Es un inventario de aportes industriales redactado por el propio demandado" }
  ]},
  12: { extractos: [
    { cita: "la clausula de no competencia", fuente: "chat-oscar-pedro", fecha: "13/01/2025", autor: "Oscar Maldonado", relevancia: "Oscar menciona la clausula de no competencia al discutir las herramientas tecnologicas aportadas por Pedro, incluido el Dashboard React del Hecho Decimosegundo — P-02" }
  ]},
  13: { extractos: [
    { cita: "Pensaba que tan factible es que lo hagamos en tu estudio para que se vea bien profesional", fuente: "chat-oscar-pedro", fecha: "12/04/2024", autor: "Oscar Maldonado", relevancia: "Oscar reconoce y solicita el uso del estudio de grabación profesional de Pedro como aporte al negocio — P-02" }
  ]},
  14: { extractos: [
    { cita: "SOP de Reunion 1:1 redactado por Pedro, 05/06/2024", fuente: "doc-sop-reunion", fecha: "05/06/2024", autor: "Pedro Vergara", relevancia: "Pedro diseña el procedimiento completo de onboarding de estudiantes — P-25. El diseño de SOPs es función propia de un socio o director, no de un contratista de marketing" },
    { cita: "La decision de abordar un modulo por semana surgio de una conversacion entre ambos", cita_exacta: "En cambio, si nosotros te propongo que sea los sábados, unificar el tema, digamos, de lo que pretendías que yo hiciera los domingos, unificarlo con el grupo de estudio y que sea una sola sesión los sábados, que puede ser de dos a tres horas y que nos turnemos, una la hago yo, otra la haces tú.", fuente: "transcripciones", fecha: "14/07/2025", autor: "Oscar Maldonado", relevancia: "Oscar reconoce que los SOPs metodológicos emergieron de decisiones conjuntas — P-34" }
  ]},
  15: { extractos: [
    { cita: "lo de las tutorias ha sido una excelente idea y te he dejado llevarlo como has querido", fuente: "chat-oscar-pedro", fecha: "11/04/2025", autor: "Oscar Maldonado", relevancia: "Oscar reconoce que Pedro introdujo mejoras sustanciales al programa — P-02. 'Dejar llevar' implica autonomía de socio, no obediencia de contratista" },
    { cita: "convertir el simulacro final que tu tenias en un simulacro pre, hacer el post justificado que nacio del grupo de estudio si fueron ideas mias que mejoraron", fuente: "chat-oscar-pedro", fecha: "12/07/2025", autor: "Pedro Vergara", relevancia: "Pedro reivindica aportes metodológicos clave que transformaron el curso en programa — P-02" },
    { cita: "Si reconozco.", fuente: "chat-oscar-pedro", fecha: "12/07/2025", autor: "Oscar Maldonado", relevancia: "Oscar confirma con dos palabras que los aportes metodológicos de Pedro son reales y significativos — P-02" }
  ]},
  16: { extractos: [
    { cita: "guiones comerciales completos para campanas de captacion del Q1 2025", fuente: "doc-reels-guiones", fecha: "2025", autor: "Pedro Vergara", relevancia: "Pedro produce el contenido comercial del negocio — P-28 a P-32. La producción masiva de guiones es incompatible con prestación ocasional de servicios" },
    { cita: "Oscar trate de editarlo pa que lo subieras ahorita y no me gusto el capcut de movil no tiene buenas funciones", fuente: "chat-oscar-pedro", fecha: "23/03/2024", autor: "Pedro Vergara", relevancia: "Pedro asume el control de calidad de las ediciones del negocio desde el inicio — P-02" },
    { cita: "ya estan creados los canales de YouTube y tiktok", fuente: "chat-oscar-pedro", fecha: "01/04/2024", autor: "Pedro Vergara", relevancia: "Pedro ejecuta la creación de infraestructura digital del negocio — P-02" }
  ]},
  17: { extractos: [
    { cita: "que Efrain se dedique 100% a eso y entre el y yo se podemos sacarlo adelante", fuente: "chat-oscar-pedro", fecha: "04/11/2024", autor: "Pedro Vergara", relevancia: "Pedro ofrece recurso humano propio al negocio — aporte en industria propio de socio, no de contratista" },
    { cita: "Hey, recuerdame el correo de Efrain para enviar la animacion tambien alli", fuente: "chat-oscar-pedro", fecha: "22/11/2024", autor: "Oscar Maldonado", relevancia: "Oscar interactúa directamente con empleado de Pedro — asume al trabajador como recurso del negocio compartido" },
    { cita: "si es con Efrain en lo posible nos quede mas barato que 1,5", fuente: "chat-oscar-pedro", fecha: "04/11/2024", autor: "Oscar Maldonado", relevancia: "Oscar negocia el costo del empleado de Pedro para el negocio conjunto — reconoce el aporte de industria" },
    { cita: "se lo deje a Paul para que aprendiera a hacerlo", fuente: "chat-oscar-pedro", fecha: "18/03/2025", autor: "Pedro Vergara", relevancia: "Pedro asigna segundo empleado propio al negocio — duplica el aporte en industria" },
    { cita: "Te esta escribiendo Paul... Para seguir subiendo a YouTube y tiktok estamos bloqueados", fuente: "chat-oscar-pedro", fecha: "13/08/2025", autor: "Pedro Vergara", relevancia: "Paul gestiona accesos directamente con Oscar — trabajador de Pedro integrado como recurso del negocio" }
  ]},
  "hecho-18-canales": { extractos: [
    { cita: "Crear cuentas @paretomed para titk tok y youtube y facebook", fuente: "chat-oscar-pedro", fecha: "28/03/2024", autor: "Pedro Vergara", relevancia: "Pedro propone y crea los canales digitales del negocio — acto fundacional propio de socio" },
    { cita: "Crea el canal de YouTube con esta cuenta", fuente: "chat-oscar-pedro", fecha: "29/03/2024", autor: "Oscar Maldonado", relevancia: "Oscar entrega credenciales institucionales a Pedro para crear infraestructura digital" },
    { cita: "ya estan creados los canales de YouTube y tiktok", fuente: "chat-oscar-pedro", fecha: "01/04/2024", autor: "Pedro Vergara", relevancia: "Pedro confirma creación de canales — infraestructura digital del negocio construida por el demandante" }
  ]},
  "hecho-18": { extractos: [
    { cita: "Ingresos: 10,889,303. Egresos: 3,872,653. Ganancia: 7,016,650. Porcentaje de Pedro: 7,016,650 x 0,20 = 1,403,330", fuente: "chat-oscar-pedro", fecha: "07/05/2024", autor: "Oscar Maldonado", relevancia: "Primera liquidación: Oscar calcula el 20% sobre GANANCIA NETA — fórmula de utilidades de socio, no honorarios de servicios — P-13" }
  ]},
  "hecho-19-capcut": { extractos: [
    { cita: "los que aprendi fueron Da Vinci Resolve y Capcut para escritorio", fuente: "chat-oscar-pedro", fecha: "04/01/2024", autor: "Oscar Maldonado", relevancia: "Oscar reconoce conocimiento superior de Pedro en edición audiovisual desde el inicio" },
    { cita: "Da vinci resolve es muy bueno pero siento que para empezar es muy complicado, capcut de escritorio es mas amigable", fuente: "chat-oscar-pedro", fecha: "04/01/2024", autor: "Pedro Vergara", relevancia: "Pedro asesora a Oscar en herramientas de edición — rol de dirección, no ejecución subordinada" },
    { cita: "Oscar trate de editarlo pa que lo subieras ahorita y no me gusto el capcut de movil no tiene buenas funciones para mejorar el audio y los subtitulos", fuente: "chat-oscar-pedro", fecha: "23/03/2024", autor: "Pedro Vergara", relevancia: "Pedro asume control de calidad de ediciones — liderazgo técnico propio de socio" }
  ]},
  "hecho-19": { extractos: [
    { cita: "14 transferencias bancarias de la cuenta de OSCAR MALDONADO a la cuenta Bancolombia 4483 de Pedro Vergara, por un subtotal personal de $99.319.834 COP", fuente: "doc-pagos-bancolombia", fecha: "mayo 2024 - agosto 2025", autor: "Oscar Maldonado", relevancia: "Subtotal de transferencias a la cuenta personal de Pedro; con los pagos via Doctor Flight el total acreditado asciende a $122.345.065" },
    { cita: "31/12/2024 | $8.413.000 | Diciembre 2024 (pago adelantado)", fuente: "doc-pagos-bancolombia", relevancia: "Comprobante bancario de transferencia de diciembre 2024 como parte del total de 14 pagos documentados — P-36" }
  ]},
  "hecho-20-dnda": { extractos: [
    { cita: "238 obras audiovisuales unicas, 476 registros", fuente: "doc-certificado-dnda", fecha: "28/10/2025", autor: "DNDA", relevancia: "Certificado DNDA: 238 obras registradas por Pedro como AUTOR, DIRECTOR y PRODUCTOR — P-22, P-23. Oscar solo aparece como ARTISTA/INTERPRETE/EJECUTANTE, nunca como autor" },
    { cita: "si tu desarrollas una aplicacion, tu eres socio para esto... papi, tu lo desarrollaste siendo socio de ParetoMed", cita_exacta: "Papi, tú lo desarrollaste siendo socio de ParetoMed, ya, con material de ParetoMed, enfocado para exámenes de residencia y lo probaste con usuarios de ParetoMed, yo creo que ahí no hay cabida, no hay duda sobre cuál es el propósito de esa aplicación.", fuente: "transcripciones", fecha: "13/07/2025", autor: "Oscar Maldonado", relevancia: "Oscar reconoce que las obras creadas por Pedro son de ParetoMed — confesión que confirma el carácter societario del aporte intelectual — P-50" }
  ]},
  "hecho-20": { extractos: [
    { cita: "Variabilidad extrema de pagos: desde $100.000 hasta $16.726.760", fuente: "doc-pagos-bancolombia", relevancia: "Las capturas SMS Bancolombia documentan variabilidad extrema de los pagos, incompatible con honorarios fijos y compatible con utilidades variables — P-36" },
    { cita: "la rentabilidad de este mes fue 83,633,800", fuente: "chat-oscar-pedro", fecha: "05/02/2025", autor: "Oscar Maldonado", relevancia: "Oscar vincula el pago mensual al resultado economico del negocio, no a una tarifa estable de servicios" }
  ]},

  // ========== CAPITULO IV: REPARTO DE UTILIDADES ==========
  // Nota: numeración interna consolidada con la de hechos adicionales
  21: { extractos: [
    { cita: "O sea de que estamos trabajando juntos comercializando un proyecto y que nos llamabamos socios SI claramente claramente", cita_exacta: "O sea de que de que estamos trabando juntos comercializando un proyecto y que nos llamábamos socios SI claramente claramente.", fuente: "grabacion-llamada-oscar-250814", fecha: "14/08/2025", autor: "Oscar Maldonado", relevancia: "CONFESIÓN EXTRAJUDICIAL DIRECTA: Oscar admite la sociedad en grabación telefónica — P-01. La palabra 'claramente' repetida dos veces refuerza la voluntariedad y conciencia de la admisión" },
    { cita: "como te presente yo con el man de alla de Coventus, le dije ey te presento a mi socio", cita_exacta: "Espérate, cómo, cómo te presenté yo con el man de alla de de coventus, le dije ey te presento a mi socios", fuente: "grabacion-llamada-oscar-250814", fecha: "14/08/2025", autor: "Oscar Maldonado", relevancia: "Oscar admite conducta societaria ante terceros — P-01. Presentar a alguien como 'socio' públicamente es reconocimiento inequívoco de affectio societatis" }
  ]},
  22: { extractos: [
    { cita: "si claramente estaba implicito que tu ibas a formar parte de la SAS. eso yo no te lo niego en ningun momento claramente", fuente: "grabacion-llamada-oscar-250814", fecha: "14/08/2025", autor: "Oscar Maldonado", relevancia: "CONFESIÓN: Oscar reconoce pacto de acciones en la SAS — P-01. 'No lo niego en ningún momento' elimina cualquier defensa de negativa" },
    { cita: "yo quiero honrar el acuerdo contigo... los abogados y contadores me dijeron, ey... si que sociedad de hecho con el man, pero tu puedes cortarlo", cita_exacta: "sas va a ser dueña de paretomed, o sea, yo se la voy a licenciar. pero que pasa ey yo quiero honrar el acuerdo contigo, entonces yo lo hablé con la con la abogada y aquí entre nosotros a mí los abogados y contadores me dijeron, ey, pero tú puedes, sí que sociedad de hecho con el man no puedes cortarlo.", fuente: "grabacion-llamada-oscar-250814", fecha: "14/08/2025", autor: "Oscar Maldonado", relevancia: "DEVASTADOR: Los propios asesores de Oscar confirmaron la sociedad de hecho — P-01. Si sus abogados y contadores lo reconocieron, el demandado no puede negarlo en juicio" }
  ]},
  23: { extractos: [
    { cita: "tenemos que reunirnos para que hablemos bien de las condiciones que necesito para que legalicemos la cosa", fuente: "chat-oscar-pedro", fecha: "01/07/2024", autor: "Oscar Maldonado", relevancia: "Oscar manifiesta voluntad de FORMALIZAR lo que ya existe — solo se legaliza algo que ya opera de hecho" },
    { cita: "le pedi a mi papa que es abogado que le pegara una revisada... tu sabes que yo voy pa' lante con la sociedad", fuente: "chat-oscar-pedro", fecha: "28/11/2024", autor: "Oscar Maldonado", relevancia: "Oscar involucra abogado familiar para revisar la sociedad — reconoce su existencia al buscar asesoría" },
    { cita: "lo que vamos a hacer es constituir la SAS y ahi iriamos como socios", fuente: "chat-oscar-pedro", fecha: "13/01/2025", autor: "Oscar Maldonado", relevancia: "Oscar propone formalizar como SAS con Pedro — confirma que ya son socios de hecho" }
  ]},
  24: { extractos: [
    { cita: "yo soy socio, no trabajador tuyo... si quieres un vale que haga todo lo que tu digas... vas a tener que contratarlo", fuente: "chat-oscar-pedro", fecha: "18/07/2025", autor: "Pedro Vergara", relevancia: "Pedro reivindica su calidad de socio y rechaza la subordinación — P-02" },
    { cita: "no deberias poder tomar decisiones sin compartirmelas y recibir mi opinion antes, porque para algo es una sociedad", fuente: "chat-oscar-pedro", fecha: "23/07/2025", autor: "Pedro Vergara", relevancia: "Pedro exige derechos de socio. Clave: Oscar NO niega la calidad de socio en su respuesta — reconocimiento tácito por omisión — P-02" }
  ]},
  25: { extractos: [
    { cita: "20% de las utilidades no se justifican por una labor que es contratable. La idea, como se planteo en las discusiones verbales iniciales, es que ademas trabaje para impulsar con nuevas ideas y trabajar DE LLENO en esta", fuente: "doc-acuerdo-aportes", fecha: "julio 2024", autor: "Oscar Maldonado", relevancia: "NOTA MANUSCRITA DE OSCAR: reconoce que el 20% no es por servicios contratables — destruye la defensa de prestación de servicios — P-09" },
    { cita: "Recordar lo que propuse en el acuerdo inicial e informal donde especificaba: Funciones que Pedro considere necesarias para el crecimiento de la empresa", fuente: "doc-acuerdo-aportes", fecha: "julio 2024", autor: "Oscar Maldonado", relevancia: "Oscar admite que EXISTIÓ un acuerdo verbal previo ('inicial e informal') — el pacto constitutivo de la sociedad de hecho — P-09" },
    { cita: "las ideas, vision, estrategia y trabajo para el crecimiento de la empresa son las que justifican la participacion accionaria", fuente: "doc-acuerdo-aportes", fecha: "julio 2024", autor: "Oscar Maldonado", relevancia: "Oscar justifica la participación de Pedro como ACCIONARIA, no como honorarios — P-09" }
  ]},

  // ========== CAPITULO VI: EXPLOTACION CONJUNTA ==========
  26: { extractos: [
    { cita: "uds me diran como la ven", fuente: "chat-equipo", fecha: "21/03/2025", autor: "Adriana", relevancia: "Tercero (asesora Adriana) consulta a AMBOS como co-decisores — P-03. El plural 'uds' implica que tanto Oscar como Pedro tenían autoridad decisoria" },
    { cita: "Entonces dejalo en 2,850,000", fuente: "chat-oscar-pedro", fecha: "17/07/2025", autor: "Oscar Maldonado", relevancia: "Oscar y Pedro co-determinan precios del programa — decisión estratégica exclusiva de socios, nunca de contratistas — P-02" },
    { cita: "evaluo el desempeno de la asesora de ventas Adriana y propuso su reemplazo", fuente: "chat-oscar-pedro", fecha: "mayo-julio 2025", autor: "Pedro Vergara", relevancia: "Pedro evalúa y decide sobre el personal del negocio — función directiva propia de socio — P-02, P-34" }
  ]},
  27: { extractos: [
    { cita: "Entrena asesora, propone nuevo vendedor y revisa el proceso comercial", fuente: "chat-oscar-pedro", fecha: "11/06/2025", autor: "Pedro Vergara", relevancia: "Pedro participa en decisiones comerciales y de personal dentro del negocio — P-02, P-34" },
    { cita: "Evalua modelo hibrido con consultor externo como co-decisor", fuente: "chat-equipo", fecha: "27/06/2025", autor: "Pedro Vergara", relevancia: "Pedro participa como co-decisor en evaluación del modelo de negocio con consultores externos — P-03, P-34" }
  ]},
  28: { extractos: [
    { cita: "$108.456.900 en ventas a fecha de hoy", fuente: "chat-equipo", fecha: "nov 2024", autor: "Oscar Maldonado", relevancia: "Oscar anuncia récord de ventas al equipo — ingresos reales del negocio documentados — P-03" }
  ]},

  // ========== CAPITULO VII: DURACION ==========
  29: { extractos: [
    { cita: "pilas con el acuerdo que estamos demorados", fuente: "chat-oscar-pedro", fecha: "03/01/2025", autor: "Pedro Vergara", relevancia: "Pedro documenta la demora de Oscar en formalizar — la sociedad llevaba meses operando sin firma — P-02" },
    { cita: "Ya ha pasado buen tiempo compadre... el objetivo desde un principio no era solo % de ganancia neta sino acciones en la empresa", fuente: "chat-oscar-pedro", fecha: "08/01/2025", autor: "Pedro Vergara", relevancia: "Pedro reitera el plazo transcurrido y reclama acciones — 9 meses de operación sin formalizar — P-02" }
  ]},

  // ========== CAPITULO VIII: INTENTOS FORMALIZACION Y MALA FE ==========
  30: { extractos: [
    { cita: "pilas con el acuerdo que estamos demorados", fuente: "chat-oscar-pedro", fecha: "03/01/2025", autor: "Pedro Vergara", relevancia: "Pedro presiona sistemáticamente para formalizar — la demora es atribuible exclusivamente a Oscar" },
    { cita: "Ya ha pasado buen tiempo compadre... el objetivo desde un principio no era solo % de ganancia neta sino acciones en la empresa", fuente: "chat-oscar-pedro", fecha: "08/01/2025", autor: "Pedro Vergara", relevancia: "Pedro reclama acciones (no solo utilidades) — coherente con el pacto original del 30% en vesting" },
    { cita: "no vayas a pensar que te estoy mamando gallo", fuente: "chat-oscar-pedro", fecha: "28/11/2024", autor: "Oscar Maldonado", relevancia: "Oscar reconoce la demora y pide paciencia — no niega la obligación de formalizar" },
    { cita: "Pedro compartio el borrador colaborativo para revision y comentarios mutuos desde julio de 2024", cita_exacta: "pd ya tengo el borrador del acuerdo, puedes irlo revisando modificando y cuando ambos estemos satisfechos lo discutimos", fuente: "chat-oscar-pedro", fecha: "24/07/2024", autor: "Pedro Vergara", relevancia: "El acuerdo ya circulaba como documento editable entre ambos antes de la version SAS y de la Nueva Version — P-02" }
  ]},
  31: { extractos: [
    { cita: "20% de las acciones", fuente: "doc-acuerdo-original", fecha: "inicios 2024", autor: "Pedro Vergara / Oscar Maldonado", relevancia: "El borrador original del Acuerdo de Socios establecía 20% de ACCIONES — P-06. La alteración posterior a 'utilidades' es evidencia de mala fe" },
    { cita: "Oscar remitio una contrapropuesta formal a Pedro el 22/03/2024", cita_exacta: "Entonces revisa la contrapropuesta con calma y me avisas", fuente: "chat-oscar-pedro", fecha: "22/03/2024", autor: "Oscar Maldonado", relevancia: "La negociación societaria produjo un borrador intermedio enviado por Oscar antes del acuerdo operativo de marzo — P-02, P-53" },
    { cita: "Pedro tendra una participacion del 20% de las acciones de la empresa a partir de la firma de este acuerdo.", fuente: "doc-acuerdo-sas", fecha: "29/11/2024", autor: "Padre de Oscar Maldonado", relevancia: "El Acuerdo SAS del padre de Oscar mantuvo el 20% accionario y un esquema robusto de proteccion societaria — P-08, P-54" },
    { cita: "Pedro tendra un asiento en la Junta Directiva y participara en todas las decisiones relevantes, pero bajo mayoria cualificada del 75%", cita_exacta: "Pedro tendrá un asiento en la Junta Directiva", fuente: "doc-propuesta-oscar-abr25", fecha: "08/04/2025", autor: "Oscar Maldonado", relevancia: "La 'Nueva Version' de abril de 2025 seguia reconociendo a Pedro como socio con 20% accionario, aunque reforzaba el control mayoritario de Oscar — P-55" }
  ]},
  32: { extractos: [
    { cita: "le tachaste acciones por utilidades, creo que no hay evidencia mas clara que eso... a ojo inexperto no tiene ninguna caracteristica de buena fe", fuente: "chat-oscar-pedro", fecha: "agosto 2025", autor: "Pedro Vergara", relevancia: "Pedro descubre y denuncia la alteración documental — P-06, P-07" },
    { cita: "Compa, y de esto no fue mala intencion. Simplemente es un borrador que nunca se firmo", fuente: "chat-oscar-pedro", fecha: "agosto 2025", autor: "Oscar Maldonado", relevancia: "Oscar admite la alteración pero la minimiza — el hecho de admitirla destruye la defensa de que el borrador nunca existió" },
    { cita: "acciones de una sociedad que gestiona un bien, en este caso es igual a utilidades", fuente: "chat-oscar-pedro", fecha: "agosto 2025", autor: "Oscar Maldonado", relevancia: "Oscar intenta equiparar acciones con utilidades — argumento internamente contradictorio: si fueran lo mismo, no habría necesidad de cambiar el texto" }
  ]},
  33: { extractos: [
    { cita: "No es el interes de las Partes constituir una persona juridica distinta de estas individualmente consideradas, ni una sociedad de hecho", fuente: "doc-contrato-cp", fecha: "22/08/2025", autor: "Oscar Maldonado", relevancia: "El Contrato de Cuentas en Participación NIEGA expresamente la sociedad de hecho — P-14. Regla lógica: solo se niega lo que existe. Si no hubiera sociedad, esta cláusula sería innecesaria" }
  ]},

  // ========== CAPITULO IX: RUPTURA ==========
  34: { extractos: [
    { cita: "O sea de que estamos trabajando juntos comercializando un proyecto y que nos llamabamos socios SI claramente claramente", cita_exacta: "O sea de que de que estamos trabando juntos comercializando un proyecto y que nos llamábamos socios SI claramente claramente.", fuente: "grabacion-llamada-oscar-250814", fecha: "14/08/2025", autor: "Oscar Maldonado", relevancia: "En la fecha exacta de la ruptura, Oscar admite la sociedad en grabación — P-01. La confesión ocurre DESPUÉS de descubrir la alteración documental, en contexto de confrontación" },
    { cita: "los abogados y contadores me dijeron, ey... si que sociedad de hecho con el man, pero tu puedes cortarlo", cita_exacta: "sas va a ser dueña de paretomed, o sea, yo se la voy a licenciar. pero que pasa ey yo quiero honrar el acuerdo contigo, entonces yo lo hablé con la con la abogada y aquí entre nosotros a mí los abogados y contadores me dijeron, ey, pero tú puedes, sí que sociedad de hecho con el man no puedes cortarlo.", fuente: "grabacion-llamada-oscar-250814", fecha: "14/08/2025", autor: "Oscar Maldonado", relevancia: "Oscar revela que buscó asesoría legal para 'cortar' la sociedad — el acto de buscar cómo terminarla confirma que existía — P-01" }
  ]},
  35: { extractos: [
    { cita: "se abstenga de continuar con la explotacion de los activos intangibles incluyendo pero no limitandose a metodos, contenido estatico, propiedad intelectual, videoclases, reels, videos comerciales", fuente: "chat-oscar-pedro", fecha: "29/08/2025", autor: "Pedro Vergara", relevancia: "Notificación formal de cese de explotación — P-18. Enuncia los activos aportados por Pedro que Oscar no puede usar unilateralmente" }
  ]},

  // ========== CAPITULO X: OFERTAS TRANSACCION ==========
  36: { extractos: [
    { cita: "suma transaccional", fuente: "doc-transaccion-oscar", fecha: "12/09/2025", autor: "Oscar Maldonado", relevancia: "Oscar ofrece $40M como 'suma transaccional' — P-15. Monto equivale al 3.3% del patrimonio estimado de $1,200M. La oferta ridícula confirma que Oscar reconocía la deuda pero quería liquidarla a precio mínimo" },
    { cita: "toda la propiedad intelectual le pertenecia exclusivamente", fuente: "doc-transaccion-oscar", fecha: "12/09/2025", autor: "Oscar Maldonado", relevancia: "Oscar intenta en la transacción adquirir toda la PI por $40M — demuestra que sin acuerdo, la PI de Pedro es el activo en disputa — P-15" }
  ]},
  37: { extractos: [
    { cita: "relacion contractual cuyo objeto consistio en la explotacion economica conjunta del Programa", fuente: "doc-transaccion-pedro", fecha: "14/10/2025", autor: "Pedro Vergara", relevancia: "La contrapropuesta de Pedro reconoce expresamente la explotación económica conjunta — P-16. Es la posición pública del demandante en el contexto transaccional" },
    { cita: "tomar decisiones conjuntas", fuente: "doc-transaccion-pedro", fecha: "14/10/2025", autor: "Pedro Vergara", relevancia: "La contrapropuesta describe el derecho a 'tomar decisiones conjuntas' con distribución 80/20 — lenguaje societario — P-16" }
  ]},
  38: { extractos: [
    { cita: "suma transaccional de CUARENTA MILLONES DE PESOS", fuente: "doc-transaccion-oscar", fecha: "10/09/2025", autor: "Oscar Maldonado", relevancia: "Oferta de $40M documenta la brecha insalvable frente a la pretensión de $300M — P-15, P-16, P-17. La diferencia hizo imposible el acuerdo extrajudicial" }
  ]},

  // ========== CAPITULO XI: ACTOS POST-RUPTURA ==========
  39: { extractos: [
    { cita: "yo quiero honrar el acuerdo contigo... los abogados y contadores me dijeron... sociedad de hecho con el man no puedes cortarlo... presenteme una forma en que yo pueda mantenerme con el pero tambien pueda crear lo otro", cita_exacta: "pero dije eche yo quiero honrar el acuerdo con el man presenteme una forma en que yo pueda mantenerme con él, pero también pueda crear lo otro que tengo pensado que me sirve más", fuente: "grabacion-llamada-oscar-250814", fecha: "14/08/2025", autor: "Oscar Maldonado", relevancia: "Oscar revela en la grabación que NETMED fue el 'vehículo' que sus asesores le propusieron para escapar de la sociedad con Pedro — P-01. Confesión directa del propósito fraudulento" },
    { cita: "la vamos a presentar como una empresa de cloud hosting... ya no va a ser una empresa educativa", cita_exacta: "10% de riesgo legal y es que la vamos a presentar como una empresa de cloud hosting si me entiendo? Ya no va a ser una empresa educativa, ni siquiera y ahi no pago tanto impuesto", fuente: "grabacion-llamada-oscar-250814", fecha: "14/08/2025", autor: "Oscar Maldonado", relevancia: "Oscar admite en grabación la migración de ParetoMed a NETMED con reclasificación fiscal — P-01, P-52. Transferencia unilateral de activos de la sociedad de hecho" }
  ]},
  40: { extractos: [
    { cita: "activos vinculados declarados de $20.000.000 COP", fuente: "doc-camara-comercio", fecha: "17/08/2025", autor: "Cámara de Comercio", relevancia: "ParetoMed declara activos de solo $20M ante Cámara de Comercio — P-20. Contrasta con ingresos reales de $709M en 15 meses. Subvaloración manifiesta que perjudica la liquidación de la sociedad" },
    { cita: "ParetoMed (Matricula 865.875, registrado 05/04/2023, renovado 09/08/2025)", fuente: "doc-camara-comercio", fecha: "09/08/2025", autor: "Cámara de Comercio", relevancia: "Renovación unilateral de matrícula mercantil en plena crisis societaria — P-20. Un establecimiento compartido no puede renovarse sin el consentimiento del socio" }
  ]},

  // ========== CAPITULO XII: CONCILIACION ==========
  41: { extractos: [
    { cita: "solicitud de conciliacion N 013-2026 ante el Centro de Conciliacion de la Corporacion Lonja de Propiedad Raiz de Barranquilla", fuente: "doc-constancia-conciliacion", fecha: "11/02/2026", autor: "Pedro Vergara", relevancia: "Agotamiento del requisito de procedibilidad — P-19. Primer acto procesal formal del caso" }
  ]},
  42: { extractos: [
    { cita: "CONSTANCIA DE NO CONCILIACION N 00-1844", fuente: "doc-constancia-conciliacion", fecha: "20/02/2026", autor: "Francisco Daniel Ramírez Carreño, Conciliador", relevancia: "Constancia oficial: las partes no llegaron a acuerdo — P-19. Habilita la vía judicial. Conciliador registrado: T.P. 30.770" }
  ]},

  // ========== CAPITULO XIII: CUANTIA ==========
  43: { extractos: [
    { cita: "$108.456.900 en ventas a fecha de hoy", fuente: "chat-equipo", fecha: "nov 2024", autor: "Oscar Maldonado", relevancia: "Oscar anuncia ingresos de $108M en UN SOLO MES — P-03. Anchoring para la valoración de $1,200M: un mes pico a 47.2M promedio × 19 meses = $897M solo en fondo de comercio" },
    { cita: "ya estan creados los canales de YouTube y tiktok", fuente: "chat-oscar-pedro", fecha: "01/04/2024", autor: "Pedro Vergara", relevancia: "Pedro creó los canales digitales del negocio (YouTube, TikTok, Instagram) — P-27. La cuenta @Paretomed1 es un activo intangible de la sociedad de hecho construido por Pedro" }
  ]},
  44: { extractos: [
    { cita: "20% de las utilidades no se justifican por una labor que es contratable", fuente: "doc-acuerdo-aportes", fecha: "julio 2024", autor: "Oscar Maldonado", relevancia: "El propio Oscar justifica que el 20% es participación accionaria — P-09. Esto da base para calcular $240M como el 20% de un negocio valuado en $1,200M" },
    { cita: "las ideas, vision, estrategia y trabajo para el crecimiento de la empresa son las que justifican la participacion accionaria", fuente: "doc-acuerdo-aportes", fecha: "julio 2024", autor: "Oscar Maldonado", relevancia: "Oscar justifica el 20% como participación accionaria — P-09. Base para calcular la pretensión de $240M como 20% del patrimonio estimado en $1,200M — P-17" }
  ]},
  45: { extractos: [
    { cita: "agosto 2025: $52.790.000; septiembre 2025: $52.640.800; octubre 2025: $64.057.500. Total periodo post-ruptura: $169.488.300 COP", fuente: "doc-kpis-2025", fecha: "2025", autor: "Oscar Maldonado", relevancia: "KPIs propios del demandado documentan ingresos post-ruptura — P-43. Las utilidades de estos meses ($22M al 20% con 65% de margen) no fueron pagadas a Pedro" },
    { cita: "noviembre: $84.102.500; diciembre: $46.050.000", fuente: "doc-kpis-2025", fecha: "2025", autor: "Oscar Maldonado", relevancia: "KPIs propios de Oscar documentan que ParetoMed sigue generando ~$50M mensuales post-ruptura con la metodología co-desarrollada — P-43. El enriquecimiento continúa" }
  ]},
  46: { extractos: [
    { cita: "14 transferencias bancarias de la cuenta de OSCAR MALDONADO a la cuenta Bancolombia 4483 de Pedro Vergara, por un subtotal personal de $99.319.834 COP", fuente: "doc-pagos-bancolombia", fecha: "mayo 2024 - agosto 2025", autor: "Oscar Maldonado", relevancia: "Las 14 transferencias por SMS acreditan el subtotal personal; al sumar Doctor Flight el total recibido por Pedro asciende a $122.345.065 y se refuerza la variabilidad propia de utilidades" }
  ]},

  // ========== CAPITULO XIV: HECHOS ADICIONALES ==========
  47: { extractos: [
    { cita: "yo siempre he visto el tema de la firma como una mera formalidad. O sea yo pensaba que ya todo ese tema estaba hablado", fuente: "transcripciones", fecha: "08/01/2025", autor: "Oscar Maldonado", relevancia: "CONFESIÓN: La firma era formalidad, la sociedad YA existía — P-05, P-41. El documento es innecesario cuando el pacto ya está perfeccionado" },
    { cita: "para mi el afirme es mas como un formalismo, ¿no? Listo", fuente: "transcripciones", fecha: "08/01/2025", autor: "Oscar Maldonado", relevancia: "Oscar reitera que la firma es mera formalidad — P-41. Confirma que la sociedad existe independientemente de la firma del documento" },
    { cita: "yo necesitaria tener a alguien que tenga pertenencia, ¿si? No alguien contratado, sino alguien que sepa que eso es suyo tambien y que este pendiente de todo", fuente: "transcripciones", fecha: "08/01/2025", autor: "Oscar Maldonado", relevancia: "CONFESIÓN DEVASTADORA: Oscar distingue explícitamente entre 'alguien contratado' y 'alguien que sepa que eso es suyo' — P-41. Describe exactamente la relación de socio que tenía con Pedro" },
    { cita: "mi plan es para que ya en 2026 yo comenzare el fellow. Entonces, ahi yo necesitaria tener a alguien... coordinando todo", fuente: "transcripciones", fecha: "08/01/2025", autor: "Oscar Maldonado", relevancia: "Oscar reveló dependencia permanente de Pedro como socio operativo — P-41. El negocio no era viable sin Pedro como co-director" }
  ]},
  48: { extractos: [
    { cita: "en los egresos de julio no meti el pago de Lina ni Kendy. Fresco que vamos a dejar asi, yo cargo con eso", fuente: "chat-oscar-pedro", fecha: "07/08/2025", autor: "Oscar Maldonado", relevancia: "Error contable revela que ambos calculaban utilidades conjuntamente — los egresos se deducían antes del cálculo del 20% de Pedro" },
    { cita: "Yo puedo devolverte los 500 o dartelos como credito en algun servicio aparte que favorezca a Paretomed", fuente: "chat-oscar-pedro", fecha: "07/08/2025", autor: "Pedro Vergara", relevancia: "Pedro OFRECE devolver dinero mal calculado — un contratista jamás devolvería un pago; un socio sí asume pérdidas proporcionales" },
    { cita: "es una empresa no una caridad y la responsabilidad de lo que se haga despues del error no cae solo en ti", fuente: "chat-oscar-pedro", fecha: "07/08/2025", autor: "Pedro Vergara", relevancia: "Pedro trata el error contable como responsabilidad COMPARTIDA — conducta típica de socio, no de prestador de servicios" },
    { cita: "Somos un equipo papa", fuente: "chat-oscar-pedro", fecha: "07/08/2025", autor: "Pedro Vergara", relevancia: "Expresión que sintetiza la relación societaria — 'equipo' implica co-propiedad y responsabilidad compartida" }
  ]},
  49: { extractos: [
    { cita: "uds me diran como la ven", fuente: "chat-equipo", fecha: "21/03/2025", autor: "Adriana", relevancia: "Asesora de ventas consulta a AMBOS como co-decisores — P-03. El plural 'uds' demuestra que Adriana reconocía autoridad decisoria conjunta" },
    { cita: "Entonces dejalo en 2,850,000", fuente: "chat-oscar-pedro", fecha: "17/07/2025", autor: "Oscar Maldonado", relevancia: "Pedro y Oscar CO-DETERMINAN el precio final del programa — P-02. La fijación de precios es función directiva reservada a socios, no a contratistas" },
    { cita: "Ok... ya te organizo algo rapido y lo explico", fuente: "chat-oscar-pedro", fecha: "17/07/2025", autor: "Pedro Vergara", relevancia: "Pedro implementa el precio acordado — flujo de trabajo de socios: decisión conjunta, ejecución coordinada" }
  ]},
  50: { extractos: [
    { cita: "me sacaron de la cuenta de paretomed@gmail.com", fuente: "chat-oscar-pedro", fecha: "01/08/2025", autor: "Pedro Vergara", relevancia: "Oscar remueve accesos de Pedro del correo institucional — P-02. Exclusión previa a la ruptura oficial, patrón de exclusión sistemática" },
    { cita: "Es que estaba revisando y vi muchos dispositivos y computadores con esa cuenta abierta y cerre varios. No fue mala intencion", fuente: "chat-oscar-pedro", fecha: "01/08/2025", autor: "Oscar Maldonado", relevancia: "Oscar justifica el cierre de sesiones — la explicación revela que Pedro tenía acceso como co-gestor, no como usuario externo" }
  ]},
  51: { extractos: [
    { cita: "La estructura del programa con modulo semanal, grupo de estudio y retroalimentacion semanal siguio explotandose tras la ruptura", cita_exacta: "Nuestro programa está diseñado para que revises UN MÓDULO POR SEMANA de la siguiente manera: de lunes a viernes entras a la plataforma virtual en donde ves las videoclases y haces los simulacros que vienen con sus explicaciones; luego, el viernes en la tarde te reúnes con los demás estudiantes en el grupo de estudio por Google Meet; la idea del grupo de estudio es que hablen de los temas entre ustedes e identifiquen qué puntos hay que fortalecer. Al finalizar el grupo de estudio haces un nuevo simulacro del módulo de la semana, que después, el sábado o domingo en la mañana se reúnen todos los estudiantes con los profesores para la retroalimentación de ese último simulacro y para contestar cualquier duda que tengan.", fuente: "chat-equipo", fecha: "08/06/2024", autor: "Oscar PARETOMED", relevancia: "La estructura comercializada por Oscar ante el equipo ya incorporaba la metodología co-diseñada que siguió operando después de la ruptura — P-03" },
    { cita: "Pedro dejo documentado que convirtio el simulacro final en simulacro pre y creo el post estudio justificado surgido del grupo de estudio", cita_exacta: "Al final compadre es trabajo en equipo, pero barro que no reconozcas que tu tenías un producto que no estaba organizado, la idea de que se abordara un modulo por semana, el estudiar una hora diaria, convertir el simulacro \"final\" que tu tenias en un simulacro pre, hacer el post justificado que nació de el grupo de estudio si fueron ideas mias que mejoraron", fuente: "chat-oscar-pedro", fecha: "12/07/2025", autor: "Pedro Vergara", relevancia: "Pedro enumeró en detalle sus mejoras metodológicas y Oscar respondió inmediatamente 'Si reconozco', lo que refuerza la autoría compartida de esa estructura — P-02" }
  ]},
  52: { extractos: [
    { cita: "uds me diran como la ven", fuente: "chat-equipo", fecha: "21/03/2025", autor: "Adriana", relevancia: "Terceros trataban a ambos como co-directores del negocio — P-03. La percepción externa refuerza la existencia de sociedad de hecho ante cualquier observador razonable" }
  ]},

  // ========== CAPITULO XV: HALLAZGOS FINANCIEROS ==========
  53: { extractos: [
    { cita: "376 comprobantes de pago de estudiantes del programa ParetoMed, correspondientes a transacciones procesadas a traves de las plataformas Bold (190 pagos, $331.646.650), Bancolombia (106 pagos, $134.101.446)", fuente: "doc-comprobantes-excel", fecha: "feb 2024 - sep 2025", autor: "Adriana / ParetoMed", relevancia: "376 comprobantes multi-plataforma documentan ingresos mínimos de $579M — P-42. Base para el peritaje contable solicitado al despacho" },
    { cita: "El total de ingresos brutos documentados asciende a $579.217.496 COP", fuente: "doc-comprobantes-excel", fecha: "2025", autor: "Pedro Vergara", relevancia: "Ingresos brutos mínimos documentados con 99% de confianza — P-42. Cualquier peritaje de menores ingresos quedaría desvirtuado por este comprobante directo" }
  ]},
  54: { extractos: [
    { cita: "El cruce entre los pagos acreditados a Pedro y los comprobantes del periodo comparable arroja una proporcion practicamente identica al 20% pactado", cita_exacta: "509884596", fuente: "doc-comprobantes-excel", fecha: "feb 2024 - sep 2025", autor: "ParetoMed", relevancia: "La hoja resumen del Excel consolida $509.884.596 para el periodo comparable — P-42. Ese total, cruzado con los pagos acreditados a Pedro, respalda la inferencia contable del 20%" },
    { cita: "Oscar seguia liquidando a Pedro como un porcentaje fijo de la rentabilidad mensual, no como honorarios preestablecidos", cita_exacta: "El 20% que te corresponde es de 16,726,760. Eso va para tu cuenta personal.", fuente: "chat-oscar-pedro", fecha: "03/02/2025", autor: "Oscar Maldonado", relevancia: "La propia liquidación de Oscar usa el 20% como regla de pago — P-02. Esa mecánica es la que luego se refleja al comparar pagos totales contra ingresos documentados" }
  ]},
  55: { extractos: [
    { cita: "Si Pedro recibia el 20% de las utilidades netas, los ingresos brutos reales del negocio debian superar ampliamente la muestra parcial de comprobantes remitidos", cita_exacta: "La rentabilidad de este mes después de pagar comisiones, suscripciones, campañas, etc, fue de 83,633,800. El 20% que te corresponde es de 16,726,760. Eso va para tu cuenta personal.", fuente: "chat-oscar-pedro", fecha: "03/02/2025", autor: "Oscar Maldonado", relevancia: "Oscar documentó simultáneamente rentabilidad neta y participación del 20% — P-02. Esa relación permite proyectar ingresos brutos a partir de los pagos totales acreditados a Pedro" },
    { cita: "Los KPIs de 2025 son compatibles con una escala de ingresos muy superior a la muestra parcial de comprobantes", cita_exacta: "57089500", fuente: "doc-kpis-2025", fecha: "2025", autor: "Oscar Maldonado", relevancia: "La hoja mensual de KPIs muestra meses de $57M, $63M y más — P-43. Sirve como ancla objetiva para la proyección conservadora de ingresos brutos" },
    { cita: "Esta proyeccion es consistente con los KPIs de Oscar para 2025, que reportaban ventas totales de entre $46M y $97M mensuales", fuente: "doc-kpis-2025", fecha: "2025", autor: "Oscar Maldonado", relevancia: "Los KPIs propios de Oscar validan la proyección de Pedro — P-43. El demandado no puede contradecir sus propios datos" }
  ]},
  56: { extractos: [
    { cita: "yo me guio de la hoja de calculo personal mia", fuente: "chat-oscar-pedro", fecha: "28/02/2025", autor: "Oscar Maldonado", relevancia: "Oscar revela contabilidad paralela personal oculta — P-47. Esta hoja de cálculo debe ser objeto de EXHIBICIÓN DE DOCUMENTOS (art. 265 CGP) en el proceso" },
    { cita: "Joda, no tengo porque hacerlo y me ofende que me lo pidas", fuente: "chat-oscar-pedro", fecha: "05/08/2025", autor: "Oscar Maldonado", relevancia: "Oscar se niega expresamente a rendir cuentas — P-48. Esta negativa viola el deber de información entre socios (art. 504 C. de Co.) y genera indicio grave de contabilidad oculta" }
  ]},
  57: { extractos: [
    { cita: "con Avanz, Pedro facturaba con concepto especifico de 'Creacion de contenido / guiones comerciales, produccion y edicion de videos publicitarios para redes sociales', a tarifa fija por entregable ($1.680.672 + adicionales)", fuente: "doc-facturas-avanz", fecha: "2024-2025", autor: "Doctor Flight S.A.S.", relevancia: "Facturación a Avanz: concepto específico, tarifa fija, cesión de derechos — P-46 (FE1-FE15). Modelo completamente diferente al de ParetoMed" },
    { cita: "La regularizacion tributaria se pidio tardíamente, meses despues de haber venido pagando, lo que es incompatible con una relación de servicios mensuales regularmente facturada", cita_exacta: "Compa, necesito factura por todos los pagos que te he hecho.", fuente: "chat-oscar-pedro", fecha: "17/12/2024", autor: "Oscar Maldonado", relevancia: "Oscar pidió soporte fiscal acumulado en diciembre de 2024 — P-02. Esa regularización tardía solo tiene sentido si previamente no existía facturación contemporánea por cada pago" }
  ]},
  58: { extractos: [
    { cita: "agosto 2025: $52.790.000; septiembre 2025: $52.640.800; octubre 2025: $64.057.500. Total periodo post-ruptura: $169.488.300 COP", fuente: "doc-kpis-2025", fecha: "2025", autor: "Oscar Maldonado", relevancia: "KPIs DEL PROPIO DEMANDADO documentan $169M de ingresos post-ruptura — P-43. Aplicando 65% de margen y 20% de participación = $22M adeudados a Pedro solo en Q3 2025" },
    { cita: "noviembre: $84.102.500; diciembre: $46.050.000", fuente: "doc-kpis-2025", fecha: "2025", autor: "Oscar Maldonado", relevancia: "Ingresos adicionales Q4 2025 — P-43. Las utilidades de noviembre-diciembre también podrían ser reclamables si el juez fija la ruptura en fecha posterior" }
  ]},

  // ========== CAPITULO XVI: HECHOS ADICIONALES FINALES ==========
  59: { extractos: [
    { cita: "tu eres socio, no es que vas a sacar tu aplicacion propia... tenemos el acuerdo de que lo que desarrolles es para ParetoMed porque tu eres socio", cita_exacta: "tenemos digamos el acuerdo de que lo que desarrolles es para ParetoMed porque tú eres socio, no es que vas a sacar tu aplicación propia de preguntas", fuente: "transcripciones", fecha: "13/07/2025", autor: "Oscar Maldonado", relevancia: "CONFESION: Oscar exige deberes de socio sobre la aplicacion educativa independiente de preguntas y respuestas para examenes de residencia, no sobre el Dashboard React del Hecho Decimosegundo — P-50" },
    { cita: "tu no estabas trabajando en vainas de examenes de residencia hasta que comenzaste a trabajar conmigo que yo te abria el espacio y te ofreci la sociedad", fuente: "transcripciones", fecha: "13/07/2025", autor: "Oscar Maldonado", relevancia: "Admision literal: Oscar reconoce que le abrio el espacio a Pedro y le ofrecio la sociedad antes de reclamar la aplicacion como parte de ParetoMed — P-50" },
    { cita: "tu lo desarrollaste siendo socio de ParetoMed... yo creo que ahi no hay cabida, no hay duda sobre cual es el proposito de esa aplicacion", cita_exacta: "Papi, tú lo desarrollaste siendo socio de ParetoMed, ya, con material de ParetoMed, enfocado para exámenes de residencia y lo probaste con usuarios de ParetoMed, yo creo que ahí no hay cabida, no hay duda sobre cuál es el propósito de esa aplicación.", fuente: "transcripciones", fecha: "13/07/2025", autor: "Oscar Maldonado", relevancia: "Oscar intenta apropiarse de la aplicacion precisamente porque afirma que Pedro ya la habia desarrollado siendo socio de ParetoMed — P-50" }
  ]},
  60: { extractos: [
    { cita: "Si reconozco.", fuente: "chat-oscar-pedro", fecha: "12/07/2025", autor: "Oscar Maldonado", relevancia: "Oscar reconoce con dos palabras los aportes metodológicos de Pedro — P-02. Respuesta directa a la lista de aportes presentada por Pedro" },
    { cita: "lo de las tutorias ha sido una excelente idea y te he dejado llevarlo como has querido", fuente: "chat-oscar-pedro", fecha: "11/04/2025", autor: "Oscar Maldonado", relevancia: "Oscar reconoce ideas de Pedro como mejoras al programa — P-02. 'Dejar llevarlo como has querido' implica autonomía directiva, no seguimiento de instrucciones" }
  ]},
  61: { extractos: [
    { cita: "El dia 1 de [espacio en blanco] de 2024", fuente: "doc-contrato-cp", fecha: "agosto 2025", autor: "Oscar Maldonado", relevancia: "Contrato predatado con mes sin completar — P-14. Evidencia de documento retroactivo: quien redacta un contrato para el presente no deja el mes en blanco" },
    { cita: "estructura que tiene 90% de seguridad... tributaria", cita_exacta: "creamos al final alguna estructura que tiene 90% de digamos de de seguridad o de que o de que me resulte la vaina tributaria y no pagar tanto impuesto", fuente: "grabacion-llamada-oscar-250814", fecha: "14/08/2025", autor: "Oscar Maldonado", relevancia: "Oscar revela que el Contrato de Cuentas en Participación fue diseñado por su abogada para beneficio fiscal, no para reflejar la relación real — P-01" }
  ]},
  62: { extractos: [
    { cita: "comenzar una empresa/emprendimiento/negocio que entre en competencia directa con Paretomed", fuente: "doc-acuerdo-sas", fecha: "nov 2024", autor: "Oscar Maldonado", relevancia: "Cláusula de 5 años de no competencia en todo el sector de educación médica virtual — P-08. Las restricciones de 5 años solo se justifican frente a un socio con conocimiento interno total, nunca frente a un contratista de marketing" },
    { cita: "la clausula de no competencia", fuente: "chat-oscar-pedro", fecha: "13/01/2025", autor: "Oscar Maldonado", relevancia: "Oscar incluye anticompetencia en estatutos de SAS propuesta — P-02. Patrón sistemático: todos los borradores incluyen anticompetencia de largo alcance" }
  ]},
  63: { extractos: [
    { cita: "yo quiero honrar el acuerdo contigo... los abogados y contadores me dijeron... sociedad de hecho con el man no puedes cortarlo... presenteme una forma en que yo pueda mantenerme con el pero tambien pueda crear lo otro", cita_exacta: "pero dije eche yo quiero honrar el acuerdo con el man presenteme una forma en que yo pueda mantenerme con él, pero también pueda crear lo otro que tengo pensado que me sirve más", fuente: "grabacion-llamada-oscar-250814", fecha: "14/08/2025", autor: "Oscar Maldonado", relevancia: "Oscar revela en grabación el propósito real de NETMED: un vehículo para escapar de la sociedad con Pedro — P-01. Confesión directa de la estrategia post-ruptura" }
  ]},
  64: { extractos: [
    { cita: "la idea es crear una SAS aca en Colombia que le preste servicios a la LLC en EUA. Por la naturaleza de los servicios estaria exento de IVA", fuente: "chat-oscar-pedro", fecha: "10/07/2025", autor: "Oscar Maldonado", relevancia: "Oscar revela plan tributario en chat — P-02. La arquitectura fiscal diseñada mientras se dilataba la formalización con Pedro evidencia prioridades opuestas" },
    { cita: "la vamos a presentar como una empresa de cloud hosting... ya no va a ser una empresa educativa... y ahi no pago tanto impuesto", cita_exacta: "10% de riesgo legal y es que la vamos a presentar como una empresa de cloud hosting si me entiendo? Ya no va a ser una empresa educativa, ni siquiera y ahi no pago tanto impuesto", fuente: "grabacion-llamada-oscar-250814", fecha: "14/08/2025", autor: "Oscar Maldonado", relevancia: "Oscar admite en grabación que la reclasificación de ParetoMed como 'cloud hosting' era una estrategia para reducir impuestos — P-01. El demandado usa su propio discurso como evidencia de mala fe" }
  ]}
};

module.exports = CURATED;
