begin;
update public.hechos
set titulo_corto = case id
  when 'hecho-19' then 'Pagos acreditados — $122.3M total'
  when 'hecho-46' then 'Pagos acreditados — $122.3M en dos canales'
  when 'hecho-47' then '"La firma es una mera formalidad" — confesión'
  when 'hecho-48' then 'Incidente contable — "somos un equipo"'
  when 'hecho-50' then 'Remoción unilateral de accesos digitales'
  when 'hecho-51' then 'Explotación post-ruptura de activos compartidos'
  when 'hecho-52' then 'Testigos de la dinámica societaria'
  when 'hecho-53' then '376 comprobantes — $579M en ingresos documentados'
  when 'hecho-54' then 'Cruce comprobantes vs pagos — 24.0% sobre muestra'
  when 'hecho-55' then 'Proyección de ingresos reales — $941M estimados'
  when 'hecho-56' then 'Oscar oculta contabilidad y se niega a rendir cuentas'
  when 'hecho-57' then 'Facturación Avanz vs ParetoMed — dos modelos distintos'
  when 'hecho-58' then 'KPIs post-ruptura — $169M en ventas sin pagar a Pedro'
  when 'hecho-60' then 'Oscar reconoce aportes metodológicos de Pedro'
  when 'hecho-61' then 'Contrato predatado con mes en blanco'
  when 'hecho-62' then 'Cláusulas anticompetencia de 5 años — solo para socios'
  when 'hecho-63' then 'NETMED: vehículo diseñado para escapar la sociedad'
  when 'hecho-64' then 'Plan de evasión fiscal — LLC en Estados Unidos'
  else titulo_corto end,
resumen = case id
  when 'hecho-19' then 'Los montos pagados a Pedro variaban cada mes segun la rentabilidad del negocio, lo que es consistente con participacion en utilidades y NO con honorarios fijos por prestacion de servicios. Se acreditan **14 transferencias bancarias a la cuenta person...'
  when 'hecho-46' then 'El total acreditado a favor de Pedro asciende a **$122.345.065 COP** entre mayo de 2024 y agosto de 2025, discriminado en (i) **14 transferencias a su cuenta personal** por **$99.319.834 COP** y (ii) **pagos canalizados a traves de DOCTOR FLIGHT S.A....'
  when 'hecho-47' then 'El 8 de enero de 2025, Oscar Maldonado declaro en nota de voz de WhatsApp que la firma del acuerdo de socios era una **"mera formalidad"**, lo que constituye un reconocimiento de que la sociedad ya existia de facto sin necesidad del documento escrito...'
  when 'hecho-48' then 'El 7 de agosto de 2025, se produjo un incidente contable que evidencia la conducta de Pedro como socio y no como contratista. Oscar informo a Pedro que en la liquidacion de julio habia omitido descontar los pagos de las colaboradoras Lina y Kendy, lo...'
  when 'hecho-50' then 'Tras la aceptacion de la terminacion el 28 de agosto de 2025, Oscar procedio a **remover unilateralmente los accesos** de Pedro a las herramientas digitales del negocio. Oscar cerro las sesiones del correo institucional paretomed@gmail.com (un antece...'
  when 'hecho-51' then 'ParetoMed continuo explotando despues de la ruptura la metodologia, estructura comercial, procesos de ventas y canales digitales que fueron construidos o sustancialmente mejorados por Pedro durante los 16 meses de operacion conjunta. Si bien Oscar gr...'
  when 'hecho-52' then 'La dinamica de sociedad entre Pedro y Oscar era presenciada habitualmente por terceros que pueden dar testimonio. Las reuniones de trabajo se realizaban en la oficina de Pedro, donde sus trabajadores Efrain (fotografo) y Paul (comunicador social) est...'
  when 'hecho-53' then 'Entre febrero de 2024 y septiembre de 2025, se documentaron **376 comprobantes de pago** de estudiantes del programa ParetoMed, correspondientes a transacciones procesadas a traves de las plataformas Bold (190 pagos, $331.646.650), Bancolombia (106 p...'
  when 'hecho-54' then 'El cruce de los comprobantes de estudiantes con las transferencias recibidas por Pedro arroja una consistencia reveladora: tomando solo el **subtotal de la cuenta personal** documentado por SMS Bancolombia (**$99.319.834 COP**), ese valor equivale al...'
  when 'hecho-55' then 'Si Pedro recibio **$122.345.065 COP** como el 20% de las utilidades netas, y el margen de ganancia documentado por Oscar oscilaba entre 56% y 81% (con un promedio conservador de 65%), los ingresos brutos reales del negocio se estiman en aproximadamen...'
  when 'hecho-56' then 'El 28 de febrero de 2025, Oscar revelo en el chat de WhatsApp la existencia de una **hoja de calculo personal** con la contabilidad detallada del negocio, distinta de los consolidados que compartia con Pedro: *"yo me guio de la hoja de calculo person...'
  when 'hecho-57' then 'La comparacion entre la facturacion de Pedro a AVANZ FINANZAS & SEGUROS LTDA (NIT 901286973-7) y la facturacion a Oscar/ParetoMed demuestra que Pedro distinguia perfectamente entre una relacion de prestacion de servicios y una relacion societaria. Co...'
  when 'hecho-58' then 'Los KPIs de ventas de ParetoMed para 2025, contenidos en la hoja de calculo "Copia de KPIS 2025.xlsx" (archivo del demandado en poder del demandante), documentan que Oscar continuo explotando el negocio despues de la ruptura con los siguientes ingres...'
  when 'hecho-60' then 'En la reunion del 14 de julio de 2025, Oscar Maldonado reconocio expresamente que elementos centrales de la metodologia actual de ParetoMed fueron ideados por Pedro: (a) Oscar *"confirmo que la idea de los simulacros pre y post estudio, con objetivos...'
  when 'hecho-61' then 'El Contrato de Cuentas en Participacion [P-14] fue entregado por Oscar en agosto de 2025, pero su encabezado dice textualmente: *"El dia 1 de [espacio en blanco] de 2024"* — con el mes sin completar. Esta predatacion constituye un intento de redefini...'
  when 'hecho-62' then 'Todos los contratos propuestos por Oscar incluian clausulas de no competencia dirigidas a restringir la actividad profesional de Pedro: (a) el Acuerdo de Socios propuesto en version SAS incluia una restriccion de **5 anos** que prohibia a Pedro *"com...'
  when 'hecho-63' then 'El 15 de octubre de 2025, Oscar Maldonado constituyo la sociedad **NETMED S.A.S.** (NIT 902.004.012-9, Matricula 926.784) mediante documento privado en Barranquilla, inscrita en la Camara de Comercio el 30 de octubre de 2025. Oscar es propietario del...'
  when 'hecho-64' then 'El 10 de julio de 2025, Oscar revelo en chat de WhatsApp un plan tributario consistente en crear una LLC en Estados Unidos y una SAS en Colombia que le prestara servicios: *"la idea es crear una SAS aca en Colombia que le preste servicios a la LLC en...'
  else resumen end
where id in ('hecho-19', 'hecho-46', 'hecho-47', 'hecho-48', 'hecho-50', 'hecho-51', 'hecho-52', 'hecho-53', 'hecho-54', 'hecho-55', 'hecho-56', 'hecho-57', 'hecho-58', 'hecho-60', 'hecho-61', 'hecho-62', 'hecho-63', 'hecho-64');
commit;
