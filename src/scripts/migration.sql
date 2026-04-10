INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-1', 'I', 'ANTECEDENTES - LAS PARTES Y SUS CAPACIDADES') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-2', 'II', 'FORMACION DE LA SOCIEDAD DE HECHO') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-3', 'III', 'APORTES RECIPROCOS') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-4', 'IV', 'REPARTO DE UTILIDADES') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-5', 'V', 'AFFECTIO SOCIETATIS - VOLUNTAD DE SER SOCIOS') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-6', 'VI', 'EXPLOTACION CONJUNTA DEL NEGOCIO') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-7', 'VII', 'DURACION DE LA SOCIEDAD DE HECHO') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-8', 'VIII', 'INTENTOS DE FORMALIZACION Y MALA FE DEL DEMANDADO') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-9', 'IX', 'RUPTURA DE LA RELACION') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-10', 'X', 'OFERTAS DE TRANSACCION FRUSTRADAS') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-11', 'XI', 'ACTOS POST-RUPTURA DEL DEMANDADO') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-12', 'XII', 'AGOTAMIENTO DE LA ETAPA CONCILIATORIA') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-13', 'XIII', 'CUANTIA Y PRETENSION ECONOMICA') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-14', 'XIV', 'HECHOS ADICIONALES (CORROBORADOS 08/04/2026)') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-15', 'XV', 'HALLAZGOS FINANCIEROS — COMPROBANTES DE ESTUDIANTES (08/04/2026)') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.capitulos (id, numero, titulo) VALUES ('cap-16', 'XVI', 'HECHOS ADICIONALES — DEBERES DE SOCIO, APORTES METODOLOGICOS, MANIOBRAS POST-RUPTURA (08/04/2026)') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-1', 
            1, 
            'PRIMERO', 
            'cap-1', 
            'El demandante, PEDRO JOSE VERGARA VILLANUEVA, identificado con cedula de ciudadania No. 1.045.750.095, es medico de profesion con domicilio en la Calle 80 #55-40, Barranquilla. Es representante legal y controlante de la sociedad DOCTOR FLIGHT S.A.S. ...', 
            '**HECHO PRIMERO.** El demandante, PEDRO JOSE VERGARA VILLANUEVA, identificado con cedula de ciudadania No. 1.045.750.095, es medico de profesion con domicilio en la Calle 80 #55-40, Barranquilla. Es representante legal y controlante de la sociedad DOCTOR FLIGHT S.A.S. (NIT 901.767.877-2), constituida el 27 de octubre de 2023, inscrita en la Camara de Comercio de Barranquilla bajo el numero 460.593 del libro IX, con matricula mercantil No. 879.847. **[P-21]**', 
            '<p><strong>HECHO PRIMERO.</strong> El demandante, PEDRO JOSE VERGARA VILLANUEVA, identificado con cedula de ciudadania No. 1.045.750.095, es medico de profesion con domicilio en la Calle 80 #55-40, Barranquilla. Es representante legal y controlante de la sociedad DOCTOR FLIGHT S.A.S. (NIT 901.767.877-2), constituida el 27 de octubre de 2023, inscrita en la Camara de Comercio de Barranquilla bajo el numero 460.593 del libro IX, con matricula mercantil No. 879.847. <strong>[P-21]</strong></p>
', 
            'Identificación del demandante', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-2', 
            2, 
            'SEGUNDO', 
            'cap-1', 
            'El demandado, OSCAR DAVID MALDONADO BADRAN, identificado con cedula de ciudadania No. 1.129.573.046, es medico internista con domicilio en la CR 44B No. 96-67 AP 606 TO 2, Barranquilla. Es propietario del establecimiento comercial PARETOMED, registra...', 
            '**HECHO SEGUNDO.** El demandado, OSCAR DAVID MALDONADO BADRAN, identificado con cedula de ciudadania No. 1.129.573.046, es medico internista con domicilio en la CR 44B No. 96-67 AP 606 TO 2, Barranquilla. Es propietario del establecimiento comercial PARETOMED, registrado ante la Camara de Comercio de Barranquilla con matricula No. 865.875 desde el 5 de abril de 2023, con actividad economica descrita como "SERVICIOS EDUCATIVOS AUTOMATIZADOS MEDIANTE CLOUD COMPUTING" y activos vinculados declarados de $20.000.000 COP. **[P-20]**', 
            '<p><strong>HECHO SEGUNDO.</strong> El demandado, OSCAR DAVID MALDONADO BADRAN, identificado con cedula de ciudadania No. 1.129.573.046, es medico internista con domicilio en la CR 44B No. 96-67 AP 606 TO 2, Barranquilla. Es propietario del establecimiento comercial PARETOMED, registrado ante la Camara de Comercio de Barranquilla con matricula No. 865.875 desde el 5 de abril de 2023, con actividad economica descrita como &quot;SERVICIOS EDUCATIVOS AUTOMATIZADOS MEDIANTE CLOUD COMPUTING&quot; y activos vinculados declarados de $20.000.000 COP. <strong>[P-20]</strong></p>
', 
            'Identificación del demandado', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-3', 
            3, 
            'TERCERO', 
            'cap-1', 
            'PARETOMED es un programa de educacion medica virtual de preparacion para examenes de admision a especialidades medicas (residencias) en Colombia, que opera mediante una plataforma virtual con videoclases pregrabadas, simulacros de examenes, grupos de...', 
            '**HECHO TERCERO.** PARETOMED es un programa de educacion medica virtual de preparacion para examenes de admision a especialidades medicas (residencias) en Colombia, que opera mediante una plataforma virtual con videoclases pregrabadas, simulacros de examenes, grupos de estudio semanales, acompanamiento academico y psicologico, y ventas por internet con asesoria comercial directa. **[P-20, P-27, P-28]**

---', 
            '<p><strong>HECHO TERCERO.</strong> PARETOMED es un programa de educacion medica virtual de preparacion para examenes de admision a especialidades medicas (residencias) en Colombia, que opera mediante una plataforma virtual con videoclases pregrabadas, simulacros de examenes, grupos de estudio semanales, acompanamiento academico y psicologico, y ventas por internet con asesoria comercial directa. <strong>[P-20, P-27, P-28]</strong></p>
<hr>
', 
            'ParetoMed — programa de educación médica', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-4', 
            4, 
            'CUARTO', 
            'cap-2', 
            'El 10 de noviembre de 2023 tuvo lugar el primer contacto registrado entre las partes via WhatsApp. El 4 de enero de 2024, Pedro contacto a Oscar, recordandole que se habian conocido en el Startup Day de la Universidad del Norte, manifestando su inter...', 
            '**HECHO CUARTO.** El 10 de noviembre de 2023 tuvo lugar el primer contacto registrado entre las partes via WhatsApp. El 4 de enero de 2024, Pedro contacto a Oscar, recordandole que se habian conocido en el Startup Day de la Universidad del Norte, manifestando su interes en participar en el proyecto. **[P-02]**', 
            '<p><strong>HECHO CUARTO.</strong> El 10 de noviembre de 2023 tuvo lugar el primer contacto registrado entre las partes via WhatsApp. El 4 de enero de 2024, Pedro contacto a Oscar, recordandole que se habian conocido en el Startup Day de la Universidad del Norte, manifestando su interes en participar en el proyecto. <strong>[P-02]</strong></p>
', 
            'Primer contacto entre las partes', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-5', 
            5, 
            'QUINTO', 
            'cap-2', 
            'El 9 de enero de 2024 las partes se reunieron presencialmente en la Calle 80 #55-40 para discutir una colaboracion. Al dia siguiente, 10 de enero de 2024, Oscar propuso cruzar el valor del trabajo de Pedro con el costo del curso y definir funciones e...', 
            '**HECHO QUINTO.** El 9 de enero de 2024 las partes se reunieron presencialmente en la Calle 80 #55-40 para discutir una colaboracion. Al dia siguiente, 10 de enero de 2024, Oscar propuso cruzar el valor del trabajo de Pedro con el costo del curso y definir funciones especificas. **[P-02]**', 
            '<p><strong>HECHO QUINTO.</strong> El 9 de enero de 2024 las partes se reunieron presencialmente en la Calle 80 #55-40 para discutir una colaboracion. Al dia siguiente, 10 de enero de 2024, Oscar propuso cruzar el valor del trabajo de Pedro con el costo del curso y definir funciones especificas. <strong>[P-02]</strong></p>
', 
            'Reunión presencial y propuesta de colaboración', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-6', 
            6, 
            'SEXTO', 
            'cap-2', 
            'El 6 de febrero de 2024, Pedro envio una propuesta formal de acuerdo en la que se planteaba una participacion del 30% mediante esquema de vesting (future stock), con cliff de 12 meses y consolidacion trimestral. Las funciones propuestas incluian expr...', 
            '**HECHO SEXTO.** El 6 de febrero de 2024, Pedro envio una propuesta formal de acuerdo en la que se planteaba una participacion del 30% mediante esquema de vesting (future stock), con cliff de 12 meses y consolidacion trimestral. Las funciones propuestas incluian expresamente la **"Direccion general de la empresa"**, edicion de videos, redaccion de guiones, marketing y una inversion minima de $2 millones COP en pauta mensual. Esto evidencia que desde el inicio Pedro se concebia como co-director del negocio, no como un prestador de servicios. **[P-10, P-02, P-05]**', 
            '<p><strong>HECHO SEXTO.</strong> El 6 de febrero de 2024, Pedro envio una propuesta formal de acuerdo en la que se planteaba una participacion del 30% mediante esquema de vesting (future stock), con cliff de 12 meses y consolidacion trimestral. Las funciones propuestas incluian expresamente la <strong>&quot;Direccion general de la empresa&quot;</strong>, edicion de videos, redaccion de guiones, marketing y una inversion minima de $2 millones COP en pauta mensual. Esto evidencia que desde el inicio Pedro se concebia como co-director del negocio, no como un prestador de servicios. <strong>[P-10, P-02, P-05]</strong></p>
', 
            'Propuesta formal de Pedro — 30% en vesting', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-7', 
            7, 
            'SEPTIMO', 
            'cap-2', 
            'El 28 de marzo de 2024, las partes acordaron la forma de trabajo definitiva: Pedro recibiria el 20% de los ingresos netos del negocio, con inicio desde abril de 2024. La participacion se redujo del 30% propuesto inicialmente al 20% como resultado de ...', 
            '**HECHO SEPTIMO.** El 28 de marzo de 2024, las partes acordaron la forma de trabajo definitiva: Pedro recibiria el 20% de los ingresos netos del negocio, con inicio desde abril de 2024. La participacion se redujo del 30% propuesto inicialmente al 20% como resultado de la negociacion. **[P-04]**

### B. Constitucion verbal de la sociedad de hecho (abril 2024)', 
            '<p><strong>HECHO SEPTIMO.</strong> El 28 de marzo de 2024, las partes acordaron la forma de trabajo definitiva: Pedro recibiria el 20% de los ingresos netos del negocio, con inicio desde abril de 2024. La participacion se redujo del 30% propuesto inicialmente al 20% como resultado de la negociacion. <strong>[P-04]</strong></p>
<h3>B. Constitucion verbal de la sociedad de hecho (abril 2024)</h3>
', 
            'Acuerdo definitivo — 20% de ingresos netos', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-8', 
            8, 
            'OCTAVO', 
            'cap-2', 
            'El 15 de abril de 2024, se constituyo verbalmente la sociedad de hecho. En esa fecha, Pedro recordo a Oscar que segun lo acordado debian iniciar los pagos y solicito definir el presupuesto de publicidad. A partir de este momento, ambas partes explota...', 
            '**HECHO OCTAVO.** El 15 de abril de 2024, se constituyo verbalmente la sociedad de hecho. En esa fecha, Pedro recordo a Oscar que segun lo acordado debian iniciar los pagos y solicito definir el presupuesto de publicidad. A partir de este momento, ambas partes explotaron conjuntamente el negocio PARETOMED, con aportes reciprocos, reparto de utilidades y voluntad de asociarse. **[P-02, P-19]**', 
            '<p><strong>HECHO OCTAVO.</strong> El 15 de abril de 2024, se constituyo verbalmente la sociedad de hecho. En esa fecha, Pedro recordo a Oscar que segun lo acordado debian iniciar los pagos y solicito definir el presupuesto de publicidad. A partir de este momento, ambas partes explotaron conjuntamente el negocio PARETOMED, con aportes reciprocos, reparto de utilidades y voluntad de asociarse. <strong>[P-02, P-19]</strong></p>
', 
            'Constitución verbal de la sociedad de hecho', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-9', 
            9, 
            'NOVENO', 
            'cap-2', 
            'El 27 de abril de 2024, tan solo 12 dias despues de iniciada la operacion conjunta, Oscar Maldonado firmo de su puno y letra una **Carta de Recomendacion** en la que certifica que Pedro Jose Vergara Villanueva *"se desempena como Subdirector Academic...', 
            '**HECHO NOVENO.** El 27 de abril de 2024, tan solo 12 dias despues de iniciada la operacion conjunta, Oscar Maldonado firmo de su puno y letra una **Carta de Recomendacion** en la que certifica que Pedro Jose Vergara Villanueva *"se desempena como Subdirector Academico y Comercial de Paretomed - Educacion Medica"* desde el 1 de enero de 2024, con funciones de *"educador, productor y creador de contenido, direccion de marketing"*. El cargo de **"Subdirector"** es un cargo directivo que resulta incompatible con la figura de un simple prestador de servicios externo. **[P-11]**

---', 
            '<p><strong>HECHO NOVENO.</strong> El 27 de abril de 2024, tan solo 12 dias despues de iniciada la operacion conjunta, Oscar Maldonado firmo de su puno y letra una <strong>Carta de Recomendacion</strong> en la que certifica que Pedro Jose Vergara Villanueva <em>&quot;se desempena como Subdirector Academico y Comercial de Paretomed - Educacion Medica&quot;</em> desde el 1 de enero de 2024, con funciones de <em>&quot;educador, productor y creador de contenido, direccion de marketing&quot;</em>. El cargo de <strong>&quot;Subdirector&quot;</strong> es un cargo directivo que resulta incompatible con la figura de un simple prestador de servicios externo. <strong>[P-11]</strong></p>
<hr>
', 
            'Carta de recomendación — "Subdirector Académico"', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-10', 
            10, 
            'DECIMO', 
            'cap-3', 
            'Oscar Maldonado aporto a la sociedad de hecho: (i) la propiedad intelectual original del contenido medico base y videoclases; (ii) el capital inicial para la operacion; (iii) el registro previo del establecimiento comercial ParetoMed (Matricula 865.8...', 
            '**HECHO DECIMO.** Oscar Maldonado aporto a la sociedad de hecho: (i) la propiedad intelectual original del contenido medico base y videoclases; (ii) el capital inicial para la operacion; (iii) el registro previo del establecimiento comercial ParetoMed (Matricula 865.875, desde 05/04/2023); y (iv) su conocimiento medico especializado como medico internista. **[P-20, P-14]**

### B. Aportes de Pedro Vergara (industria)', 
            '<p><strong>HECHO DECIMO.</strong> Oscar Maldonado aporto a la sociedad de hecho: (i) la propiedad intelectual original del contenido medico base y videoclases; (ii) el capital inicial para la operacion; (iii) el registro previo del establecimiento comercial ParetoMed (Matricula 865.875, desde 05/04/2023); y (iv) su conocimiento medico especializado como medico internista. <strong>[P-20, P-14]</strong></p>
<h3>B. Aportes de Pedro Vergara (industria)</h3>
', 
            'Aportes de Oscar — capital, PI, registro', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-11', 
            11, 
            'DECIMOPRIMERO', 
            'cap-3', 
            'Pedro Vergara aporto a la sociedad de hecho trabajo especializado en marketing y ventas, incluyendo: edicion de videos de contenido para redes y del curso, redaccion de guiones para redes sociales, asesoria en creacion de contenido y marketing, gesti...', 
            '**HECHO DECIMOPRIMERO.** Pedro Vergara aporto a la sociedad de hecho trabajo especializado en marketing y ventas, incluyendo: edicion de videos de contenido para redes y del curso, redaccion de guiones para redes sociales, asesoria en creacion de contenido y marketing, gestion de cuentas de TikTok y YouTube Shorts, publicacion de contenido, y optimizacion del tunel de ventas desde redes sociales (Instagram, TikTok, YouTube Shorts). Estas funciones fueron reconocidas expresamente por Oscar en el Acuerdo de Socios propuesto en version SAS y en el Contrato de Cuentas en Participacion. **[P-08, P-14]**', 
            '<p><strong>HECHO DECIMOPRIMERO.</strong> Pedro Vergara aporto a la sociedad de hecho trabajo especializado en marketing y ventas, incluyendo: edicion de videos de contenido para redes y del curso, redaccion de guiones para redes sociales, asesoria en creacion de contenido y marketing, gestion de cuentas de TikTok y YouTube Shorts, publicacion de contenido, y optimizacion del tunel de ventas desde redes sociales (Instagram, TikTok, YouTube Shorts). Estas funciones fueron reconocidas expresamente por Oscar en el Acuerdo de Socios propuesto en version SAS y en el Contrato de Cuentas en Participacion. <strong>[P-08, P-14]</strong></p>
', 
            'Aportes de Pedro — marketing y ventas', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-12', 
            12, 
            'DECIMOSEGUNDO', 
            'cap-3', 
            'Pedro aporto conocimiento y gestion tecnologica consistente en: gestion de pixel de Meta y campanas publicitarias; y desarrollo de un Dashboard de Venta Consultiva en lenguaje React desplegado con herramientas de Google Cloud, herramienta que fue pue...', 
            '**HECHO DECIMOSEGUNDO.** Pedro aporto conocimiento y gestion tecnologica consistente en: gestion de pixel de Meta y campanas publicitarias; y desarrollo de un Dashboard de Venta Consultiva en lenguaje React desplegado con herramientas de Google Cloud, herramienta que fue puesta a disposicion de la sociedad sin costo adicional mas alla del costo operativo de la herramienta misma. **[P-02]**', 
            '<p><strong>HECHO DECIMOSEGUNDO.</strong> Pedro aporto conocimiento y gestion tecnologica consistente en: gestion de pixel de Meta y campanas publicitarias; y desarrollo de un Dashboard de Venta Consultiva en lenguaje React desplegado con herramientas de Google Cloud, herramienta que fue puesta a disposicion de la sociedad sin costo adicional mas alla del costo operativo de la herramienta misma. <strong>[P-02]</strong></p>
', 
            'Dashboard React y gestión tecnológica', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-13', 
            13, 
            'DECIMOTERCERO', 
            'cap-3', 
            'Pedro aporto infraestructura fisica consistente en su estudio de grabacion profesional propio, con equipos de iluminacion y audio. Oscar reconocio esta infraestructura al solicitar expresamente su uso: *"Pensaba que tan factible es que lo hagamos en ...', 
            '**HECHO DECIMOTERCERO.** Pedro aporto infraestructura fisica consistente en su estudio de grabacion profesional propio, con equipos de iluminacion y audio. Oscar reconocio esta infraestructura al solicitar expresamente su uso: *"Pensaba que tan factible es que lo hagamos en tu estudio para que se vea bien profesional"* (12/04/2024). **[P-02]**', 
            '<p><strong>HECHO DECIMOTERCERO.</strong> Pedro aporto infraestructura fisica consistente en su estudio de grabacion profesional propio, con equipos de iluminacion y audio. Oscar reconocio esta infraestructura al solicitar expresamente su uso: <em>&quot;Pensaba que tan factible es que lo hagamos en tu estudio para que se vea bien profesional&quot;</em> (12/04/2024). <strong>[P-02]</strong></p>
', 
            'Estudio de grabación profesional de Pedro', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-14', 
            14, 
            'DECIMOCUARTO', 
            'cap-3', 
            'Pedro diseno la infraestructura operativa del negocio mediante la creacion de procedimientos estandar de operacion (SOPs): (a) **SOP de Reunion 1:1** (redactado el 05/06/2024), que establece el procedimiento de onboarding de nuevos estudiantes, inclu...', 
            '**HECHO DECIMOCUARTO.** Pedro diseno la infraestructura operativa del negocio mediante la creacion de procedimientos estandar de operacion (SOPs): (a) **SOP de Reunion 1:1** (redactado el 05/06/2024), que establece el procedimiento de onboarding de nuevos estudiantes, incluyendo bienvenida, presentacion de metodologia, metodos de estudio y agendamiento de cronograma personalizado; (b) **SOP de Seguimiento Paretomed**, que establece un sistema completo de seguimiento academico con definicion de responsabilidades del coordinador, sistema de recoleccion de datos, alertas de rendimiento y retroalimentacion semanal. El diseno de procesos operativos es funcion propia de un socio o director, no de un prestador de servicios. **[P-25, P-26]**', 
            '<p><strong>HECHO DECIMOCUARTO.</strong> Pedro diseno la infraestructura operativa del negocio mediante la creacion de procedimientos estandar de operacion (SOPs): (a) <strong>SOP de Reunion 1:1</strong> (redactado el 05/06/2024), que establece el procedimiento de onboarding de nuevos estudiantes, incluyendo bienvenida, presentacion de metodologia, metodos de estudio y agendamiento de cronograma personalizado; (b) <strong>SOP de Seguimiento Paretomed</strong>, que establece un sistema completo de seguimiento academico con definicion de responsabilidades del coordinador, sistema de recoleccion de datos, alertas de rendimiento y retroalimentacion semanal. El diseno de procesos operativos es funcion propia de un socio o director, no de un prestador de servicios. <strong>[P-25, P-26]</strong></p>
', 
            'SOPs operativos diseñados por Pedro', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-15', 
            15, 
            'DECIMOQUINTO', 
            'cap-3', 
            'Pedro contribuyo a la reorganizacion y mejora de la propuesta comercial del negocio. El 14 de mayo de 2024, Pedro documento comparativamente ambas versiones: la version original de Oscar describia un basico "curso" con descripcion generica, mientras ...', 
            '**HECHO DECIMOQUINTO.** Pedro contribuyo a la reorganizacion y mejora de la propuesta comercial del negocio. El 14 de mayo de 2024, Pedro documento comparativamente ambas versiones: la version original de Oscar describia un basico "curso" con descripcion generica, mientras que Pedro propuso presentarlo como un "programa" con lema comercial, acceso multiplataforma, preparacion para entrevistas, ciclos de estudio de 90 dias y simulacros por universidades nacionales. Estas mejoras en la presentacion y estructura comercial del producto contribuyeron al crecimiento de las ventas. **[P-27]**', 
            '<p><strong>HECHO DECIMOQUINTO.</strong> Pedro contribuyo a la reorganizacion y mejora de la propuesta comercial del negocio. El 14 de mayo de 2024, Pedro documento comparativamente ambas versiones: la version original de Oscar describia un basico &quot;curso&quot; con descripcion generica, mientras que Pedro propuso presentarlo como un &quot;programa&quot; con lema comercial, acceso multiplataforma, preparacion para entrevistas, ciclos de estudio de 90 dias y simulacros por universidades nacionales. Estas mejoras en la presentacion y estructura comercial del producto contribuyeron al crecimiento de las ventas. <strong>[P-27]</strong></p>
', 
            'Reorganización de la propuesta comercial', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-16', 
            16, 
            'DECIMOSEXTO', 
            'cap-3', 
            'Pedro desarrollo, en conjunto con Oscar, una produccion masiva de contenido intelectual para el negocio consistente en decenas de guiones comerciales y educativos para Reels y videos durante 2024-2025, incluyendo: (i) guiones comerciales completos pa...', 
            '**HECHO DECIMOSEXTO.** Pedro desarrollo, en conjunto con Oscar, una produccion masiva de contenido intelectual para el negocio consistente en decenas de guiones comerciales y educativos para Reels y videos durante 2024-2025, incluyendo: (i) guiones comerciales completos para campanas de captacion del Q1 2025; (ii) un Video Sales Letter (VSL) de 3 minutos para landing page con estructura profesional; (iii) contenido educativo medico con casos clinicos explicados de cardiologia, nefrologia, hematologia, acidosis metabolica, entre otros; (iv) dos versiones completas del video introductorio a la plataforma donde se explica toda la metodologia Paretomed; (v) guiones para tips de entrevista de residencia; (vi) guiones de Reels para abril, julio, septiembre, octubre-diciembre 2024 y 2025. En los reels educativos, el contenido medico del guion era aproximadamente 85% aporte de Oscar y 15% de Pedro, mientras que la produccion audiovisual (direccion, edicion, postproduccion, estudio, equipos) era integramente de Pedro. Los videos comerciales (aquellos destinados a atraer interesados al programa) eran aproximadamente 85% desarrollo de Pedro en guion y produccion. **[P-28, P-29, P-30, P-31, P-32]**', 
            '<p><strong>HECHO DECIMOSEXTO.</strong> Pedro desarrollo, en conjunto con Oscar, una produccion masiva de contenido intelectual para el negocio consistente en decenas de guiones comerciales y educativos para Reels y videos durante 2024-2025, incluyendo: (i) guiones comerciales completos para campanas de captacion del Q1 2025; (ii) un Video Sales Letter (VSL) de 3 minutos para landing page con estructura profesional; (iii) contenido educativo medico con casos clinicos explicados de cardiologia, nefrologia, hematologia, acidosis metabolica, entre otros; (iv) dos versiones completas del video introductorio a la plataforma donde se explica toda la metodologia Paretomed; (v) guiones para tips de entrevista de residencia; (vi) guiones de Reels para abril, julio, septiembre, octubre-diciembre 2024 y 2025. En los reels educativos, el contenido medico del guion era aproximadamente 85% aporte de Oscar y 15% de Pedro, mientras que la produccion audiovisual (direccion, edicion, postproduccion, estudio, equipos) era integramente de Pedro. Los videos comerciales (aquellos destinados a atraer interesados al programa) eran aproximadamente 85% desarrollo de Pedro en guion y produccion. <strong>[P-28, P-29, P-30, P-31, P-32]</strong></p>
', 
            'Producción masiva de contenido audiovisual', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-17', 
            17, 
            'DECIMOSEPTIMO', 
            'cap-3', 
            'Pedro aporto recurso humano propio al negocio. Dos trabajadores de su empresa DOCTOR FLIGHT S.A.S. prestaron servicios con prioridad para ParetoMed: (a) **Efrain**, fotografo y editor audiovisual, quien participaba en grabaciones, revision de equipos...', 
            '**HECHO DECIMOSEPTIMO.** Pedro aporto recurso humano propio al negocio. Dos trabajadores de su empresa DOCTOR FLIGHT S.A.S. prestaron servicios con prioridad para ParetoMed: (a) **Efrain**, fotografo y editor audiovisual, quien participaba en grabaciones, revision de equipos, edicion de videoclases y busqueda de insumos tecnicos. Pedro ofrecio su dedicacion exclusiva al negocio: *"que Efrain se dedique 100% a eso y entre el y yo se podemos sacarlo adelante"* (04/11/2024). Oscar interactuaba directamente con Efrain, le enviaba archivos y solicitaba su correo: *"Hey, recuerdame el correo de Efrain para enviar la animacion tambien alli"* (22/11/2024). Oscar ofrecio pagar a Efrain: *"si es con Efrain en lo posible nos quede mas barato que 1,5"* (04/11/2024); y (b) **Paul**, comunicador social, quien apoyaba carga de contenido a plataformas, revision de guiones y proceso de ventas. Pedro: *"se lo deje a Paul para que aprendiera a hacerlo"* (18/03/2025). En el grupo de equipo: *"Paul el comunicador social los reviso tambien"* (28/04/2025). Paul gestionaba accesos con Oscar: *"Te esta escribiendo Paul... Para seguir subiendo a YouTube y tiktok estamos bloqueados"* (13/08/2025). Que Pedro pusiera a disposicion del negocio a sus propios empleados, asumiendo su costo laboral, constituye un aporte en industria propio de un socio, no de un contratista. **[P-02, P-03, P-04, P-39]**', 
            '<p><strong>HECHO DECIMOSEPTIMO.</strong> Pedro aporto recurso humano propio al negocio. Dos trabajadores de su empresa DOCTOR FLIGHT S.A.S. prestaron servicios con prioridad para ParetoMed: (a) <strong>Efrain</strong>, fotografo y editor audiovisual, quien participaba en grabaciones, revision de equipos, edicion de videoclases y busqueda de insumos tecnicos. Pedro ofrecio su dedicacion exclusiva al negocio: <em>&quot;que Efrain se dedique 100% a eso y entre el y yo se podemos sacarlo adelante&quot;</em> (04/11/2024). Oscar interactuaba directamente con Efrain, le enviaba archivos y solicitaba su correo: <em>&quot;Hey, recuerdame el correo de Efrain para enviar la animacion tambien alli&quot;</em> (22/11/2024). Oscar ofrecio pagar a Efrain: <em>&quot;si es con Efrain en lo posible nos quede mas barato que 1,5&quot;</em> (04/11/2024); y (b) <strong>Paul</strong>, comunicador social, quien apoyaba carga de contenido a plataformas, revision de guiones y proceso de ventas. Pedro: <em>&quot;se lo deje a Paul para que aprendiera a hacerlo&quot;</em> (18/03/2025). En el grupo de equipo: <em>&quot;Paul el comunicador social los reviso tambien&quot;</em> (28/04/2025). Paul gestionaba accesos con Oscar: <em>&quot;Te esta escribiendo Paul... Para seguir subiendo a YouTube y tiktok estamos bloqueados&quot;</em> (13/08/2025). Que Pedro pusiera a disposicion del negocio a sus propios empleados, asumiendo su costo laboral, constituye un aporte en industria propio de un socio, no de un contratista. <strong>[P-02, P-03, P-04, P-39]</strong></p>
', 
            'Recurso humano aportado — Efraín y Paul', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-18', 
            18, 
            'DECIMOCTAVO', 
            'cap-4', 
            'Desde el primer mes de operacion conjunta (mayo 2024), Oscar calculaba el porcentaje de Pedro sobre la **ganancia neta** del negocio, desglosando ingresos y egresos antes de aplicar el 20%. El 7 de mayo de 2024, Oscar envio la primera liquidacion det...', 
            '**HECHO DECIMOCTAVO.** Desde el primer mes de operacion conjunta (mayo 2024), Oscar calculaba el porcentaje de Pedro sobre la **ganancia neta** del negocio, desglosando ingresos y egresos antes de aplicar el 20%. El 7 de mayo de 2024, Oscar envio la primera liquidacion detallada: *"Ingresos: 10,889,303. Egresos: 3,872,653. Ganancia: 7,016,650. Porcentaje de Pedro: 7,016,650 x 0,20 = 1,403,330"*. **[P-02, P-13]**', 
            '<p><strong>HECHO DECIMOCTAVO.</strong> Desde el primer mes de operacion conjunta (mayo 2024), Oscar calculaba el porcentaje de Pedro sobre la <strong>ganancia neta</strong> del negocio, desglosando ingresos y egresos antes de aplicar el 20%. El 7 de mayo de 2024, Oscar envio la primera liquidacion detallada: <em>&quot;Ingresos: 10,889,303. Egresos: 3,872,653. Ganancia: 7,016,650. Porcentaje de Pedro: 7,016,650 x 0,20 = 1,403,330&quot;</em>. <strong>[P-02, P-13]</strong></p>
', 
            'Creación de canales digitales de ParetoMed', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-19', 
            19, 
            'DECIMONOVENO', 
            'cap-4', 
            'Los montos pagados a Pedro variaban cada mes segun la rentabilidad del negocio, lo que es consistente con participacion en utilidades y NO con honorarios fijos por prestacion de servicios. Se acreditan **14 transferencias bancarias** de la cuenta de ...', 
            '**HECHO DECIMONOVENO.** Los montos pagados a Pedro variaban cada mes segun la rentabilidad del negocio, lo que es consistente con participacion en utilidades y NO con honorarios fijos por prestacion de servicios. Se acreditan **14 transferencias bancarias** de la cuenta de OSCAR MALDONADO a la cuenta Bancolombia **4483 de Pedro Vergara, por un total de $99.319.834 COP:

### Transferencias 2024:
| Fecha transferencia | Monto | Observacion |
|---------------------|-------|-------------|
| 07/05/2024 | $1.403.330 | Correspondiente a mayo 2024 |
| 07/06/2024 | $1.695.423 | Correspondiente a junio 2024 |
| 01/07/2024 | $4.381.509 | Correspondiente a julio 2024 |
| 05/08/2024 | $6.315.738 | Correspondiente a agosto 2024 |
| 19/08/2024 | $100.000 | Pago adicional agosto 2024 |
| 03/09/2024 | $4.190.223 | Correspondiente a septiembre 2024 |
| 04/10/2024 | $6.280.685 | Correspondiente a octubre 2024 |
| **Subtotal 2024** | **$24.366.908** | |

### Transferencias 2025:
| Fecha transferencia | Monto | Observacion |
|---------------------|-------|-------------|
| 05/02/2025 | $16.726.760 | Correspondiente a enero 2025 (20% de $83.633.800 de rentabilidad) |
| 06/03/2025 | $13.422.192 | Correspondiente a febrero 2025 |
| 03/04/2025 | $10.865.364 | Correspondiente a marzo 2025 |
| 09/05/2025 | $12.700.000 | Correspondiente a abril 2025 |
| 06/06/2025 | $8.298.000 | Correspondiente a mayo 2025 |
| 02/07/2025 | $5.490.610 | Correspondiente a junio 2025 |
| 05/08/2025 | $7.450.000 | Correspondiente a julio 2025 |
| **Subtotal 2025** | **$74.952.926** | |

| **TOTAL GENERAL** | **$99.319.834** | **14 transferencias documentadas** |

Las cuentas de cobro NO dicen "prestacion de servicios". El objeto es generico: "gestion de redes y campanas publicitarias paretomed_1". Las transferencias estan acreditadas con capturas de pantalla de mensajes SMS de Bancolombia. **[P-12, P-13, P-02, P-36, PAGOS 1-4]**', 
            '<p><strong>HECHO DECIMONOVENO.</strong> Los montos pagados a Pedro variaban cada mes segun la rentabilidad del negocio, lo que es consistente con participacion en utilidades y NO con honorarios fijos por prestacion de servicios. Se acreditan <strong>14 transferencias bancarias</strong> de la cuenta de OSCAR MALDONADO a la cuenta Bancolombia **4483 de Pedro Vergara, por un total de $99.319.834 COP:</p>
<h3>Transferencias 2024:</h3>
<table>
<thead>
<tr>
<th>Fecha transferencia</th>
<th>Monto</th>
<th>Observacion</th>
</tr>
</thead>
<tbody>
<tr>
<td>07/05/2024</td>
<td>$1.403.330</td>
<td>Correspondiente a mayo 2024</td>
</tr>
<tr>
<td>07/06/2024</td>
<td>$1.695.423</td>
<td>Correspondiente a junio 2024</td>
</tr>
<tr>
<td>01/07/2024</td>
<td>$4.381.509</td>
<td>Correspondiente a julio 2024</td>
</tr>
<tr>
<td>05/08/2024</td>
<td>$6.315.738</td>
<td>Correspondiente a agosto 2024</td>
</tr>
<tr>
<td>19/08/2024</td>
<td>$100.000</td>
<td>Pago adicional agosto 2024</td>
</tr>
<tr>
<td>03/09/2024</td>
<td>$4.190.223</td>
<td>Correspondiente a septiembre 2024</td>
</tr>
<tr>
<td>04/10/2024</td>
<td>$6.280.685</td>
<td>Correspondiente a octubre 2024</td>
</tr>
<tr>
<td><strong>Subtotal 2024</strong></td>
<td><strong>$24.366.908</strong></td>
<td></td>
</tr>
</tbody>
</table>
<h3>Transferencias 2025:</h3>
<table>
<thead>
<tr>
<th>Fecha transferencia</th>
<th>Monto</th>
<th>Observacion</th>
</tr>
</thead>
<tbody>
<tr>
<td>05/02/2025</td>
<td>$16.726.760</td>
<td>Correspondiente a enero 2025 (20% de $83.633.800 de rentabilidad)</td>
</tr>
<tr>
<td>06/03/2025</td>
<td>$13.422.192</td>
<td>Correspondiente a febrero 2025</td>
</tr>
<tr>
<td>03/04/2025</td>
<td>$10.865.364</td>
<td>Correspondiente a marzo 2025</td>
</tr>
<tr>
<td>09/05/2025</td>
<td>$12.700.000</td>
<td>Correspondiente a abril 2025</td>
</tr>
<tr>
<td>06/06/2025</td>
<td>$8.298.000</td>
<td>Correspondiente a mayo 2025</td>
</tr>
<tr>
<td>02/07/2025</td>
<td>$5.490.610</td>
<td>Correspondiente a junio 2025</td>
</tr>
<tr>
<td>05/08/2025</td>
<td>$7.450.000</td>
<td>Correspondiente a julio 2025</td>
</tr>
<tr>
<td><strong>Subtotal 2025</strong></td>
<td><strong>$74.952.926</strong></td>
<td></td>
</tr>
</tbody>
</table>
<p>| <strong>TOTAL GENERAL</strong> | <strong>$99.319.834</strong> | <strong>14 transferencias documentadas</strong> |</p>
<p>Las cuentas de cobro NO dicen &quot;prestacion de servicios&quot;. El objeto es generico: &quot;gestion de redes y campanas publicitarias paretomed_1&quot;. Las transferencias estan acreditadas con capturas de pantalla de mensajes SMS de Bancolombia. <strong>[P-12, P-13, P-02, P-36, PAGOS 1-4]</strong></p>
', 
            'Edición audiovisual y control de calidad', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-20', 
            20, 
            'VIGESIMO', 
            'cap-4', 
            'Los pagos fueron sistematicos, mensuales y variables. El monto mas bajo fue $100.000 (pago adicional) y el mas alto fue $16.726.760 (enero 2025). Esta variabilidad extrema (de $1.4M a $16.7M) es totalmente inconsistente con honorarios fijos por prest...', 
            '**HECHO VIGESIMO.** Los pagos fueron sistematicos, mensuales y variables. El monto mas bajo fue $100.000 (pago adicional) y el mas alto fue $16.726.760 (enero 2025). Esta variabilidad extrema (de $1.4M a $16.7M) es totalmente inconsistente con honorarios fijos por prestacion de servicios y solo se explica como participacion proporcional (20%) en utilidades variables. Esta misma variabilidad se observa en las facturas emitidas por Pedro a traves de Doctor Flight S.A.S. **[P-16]**, donde los montos facturados fluctuaban mensualmente en funcion de las utilidades del negocio — reforzando que el pago era proporcional a la rentabilidad, no una tarifa fija. Si se proyecta que Pedro recibia el 20%, los ingresos netos del negocio durante este periodo serian de aproximadamente **$496.599.170 COP** ($99.319.834 / 0.20). **[P-36, PAGOS 1-4, P-16]**

---', 
            '<p><strong>HECHO VIGESIMO.</strong> Los pagos fueron sistematicos, mensuales y variables. El monto mas bajo fue $100.000 (pago adicional) y el mas alto fue $16.726.760 (enero 2025). Esta variabilidad extrema (de $1.4M a $16.7M) es totalmente inconsistente con honorarios fijos por prestacion de servicios y solo se explica como participacion proporcional (20%) en utilidades variables. Esta misma variabilidad se observa en las facturas emitidas por Pedro a traves de Doctor Flight S.A.S. <strong>[P-16]</strong>, donde los montos facturados fluctuaban mensualmente en funcion de las utilidades del negocio — reforzando que el pago era proporcional a la rentabilidad, no una tarifa fija. Si se proyecta que Pedro recibia el 20%, los ingresos netos del negocio durante este periodo serian de aproximadamente <strong>$496.599.170 COP</strong> ($99.319.834 / 0.20). <strong>[P-36, PAGOS 1-4, P-16]</strong></p>
<hr>
', 
            'Registro DNDA — 238 obras audiovisuales', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-21', 
            21, 
            'VIGESIMOPRIMERO', 
            'cap-5', 
            'Oscar Maldonado reconocio expresamente la existencia de la sociedad en grabacion telefonica del 14 de agosto de 2025: *"O sea de que estamos trabajando juntos comercializando un proyecto y que nos llamabamos socios SI claramente claramente"*. En la m...', 
            '**HECHO VIGESIMOPRIMERO.** Oscar Maldonado reconocio expresamente la existencia de la sociedad en grabacion telefonica del 14 de agosto de 2025: *"O sea de que estamos trabajando juntos comercializando un proyecto y que nos llamabamos socios SI claramente claramente"*. En la misma grabacion, Oscar admitio que presento a Pedro como socio ante terceros: *"como te presente yo con el man de alla de Coventus, le dije ey te presento a mi socio"*. **[P-01]**', 
            '<p><strong>HECHO VIGESIMOPRIMERO.</strong> Oscar Maldonado reconocio expresamente la existencia de la sociedad en grabacion telefonica del 14 de agosto de 2025: <em>&quot;O sea de que estamos trabajando juntos comercializando un proyecto y que nos llamabamos socios SI claramente claramente&quot;</em>. En la misma grabacion, Oscar admitio que presento a Pedro como socio ante terceros: <em>&quot;como te presente yo con el man de alla de Coventus, le dije ey te presento a mi socio&quot;</em>. <strong>[P-01]</strong></p>
', 
            'Confesión: "nos llamábamos socios"', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-22', 
            22, 
            'VIGESIMOSEGUNDO', 
            'cap-5', 
            'En la misma grabacion, Oscar reconocio que el pacto incluia acciones: *"si claramente estaba implicito que tu ibas a formar parte de la SAS. eso yo no te lo niego en ningun momento claramente"*. Y admitio que consulto a sus propios asesores legales y...', 
            '**HECHO VIGESIMOSEGUNDO.** En la misma grabacion, Oscar reconocio que el pacto incluia acciones: *"si claramente estaba implicito que tu ibas a formar parte de la SAS. eso yo no te lo niego en ningun momento claramente"*. Y admitio que consulto a sus propios asesores legales y contables sobre la situacion: *"yo quiero honrar el acuerdo contigo... los abogados y contadores me dijeron, ey... si que sociedad de hecho con el man, pero tu puedes cortarlo"*. Aun cuando Oscar alega que sus asesores le dijeron que podia "cortarlo", el hecho mismo de que Oscar consultara abogados sobre una "sociedad de hecho" demuestra que Oscar RECONOCIA que existia una sociedad de hecho que requeria asesoria legal para terminar. Si no hubiera sociedad, no habria nada que "cortar." **[P-01]**', 
            '<p><strong>HECHO VIGESIMOSEGUNDO.</strong> En la misma grabacion, Oscar reconocio que el pacto incluia acciones: <em>&quot;si claramente estaba implicito que tu ibas a formar parte de la SAS. eso yo no te lo niego en ningun momento claramente&quot;</em>. Y admitio que consulto a sus propios asesores legales y contables sobre la situacion: <em>&quot;yo quiero honrar el acuerdo contigo... los abogados y contadores me dijeron, ey... si que sociedad de hecho con el man, pero tu puedes cortarlo&quot;</em>. Aun cuando Oscar alega que sus asesores le dijeron que podia &quot;cortarlo&quot;, el hecho mismo de que Oscar consultara abogados sobre una &quot;sociedad de hecho&quot; demuestra que Oscar RECONOCIA que existia una sociedad de hecho que requeria asesoria legal para terminar. Si no hubiera sociedad, no habria nada que &quot;cortar.&quot; <strong>[P-01]</strong></p>
', 
            'Confesión: "ibas a formar parte de la SAS"', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-23', 
            23, 
            'VIGESIMOTERCERO', 
            'cap-5', 
            'Oscar manifesto en multiples ocasiones por WhatsApp su voluntad de formalizar la sociedad existente: (a) el 1 de julio de 2024: *"tenemos que reunirnos para que hablemos bien de las condiciones que necesito para que legalicemos la cosa"*; (b) el 28 d...', 
            '**HECHO VIGESIMOTERCERO.** Oscar manifesto en multiples ocasiones por WhatsApp su voluntad de formalizar la sociedad existente: (a) el 1 de julio de 2024: *"tenemos que reunirnos para que hablemos bien de las condiciones que necesito para que legalicemos la cosa"*; (b) el 28 de noviembre de 2024: *"le pedi a mi papa que es abogado que le pegara una revisada... tu sabes que yo voy pa'' lante con la sociedad"*; (c) el 13 de enero de 2025: *"lo que vamos a hacer es constituir la SAS y ahi iriamos como socios"*. **[P-02]**', 
            '<p><strong>HECHO VIGESIMOTERCERO.</strong> Oscar manifesto en multiples ocasiones por WhatsApp su voluntad de formalizar la sociedad existente: (a) el 1 de julio de 2024: <em>&quot;tenemos que reunirnos para que hablemos bien de las condiciones que necesito para que legalicemos la cosa&quot;</em>; (b) el 28 de noviembre de 2024: <em>&quot;le pedi a mi papa que es abogado que le pegara una revisada... tu sabes que yo voy pa'' lante con la sociedad&quot;</em>; (c) el 13 de enero de 2025: <em>&quot;lo que vamos a hacer es constituir la SAS y ahi iriamos como socios&quot;</em>. <strong>[P-02]</strong></p>
', 
            'Oscar promete formalizar la sociedad', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-24', 
            24, 
            'VIGESIMOCUARTO', 
            'cap-5', 
            'Pedro reivindico constantemente su calidad de socio. El 18 de julio de 2025: *"yo soy socio, no trabajador tuyo... si quieres un vale que haga todo lo que tu digas... vas a tener que contratarlo"*. El 23 de julio de 2025: *"no deberias poder tomar de...', 
            '**HECHO VIGESIMOCUARTO.** Pedro reivindico constantemente su calidad de socio. El 18 de julio de 2025: *"yo soy socio, no trabajador tuyo... si quieres un vale que haga todo lo que tu digas... vas a tener que contratarlo"*. El 23 de julio de 2025: *"no deberias poder tomar decisiones sin compartirmelas y recibir mi opinion antes, porque para algo es una sociedad"*. Significativamente, cuando Pedro afirmo su calidad de socio, Oscar NO lo nego en su respuesta posterior ese mismo dia, sino que desvio la conversacion hacia otros temas — lo que constituye un reconocimiento tacito por omision de la calidad de socio invocada por Pedro. **[P-02]**', 
            '<p><strong>HECHO VIGESIMOCUARTO.</strong> Pedro reivindico constantemente su calidad de socio. El 18 de julio de 2025: <em>&quot;yo soy socio, no trabajador tuyo... si quieres un vale que haga todo lo que tu digas... vas a tener que contratarlo&quot;</em>. El 23 de julio de 2025: <em>&quot;no deberias poder tomar decisiones sin compartirmelas y recibir mi opinion antes, porque para algo es una sociedad&quot;</em>. Significativamente, cuando Pedro afirmo su calidad de socio, Oscar NO lo nego en su respuesta posterior ese mismo dia, sino que desvio la conversacion hacia otros temas — lo que constituye un reconocimiento tacito por omision de la calidad de socio invocada por Pedro. <strong>[P-02]</strong></p>
', 
            'Pedro reivindica su calidad de socio', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-25', 
            25, 
            'VIGESIMOQUINTO', 
            'cap-5', 
            'En el Acuerdo de Socios Original con Aportes de Ambos, aportado en julio de 2024 (nunca firmado), Oscar escribio de su puno y letra las siguientes notas: (a) *"20% de las utilidades no se justifican por una labor que es contratable. La idea, como se ...', 
            '**HECHO VIGESIMOQUINTO.** En el Acuerdo de Socios Original con Aportes de Ambos, aportado en julio de 2024 (nunca firmado), Oscar escribio de su puno y letra las siguientes notas: (a) *"20% de las utilidades no se justifican por una labor que es contratable. La idea, como se planteo en las discusiones verbales iniciales, es que ademas trabaje para impulsar con nuevas ideas y trabajar DE LLENO en esta"*; (b) *"Recordar lo que propuse en el acuerdo inicial e informal donde especificaba: ''Funciones que Pedro considere necesarias para el crecimiento de la empresa''"*; (c) *"las ideas, vision, estrategia y trabajo para el crecimiento de la empresa son las que justifican la participacion accionaria."* Con estas notas, Oscar reconocio TEXTUALMENTE tres cosas: (i) que lo que Pedro hacia NO ERA una simple prestacion de servicios contratable; (ii) que EXISTIERON **discusiones verbales iniciales** y un **acuerdo inicial e informal** previos al documento escrito — es decir, el pacto verbal que constituyo la sociedad de hecho; y (iii) que la participacion de Pedro se justificaba por su rol estrategico, no por labores operativas. **[P-09]**

---', 
            '<p><strong>HECHO VIGESIMOQUINTO.</strong> En el Acuerdo de Socios Original con Aportes de Ambos, aportado en julio de 2024 (nunca firmado), Oscar escribio de su puno y letra las siguientes notas: (a) <em>&quot;20% de las utilidades no se justifican por una labor que es contratable. La idea, como se planteo en las discusiones verbales iniciales, es que ademas trabaje para impulsar con nuevas ideas y trabajar DE LLENO en esta&quot;</em>; (b) <em>&quot;Recordar lo que propuse en el acuerdo inicial e informal donde especificaba: ''Funciones que Pedro considere necesarias para el crecimiento de la empresa''&quot;</em>; (c) <em>&quot;las ideas, vision, estrategia y trabajo para el crecimiento de la empresa son las que justifican la participacion accionaria.&quot;</em> Con estas notas, Oscar reconocio TEXTUALMENTE tres cosas: (i) que lo que Pedro hacia NO ERA una simple prestacion de servicios contratable; (ii) que EXISTIERON <strong>discusiones verbales iniciales</strong> y un <strong>acuerdo inicial e informal</strong> previos al documento escrito — es decir, el pacto verbal que constituyo la sociedad de hecho; y (iii) que la participacion de Pedro se justificaba por su rol estrategico, no por labores operativas. <strong>[P-09]</strong></p>
<hr>
', 
            'Nota manuscrita: "no es labor contratable"', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-26', 
            26, 
            'VIGESIMOSEXTO', 
            'cap-6', 
            'Pedro participaba activamente en decisiones estrategicas propias de un socio, no de un empleado o contratista: (a) **gestion de personal:** evaluo el desempeno de la asesora de ventas Adriana y propuso su reemplazo, propuso la incorporacion de un ven...', 
            '**HECHO VIGESIMOSEXTO.** Pedro participaba activamente en decisiones estrategicas propias de un socio, no de un empleado o contratista: (a) **gestion de personal:** evaluo el desempeno de la asesora de ventas Adriana y propuso su reemplazo, propuso la incorporacion de un vendedor adicional (Paul), participo en la induccion de Isabella; (b) **estrategia de producto:** propuso organizar el programa en ciclos de 3 meses (90 dias) para resolver la dificultad de sincronicidad entre estudiantes, creo grupos de estudio semanales (posteriormente reemplazados por talleres dominicales ~agosto 2024), diseno sistema de simulacros pre y post estudio; (c) **marketing y ventas:** manejaba presupuesto de pauta en Meta, decidia que campanas activar o desactivar, configuraba pixel de Meta, entrenaba directamente a la asesora de ventas; (d) **decisiones de producto:** participaba en evaluacion de pasarelas de pago (Wompi, Bold) y co-definia precios del programa con Oscar. **[P-02, P-03, P-33, P-34]**', 
            '<p><strong>HECHO VIGESIMOSEXTO.</strong> Pedro participaba activamente en decisiones estrategicas propias de un socio, no de un empleado o contratista: (a) <strong>gestion de personal:</strong> evaluo el desempeno de la asesora de ventas Adriana y propuso su reemplazo, propuso la incorporacion de un vendedor adicional (Paul), participo en la induccion de Isabella; (b) <strong>estrategia de producto:</strong> propuso organizar el programa en ciclos de 3 meses (90 dias) para resolver la dificultad de sincronicidad entre estudiantes, creo grupos de estudio semanales (posteriormente reemplazados por talleres dominicales ~agosto 2024), diseno sistema de simulacros pre y post estudio; (c) <strong>marketing y ventas:</strong> manejaba presupuesto de pauta en Meta, decidia que campanas activar o desactivar, configuraba pixel de Meta, entrenaba directamente a la asesora de ventas; (d) <strong>decisiones de producto:</strong> participaba en evaluacion de pasarelas de pago (Wompi, Bold) y co-definia precios del programa con Oscar. <strong>[P-02, P-03, P-33, P-34]</strong></p>
', 
            'Co-decisiones estratégicas documentadas', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-27', 
            27, 
            'VIGESIMOSEPTIMO', 
            'cap-6', 
            'La co-direccion del negocio se evidencia en al menos 7 reuniones documentadas en 2025:', 
            '**HECHO VIGESIMOSEPTIMO.** La co-direccion del negocio se evidencia en al menos 7 reuniones documentadas en 2025:

| Fecha | Tema | Rol de Pedro |
|-------|------|-------------|
| 16 mayo | Discrepancia de leads | Lidera cambio de campanas WhatsApp a formularios |
| 11 junio | Estructura comercial | Supervisa presupuesto publicitario, entrena asesora, propone nuevo vendedor |
| 13 junio | Proceso de ventas | Diagnostica baja asistencia a citas, propone mejoras |
| 16 junio | Optimizacion | Impulsa cobro por semana de prueba, optimiza CRM |
| 27 junio | Modelo de negocio | Evalua modelo hibrido con consultor externo como co-decisor |
| 14 julio | Producto y tecnologia | Debate sobre herramientas tecnologicas, reestructura presentacion de ventas |
| 18 julio | Roles y estructura | Reafirma calidad de socio ante Oscar |

**[P-34]**', 
            '<p><strong>HECHO VIGESIMOSEPTIMO.</strong> La co-direccion del negocio se evidencia en al menos 7 reuniones documentadas en 2025:</p>
<table>
<thead>
<tr>
<th>Fecha</th>
<th>Tema</th>
<th>Rol de Pedro</th>
</tr>
</thead>
<tbody>
<tr>
<td>16 mayo</td>
<td>Discrepancia de leads</td>
<td>Lidera cambio de campanas WhatsApp a formularios</td>
</tr>
<tr>
<td>11 junio</td>
<td>Estructura comercial</td>
<td>Supervisa presupuesto publicitario, entrena asesora, propone nuevo vendedor</td>
</tr>
<tr>
<td>13 junio</td>
<td>Proceso de ventas</td>
<td>Diagnostica baja asistencia a citas, propone mejoras</td>
</tr>
<tr>
<td>16 junio</td>
<td>Optimizacion</td>
<td>Impulsa cobro por semana de prueba, optimiza CRM</td>
</tr>
<tr>
<td>27 junio</td>
<td>Modelo de negocio</td>
<td>Evalua modelo hibrido con consultor externo como co-decisor</td>
</tr>
<tr>
<td>14 julio</td>
<td>Producto y tecnologia</td>
<td>Debate sobre herramientas tecnologicas, reestructura presentacion de ventas</td>
</tr>
<tr>
<td>18 julio</td>
<td>Roles y estructura</td>
<td>Reafirma calidad de socio ante Oscar</td>
</tr>
</tbody>
</table>
<p><strong>[P-34]</strong></p>
', 
            'Siete reuniones documentadas en 2025', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-28', 
            28, 
            'VIGESIMOCTAVO', 
            'cap-6', 
            'El negocio genero ingresos totales de **$709.010.075 COP** en 15 meses de operacion conjunta (junio 2024 - agosto 2025), con un promedio mensual de $47.267.338 COP. El mejor mes fue noviembre de 2024, cuando Oscar anuncio al equipo: *"$108.456.900 en...', 
            '**HECHO VIGESIMOCTAVO.** El negocio genero ingresos totales de **$709.010.075 COP** en 15 meses de operacion conjunta (junio 2024 - agosto 2025), con un promedio mensual de $47.267.338 COP. El mejor mes fue noviembre de 2024, cuando Oscar anuncio al equipo: *"$108.456.900 en ventas a fecha de hoy"*. En enero 2025, las ventas fueron de $94.427.575 COP. **[P-02, P-03]**

---', 
            '<p><strong>HECHO VIGESIMOCTAVO.</strong> El negocio genero ingresos totales de <strong>$709.010.075 COP</strong> en 15 meses de operacion conjunta (junio 2024 - agosto 2025), con un promedio mensual de $47.267.338 COP. El mejor mes fue noviembre de 2024, cuando Oscar anuncio al equipo: <em>&quot;$108.456.900 en ventas a fecha de hoy&quot;</em>. En enero 2025, las ventas fueron de $94.427.575 COP. <strong>[P-02, P-03]</strong></p>
<hr>
', 
            '$709M en ingresos — 15 meses de operación', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-29', 
            29, 
            'VIGESIMONOVENO', 
            'cap-7', 
            'La sociedad de hecho opero por aproximadamente **16 meses**: desde el 15 de abril de 2024 (fecha en que Pedro recordo a Oscar el inicio de los pagos y solicitaron definir presupuesto de publicidad) hasta el 28 de agosto de 2025 (fecha en que Oscar ac...', 
            '**HECHO VIGESIMONOVENO.** La sociedad de hecho opero por aproximadamente **16 meses**: desde el 15 de abril de 2024 (fecha en que Pedro recordo a Oscar el inicio de los pagos y solicitaron definir presupuesto de publicidad) hasta el 28 de agosto de 2025 (fecha en que Oscar acepto formalmente la terminacion de la relacion propuesta por Pedro). **[P-02]**

---', 
            '<p><strong>HECHO VIGESIMONOVENO.</strong> La sociedad de hecho opero por aproximadamente <strong>16 meses</strong>: desde el 15 de abril de 2024 (fecha en que Pedro recordo a Oscar el inicio de los pagos y solicitaron definir presupuesto de publicidad) hasta el 28 de agosto de 2025 (fecha en que Oscar acepto formalmente la terminacion de la relacion propuesta por Pedro). <strong>[P-02]</strong></p>
<hr>
', 
            'Duración: 16 meses de sociedad de hecho', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-30', 
            30, 
            'TRIGESIMO', 
            'cap-8', 
            'Pedro presiono reiteradamente para formalizar la sociedad: (a) el 15 de julio de 2024, Pedro solicito el borrador del acuerdo; (b) el 28 de noviembre de 2024, Pedro solicito firmar y Oscar pidio tiempo porque su padre (abogado) estaba revisando: *"no...', 
            '**HECHO TRIGESIMO.** Pedro presiono reiteradamente para formalizar la sociedad: (a) el 15 de julio de 2024, Pedro solicito el borrador del acuerdo; (b) el 28 de noviembre de 2024, Pedro solicito firmar y Oscar pidio tiempo porque su padre (abogado) estaba revisando: *"no vayas a pensar que te estoy mamando gallo"*; (c) el 3 de enero de 2025, Pedro: *"pilas con el acuerdo que estamos demorados"*; (d) el 8 de enero de 2025, Pedro: *"Ya ha pasado buen tiempo compadre... el objetivo desde un principio no era solo % de ganancia neta sino acciones en la empresa"*. La demora sistematica en la formalizacion fue atribuible a Oscar, no a Pedro. **[P-02]**', 
            '<p><strong>HECHO TRIGESIMO.</strong> Pedro presiono reiteradamente para formalizar la sociedad: (a) el 15 de julio de 2024, Pedro solicito el borrador del acuerdo; (b) el 28 de noviembre de 2024, Pedro solicito firmar y Oscar pidio tiempo porque su padre (abogado) estaba revisando: <em>&quot;no vayas a pensar que te estoy mamando gallo&quot;</em>; (c) el 3 de enero de 2025, Pedro: <em>&quot;pilas con el acuerdo que estamos demorados&quot;</em>; (d) el 8 de enero de 2025, Pedro: <em>&quot;Ya ha pasado buen tiempo compadre... el objetivo desde un principio no era solo % de ganancia neta sino acciones en la empresa&quot;</em>. La demora sistematica en la formalizacion fue atribuible a Oscar, no a Pedro. <strong>[P-02]</strong></p>
', 
            'Pedro presiona reiteradamente para formalizar', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-31', 
            31, 
            'TRIGESIMOPRIMERO', 
            'cap-8', 
            'Existieron multiples borradores de acuerdo que confirman la naturaleza societaria: (a) el Acuerdo de Socios Original (inicios 2024) contemplaba **"20% de las acciones"** de la empresa; (b) el Acuerdo de Socios propuesto por Oscar en version SAS inclu...', 
            '**HECHO TRIGESIMOPRIMERO.** Existieron multiples borradores de acuerdo que confirman la naturaleza societaria: (a) el Acuerdo de Socios Original (inicios 2024) contemplaba **"20% de las acciones"** de la empresa; (b) el Acuerdo de Socios propuesto por Oscar en version SAS incluia participacion del 20%, funciones detalladas de Pedro y asiento en consejo de administracion; (c) el Acuerdo de Socios con Aportes de Ambos (julio 2024) con notas manuscritas de Oscar. Ninguno se firmo por dilacion de Oscar. **[P-06, P-08, P-09]**

### B. Alteracion documental', 
            '<p><strong>HECHO TRIGESIMOPRIMERO.</strong> Existieron multiples borradores de acuerdo que confirman la naturaleza societaria: (a) el Acuerdo de Socios Original (inicios 2024) contemplaba <strong>&quot;20% de las acciones&quot;</strong> de la empresa; (b) el Acuerdo de Socios propuesto por Oscar en version SAS incluia participacion del 20%, funciones detalladas de Pedro y asiento en consejo de administracion; (c) el Acuerdo de Socios con Aportes de Ambos (julio 2024) con notas manuscritas de Oscar. Ninguno se firmo por dilacion de Oscar. <strong>[P-06, P-08, P-09]</strong></p>
<h3>B. Alteracion documental</h3>
', 
            'Múltiples borradores de acuerdo nunca firmados', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-32', 
            32, 
            'TRIGESIMOSEGUNDO', 
            'cap-8', 
            'Aproximadamente 10 dias antes del 14 de agosto de 2025, un "usuario anonimo" modifico el borrador del acuerdo de socios en Google Docs, reemplazando la palabra **"acciones"** por **"utilidades"**. Pedro descubrio el cambio mediante el historial de ve...', 
            '**HECHO TRIGESIMOSEGUNDO.** Aproximadamente 10 dias antes del 14 de agosto de 2025, un "usuario anonimo" modifico el borrador del acuerdo de socios en Google Docs, reemplazando la palabra **"acciones"** por **"utilidades"**. Pedro descubrio el cambio mediante el historial de versiones y confronto a Oscar: *"le tachaste acciones por utilidades, creo que no hay evidencia mas clara que eso... a ojo inexperto no tiene ninguna caracteristica de buena fe"*. Oscar respondio: *"Compa, y de esto no fue mala intencion. Simplemente es un borrador que nunca se firmo"*. Posteriormente, Oscar intento equiparar ambos conceptos: *"acciones de una sociedad que gestiona un bien, en este caso es igual a utilidades"*, lo que contradice la necesidad del cambio. **[P-06, P-07, P-02]**

### C. Intentos de reclasificacion de la relacion', 
            '<p><strong>HECHO TRIGESIMOSEGUNDO.</strong> Aproximadamente 10 dias antes del 14 de agosto de 2025, un &quot;usuario anonimo&quot; modifico el borrador del acuerdo de socios en Google Docs, reemplazando la palabra <strong>&quot;acciones&quot;</strong> por <strong>&quot;utilidades&quot;</strong>. Pedro descubrio el cambio mediante el historial de versiones y confronto a Oscar: <em>&quot;le tachaste acciones por utilidades, creo que no hay evidencia mas clara que eso... a ojo inexperto no tiene ninguna caracteristica de buena fe&quot;</em>. Oscar respondio: <em>&quot;Compa, y de esto no fue mala intencion. Simplemente es un borrador que nunca se firmo&quot;</em>. Posteriormente, Oscar intento equiparar ambos conceptos: <em>&quot;acciones de una sociedad que gestiona un bien, en este caso es igual a utilidades&quot;</em>, lo que contradice la necesidad del cambio. <strong>[P-06, P-07, P-02]</strong></p>
<h3>C. Intentos de reclasificacion de la relacion</h3>
', 
            'Alteración documental — "acciones" por "utilidades"', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-33', 
            33, 
            'TRIGESIMOTERCERO', 
            'cap-8', 
            'El 22 de agosto de 2025, Oscar entrego un **Contrato de Cuentas en Participacion** (nunca firmado) en el que intenta reclasificar a Pedro como "Socio Oculto" y a si mismo como "Socio Gestor". El contrato incluye una clausula que niega expresamente la...', 
            '**HECHO TRIGESIMOTERCERO.** El 22 de agosto de 2025, Oscar entrego un **Contrato de Cuentas en Participacion** (nunca firmado) en el que intenta reclasificar a Pedro como "Socio Oculto" y a si mismo como "Socio Gestor". El contrato incluye una clausula que niega expresamente la sociedad de hecho: *"No es el interes de las Partes constituir una persona juridica distinta de estas individualmente consideradas, ni una sociedad de hecho"*. Sin embargo, contradictoriamente: (i) utiliza terminologia societaria ("Socio Gestor", "Socio Oculto", "aportes", "participacion"); (ii) reconoce que Pedro aportaba "experiencia en manejo de redes, edicion de videos, redaccion de guiones, grabacion de videoclases, asesoria en creacion de contenido y marketing, gestion de cuentas, optimizacion del tunel de ventas"; y (iii) reconoce el derecho de Pedro al "20% de las utilidades". Si no existiera sociedad, no seria necesario negarla expresamente. **[P-14]**

---', 
            '<p><strong>HECHO TRIGESIMOTERCERO.</strong> El 22 de agosto de 2025, Oscar entrego un <strong>Contrato de Cuentas en Participacion</strong> (nunca firmado) en el que intenta reclasificar a Pedro como &quot;Socio Oculto&quot; y a si mismo como &quot;Socio Gestor&quot;. El contrato incluye una clausula que niega expresamente la sociedad de hecho: <em>&quot;No es el interes de las Partes constituir una persona juridica distinta de estas individualmente consideradas, ni una sociedad de hecho&quot;</em>. Sin embargo, contradictoriamente: (i) utiliza terminologia societaria (&quot;Socio Gestor&quot;, &quot;Socio Oculto&quot;, &quot;aportes&quot;, &quot;participacion&quot;); (ii) reconoce que Pedro aportaba &quot;experiencia en manejo de redes, edicion de videos, redaccion de guiones, grabacion de videoclases, asesoria en creacion de contenido y marketing, gestion de cuentas, optimizacion del tunel de ventas&quot;; y (iii) reconoce el derecho de Pedro al &quot;20% de las utilidades&quot;. Si no existiera sociedad, no seria necesario negarla expresamente. <strong>[P-14]</strong></p>
<hr>
', 
            'Contrato de Cuentas en Participación niega sociedad', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-34', 
            34, 
            'TRIGESIMOCUARTO', 
            'cap-9', 
            'El 14 de agosto de 2025, tras descubrir la alteracion documental, Pedro propuso terminar la relacion por perdida de confianza. En la misma fecha, durante la grabacion de llamada telefonica, Oscar hizo las admisiones consignadas en los hechos vigesimo...', 
            '**HECHO TRIGESIMOCUARTO.** El 14 de agosto de 2025, tras descubrir la alteracion documental, Pedro propuso terminar la relacion por perdida de confianza. En la misma fecha, durante la grabacion de llamada telefonica, Oscar hizo las admisiones consignadas en los hechos vigesimoprimero y vigesimosegundo de este escrito, incluyendo que sus propios abogados y contadores le confirmaron la existencia de la sociedad de hecho. **[P-01, P-02]**', 
            '<p><strong>HECHO TRIGESIMOCUARTO.</strong> El 14 de agosto de 2025, tras descubrir la alteracion documental, Pedro propuso terminar la relacion por perdida de confianza. En la misma fecha, durante la grabacion de llamada telefonica, Oscar hizo las admisiones consignadas en los hechos vigesimoprimero y vigesimosegundo de este escrito, incluyendo que sus propios abogados y contadores le confirmaron la existencia de la sociedad de hecho. <strong>[P-01, P-02]</strong></p>
', 
            'Ruptura — 14 de agosto de 2025', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-35', 
            35, 
            'TRIGESIMOQUINTO', 
            'cap-9', 
            'El 28 de agosto de 2025, Oscar acepto formalmente la terminacion de la relacion. El 29 de agosto de 2025, Pedro envio la **Notificacion Formal de Cese de Explotacion**, solicitando a Oscar *"se abstenga de continuar con la explotacion de los activos ...', 
            '**HECHO TRIGESIMOQUINTO.** El 28 de agosto de 2025, Oscar acepto formalmente la terminacion de la relacion. El 29 de agosto de 2025, Pedro envio la **Notificacion Formal de Cese de Explotacion**, solicitando a Oscar *"se abstenga de continuar con la explotacion de los activos intangibles incluyendo pero no limitandose a metodos, contenido estatico, propiedad intelectual, videoclases, reels, videos comerciales entre otros aportados por mi persona o por mi empresa, DOCTOR FLIGHT S.A.S."* **[P-02, P-18]**

---', 
            '<p><strong>HECHO TRIGESIMOQUINTO.</strong> El 28 de agosto de 2025, Oscar acepto formalmente la terminacion de la relacion. El 29 de agosto de 2025, Pedro envio la <strong>Notificacion Formal de Cese de Explotacion</strong>, solicitando a Oscar <em>&quot;se abstenga de continuar con la explotacion de los activos intangibles incluyendo pero no limitandose a metodos, contenido estatico, propiedad intelectual, videoclases, reels, videos comerciales entre otros aportados por mi persona o por mi empresa, DOCTOR FLIGHT S.A.S.&quot;</em> <strong>[P-02, P-18]</strong></p>
<hr>
', 
            'Notificación formal de cese de explotación', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-36', 
            36, 
            'TRIGESIMOSEXTO', 
            'cap-10', 
            'Aproximadamente el 12 de septiembre de 2025, Oscar presento una propuesta de **Contrato de Transaccion** en la que ofrecio $40.000.000 COP como "suma transaccional", declaro la inexistencia de sociedad de hecho, exigio que toda la propiedad intelectu...', 
            '**HECHO TRIGESIMOSEXTO.** Aproximadamente el 12 de septiembre de 2025, Oscar presento una propuesta de **Contrato de Transaccion** en la que ofrecio $40.000.000 COP como "suma transaccional", declaro la inexistencia de sociedad de hecho, exigio que toda la propiedad intelectual le pertenecia exclusivamente, impuso no competencia por 2 anos con clausula penal, efecto de cosa juzgada, confidencialidad indefinida y renuncia de Pedro a toda reclamacion judicial. **[P-15]**', 
            '<p><strong>HECHO TRIGESIMOSEXTO.</strong> Aproximadamente el 12 de septiembre de 2025, Oscar presento una propuesta de <strong>Contrato de Transaccion</strong> en la que ofrecio $40.000.000 COP como &quot;suma transaccional&quot;, declaro la inexistencia de sociedad de hecho, exigio que toda la propiedad intelectual le pertenecia exclusivamente, impuso no competencia por 2 anos con clausula penal, efecto de cosa juzgada, confidencialidad indefinida y renuncia de Pedro a toda reclamacion judicial. <strong>[P-15]</strong></p>
', 
            'Oferta de Oscar — $40M por renunciar a todo', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-37', 
            37, 
            'TRIGESIMOSEPTIMO', 
            'cap-10', 
            'El 14 de octubre de 2025, Pedro, a traves de DOCTOR FLIGHT S.A.S., envio una **contrapropuesta de transaccion** por **$300.000.000 COP** ($270M + $30M de facturas pendientes de agosto-octubre 2025). Esta contrapropuesta reconocia en su Consideracion ...', 
            '**HECHO TRIGESIMOSEPTIMO.** El 14 de octubre de 2025, Pedro, a traves de DOCTOR FLIGHT S.A.S., envio una **contrapropuesta de transaccion** por **$300.000.000 COP** ($270M + $30M de facturas pendientes de agosto-octubre 2025). Esta contrapropuesta reconocia en su Consideracion TERCERA una *"relacion contractual cuyo objeto consistio en la explotacion economica conjunta del Programa"* y en su Consideracion SEXTA que las partes tenian derecho a *"tomar decisiones conjuntas"* con una distribucion 80/20. La clausula de no competencia era mucho mas limitada que la de Oscar, restringida solo a reproducir las "Obras" especificas por 2 anos. **[P-16]**', 
            '<p><strong>HECHO TRIGESIMOSEPTIMO.</strong> El 14 de octubre de 2025, Pedro, a traves de DOCTOR FLIGHT S.A.S., envio una <strong>contrapropuesta de transaccion</strong> por <strong>$300.000.000 COP</strong> ($270M + $30M de facturas pendientes de agosto-octubre 2025). Esta contrapropuesta reconocia en su Consideracion TERCERA una <em>&quot;relacion contractual cuyo objeto consistio en la explotacion economica conjunta del Programa&quot;</em> y en su Consideracion SEXTA que las partes tenian derecho a <em>&quot;tomar decisiones conjuntas&quot;</em> con una distribucion 80/20. La clausula de no competencia era mucho mas limitada que la de Oscar, restringida solo a reproducir las &quot;Obras&quot; especificas por 2 anos. <strong>[P-16]</strong></p>
', 
            'Contrapropuesta de Pedro — $300M', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-38', 
            38, 
            'TRIGESIMOCTAVO', 
            'cap-10', 
            'Las partes no lograron acuerdo alguno. La diferencia entre las ofertas evidencia la brecha: Oscar ofrecio $40M (3.3% del patrimonio estimado de $1,200M), mientras Pedro pretendia $300M (25%). **[P-15, P-16, P-17]**', 
            '**HECHO TRIGESIMOCTAVO.** Las partes no lograron acuerdo alguno. La diferencia entre las ofertas evidencia la brecha: Oscar ofrecio $40M (3.3% del patrimonio estimado de $1,200M), mientras Pedro pretendia $300M (25%). **[P-15, P-16, P-17]**

---', 
            '<p><strong>HECHO TRIGESIMOCTAVO.</strong> Las partes no lograron acuerdo alguno. La diferencia entre las ofertas evidencia la brecha: Oscar ofrecio $40M (3.3% del patrimonio estimado de $1,200M), mientras Pedro pretendia $300M (25%). <strong>[P-15, P-16, P-17]</strong></p>
<hr>
', 
            'Fracaso de negociación transaccional', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-39', 
            39, 
            'TRIGESIMONOVENO', 
            'cap-11', 
            'El 15 de octubre de 2025, Oscar constituyo unilateralmente la sociedad **NETMED S.A.S.** por documento privado en Barranquilla, inscrita en la Camara de Comercio el 30 de octubre de 2025. Oscar es propietario del 100% de las acciones. En la grabacion...', 
            '**HECHO TRIGESIMONOVENO.** El 15 de octubre de 2025, Oscar constituyo unilateralmente la sociedad **NETMED S.A.S.** por documento privado en Barranquilla, inscrita en la Camara de Comercio el 30 de octubre de 2025. Oscar es propietario del 100% de las acciones. En la grabacion del 14 de agosto de 2025, Oscar admitio que pretendia licenciar ParetoMed a esta SAS, excluyendo a Pedro. La constitucion de esta sociedad despues de la ruptura sugiere un vehiculo para canalizar los activos de la sociedad de hecho sin incluir al demandante. **[P-24, P-01]**', 
            '<p><strong>HECHO TRIGESIMONOVENO.</strong> El 15 de octubre de 2025, Oscar constituyo unilateralmente la sociedad <strong>NETMED S.A.S.</strong> por documento privado en Barranquilla, inscrita en la Camara de Comercio el 30 de octubre de 2025. Oscar es propietario del 100% de las acciones. En la grabacion del 14 de agosto de 2025, Oscar admitio que pretendia licenciar ParetoMed a esta SAS, excluyendo a Pedro. La constitucion de esta sociedad despues de la ruptura sugiere un vehiculo para canalizar los activos de la sociedad de hecho sin incluir al demandante. <strong>[P-24, P-01]</strong></p>
', 
            'NETMED S.A.S. — vehículo post-ruptura de Oscar', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-40', 
            40, 
            'CUADRAGESIMO', 
            'cap-11', 
            'Oscar renovo la matricula del establecimiento comercial PARETOMED el 9 de agosto de 2025, estando la sociedad de hecho en plena crisis, sin consultar ni informar a Pedro. Segun certificado de Camara de Comercio, ParetoMed declara activos vinculados d...', 
            '**HECHO CUADRAGESIMO.** Oscar renovo la matricula del establecimiento comercial PARETOMED el 9 de agosto de 2025, estando la sociedad de hecho en plena crisis, sin consultar ni informar a Pedro. Segun certificado de Camara de Comercio, ParetoMed declara activos vinculados de apenas $20.000.000 COP, cifra manifiestamente subvalorada frente a los ingresos reales de $709.010.075 COP generados en 15 meses de operacion. **[P-20]**

---', 
            '<p><strong>HECHO CUADRAGESIMO.</strong> Oscar renovo la matricula del establecimiento comercial PARETOMED el 9 de agosto de 2025, estando la sociedad de hecho en plena crisis, sin consultar ni informar a Pedro. Segun certificado de Camara de Comercio, ParetoMed declara activos vinculados de apenas $20.000.000 COP, cifra manifiestamente subvalorada frente a los ingresos reales de $709.010.075 COP generados en 15 meses de operacion. <strong>[P-20]</strong></p>
<hr>
', 
            'Renovación unilateral de matrícula mercantil', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-41', 
            41, 
            'CUADRAGESIMOPRIMERO', 
            'cap-12', 
            'El 11 de febrero de 2026, se radico solicitud de conciliacion N 013-2026 ante el Centro de Conciliacion de la Corporacion Lonja de Propiedad Raiz de Barranquilla. **[P-19]**', 
            '**HECHO CUADRAGESIMOPRIMERO.** El 11 de febrero de 2026, se radico solicitud de conciliacion N 013-2026 ante el Centro de Conciliacion de la Corporacion Lonja de Propiedad Raiz de Barranquilla. **[P-19]**', 
            '<p><strong>HECHO CUADRAGESIMOPRIMERO.</strong> El 11 de febrero de 2026, se radico solicitud de conciliacion N 013-2026 ante el Centro de Conciliacion de la Corporacion Lonja de Propiedad Raiz de Barranquilla. <strong>[P-19]</strong></p>
', 
            'Solicitud de conciliación extrajudicial', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-42', 
            42, 
            'CUADRAGESIMOSEGUNDO', 
            'cap-12', 
            'El 20 de febrero de 2026, se expidio la **CONSTANCIA DE NO CONCILIACION N 00-1844**. El Conciliador Francisco Daniel Ramirez Carreno (CC 19.334.946, T.P. 30.770) dejo constancia de que las partes no llegaron a acuerdo. Las pretensiones presentadas in...', 
            '**HECHO CUADRAGESIMOSEGUNDO.** El 20 de febrero de 2026, se expidio la **CONSTANCIA DE NO CONCILIACION N 00-1844**. El Conciliador Francisco Daniel Ramirez Carreno (CC 19.334.946, T.P. 30.770) dejo constancia de que las partes no llegaron a acuerdo. Las pretensiones presentadas incluyeron: (1) liquidacion de la sociedad comercial de hecho, valorando activos intangibles, marca, software y comunidad; (2) pago del 20% del valor total; (3) reconocimiento de utilidades acordadas. **Queda expedita la via judicial.** **[P-19]**

---', 
            '<p><strong>HECHO CUADRAGESIMOSEGUNDO.</strong> El 20 de febrero de 2026, se expidio la <strong>CONSTANCIA DE NO CONCILIACION N 00-1844</strong>. El Conciliador Francisco Daniel Ramirez Carreno (CC 19.334.946, T.P. 30.770) dejo constancia de que las partes no llegaron a acuerdo. Las pretensiones presentadas incluyeron: (1) liquidacion de la sociedad comercial de hecho, valorando activos intangibles, marca, software y comunidad; (2) pago del 20% del valor total; (3) reconocimiento de utilidades acordadas. <strong>Queda expedita la via judicial.</strong> <strong>[P-19]</strong></p>
<hr>
', 
            'Constancia de no conciliación — vía judicial expedita', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-43', 
            43, 
            'CUADRAGESIMOTERCERO', 
            'cap-13', 
            'Segun el Anexo de Valoracion elaborado en agosto de 2025, el patrimonio de PARETOMED se estima en $1.200.000.000 COP, compuesto por: (a) fondo de comercio y proyeccion de ingresos: $905.000.000 (basado en proyeccion de 19 meses a $47.267.338/mes); (b...', 
            '**HECHO CUADRAGESIMOTERCERO.** Segun el Anexo de Valoracion elaborado en agosto de 2025, el patrimonio de PARETOMED se estima en $1.200.000.000 COP, compuesto por: (a) fondo de comercio y proyeccion de ingresos: $905.000.000 (basado en proyeccion de 19 meses a $47.267.338/mes); (b) cuenta Instagram @Paretomed1 con 51.700 seguidores (segunda mas grande del nicho en Colombia): $250.000.000; (c) base de clientes activos (360 estudiantes): $45.000.000. **[P-17]**', 
            '<p><strong>HECHO CUADRAGESIMOTERCERO.</strong> Segun el Anexo de Valoracion elaborado en agosto de 2025, el patrimonio de PARETOMED se estima en $1.200.000.000 COP, compuesto por: (a) fondo de comercio y proyeccion de ingresos: $905.000.000 (basado en proyeccion de 19 meses a $47.267.338/mes); (b) cuenta Instagram @Paretomed1 con 51.700 seguidores (segunda mas grande del nicho en Colombia): $250.000.000; (c) base de clientes activos (360 estudiantes): $45.000.000. <strong>[P-17]</strong></p>
', 
            'Valoración del patrimonio — $1,200M estimados', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-44', 
            44, 
            'CUADRAGESIMOCUARTO', 
            'cap-13', 
            'La participacion del 20% de Pedro en el patrimonio estimado asciende a **$240.000.000 COP**. Esta cifra es congruente con tres valoraciones realizadas por el demandante y sus asesores: (a) $240M por Anexo de Valoracion para liquidacion de sociedad; (...', 
            '**HECHO CUADRAGESIMOCUARTO.** La participacion del 20% de Pedro en el patrimonio estimado asciende a **$240.000.000 COP**. Esta cifra es congruente con tres valoraciones realizadas por el demandante y sus asesores: (a) $240M por Anexo de Valoracion para liquidacion de sociedad; (b) $300M por contrapropuesta de Dr. Flight S.A.S.; (c) $330M por estimacion de la firma EF Legal basada exclusivamente en derechos de autor. Si bien las tres valoraciones provienen del lado del demandante, el monto definitivo debera ser determinado por el peritaje de valoracion que se solicita al despacho. **[P-17, P-16, P-35]**', 
            '<p><strong>HECHO CUADRAGESIMOCUARTO.</strong> La participacion del 20% de Pedro en el patrimonio estimado asciende a <strong>$240.000.000 COP</strong>. Esta cifra es congruente con tres valoraciones realizadas por el demandante y sus asesores: (a) $240M por Anexo de Valoracion para liquidacion de sociedad; (b) $300M por contrapropuesta de Dr. Flight S.A.S.; (c) $330M por estimacion de la firma EF Legal basada exclusivamente en derechos de autor. Si bien las tres valoraciones provienen del lado del demandante, el monto definitivo debera ser determinado por el peritaje de valoracion que se solicita al despacho. <strong>[P-17, P-16, P-35]</strong></p>
', 
            'Participación de Pedro — 20% = $240M', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-45', 
            45, 
            'CUADRAGESIMOQUINTO', 
            'cap-13', 
            'Segun las transferencias bancarias documentadas, Pedro recibio pagos hasta julio de 2025 (transferencia del 05/08/2025 por $7.450.000, que cubria el mes de julio). Oscar continuo explotando PARETOMED de manera unilateral despues de la ruptura y **sig...', 
            '**HECHO CUADRAGESIMOQUINTO.** Segun las transferencias bancarias documentadas, Pedro recibio pagos hasta julio de 2025 (transferencia del 05/08/2025 por $7.450.000, que cubria el mes de julio). Oscar continuo explotando PARETOMED de manera unilateral despues de la ruptura y **sigue operando el negocio a la fecha de presentacion de esta demanda**. La secuencia de eventos post-ruptura fue: (a) Pedro notifico el cese de explotacion de su PI el 29/08/2025 [P-18]; (b) Oscar retiro el contenido de Pedro de Instagram a mediados de octubre 2025, tras la contrapropuesta de Pedro; (c) Oscar bajo de la plataforma las videoclases grabadas por Pedro y continuo con las que el tenia pregrabadas antes de la sociedad; (d) en los primeros dias de octubre 2025, Pedro ejercio reclamaciones de copyright sobre los canales de YouTube y TikTok de ParetoMed; (e) Oscar mantuvo la totalidad de los Reels de Pedro en la pagina de Facebook de ParetoMed hasta febrero de 2026, retirandolos solo despues de la presentacion de la solicitud de conciliacion; (f) ParetoMed continua operando con la metodologia co-desarrollada (ciclos de 90 dias, simulacros pre y post estudio, sistema de acompanamiento, talleres dominicales) y generando ingresos de aproximadamente $50.000.000 mensuales segun los KPIs mas recientes. Las utilidades correspondientes al periodo agosto 2025 en adelante no fueron pagadas a Pedro. **[P-16, P-18, P-36, P-37, P-43]**', 
            '<p><strong>HECHO CUADRAGESIMOQUINTO.</strong> Segun las transferencias bancarias documentadas, Pedro recibio pagos hasta julio de 2025 (transferencia del 05/08/2025 por $7.450.000, que cubria el mes de julio). Oscar continuo explotando PARETOMED de manera unilateral despues de la ruptura y <strong>sigue operando el negocio a la fecha de presentacion de esta demanda</strong>. La secuencia de eventos post-ruptura fue: (a) Pedro notifico el cese de explotacion de su PI el 29/08/2025 [P-18]; (b) Oscar retiro el contenido de Pedro de Instagram a mediados de octubre 2025, tras la contrapropuesta de Pedro; (c) Oscar bajo de la plataforma las videoclases grabadas por Pedro y continuo con las que el tenia pregrabadas antes de la sociedad; (d) en los primeros dias de octubre 2025, Pedro ejercio reclamaciones de copyright sobre los canales de YouTube y TikTok de ParetoMed; (e) Oscar mantuvo la totalidad de los Reels de Pedro en la pagina de Facebook de ParetoMed hasta febrero de 2026, retirandolos solo despues de la presentacion de la solicitud de conciliacion; (f) ParetoMed continua operando con la metodologia co-desarrollada (ciclos de 90 dias, simulacros pre y post estudio, sistema de acompanamiento, talleres dominicales) y generando ingresos de aproximadamente $50.000.000 mensuales segun los KPIs mas recientes. Las utilidades correspondientes al periodo agosto 2025 en adelante no fueron pagadas a Pedro. <strong>[P-16, P-18, P-36, P-37, P-43]</strong></p>
', 
            'Utilidades post-ruptura no pagadas a Pedro', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-46', 
            46, 
            'CUADRAGESIMOSEXTO', 
            'cap-13', 
            'El total de pagos recibidos por Pedro asciende a **$99.319.834 COP** en 14 transferencias bancarias entre mayo de 2024 y agosto de 2025, acreditadas con capturas de pantalla de mensajes SMS de Bancolombia. Si estos pagos representan el 20% de las uti...', 
            '**HECHO CUADRAGESIMOSEXTO.** El total de pagos recibidos por Pedro asciende a **$99.319.834 COP** en 14 transferencias bancarias entre mayo de 2024 y agosto de 2025, acreditadas con capturas de pantalla de mensajes SMS de Bancolombia. Si estos pagos representan el 20% de las utilidades netas, la ganancia neta total del negocio durante dicho periodo fue de aproximadamente **$496.599.170 COP**. Esta cifra es inferior a los ingresos brutos reportados de $709.010.075 COP, lo que es coherente con la existencia de costos operativos. **[P-36, P-37]**

---

## NOTA PARA LOS ABOGADOS: RESUMEN DE LAS PRUEBAS MAS CONTUNDENTES

Las siguientes pruebas son las de mayor poder probatorio:

1. **[P-01] Grabacion telefonica 14/08/2025:** Confesion extrajudicial de Oscar admitiendo la sociedad, el pacto de acciones, y que sus propios abogados y contadores confirmaron la existencia de sociedad de hecho.

2. **[P-11] Carta de Recomendacion firmada por Oscar (27/04/2024):** Documento firmado por el demandado que nombra a Pedro "Subdirector Academico y Comercial" - cargo directivo incompatible con prestacion de servicios.

3. **[P-09] Nota manuscrita de Oscar en Acuerdo de Socios:** Oscar admite que el 20% "no se justifican por una labor que es contratable".

4. **[P-06 y P-07] Alteracion del Google Doc:** El cambio de "acciones" por "utilidades" por usuario anonimo evidencia mala fe.

5. **[P-22 y P-23] Certificados DNDA (238 obras):** Pedro registrado como AUTOR/DIRECTOR/PRODUCTOR; Oscar solo como INTERPRETE. Invierte la narrativa de que la PI pertenece exclusivamente a Oscar.

6. **[P-12 y P-13] Cuentas de cobro y liquidaciones:** Los montos variables (de $1.4M a $16.7M) calculados como 20% de ganancia neta son inconsistentes con honorarios fijos de servicios.

7. **[P-14] Contrato de Cuentas en Participacion (Oscar, 22/08/2025):** Usa terminologia de "socios" mientras simultaneamente niega la sociedad de hecho, lo cual es contradictorio.

8. **[P-25, P-26] SOPs creados por Pedro:** Demuestran que Pedro diseno la infraestructura operativa del negocio, funcion de socio/director.

9. **[P-19] Constancia de No Conciliacion:** Acredita el agotamiento del requisito de procedibilidad.

10. **[P-20] Certificado Camara de Comercio ParetoMed:** Activos declarados de solo $20M vs. ingresos reales de $709M, evidencia subvaloracion.

11. **[P-50] Audios 13/07/2025 — Oscar exige deberes de socio sobre herramienta tecnologica:** Oscar reclama a Pedro obligaciones propias de un socio respecto a una herramienta tecnologica desarrollada por Pedro (*"como le vas a licenciar eso a una empresa de la cual eres socio"*). Paradojicamente, al exigirle deberes societarios, Oscar RECONOCE que Pedro es socio con obligaciones fiduciarias hacia el negocio. Confesion extrajudicial devastadora.

---', 
            '<p><strong>HECHO CUADRAGESIMOSEXTO.</strong> El total de pagos recibidos por Pedro asciende a <strong>$99.319.834 COP</strong> en 14 transferencias bancarias entre mayo de 2024 y agosto de 2025, acreditadas con capturas de pantalla de mensajes SMS de Bancolombia. Si estos pagos representan el 20% de las utilidades netas, la ganancia neta total del negocio durante dicho periodo fue de aproximadamente <strong>$496.599.170 COP</strong>. Esta cifra es inferior a los ingresos brutos reportados de $709.010.075 COP, lo que es coherente con la existencia de costos operativos. <strong>[P-36, P-37]</strong></p>
<hr>
<h2>NOTA PARA LOS ABOGADOS: RESUMEN DE LAS PRUEBAS MAS CONTUNDENTES</h2>
<p>Las siguientes pruebas son las de mayor poder probatorio:</p>
<ol>
<li>
<p><strong>[P-01] Grabacion telefonica 14/08/2025:</strong> Confesion extrajudicial de Oscar admitiendo la sociedad, el pacto de acciones, y que sus propios abogados y contadores confirmaron la existencia de sociedad de hecho.</p>
</li>
<li>
<p><strong>[P-11] Carta de Recomendacion firmada por Oscar (27/04/2024):</strong> Documento firmado por el demandado que nombra a Pedro &quot;Subdirector Academico y Comercial&quot; - cargo directivo incompatible con prestacion de servicios.</p>
</li>
<li>
<p><strong>[P-09] Nota manuscrita de Oscar en Acuerdo de Socios:</strong> Oscar admite que el 20% &quot;no se justifican por una labor que es contratable&quot;.</p>
</li>
<li>
<p><strong>[P-06 y P-07] Alteracion del Google Doc:</strong> El cambio de &quot;acciones&quot; por &quot;utilidades&quot; por usuario anonimo evidencia mala fe.</p>
</li>
<li>
<p><strong>[P-22 y P-23] Certificados DNDA (238 obras):</strong> Pedro registrado como AUTOR/DIRECTOR/PRODUCTOR; Oscar solo como INTERPRETE. Invierte la narrativa de que la PI pertenece exclusivamente a Oscar.</p>
</li>
<li>
<p><strong>[P-12 y P-13] Cuentas de cobro y liquidaciones:</strong> Los montos variables (de $1.4M a $16.7M) calculados como 20% de ganancia neta son inconsistentes con honorarios fijos de servicios.</p>
</li>
<li>
<p><strong>[P-14] Contrato de Cuentas en Participacion (Oscar, 22/08/2025):</strong> Usa terminologia de &quot;socios&quot; mientras simultaneamente niega la sociedad de hecho, lo cual es contradictorio.</p>
</li>
<li>
<p><strong>[P-25, P-26] SOPs creados por Pedro:</strong> Demuestran que Pedro diseno la infraestructura operativa del negocio, funcion de socio/director.</p>
</li>
<li>
<p><strong>[P-19] Constancia de No Conciliacion:</strong> Acredita el agotamiento del requisito de procedibilidad.</p>
</li>
<li>
<p><strong>[P-20] Certificado Camara de Comercio ParetoMed:</strong> Activos declarados de solo $20M vs. ingresos reales de $709M, evidencia subvaloracion.</p>
</li>
<li>
<p><strong>[P-50] Audios 13/07/2025 — Oscar exige deberes de socio sobre herramienta tecnologica:</strong> Oscar reclama a Pedro obligaciones propias de un socio respecto a una herramienta tecnologica desarrollada por Pedro (<em>&quot;como le vas a licenciar eso a una empresa de la cual eres socio&quot;</em>). Paradojicamente, al exigirle deberes societarios, Oscar RECONOCE que Pedro es socio con obligaciones fiduciarias hacia el negocio. Confesion extrajudicial devastadora.</p>
</li>
</ol>
<hr>
', 
            'Total pagos documentados — $99.3M en 14 transferencias', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-47', 
            47, 
            'CUADRAGESIMSEPTIMO', 
            'cap-14', 
            'El 8 de enero de 2025, Oscar Maldonado declaro en nota de voz de WhatsApp que la firma del acuerdo de socios era una **"mera formalidad"**, lo que constituye un reconocimiento de que la sociedad ya existia de facto sin necesidad del documento escrito...', 
            '**HECHO CUADRAGESIMSEPTIMO.** El 8 de enero de 2025, Oscar Maldonado declaro en nota de voz de WhatsApp que la firma del acuerdo de socios era una **"mera formalidad"**, lo que constituye un reconocimiento de que la sociedad ya existia de facto sin necesidad del documento escrito. Sus palabras textuales fueron: *"yo siempre he visto el tema de la firma como una mera formalidad. O sea yo pensaba que ya todo ese tema estaba hablado"* (PTT-20250108-WA0003). En un segundo audio del mismo dia, Oscar reitero: *"para mi el afirme es mas como un formalismo, ¿no? Listo"* y agrego una declaracion aun mas contundente sobre la naturaleza de la relacion: *"yo necesitaria tener a alguien que tenga pertenencia, ¿si? No alguien contratado, sino alguien que sepa que eso es suyo tambien y que este pendiente de todo"* (PTT-20250108-WA0012). Con esta ultima frase, Oscar reconocio TEXTUALMENTE que lo que buscaba en Pedro NO era un contratista, sino un socio con sentido de pertenencia y propiedad sobre el negocio. Adicionalmente, Oscar revelo que su plan a futuro dependia de Pedro como socio permanente: *"mi plan es para que ya en 2026 yo comenzare el fellow. Entonces, ahi yo necesitaria tener a alguien... coordinando todo"*. **[P-05, P-41]**', 
            '<p><strong>HECHO CUADRAGESIMSEPTIMO.</strong> El 8 de enero de 2025, Oscar Maldonado declaro en nota de voz de WhatsApp que la firma del acuerdo de socios era una <strong>&quot;mera formalidad&quot;</strong>, lo que constituye un reconocimiento de que la sociedad ya existia de facto sin necesidad del documento escrito. Sus palabras textuales fueron: <em>&quot;yo siempre he visto el tema de la firma como una mera formalidad. O sea yo pensaba que ya todo ese tema estaba hablado&quot;</em> (PTT-20250108-WA0003). En un segundo audio del mismo dia, Oscar reitero: <em>&quot;para mi el afirme es mas como un formalismo, ¿no? Listo&quot;</em> y agrego una declaracion aun mas contundente sobre la naturaleza de la relacion: <em>&quot;yo necesitaria tener a alguien que tenga pertenencia, ¿si? No alguien contratado, sino alguien que sepa que eso es suyo tambien y que este pendiente de todo&quot;</em> (PTT-20250108-WA0012). Con esta ultima frase, Oscar reconocio TEXTUALMENTE que lo que buscaba en Pedro NO era un contratista, sino un socio con sentido de pertenencia y propiedad sobre el negocio. Adicionalmente, Oscar revelo que su plan a futuro dependia de Pedro como socio permanente: <em>&quot;mi plan es para que ya en 2026 yo comenzare el fellow. Entonces, ahi yo necesitaria tener a alguien... coordinando todo&quot;</em>. <strong>[P-05, P-41]</strong></p>
', 
            '"La firma es una mera formalidad" — confesión', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-48', 
            48, 
            'CUADRAGESIMOCTAVO', 
            'cap-14', 
            'El 7 de agosto de 2025, se produjo un incidente contable que evidencia la conducta de Pedro como socio y no como contratista. Oscar informo a Pedro que en la liquidacion de julio habia omitido descontar los pagos de las colaboradoras Lina y Kendy, lo...', 
            '**HECHO CUADRAGESIMOCTAVO.** El 7 de agosto de 2025, se produjo un incidente contable que evidencia la conducta de Pedro como socio y no como contratista. Oscar informo a Pedro que en la liquidacion de julio habia omitido descontar los pagos de las colaboradoras Lina y Kendy, lo que resulto en un excedente de $500.000 COP a favor de Pedro. Oscar: *"en los egresos de julio no meti el pago de Lina ni Kendy. Fresco que vamos a dejar asi, yo cargo con eso"*. Pedro, en lugar de aceptar el beneficio como lo haria un contratista que simplemente cobra lo que le pagan, mostro disposicion inmediata de asumir la perdida: *"Yo puedo devolverte los 500 o dartelos como credito en algun servicio aparte que favorezca a Paretomed"* y enfatizo: *"es una empresa no una caridad y la responsabilidad de lo que se haga despues del error no cae solo en ti"*. Finalmente, Pedro utilizo una expresion que sintetiza la relacion: **"Somos un equipo papa"**. La disposicion de Pedro de asumir perdidas y su referencia al negocio como responsabilidad compartida son conductas propias de un socio, no de un prestador de servicios que simplemente factura y cobra. **[P-02]**

### Para Capitulo VI: Explotacion Conjunta del Negocio', 
            '<p><strong>HECHO CUADRAGESIMOCTAVO.</strong> El 7 de agosto de 2025, se produjo un incidente contable que evidencia la conducta de Pedro como socio y no como contratista. Oscar informo a Pedro que en la liquidacion de julio habia omitido descontar los pagos de las colaboradoras Lina y Kendy, lo que resulto en un excedente de $500.000 COP a favor de Pedro. Oscar: <em>&quot;en los egresos de julio no meti el pago de Lina ni Kendy. Fresco que vamos a dejar asi, yo cargo con eso&quot;</em>. Pedro, en lugar de aceptar el beneficio como lo haria un contratista que simplemente cobra lo que le pagan, mostro disposicion inmediata de asumir la perdida: <em>&quot;Yo puedo devolverte los 500 o dartelos como credito en algun servicio aparte que favorezca a Paretomed&quot;</em> y enfatizo: <em>&quot;es una empresa no una caridad y la responsabilidad de lo que se haga despues del error no cae solo en ti&quot;</em>. Finalmente, Pedro utilizo una expresion que sintetiza la relacion: <strong>&quot;Somos un equipo papa&quot;</strong>. La disposicion de Pedro de asumir perdidas y su referencia al negocio como responsabilidad compartida son conductas propias de un socio, no de un prestador de servicios que simplemente factura y cobra. <strong>[P-02]</strong></p>
<h3>Para Capitulo VI: Explotacion Conjunta del Negocio</h3>
', 
            'Incidente contable — "somos un equipo"', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-49', 
            49, 
            'CUADRAGESIMONOVENO', 
            'cap-14', 
            'Pedro participaba activamente en la **co-determinacion de los precios** del programa ParetoMed, funcion estrategica reservada a socios o directivos. Se acreditan al menos tres instancias documentadas: (a) el 21 de marzo de 2025, Pedro propuso una est...', 
            '**HECHO CUADRAGESIMONOVENO.** Pedro participaba activamente en la **co-determinacion de los precios** del programa ParetoMed, funcion estrategica reservada a socios o directivos. Se acreditan al menos tres instancias documentadas: (a) el 21 de marzo de 2025, Pedro propuso una estructura de precios en el grupo de equipo y la asesora de ventas Adriana respondio: *"Me gusta tu idea... tu idea esta genial"*, esperando confirmacion de ambos: *"uds me diran como la ven"* (refiriendose a Pedro y Oscar como co-decisores) **[P-03]**; (b) el 17 de julio de 2025, tras una negociacion directa entre Pedro y Oscar sobre el valor del programa de 6 meses, Oscar concluyo: *"Entonces dejalo en 2,850,000"* y Pedro procedio a implementar: *"Ok... ya te organizo algo rapido y lo explico"* **[P-02]**; (c) en audio del 28 de julio de 2025, ambos negociaron la reduccion de cuotas de $850.000 a *"650, 7 algo"* como estrategia conjunta **[P-05]**. Un contratista de marketing no define los precios del producto de su cliente; un socio comercial si lo hace. **[P-02, P-03, P-05, P-40]**

### Para Capitulo IX: Ruptura de la Relacion', 
            '<p><strong>HECHO CUADRAGESIMONOVENO.</strong> Pedro participaba activamente en la <strong>co-determinacion de los precios</strong> del programa ParetoMed, funcion estrategica reservada a socios o directivos. Se acreditan al menos tres instancias documentadas: (a) el 21 de marzo de 2025, Pedro propuso una estructura de precios en el grupo de equipo y la asesora de ventas Adriana respondio: <em>&quot;Me gusta tu idea... tu idea esta genial&quot;</em>, esperando confirmacion de ambos: <em>&quot;uds me diran como la ven&quot;</em> (refiriendose a Pedro y Oscar como co-decisores) <strong>[P-03]</strong>; (b) el 17 de julio de 2025, tras una negociacion directa entre Pedro y Oscar sobre el valor del programa de 6 meses, Oscar concluyo: <em>&quot;Entonces dejalo en 2,850,000&quot;</em> y Pedro procedio a implementar: <em>&quot;Ok... ya te organizo algo rapido y lo explico&quot;</em> <strong>[P-02]</strong>; (c) en audio del 28 de julio de 2025, ambos negociaron la reduccion de cuotas de $850.000 a <em>&quot;650, 7 algo&quot;</em> como estrategia conjunta <strong>[P-05]</strong>. Un contratista de marketing no define los precios del producto de su cliente; un socio comercial si lo hace. <strong>[P-02, P-03, P-05, P-40]</strong></p>
<h3>Para Capitulo IX: Ruptura de la Relacion</h3>
', 
            'Co-determinación de precios del programa', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-50', 
            50, 
            'QUINCUAGESIMO', 
            'cap-14', 
            'Tras la aceptacion de la terminacion el 28 de agosto de 2025, Oscar procedio a **remover unilateralmente los accesos** de Pedro a las herramientas digitales del negocio. Oscar cerro las sesiones del correo institucional paretomed@gmail.com (un antece...', 
            '**HECHO QUINCUAGESIMO.** Tras la aceptacion de la terminacion el 28 de agosto de 2025, Oscar procedio a **remover unilateralmente los accesos** de Pedro a las herramientas digitales del negocio. Oscar cerro las sesiones del correo institucional paretomed@gmail.com (un antecedente de esto ocurrio el 1 de agosto de 2025, cuando Pedro reporto: *"me sacaron de la cuenta de paretomed@gmail.com"* y Oscar alego: *"Es que estaba revisando y vi muchos dispositivos y computadores con esa cuenta abierta y cerre varios. No fue mala intencion"*) **[P-02]**. Tras la ruptura definitiva, Oscar removio a Pedro del correo institucional, de los grupos de WhatsApp del equipo de trabajo, y de las cuentas de redes sociales (Instagram, TikTok, YouTube) que Pedro habia ayudado a crear y gestionar durante 16 meses. La exclusion unilateral de Pedro de todas las herramientas del negocio evidencia que Oscar trato de apropiarse del control total de activos que habian sido gestionados conjuntamente. **[P-02, P-18]**

### Para Capitulo XI: Actos Post-Ruptura del Demandado', 
            '<p><strong>HECHO QUINCUAGESIMO.</strong> Tras la aceptacion de la terminacion el 28 de agosto de 2025, Oscar procedio a <strong>remover unilateralmente los accesos</strong> de Pedro a las herramientas digitales del negocio. Oscar cerro las sesiones del correo institucional <a href="mailto:paretomed@gmail.com">paretomed@gmail.com</a> (un antecedente de esto ocurrio el 1 de agosto de 2025, cuando Pedro reporto: <em>&quot;me sacaron de la cuenta de <a href="mailto:paretomed@gmail.com">paretomed@gmail.com</a>&quot;</em> y Oscar alego: <em>&quot;Es que estaba revisando y vi muchos dispositivos y computadores con esa cuenta abierta y cerre varios. No fue mala intencion&quot;</em>) <strong>[P-02]</strong>. Tras la ruptura definitiva, Oscar removio a Pedro del correo institucional, de los grupos de WhatsApp del equipo de trabajo, y de las cuentas de redes sociales (Instagram, TikTok, YouTube) que Pedro habia ayudado a crear y gestionar durante 16 meses. La exclusion unilateral de Pedro de todas las herramientas del negocio evidencia que Oscar trato de apropiarse del control total de activos que habian sido gestionados conjuntamente. <strong>[P-02, P-18]</strong></p>
<h3>Para Capitulo XI: Actos Post-Ruptura del Demandado</h3>
', 
            'Remoción unilateral de accesos digitales', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-51', 
            51, 
            'QUINCUAGESIMOPRIMERO', 
            'cap-14', 
            'ParetoMed continuo explotando despues de la ruptura la metodologia, estructura comercial, procesos de ventas y canales digitales que fueron construidos o sustancialmente mejorados por Pedro durante los 16 meses de operacion conjunta. Si bien Oscar gr...', 
            '**HECHO QUINCUAGESIMOPRIMERO.** ParetoMed continuo explotando despues de la ruptura la metodologia, estructura comercial, procesos de ventas y canales digitales que fueron construidos o sustancialmente mejorados por Pedro durante los 16 meses de operacion conjunta. Si bien Oscar grabo nuevas videoclases con otro editor para reemplazar el material audiovisual de Pedro (aproximadamente desde octubre 2025), los elementos intangibles aportados por Pedro permanecieron en uso: (a) la estructura de "programa" con ciclos de 90 dias, simulacros pre y post estudio, y talleres dominicales (evolucion de los grupos de estudio semanales disenados por Pedro); (b) los procedimientos estandar de operacion (SOPs) creados por Pedro; (c) la cuenta de Instagram @Paretomed1 con 51.700 seguidores, cuyo crecimiento fue impulsado por la estrategia de contenido de Pedro; (d) los canales de TikTok y YouTube creados por Pedro; (e) los flujos de trabajo y automatizaciones de ventas estructurados durante la operacion conjunta. Estos activos intangibles forman parte del patrimonio de la sociedad de hecho y no pueden ser apropiados unilateralmente por Oscar. **[P-02, P-03, P-25, P-26, P-27]**

### Para Capitulo V: Affectio Societatis (complemento - testigos)', 
            '<p><strong>HECHO QUINCUAGESIMOPRIMERO.</strong> ParetoMed continuo explotando despues de la ruptura la metodologia, estructura comercial, procesos de ventas y canales digitales que fueron construidos o sustancialmente mejorados por Pedro durante los 16 meses de operacion conjunta. Si bien Oscar grabo nuevas videoclases con otro editor para reemplazar el material audiovisual de Pedro (aproximadamente desde octubre 2025), los elementos intangibles aportados por Pedro permanecieron en uso: (a) la estructura de &quot;programa&quot; con ciclos de 90 dias, simulacros pre y post estudio, y talleres dominicales (evolucion de los grupos de estudio semanales disenados por Pedro); (b) los procedimientos estandar de operacion (SOPs) creados por Pedro; (c) la cuenta de Instagram @Paretomed1 con 51.700 seguidores, cuyo crecimiento fue impulsado por la estrategia de contenido de Pedro; (d) los canales de TikTok y YouTube creados por Pedro; (e) los flujos de trabajo y automatizaciones de ventas estructurados durante la operacion conjunta. Estos activos intangibles forman parte del patrimonio de la sociedad de hecho y no pueden ser apropiados unilateralmente por Oscar. <strong>[P-02, P-03, P-25, P-26, P-27]</strong></p>
<h3>Para Capitulo V: Affectio Societatis (complemento - testigos)</h3>
', 
            'Explotación post-ruptura de activos compartidos', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-52', 
            52, 
            'QUINCUAGESIMOSEGUNDO', 
            'cap-14', 
            'La dinamica de sociedad entre Pedro y Oscar era presenciada habitualmente por terceros que pueden dar testimonio. Las reuniones de trabajo se realizaban en la oficina de Pedro, donde sus trabajadores Efrain (fotografo) y Paul (comunicador social) est...', 
            '**HECHO QUINCUAGESIMOSEGUNDO.** La dinamica de sociedad entre Pedro y Oscar era presenciada habitualmente por terceros que pueden dar testimonio. Las reuniones de trabajo se realizaban en la oficina de Pedro, donde sus trabajadores Efrain (fotografo) y Paul (comunicador social) estaban presentes y podian escuchar las discusiones estrategicas, la toma de decisiones conjunta y el trato entre socios. Adicionalmente, la asesora de ventas Adriana interactuaba con ambos en el grupo de WhatsApp del equipo como co-directores del negocio, recibiendo instrucciones tanto de Oscar como de Pedro y consultando a ambos para decisiones comerciales: *"uds me diran como la ven"* (21/03/2025), refiriendose a Pedro y Oscar indistintamente como decisores. Estos testigos pueden acreditar la explotacion conjunta del negocio y el trato de socios entre las partes. **[P-02, P-03, P-39]**

---', 
            '<p><strong>HECHO QUINCUAGESIMOSEGUNDO.</strong> La dinamica de sociedad entre Pedro y Oscar era presenciada habitualmente por terceros que pueden dar testimonio. Las reuniones de trabajo se realizaban en la oficina de Pedro, donde sus trabajadores Efrain (fotografo) y Paul (comunicador social) estaban presentes y podian escuchar las discusiones estrategicas, la toma de decisiones conjunta y el trato entre socios. Adicionalmente, la asesora de ventas Adriana interactuaba con ambos en el grupo de WhatsApp del equipo como co-directores del negocio, recibiendo instrucciones tanto de Oscar como de Pedro y consultando a ambos para decisiones comerciales: <em>&quot;uds me diran como la ven&quot;</em> (21/03/2025), refiriendose a Pedro y Oscar indistintamente como decisores. Estos testigos pueden acreditar la explotacion conjunta del negocio y el trato de socios entre las partes. <strong>[P-02, P-03, P-39]</strong></p>
<hr>
', 
            'Testigos de la dinámica societaria', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-53', 
            53, 
            'QUINCUAGESIMOTERCERO', 
            'cap-15', 
            'Entre febrero de 2024 y septiembre de 2025, se documentaron **376 comprobantes de pago** de estudiantes del programa ParetoMed, correspondientes a transacciones procesadas a traves de las plataformas Bold (190 pagos, $331.646.650), Bancolombia (106 p...', 
            '**HECHO QUINCUAGESIMOTERCERO.** Entre febrero de 2024 y septiembre de 2025, se documentaron **376 comprobantes de pago** de estudiantes del programa ParetoMed, correspondientes a transacciones procesadas a traves de las plataformas Bold (190 pagos, $331.646.650), Bancolombia (106 pagos, $134.101.446), PSE-Wompi (27 pagos, $44.909.150), Boton Bancolombia (8 pagos, $16.535.000), BBVA (8 pagos, $11.205.000), Scotiabank (3 pagos, $6.732.000) y otras plataformas no identificadas (30 pagos, $34.088.250). El **total de ingresos brutos documentados** asciende a **$579.217.496 COP**, con 372 de 376 pagos con monto valido (99%) y 371 de 376 con confianza alta o media en la extraccion de datos (98.7%). El promedio por pago fue de $1.557.036 COP. Estos comprobantes obran como prueba [P-42] en formato Excel y CSV con detalle de fecha, monto, plataforma y referencia de cada transaccion. **[P-42]**

### B. Analisis de consistencia: comprobantes vs. transferencias a Pedro', 
            '<p><strong>HECHO QUINCUAGESIMOTERCERO.</strong> Entre febrero de 2024 y septiembre de 2025, se documentaron <strong>376 comprobantes de pago</strong> de estudiantes del programa ParetoMed, correspondientes a transacciones procesadas a traves de las plataformas Bold (190 pagos, $331.646.650), Bancolombia (106 pagos, $134.101.446), PSE-Wompi (27 pagos, $44.909.150), Boton Bancolombia (8 pagos, $16.535.000), BBVA (8 pagos, $11.205.000), Scotiabank (3 pagos, $6.732.000) y otras plataformas no identificadas (30 pagos, $34.088.250). El <strong>total de ingresos brutos documentados</strong> asciende a <strong>$579.217.496 COP</strong>, con 372 de 376 pagos con monto valido (99%) y 371 de 376 con confianza alta o media en la extraccion de datos (98.7%). El promedio por pago fue de $1.557.036 COP. Estos comprobantes obran como prueba [P-42] en formato Excel y CSV con detalle de fecha, monto, plataforma y referencia de cada transaccion. <strong>[P-42]</strong></p>
<h3>B. Analisis de consistencia: comprobantes vs. transferencias a Pedro</h3>
', 
            '376 comprobantes — $579M en ingresos documentados', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-54', 
            54, 
            'QUINCUAGESIMOCUARTO', 
            'cap-15', 
            'El cruce de los comprobantes de estudiantes con las transferencias recibidas por Pedro arroja una consistencia reveladora: Pedro recibio $99.419.834 COP (excluyendo $100.000 de consultoria Coventus), lo que equivale al **19.52%** de los $509.900.000 ...', 
            '**HECHO QUINCUAGESIMOCUARTO.** El cruce de los comprobantes de estudiantes con las transferencias recibidas por Pedro arroja una consistencia reveladora: Pedro recibio $99.419.834 COP (excluyendo $100.000 de consultoria Coventus), lo que equivale al **19.52%** de los $509.900.000 documentados en comprobantes para el periodo comparable (abril 2024 - agosto 2025). Ese porcentaje es virtualmente identico al 20% pactado. Sin embargo, un margen de costos de apenas 2.4% seria absurdo para cualquier negocio, lo que demuestra que los 376 comprobantes son una **muestra parcial** de los ingresos totales — Adriana (asesora de ventas) tenia instruccion de enviar comprobantes a Pedro pero no los envio todos. **[P-42, P-36, P-37]**

### C. Proyeccion de ingresos reales del negocio', 
            '<p><strong>HECHO QUINCUAGESIMOCUARTO.</strong> El cruce de los comprobantes de estudiantes con las transferencias recibidas por Pedro arroja una consistencia reveladora: Pedro recibio $99.419.834 COP (excluyendo $100.000 de consultoria Coventus), lo que equivale al <strong>19.52%</strong> de los $509.900.000 documentados en comprobantes para el periodo comparable (abril 2024 - agosto 2025). Ese porcentaje es virtualmente identico al 20% pactado. Sin embargo, un margen de costos de apenas 2.4% seria absurdo para cualquier negocio, lo que demuestra que los 376 comprobantes son una <strong>muestra parcial</strong> de los ingresos totales — Adriana (asesora de ventas) tenia instruccion de enviar comprobantes a Pedro pero no los envio todos. <strong>[P-42, P-36, P-37]</strong></p>
<h3>C. Proyeccion de ingresos reales del negocio</h3>
', 
            'Consistencia estadística: 19.52% ≈ 20% pactado', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-55', 
            55, 
            'QUINCUAGESIMOQUINTO', 
            'cap-15', 
            'Si Pedro recibio $99.419.834 COP como el 20% de las utilidades netas, y el margen de ganancia documentado por Oscar oscilaba entre 56% y 81% (con un promedio conservador de 65%), los ingresos brutos reales del negocio se estiman en aproximadamente **...', 
            '**HECHO QUINCUAGESIMOQUINTO.** Si Pedro recibio $99.419.834 COP como el 20% de las utilidades netas, y el margen de ganancia documentado por Oscar oscilaba entre 56% y 81% (con un promedio conservador de 65%), los ingresos brutos reales del negocio se estiman en aproximadamente **$765.000.000 COP** ($99.419.834 / 0.20 / 0.65). Los comprobantes documentados ($579.217.496) capturan aproximadamente el 75% de esos ingresos. La diferencia de ~$186.000.000 corresponde a pagos de estudiantes cuyos comprobantes no fueron enviados por Adriana, recuperacion de cartera, cuotas en mora pagadas posteriormente y ventas no reportadas por la asesora. Esta proyeccion es consistente con los KPIs de Oscar para 2025, que reportaban ventas totales de entre $46M y $97M mensuales. **[P-42, P-02, P-13]**

### D. Negativa de Oscar a rendir cuentas y exhibir su contabilidad personal', 
            '<p><strong>HECHO QUINCUAGESIMOQUINTO.</strong> Si Pedro recibio $99.419.834 COP como el 20% de las utilidades netas, y el margen de ganancia documentado por Oscar oscilaba entre 56% y 81% (con un promedio conservador de 65%), los ingresos brutos reales del negocio se estiman en aproximadamente <strong>$765.000.000 COP</strong> ($99.419.834 / 0.20 / 0.65). Los comprobantes documentados ($579.217.496) capturan aproximadamente el 75% de esos ingresos. La diferencia de ~$186.000.000 corresponde a pagos de estudiantes cuyos comprobantes no fueron enviados por Adriana, recuperacion de cartera, cuotas en mora pagadas posteriormente y ventas no reportadas por la asesora. Esta proyeccion es consistente con los KPIs de Oscar para 2025, que reportaban ventas totales de entre $46M y $97M mensuales. <strong>[P-42, P-02, P-13]</strong></p>
<h3>D. Negativa de Oscar a rendir cuentas y exhibir su contabilidad personal</h3>
', 
            'Proyección de ingresos reales — $765M estimados', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-56', 
            56, 
            'QUINCUAGESIMOSEXTO', 
            'cap-15', 
            'El 28 de febrero de 2025, Oscar revelo en el chat de WhatsApp la existencia de una **hoja de calculo personal** con la contabilidad detallada del negocio, distinta de los consolidados que compartia con Pedro: *"yo me guio de la hoja de calculo person...', 
            '**HECHO QUINCUAGESIMOSEXTO.** El 28 de febrero de 2025, Oscar revelo en el chat de WhatsApp la existencia de una **hoja de calculo personal** con la contabilidad detallada del negocio, distinta de los consolidados que compartia con Pedro: *"yo me guio de la hoja de calculo personal mia"*. Pedro solicito acceso a esta hoja de calculo y Oscar se nego. El 5 de agosto de 2025, cuando Pedro pidio el ultimo consolidado, Oscar respondio con hostilidad: *"Joda, no tengo porque hacerlo y me ofende que me lo pidas"*, lo que constituye una negativa expresa a rendir cuentas a su socio. Esta negativa es contraria al deber de informacion entre socios (articulo 504 del Codigo de Comercio) y genera un indicio grave de que la contabilidad interna de Oscar podria revelar ingresos superiores a los reportados en los consolidados compartidos con Pedro. La existencia de esta hoja de calculo debe ser objeto de exhibicion de documentos (articulo 265 CGP) en el proceso. **[P-02, P-13]**

### E. Diferencia entre facturacion de servicios (Avanz) y participacion societaria (ParetoMed)', 
            '<p><strong>HECHO QUINCUAGESIMOSEXTO.</strong> El 28 de febrero de 2025, Oscar revelo en el chat de WhatsApp la existencia de una <strong>hoja de calculo personal</strong> con la contabilidad detallada del negocio, distinta de los consolidados que compartia con Pedro: <em>&quot;yo me guio de la hoja de calculo personal mia&quot;</em>. Pedro solicito acceso a esta hoja de calculo y Oscar se nego. El 5 de agosto de 2025, cuando Pedro pidio el ultimo consolidado, Oscar respondio con hostilidad: <em>&quot;Joda, no tengo porque hacerlo y me ofende que me lo pidas&quot;</em>, lo que constituye una negativa expresa a rendir cuentas a su socio. Esta negativa es contraria al deber de informacion entre socios (articulo 504 del Codigo de Comercio) y genera un indicio grave de que la contabilidad interna de Oscar podria revelar ingresos superiores a los reportados en los consolidados compartidos con Pedro. La existencia de esta hoja de calculo debe ser objeto de exhibicion de documentos (articulo 265 CGP) en el proceso. <strong>[P-02, P-13]</strong></p>
<h3>E. Diferencia entre facturacion de servicios (Avanz) y participacion societaria (ParetoMed)</h3>
', 
            'Oscar oculta contabilidad y se niega a rendir cuentas', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-57', 
            57, 
            'QUINCUAGESIMOSEPTIMO', 
            'cap-15', 
            'La comparacion entre la facturacion de Pedro a AVANZ FINANZAS & SEGUROS LTDA (NIT 901286973-7) y la facturacion a Oscar/ParetoMed demuestra que Pedro distinguia perfectamente entre una relacion de prestacion de servicios y una relacion societaria. Co...', 
            '**HECHO QUINCUAGESIMOSEPTIMO.** La comparacion entre la facturacion de Pedro a AVANZ FINANZAS & SEGUROS LTDA (NIT 901286973-7) y la facturacion a Oscar/ParetoMed demuestra que Pedro distinguia perfectamente entre una relacion de prestacion de servicios y una relacion societaria. Con Avanz, Pedro facturaba con concepto especifico de *"Creacion de contenido / guiones comerciales, produccion y edicion de videos publicitarios para redes sociales"*, a tarifa fija por entregable ($1.680.672 + adicionales), con cesion de derechos de autor implicita. Con Oscar/ParetoMed, la facturacion era radicalmente distinta: concepto generico de *"COMISION"* o *"Gestion de redes y campanas"*, monto variable calculado sobre el 20% de utilidades netas (sin entregables especificos facturados), y el **75% de los pagos ($74.900.000) se hicieron SIN factura ni cuenta de cobro**. Si la relacion con ParetoMed fuera una simple prestacion de servicios de contenido, Pedro habria facturado exactamente igual que con Avanz — tarifa fija, concepto de creacion de contenido, con cesion de derechos. No lo hizo porque NO era eso: era participacion de socio industrial en utilidades. **[P-42, FE1 a FE15 (facturas a Avanz), FE3, FE4, FE5, P-12]**

### F. Utilidades post-ruptura documentadas con KPIs del demandado', 
            '<p><strong>HECHO QUINCUAGESIMOSEPTIMO.</strong> La comparacion entre la facturacion de Pedro a AVANZ FINANZAS &amp; SEGUROS LTDA (NIT 901286973-7) y la facturacion a Oscar/ParetoMed demuestra que Pedro distinguia perfectamente entre una relacion de prestacion de servicios y una relacion societaria. Con Avanz, Pedro facturaba con concepto especifico de <em>&quot;Creacion de contenido / guiones comerciales, produccion y edicion de videos publicitarios para redes sociales&quot;</em>, a tarifa fija por entregable ($1.680.672 + adicionales), con cesion de derechos de autor implicita. Con Oscar/ParetoMed, la facturacion era radicalmente distinta: concepto generico de <em>&quot;COMISION&quot;</em> o <em>&quot;Gestion de redes y campanas&quot;</em>, monto variable calculado sobre el 20% de utilidades netas (sin entregables especificos facturados), y el <strong>75% de los pagos ($74.900.000) se hicieron SIN factura ni cuenta de cobro</strong>. Si la relacion con ParetoMed fuera una simple prestacion de servicios de contenido, Pedro habria facturado exactamente igual que con Avanz — tarifa fija, concepto de creacion de contenido, con cesion de derechos. No lo hizo porque NO era eso: era participacion de socio industrial en utilidades. <strong>[P-42, FE1 a FE15 (facturas a Avanz), FE3, FE4, FE5, P-12]</strong></p>
<h3>F. Utilidades post-ruptura documentadas con KPIs del demandado</h3>
', 
            'Facturación Avanz vs ParetoMed — dos modelos distintos', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-58', 
            58, 
            'QUINCUAGESIMOCTAVO', 
            'cap-15', 
            'Los KPIs de ventas de ParetoMed para 2025, contenidos en la hoja de calculo "Copia de KPIS 2025.xlsx" (archivo del demandado en poder del demandante), documentan que Oscar continuo explotando el negocio despues de la ruptura con los siguientes ingres...', 
            '**HECHO QUINCUAGESIMOCTAVO.** Los KPIs de ventas de ParetoMed para 2025, contenidos en la hoja de calculo "Copia de KPIS 2025.xlsx" (archivo del demandado en poder del demandante), documentan que Oscar continuo explotando el negocio despues de la ruptura con los siguientes ingresos: agosto 2025: $52.790.000; septiembre 2025: $52.640.800; octubre 2025: $64.057.500. Total periodo post-ruptura: **$169.488.300 COP**. Aplicando el margen de ganancia del 65% documentado en los consolidados de Oscar y la participacion del 20% pactada, las utilidades adeudadas a Pedro por este periodo ascienden a **$22.033.479 COP**. El negocio continuo operando hasta al menos diciembre 2025 (noviembre: $84.102.500; diciembre: $46.050.000), periodo cuyas utilidades tambien podrian ser reclamables. La ultima transferencia de Oscar a Pedro ($7.450.000 del 05/08/2025) cubria el mes de julio 2025, por lo que agosto en adelante se adeuda integramente. **[P-43, P-02]**

---', 
            '<p><strong>HECHO QUINCUAGESIMOCTAVO.</strong> Los KPIs de ventas de ParetoMed para 2025, contenidos en la hoja de calculo &quot;Copia de KPIS 2025.xlsx&quot; (archivo del demandado en poder del demandante), documentan que Oscar continuo explotando el negocio despues de la ruptura con los siguientes ingresos: agosto 2025: $52.790.000; septiembre 2025: $52.640.800; octubre 2025: $64.057.500. Total periodo post-ruptura: <strong>$169.488.300 COP</strong>. Aplicando el margen de ganancia del 65% documentado en los consolidados de Oscar y la participacion del 20% pactada, las utilidades adeudadas a Pedro por este periodo ascienden a <strong>$22.033.479 COP</strong>. El negocio continuo operando hasta al menos diciembre 2025 (noviembre: $84.102.500; diciembre: $46.050.000), periodo cuyas utilidades tambien podrian ser reclamables. La ultima transferencia de Oscar a Pedro ($7.450.000 del 05/08/2025) cubria el mes de julio 2025, por lo que agosto en adelante se adeuda integramente. <strong>[P-43, P-02]</strong></p>
<hr>
', 
            'KPIs post-ruptura — $169M en ventas sin pagar a Pedro', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-59', 
            59, 
            'QUINCUAGESIMONOVENO', 
            'cap-16', 
            'El 13 de julio de 2025, Oscar Maldonado exigio a Pedro obligaciones propias de un socio respecto a una herramienta tecnologica desarrollada por Pedro, declarando en audios de WhatsApp: *"tu eres socio, no es que vas a sacar tu aplicacion propia... te...', 
            '**HECHO QUINCUAGESIMONOVENO.** El 13 de julio de 2025, Oscar Maldonado exigio a Pedro obligaciones propias de un socio respecto a una herramienta tecnologica desarrollada por Pedro, declarando en audios de WhatsApp: *"tu eres socio, no es que vas a sacar tu aplicacion propia... tenemos el acuerdo de que lo que desarrolles es para ParetoMed porque tu eres socio"* (PTT-20250713-WA0007). En un audio posterior del mismo dia, Oscar reitero: *"si tu desarrollas una aplicacion, tu eres socio para esto... papi, tu lo desarrollaste siendo socio de ParetoMed... yo creo que ahi no hay cabida, no hay duda"* (PTT-20250713-WA0009). Estas declaraciones constituyen un reconocimiento inequivoco de la sociedad de hecho apenas UN MES antes de la ruptura: Oscar no solo llamaba socio a Pedro, sino que le EXIGIA obligaciones fiduciarias propias de un socio (que lo desarrollado beneficiara a la sociedad). **[P-05, P-02]**

### B. Oscar reconocio aportes metodologicos de Pedro', 
            '<p><strong>HECHO QUINCUAGESIMONOVENO.</strong> El 13 de julio de 2025, Oscar Maldonado exigio a Pedro obligaciones propias de un socio respecto a una herramienta tecnologica desarrollada por Pedro, declarando en audios de WhatsApp: <em>&quot;tu eres socio, no es que vas a sacar tu aplicacion propia... tenemos el acuerdo de que lo que desarrolles es para ParetoMed porque tu eres socio&quot;</em> (PTT-20250713-WA0007). En un audio posterior del mismo dia, Oscar reitero: <em>&quot;si tu desarrollas una aplicacion, tu eres socio para esto... papi, tu lo desarrollaste siendo socio de ParetoMed... yo creo que ahi no hay cabida, no hay duda&quot;</em> (PTT-20250713-WA0009). Estas declaraciones constituyen un reconocimiento inequivoco de la sociedad de hecho apenas UN MES antes de la ruptura: Oscar no solo llamaba socio a Pedro, sino que le EXIGIA obligaciones fiduciarias propias de un socio (que lo desarrollado beneficiara a la sociedad). <strong>[P-05, P-02]</strong></p>
<h3>B. Oscar reconocio aportes metodologicos de Pedro</h3>
', 
            '"Eres socio — lo que desarrolles es para ParetoMed"', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-60', 
            60, 
            'SEXAGESIMO', 
            'cap-16', 
            'En la reunion del 14 de julio de 2025, Oscar Maldonado reconocio expresamente que elementos centrales de la metodologia actual de ParetoMed fueron ideados por Pedro: (a) Oscar *"confirmo que la idea de los simulacros pre y post estudio, con objetivos...', 
            '**HECHO SEXAGESIMO.** En la reunion del 14 de julio de 2025, Oscar Maldonado reconocio expresamente que elementos centrales de la metodologia actual de ParetoMed fueron ideados por Pedro: (a) Oscar *"confirmo que la idea de los simulacros pre y post estudio, con objetivos diferentes y la incorporacion de preguntas nuevas al final del simulacro, fue de Pedro Vergara"*; (b) *"la idea de enviar mensajes post-simulacro fue de Pedro Vergara"*; (c) Pedro afirmo que *"la idea de tener un grupo de WhatsApp para la comunicacion entre estudiantes tambien fue suya"* sin contradiccion de Oscar; (d) *"La decision de abordar un modulo por semana surgio de una conversacion entre ambos"*. En chat del 12 de julio de 2025, Pedro le recordo a Oscar: *"convertir el simulacro final que tu tenias en un simulacro pre, hacer el post justificado que nacio del grupo de estudio si fueron ideas mias que mejoraron"* el programa. Oscar respondio: *"Si reconozco."* Adicionalmente, el 11 de abril de 2025, Oscar reconocio: *"lo de las tutorias ha sido una excelente idea y te he dejado llevarlo como has querido."* Estos aportes transformaron la metodologia de ParetoMed de un simple curso pregrabado a un programa estructurado con ciclos de 90 dias, acompanamiento personalizado y evaluacion continua — elementos que constituyen el principal diferenciador comercial del negocio y que justifican el precio de $2.850.000 por estudiante. **[P-34, P-02]**

### C. Contrato de Cuentas en Participacion predatado', 
            '<p><strong>HECHO SEXAGESIMO.</strong> En la reunion del 14 de julio de 2025, Oscar Maldonado reconocio expresamente que elementos centrales de la metodologia actual de ParetoMed fueron ideados por Pedro: (a) Oscar <em>&quot;confirmo que la idea de los simulacros pre y post estudio, con objetivos diferentes y la incorporacion de preguntas nuevas al final del simulacro, fue de Pedro Vergara&quot;</em>; (b) <em>&quot;la idea de enviar mensajes post-simulacro fue de Pedro Vergara&quot;</em>; (c) Pedro afirmo que <em>&quot;la idea de tener un grupo de WhatsApp para la comunicacion entre estudiantes tambien fue suya&quot;</em> sin contradiccion de Oscar; (d) <em>&quot;La decision de abordar un modulo por semana surgio de una conversacion entre ambos&quot;</em>. En chat del 12 de julio de 2025, Pedro le recordo a Oscar: <em>&quot;convertir el simulacro final que tu tenias en un simulacro pre, hacer el post justificado que nacio del grupo de estudio si fueron ideas mias que mejoraron&quot;</em> el programa. Oscar respondio: <em>&quot;Si reconozco.&quot;</em> Adicionalmente, el 11 de abril de 2025, Oscar reconocio: <em>&quot;lo de las tutorias ha sido una excelente idea y te he dejado llevarlo como has querido.&quot;</em> Estos aportes transformaron la metodologia de ParetoMed de un simple curso pregrabado a un programa estructurado con ciclos de 90 dias, acompanamiento personalizado y evaluacion continua — elementos que constituyen el principal diferenciador comercial del negocio y que justifican el precio de $2.850.000 por estudiante. <strong>[P-34, P-02]</strong></p>
<h3>C. Contrato de Cuentas en Participacion predatado</h3>
', 
            'Oscar reconoce aportes metodológicos de Pedro', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-61', 
            61, 
            'SEXAGESIMOPRIMERO', 
            'cap-16', 
            'El Contrato de Cuentas en Participacion [P-14] fue entregado por Oscar en agosto de 2025, pero su encabezado dice textualmente: *"El dia 1 de [espacio en blanco] de 2024"* — con el mes sin completar. Esta predatacion constituye un intento de redefini...', 
            '**HECHO SEXAGESIMOPRIMERO.** El Contrato de Cuentas en Participacion [P-14] fue entregado por Oscar en agosto de 2025, pero su encabezado dice textualmente: *"El dia 1 de [espacio en blanco] de 2024"* — con el mes sin completar. Esta predatacion constituye un intento de redefinir retroactivamente la naturaleza de la relacion societaria. En la grabacion del 14 de agosto de 2025, Oscar revelo que este contrato fue disenado por su abogada como una *"estructura que tiene 90% de seguridad... tributaria"* para *"no pagar tanto impuesto"*. El proposito real del contrato no era reflejar la relacion existente sino crear un instrumento retroactivo que eliminara los derechos de Pedro sobre el patrimonio social. **[P-14, P-01]**

### D. Patron de clausulas anticompetencia en todos los contratos de Oscar', 
            '<p><strong>HECHO SEXAGESIMOPRIMERO.</strong> El Contrato de Cuentas en Participacion [P-14] fue entregado por Oscar en agosto de 2025, pero su encabezado dice textualmente: <em>&quot;El dia 1 de [espacio en blanco] de 2024&quot;</em> — con el mes sin completar. Esta predatacion constituye un intento de redefinir retroactivamente la naturaleza de la relacion societaria. En la grabacion del 14 de agosto de 2025, Oscar revelo que este contrato fue disenado por su abogada como una <em>&quot;estructura que tiene 90% de seguridad... tributaria&quot;</em> para <em>&quot;no pagar tanto impuesto&quot;</em>. El proposito real del contrato no era reflejar la relacion existente sino crear un instrumento retroactivo que eliminara los derechos de Pedro sobre el patrimonio social. <strong>[P-14, P-01]</strong></p>
<h3>D. Patron de clausulas anticompetencia en todos los contratos de Oscar</h3>
', 
            'Contrato predatado con mes en blanco', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-62', 
            62, 
            'SEXAGESIMOSEGUNDO', 
            'cap-16', 
            'Todos los contratos propuestos por Oscar incluian clausulas de no competencia dirigidas a restringir la actividad profesional de Pedro: (a) el Acuerdo de Socios propuesto en version SAS incluia una restriccion de **5 anos** que prohibia a Pedro *"com...', 
            '**HECHO SEXAGESIMOSEGUNDO.** Todos los contratos propuestos por Oscar incluian clausulas de no competencia dirigidas a restringir la actividad profesional de Pedro: (a) el Acuerdo de Socios propuesto en version SAS incluia una restriccion de **5 anos** que prohibia a Pedro *"comenzar una empresa/emprendimiento/negocio que entre en competencia directa con Paretomed"* en todo el sector de *"educacion medica virtual"* [P-08]; (b) el 13 de enero de 2025, Oscar informo que estaba modificando los estatutos para incluir *"la clausula de no competencia"* [P-02]; (c) el Contrato de Transaccion de septiembre 2025 incluia una restriccion de **2 anos** con clausula penal equivalente al 20% de todos los pagos recibidos (~$20.000.000) [P-15]. Las clausulas de no competencia de largo alcance solo se justifican frente a un socio con conocimiento interno del negocio, no frente a un prestador de servicios externo — un contratista de marketing no es un competidor potencial que requiera restriccion por 5 anos. **[P-08, P-15, P-02]**

### E. NETMED S.A.S. — Vehiculo post-ruptura', 
            '<p><strong>HECHO SEXAGESIMOSEGUNDO.</strong> Todos los contratos propuestos por Oscar incluian clausulas de no competencia dirigidas a restringir la actividad profesional de Pedro: (a) el Acuerdo de Socios propuesto en version SAS incluia una restriccion de <strong>5 anos</strong> que prohibia a Pedro <em>&quot;comenzar una empresa/emprendimiento/negocio que entre en competencia directa con Paretomed&quot;</em> en todo el sector de <em>&quot;educacion medica virtual&quot;</em> [P-08]; (b) el 13 de enero de 2025, Oscar informo que estaba modificando los estatutos para incluir <em>&quot;la clausula de no competencia&quot;</em> [P-02]; (c) el Contrato de Transaccion de septiembre 2025 incluia una restriccion de <strong>2 anos</strong> con clausula penal equivalente al 20% de todos los pagos recibidos (~$20.000.000) [P-15]. Las clausulas de no competencia de largo alcance solo se justifican frente a un socio con conocimiento interno del negocio, no frente a un prestador de servicios externo — un contratista de marketing no es un competidor potencial que requiera restriccion por 5 anos. <strong>[P-08, P-15, P-02]</strong></p>
<h3>E. NETMED S.A.S. — Vehiculo post-ruptura</h3>
', 
            'Cláusulas anticompetencia de 5 años — solo para socios', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-63', 
            63, 
            'SEXAGESIMOTERCERO', 
            'cap-16', 
            'El 15 de octubre de 2025, Oscar Maldonado constituyo la sociedad **NETMED S.A.S.** (NIT 902.004.012-9, Matricula 926.784) mediante documento privado en Barranquilla, inscrita en la Camara de Comercio el 30 de octubre de 2025. Oscar es propietario del...', 
            '**HECHO SEXAGESIMOTERCERO.** El 15 de octubre de 2025, Oscar Maldonado constituyo la sociedad **NETMED S.A.S.** (NIT 902.004.012-9, Matricula 926.784) mediante documento privado en Barranquilla, inscrita en la Camara de Comercio el 30 de octubre de 2025. Oscar es propietario del 100% de las acciones. La actividad economica registrada es CIIU 6201 (desarrollo de sistemas informaticos). En la grabacion del 14 de agosto de 2025, Oscar admitio el proposito: *"yo quiero honrar el acuerdo contigo... los abogados y contadores me dijeron... sociedad de hecho con el man no puedes cortarlo... presenteme una forma en que yo pueda mantenerme con el pero tambien pueda crear lo otro... y ahi fue donde seria el contrato de cuentas en participacion"*. La politica de privacidad actual del sitio web de ParetoMed ya aparece a nombre de NETMED S.A.S. en lugar de Oscar Maldonado persona natural. Sin embargo, en febrero de 2026, la asesora de ventas Adriana continua enviando a interesados el numero de cuenta personal de Oscar Maldonado (no de NETMED) para el pago del programa, lo que evidencia que la transferencia de operaciones a NETMED es formal pero no real. **[P-24, P-01, P-49]**

### F. Estructura tributaria disenada para evadir', 
            '<p><strong>HECHO SEXAGESIMOTERCERO.</strong> El 15 de octubre de 2025, Oscar Maldonado constituyo la sociedad <strong>NETMED S.A.S.</strong> (NIT 902.004.012-9, Matricula 926.784) mediante documento privado en Barranquilla, inscrita en la Camara de Comercio el 30 de octubre de 2025. Oscar es propietario del 100% de las acciones. La actividad economica registrada es CIIU 6201 (desarrollo de sistemas informaticos). En la grabacion del 14 de agosto de 2025, Oscar admitio el proposito: <em>&quot;yo quiero honrar el acuerdo contigo... los abogados y contadores me dijeron... sociedad de hecho con el man no puedes cortarlo... presenteme una forma en que yo pueda mantenerme con el pero tambien pueda crear lo otro... y ahi fue donde seria el contrato de cuentas en participacion&quot;</em>. La politica de privacidad actual del sitio web de ParetoMed ya aparece a nombre de NETMED S.A.S. en lugar de Oscar Maldonado persona natural. Sin embargo, en febrero de 2026, la asesora de ventas Adriana continua enviando a interesados el numero de cuenta personal de Oscar Maldonado (no de NETMED) para el pago del programa, lo que evidencia que la transferencia de operaciones a NETMED es formal pero no real. <strong>[P-24, P-01, P-49]</strong></p>
<h3>F. Estructura tributaria disenada para evadir</h3>
', 
            'NETMED: vehículo diseñado para escapar la sociedad', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hechos (id, numero, ordinal, capitulo_id, resumen, texto_completo, texto_completo_html, titulo_corto, nota_abogado) VALUES (
            'hecho-64', 
            64, 
            'SEXAGESIMOCUARTO', 
            'cap-16', 
            'El 10 de julio de 2025, Oscar revelo en chat de WhatsApp un plan tributario consistente en crear una LLC en Estados Unidos y una SAS en Colombia que le prestara servicios: *"la idea es crear una SAS aca en Colombia que le preste servicios a la LLC en...', 
            '**HECHO SEXAGESIMOCUARTO.** El 10 de julio de 2025, Oscar revelo en chat de WhatsApp un plan tributario consistente en crear una LLC en Estados Unidos y una SAS en Colombia que le prestara servicios: *"la idea es crear una SAS aca en Colombia que le preste servicios a la LLC en EUA. Por la naturaleza de los servicios estaria exento de IVA"*. En la grabacion del 14 de agosto, Oscar amplio: *"la vamos a presentar como una empresa de cloud hosting... ya no va a ser una empresa educativa... y ahi no pago tanto impuesto"*. Esta estructura fue disenada para reducir la carga impositiva del negocio, y el Contrato de Cuentas en Participacion formaba parte de la misma estrategia: *"creamos alguna estructura que tiene 90% de seguridad... tributaria"*. El hecho de que Oscar reestructurara el negocio para evadir impuestos mientras dilataba la formalizacion de la sociedad con Pedro evidencia que sus prioridades eran fiscales y no la proteccion de los derechos de su socio. **[P-02, P-01]**', 
            '<p><strong>HECHO SEXAGESIMOCUARTO.</strong> El 10 de julio de 2025, Oscar revelo en chat de WhatsApp un plan tributario consistente en crear una LLC en Estados Unidos y una SAS en Colombia que le prestara servicios: <em>&quot;la idea es crear una SAS aca en Colombia que le preste servicios a la LLC en EUA. Por la naturaleza de los servicios estaria exento de IVA&quot;</em>. En la grabacion del 14 de agosto, Oscar amplio: <em>&quot;la vamos a presentar como una empresa de cloud hosting... ya no va a ser una empresa educativa... y ahi no pago tanto impuesto&quot;</em>. Esta estructura fue disenada para reducir la carga impositiva del negocio, y el Contrato de Cuentas en Participacion formaba parte de la misma estrategia: <em>&quot;creamos alguna estructura que tiene 90% de seguridad... tributaria&quot;</em>. El hecho de que Oscar reestructurara el negocio para evadir impuestos mientras dilataba la formalizacion de la sociedad con Pedro evidencia que sus prioridades eran fiscales y no la proteccion de los derechos de su socio. <strong>[P-02, P-01]</strong></p>
', 
            'Plan de evasión fiscal — LLC en Estados Unidos', 
            NULL
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-01', 
            'Grabacion de llamada telefonica Oscar-Pedro, 14/08/2025', 
            'Confesion extrajudicial', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-02', 
            'Chat de WhatsApp Oscar-Pedro (conversacion directa)', 
            'Documento electronico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-03', 
            'Chat de WhatsApp Equipo de Trabajo Paretomed', 
            'Documento electronico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-04', 
            'Chat de WhatsApp Correcciones y Sugerencias Paretomed', 
            'Documento electronico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-05', 
            'Transcripciones Consolidadas de Audios WhatsApp', 
            'Documento electronico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-06', 
            'Acuerdo de Socios ORIGINAL (no modificado), inicios 2024', 
            'Borrador contractual', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-07', 
            'Acuerdo de Socios MODIFICADO (acciones -> utilidades), Google Docs', 
            'Borrador alterado', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-08', 
            'Acuerdo de Socios propuesto por Oscar (version SAS)', 
            'Propuesta contractual', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-09', 
            'Acuerdo de Socios Original con Aportes de Ambos (julio 2024, nunca firmado)', 
            'Borrador con notas manuscritas', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-10', 
            'Borrador de Acuerdo Original de Pedro, 06/02/2024', 
            'Propuesta contractual', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-11', 
            'Carta de Recomendacion firmada por Oscar Maldonado, 27/04/2024', 
            'Documento firmado por el demandado', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-12', 
            'Cuentas de Cobro de Pedro Vergara (mayo-septiembre 2024)', 
            'Documentos financieros', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-13', 
            'Liquidaciones mensuales detalladas en WhatsApp', 
            'Comunicaciones electronicas', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-14', 
            'Contrato de Cuentas en Participacion aportado por Oscar, 22/08/2025, nunca firmado', 
            'Propuesta contractual', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-15', 
            'Contrato de Transaccion propuesto por Oscar, ~12/09/2025, no firmado', 
            'Propuesta contractual', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-16', 
            'Contrato de Transaccion Dr. Flight (contrapropuesta de Pedro), 14/10/2025', 
            'Propuesta contractual', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-17', 
            'Contrato de Liquidacion propuesto por Pedro, agosto 2025', 
            'Propuesta contractual', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-18', 
            'Notificacion Formal de Cese de Explotacion, 29/08/2025', 
            'Comunicacion formal', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-19', 
            'Constancia de No Conciliacion N 00-1844, 20/02/2026', 
            'Documento publico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-20', 
            'Certificado Camara de Comercio - Establecimiento PARETOMED (Matricula 865.875), 17/08/2025', 
            'Documento publico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-21', 
            'Certificado de Existencia y Representacion Legal DOCTOR FLIGHT S.A.S. (NIT 901.767.877-2), 17/09/2025', 
            'Documento publico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-22', 
            'Certificado DNDA - 238 obras audiovisuales (476 registros), 28/10/2025', 
            'Documento publico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-23', 
            'Certificado DNDA - Ejemplo obra "Disfuncion Neuromuscular Pregunta" (4-34-115), 02/09/2025', 
            'Documento publico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-24', 
            'Certificado de Existencia NETMED S.A.S.', 
            'Documento publico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-25', 
            'SOP de Reunion 1:1 redactado por Pedro, 05/06/2024', 
            'Documentacion operativa', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-26', 
            'SOP de Seguimiento Paretomed redactado por Pedro', 
            'Documentacion operativa', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-27', 
            'Explicacion de Metodologia (version comparativa Oscar vs. Pedro), 14/05/2024', 
            'Documento comparativo', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-28', 
            'Reels y Guiones 2025 redactados por Pedro', 
            'Propiedad intelectual', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-29', 
            'Reels Julio 2024 redactados por Pedro', 
            'Propiedad intelectual', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-30', 
            'Reels Septiembre 2024 redactados por Pedro', 
            'Propiedad intelectual', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-31', 
            'Documento de Reels - 28 de abril 2024 redactado por Pedro', 
            'Propiedad intelectual', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-32', 
            'Reels Octubre-Noviembre-Diciembre 2024 redactados por Pedro', 
            'Propiedad intelectual', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-33', 
            'Bitacora de transcripcion chat con Adriana (asesora de ventas)', 
            'Documento electronico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-34', 
            'Actas de 7 reuniones documentadas (mayo-julio 2025)', 
            'Documentacion interna', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-35', 
            'Solicitud de Conciliacion EF Legal, 11/11/2025, nunca radicada', 
            'Estrategia legal previa', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-36', 
            'Transferencias bancarias Bancolombia cuenta **4483 (14 transferencias, $99.319.834 total)', 
            'Prueba financiera', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-37', 
            'Capturas de pantalla SMS Bancolombia (PAGOS 1, 2, 3 y 4)', 
            'Prueba documental fotografica', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-38', 
            'Borrador de Demanda (BORRADOR DEMANDA 2.docx) del apoderado Alfredo A. Toledo Vergara', 
            'Documento procesal', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-39', 
            'Mensajes de WhatsApp referentes a Efrain (fotografo) y Paul (comunicador social) trabajando para ParetoMed', 
            'Documento electronico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-40', 
            'Mensajes de WhatsApp donde se discuten y acuerdan precios del programa entre Oscar y Pedro', 
            'Documento electronico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-41', 
            'Transcripcion de audio Oscar Maldonado, 08/01/2025 (PTT-20250108-WA0003 y PTT-20250108-WA0012) — "mera formalidad" y "alguien que sepa que eso es suyo"', 
            'Confesion extrajudicial', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-42', 
            'Excel COMPROBANTES_PARETOMED_ANALISIS.xlsx — 376 comprobantes de pago de estudiantes procesados (feb 2024 - sep 2025), ingresos brutos $579.217.496 COP', 
            'Prueba financiera / Pericial contable', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-43', 
            'Copia de KPIS 2025.xlsx — Hoja de calculo de KPIs de ventas de ParetoMed (ene-dic 2025), archivo del demandado en poder del demandante', 
            'Prueba financiera', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-44', 
            'Testimonio de Efrain (fotografo y editor audiovisual, empleado de Doctor Flight S.A.S.) — pendiente datos completos', 
            'Prueba testimonial', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-45', 
            'Testimonio de Paul (comunicador social, empleado de Doctor Flight S.A.S.) — pendiente confirmacion', 
            'Prueba testimonial', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-46', 
            'Facturas electronicas FE1 a FE15 emitidas por Doctor Flight S.A.S. a Avanz Finanzas & Seguros Ltda (NIT 901286973-7) — Demuestran que Pedro facturaba servicios de contenido de manera distinta a la relacion con ParetoMed', 
            'Prueba documental comparativa', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-47', 
            'Mensaje WhatsApp Oscar-Pedro, 28/02/2025 — Oscar revela existencia de "hoja de calculo personal mia" con contabilidad del negocio y se niega a compartirla', 
            'Documento electronico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-48', 
            'Mensaje WhatsApp Oscar-Pedro, 05/08/2025 — Oscar se niega a rendir consolidado: "Joda, no tengo porque hacerlo y me ofende que me lo pidas"', 
            'Documento electronico', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-49', 
            'Captura de pantalla feb 2026 — Adriana (asesora de ventas) envia cuenta bancaria personal de Oscar (no de NETMED) a interesado para pago del programa', 
            'Prueba documental', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-50', 
            'Audios WhatsApp Oscar 13/07/2025 (PTT-20250713-WA0007 a WA0010) — Oscar exige deberes de socio: "tu eres socio... lo que desarrolles es para ParetoMed"', 
            'Confesion extrajudicial', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-51', 
            'Resumen reunion 14/07/2025 — Oscar confirma que simulacros pre/post, mensajes post-simulacro y grupo WhatsApp fueron ideas de Pedro', 
            'Documentacion interna', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.pruebas (id, descripcion, tipo, categoria) VALUES (
            'P-52', 
            'Politica de privacidad actual sitio web ParetoMed — aparece NETMED S.A.S. en lugar de Oscar persona natural', 
            'Prueba documental', 
            ''
        ) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-1', 'P-21') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-2', 'P-20') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-4', 'P-02') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-5', 'P-02') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-7', 'P-04') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-9', 'P-11') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-12', 'P-02') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-13', 'P-02') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-15', 'P-27') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-20', 'P-16') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-21', 'P-01') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-22', 'P-01') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-23', 'P-02') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-24', 'P-02') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-25', 'P-09') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-27', 'P-34') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-29', 'P-02') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-30', 'P-02') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-33', 'P-14') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-36', 'P-15') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-37', 'P-16') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-40', 'P-20') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-41', 'P-19') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-42', 'P-19') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-43', 'P-17') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-45', 'P-18') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-46', 'P-01') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-46', 'P-11') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-46', 'P-09') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-46', 'P-14') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-46', 'P-19') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-46', 'P-20') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-46', 'P-50') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-48', 'P-02') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-49', 'P-03') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-49', 'P-02') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-49', 'P-05') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-50', 'P-02') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-53', 'P-42') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-61', 'P-14') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-62', 'P-08') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-62', 'P-02') ON CONFLICT DO NOTHING;
INSERT INTO public.hecho_pruebas (hecho_id, prueba_id) VALUES ('hecho-62', 'P-15') ON CONFLICT DO NOTHING;
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-4', 
                    'nos conocimos en el startup day uninorte, me presente con mi empresa Dr flight de turismo médico', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '04/01/2024', 
                    'Pedro Vergara', 
                    'Primer contacto documentado entre las partes — origen del vínculo societario'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-4', 
                    'Si te interesa sumarte al proyecto me avisas, siempre es bueno tener apoyo, a mi me ha tocado todo solo', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '04/01/2024', 
                    'Oscar Maldonado', 
                    'Oscar invita a Pedro a sumarse al proyecto — voluntad inicial de asociarse'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-5', 
                    'Además si vamos a trabajar juntos como socios tengo que conocer todo el material a fondo', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '10/01/2024', 
                    'Pedro Vergara', 
                    'Pedro usa la palabra 'socios' desde enero 2024 — affectio societatis original'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-5', 
                    'miramos el tema de la sociedad, ¿qué opinas?', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '10/01/2024', 
                    'Oscar Maldonado', 
                    'Oscar abre formalmente la puerta a la constitución de sociedad'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-6', 
                    'Vesting future stock a 30% Cliff 12 meses Consolidación trimestral', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '06/02/2024', 
                    'Pedro Vergara', 
                    'Propuesta original de Pedro con 30% de acciones — incompatible con prestación de servicios'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-7', 
                    'yo te presento a mi socio', 
                    'transcripciones', 
                    NULL, 
                    '14/08/2025', 
                    'Oscar Maldonado', 
                    'Oscar admite presentar a Pedro como socio ante terceros (Coventus) — P-01 Grabación'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-7', 
                    'nos conocimos en un evento de emprendimiento', 
                    'transcripciones', 
                    NULL, 
                    '14/08/2025', 
                    'Oscar Maldonado', 
                    'Oscar narra el origen de la relación ante terceros reconociendo su naturaleza societaria'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-8', 
                    'te presento a mi socio', 
                    'transcripciones', 
                    NULL, 
                    '14/08/2025', 
                    'Oscar Maldonado', 
                    'Confesión extrajudicial: presentación de Pedro como socio ante Coventus — P-01'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-9', 
                    'Subdirector Académico y Comercial de Paretomed', 
                    'doc-carta-recomendacion', 
                    NULL, 
                    '27/04/2024', 
                    'Oscar Maldonado', 
                    'Cargo directivo en carta de recomendación FIRMADA por Oscar — P-11. Un cargo de Subdirector es incompatible con simple prestación de servicios'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-10', 
                    'No es el interes de las Partes constituir una persona juridica distinta de estas individualmente consideradas, ni una sociedad de hecho', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '22/08/2025', 
                    'Oscar Maldonado', 
                    'El Contrato de Cuentas en Participación reconoce implícitamente los aportes de Oscar al describir el objeto de la relación — P-14. Si Oscar no tuviera aportes, no habría nada que regular'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-10', 
                    'estructura que tiene 90% de seguridad... tributaria', 
                    'transcripciones', 
                    NULL, 
                    '14/08/2025', 
                    'Oscar Maldonado', 
                    'Oscar reconoce que él aportó el capital y la estructura legal del negocio, buscando optimizarla — P-01'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-11', 
                    'experiencia en manejo de redes, edicion de videos, redaccion de guiones, grabacion de videoclases, asesoria en creacion de contenido y marketing, gestion de cuentas, optimizacion del tunel de ventas', 
                    'doc-contrato-cp', 
                    NULL, 
                    '22/08/2025', 
                    'Oscar Maldonado', 
                    'Oscar RECONOCE TEXTUALMENTE los aportes de Pedro en el Contrato de Cuentas en Participación — P-14. Es un inventario de aportes industriales redactado por el propio demandado'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-12', 
                    'la clausula de no competencia', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '13/01/2025', 
                    'Oscar Maldonado', 
                    'Oscar menciona la cláusula anticompetencia en el contexto del Dashboard React, reconociendo que la herramienta era un aporte valioso para ParetoMed — P-02'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-12', 
                    'tu eres socio, no es que vas a sacar tu aplicacion propia... tenemos el acuerdo de que lo que desarrolles es para ParetoMed porque tu eres socio', 
                    'transcripciones', 
                    NULL, 
                    '13/07/2025', 
                    'Oscar Maldonado', 
                    'CONFESIÓN: Oscar exige que el Dashboard desarrollado por Pedro pertenezca a ParetoMed por ser Pedro su socio — P-50. Reconoce aporte tecnológico al exigir deberes societarios sobre él'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-13', 
                    'Pensaba que tan factible es que lo hagamos en tu estudio para que se vea bien profesional', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '12/04/2024', 
                    'Oscar Maldonado', 
                    'Oscar reconoce y solicita el uso del estudio de grabación profesional de Pedro como aporte al negocio — P-02'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-14', 
                    'SOP de Reunion 1:1 redactado por Pedro, 05/06/2024', 
                    'doc-sop-reunion', 
                    NULL, 
                    '05/06/2024', 
                    'Pedro Vergara', 
                    'Pedro diseña el procedimiento completo de onboarding de estudiantes — P-25. El diseño de SOPs es función propia de un socio o director, no de un contratista de marketing'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-14', 
                    'La decision de abordar un modulo por semana surgio de una conversacion entre ambos', 
                    'transcripciones', 
                    NULL, 
                    '14/07/2025', 
                    'Oscar Maldonado', 
                    'Oscar reconoce que los SOPs metodológicos emergieron de decisiones conjuntas — P-34'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-15', 
                    'lo de las tutorias ha sido una excelente idea y te he dejado llevarlo como has querido', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '11/04/2025', 
                    'Oscar Maldonado', 
                    'Oscar reconoce que Pedro introdujo mejoras sustanciales al programa — P-02. 'Dejar llevar' implica autonomía de socio, no obediencia de contratista'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-15', 
                    'convertir el simulacro final que tu tenias en un simulacro pre, hacer el post justificado que nacio del grupo de estudio si fueron ideas mias que mejoraron', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '12/07/2025', 
                    'Pedro Vergara', 
                    'Pedro reivindica aportes metodológicos clave que transformaron el curso en programa — P-02'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-15', 
                    'Si reconozco.', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '12/07/2025', 
                    'Oscar Maldonado', 
                    'Oscar confirma con dos palabras que los aportes metodológicos de Pedro son reales y significativos — P-02'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-16', 
                    'guiones comerciales completos para campanas de captacion del Q1 2025', 
                    'doc-reels-guiones', 
                    NULL, 
                    '2025', 
                    'Pedro Vergara', 
                    'Pedro produce el contenido comercial del negocio — P-28 a P-32. La producción masiva de guiones es incompatible con prestación ocasional de servicios'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-16', 
                    'Oscar trate de editarlo pa que lo subieras ahorita y no me gusto el capcut de movil no tiene buenas funciones', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '23/03/2024', 
                    'Pedro Vergara', 
                    'Pedro asume el control de calidad de las ediciones del negocio desde el inicio — P-02'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-16', 
                    'ya estan creados los canales de YouTube y tiktok', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '01/04/2024', 
                    'Pedro Vergara', 
                    'Pedro ejecuta la creación de infraestructura digital del negocio — P-02'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-17', 
                    'que Efrain se dedique 100% a eso y entre el y yo se podemos sacarlo adelante', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '04/11/2024', 
                    'Pedro Vergara', 
                    'Pedro ofrece recurso humano propio al negocio — aporte en industria propio de socio, no de contratista'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-17', 
                    'Hey, recuerdame el correo de Efrain para enviar la animacion tambien alli', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '22/11/2024', 
                    'Oscar Maldonado', 
                    'Oscar interactúa directamente con empleado de Pedro — asume al trabajador como recurso del negocio compartido'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-17', 
                    'si es con Efrain en lo posible nos quede mas barato que 1,5', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '04/11/2024', 
                    'Oscar Maldonado', 
                    'Oscar negocia el costo del empleado de Pedro para el negocio conjunto — reconoce el aporte de industria'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-17', 
                    'se lo deje a Paul para que aprendiera a hacerlo', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '18/03/2025', 
                    'Pedro Vergara', 
                    'Pedro asigna segundo empleado propio al negocio — duplica el aporte en industria'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-17', 
                    'Te esta escribiendo Paul... Para seguir subiendo a YouTube y tiktok estamos bloqueados', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '13/08/2025', 
                    'Pedro Vergara', 
                    'Paul gestiona accesos directamente con Oscar — trabajador de Pedro integrado como recurso del negocio'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-18', 
                    'Crear cuentas @paretomed para titk tok y youtube y facebook', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '28/03/2024', 
                    'Pedro Vergara', 
                    'Pedro propone y crea los canales digitales del negocio — acto fundacional propio de socio'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-18', 
                    'Crea el canal de YouTube con esta cuenta', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '29/03/2024', 
                    'Oscar Maldonado', 
                    'Oscar entrega credenciales institucionales a Pedro para crear infraestructura digital'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-18', 
                    'ya estan creados los canales de YouTube y tiktok', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '01/04/2024', 
                    'Pedro Vergara', 
                    'Pedro confirma creación de canales — infraestructura digital del negocio construida por el demandante'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-18', 
                    'Ingresos: 10,889,303. Egresos: 3,872,653. Ganancia: 7,016,650. Porcentaje de Pedro: 7,016,650 x 0,20 = 1,403,330', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '07/05/2024', 
                    'Oscar Maldonado', 
                    'Primera liquidación: Oscar calcula el 20% sobre GANANCIA NETA — fórmula de utilidades de socio, no honorarios de servicios — P-13'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-19', 
                    'los que aprendi fueron Da Vinci Resolve y Capcut para escritorio', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '04/01/2024', 
                    'Oscar Maldonado', 
                    'Oscar reconoce conocimiento superior de Pedro en edición audiovisual desde el inicio'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-19', 
                    'Da vinci resolve es muy bueno pero siento que para empezar es muy complicado, capcut de escritorio es mas amigable', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '04/01/2024', 
                    'Pedro Vergara', 
                    'Pedro asesora a Oscar en herramientas de edición — rol de dirección, no ejecución subordinada'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-19', 
                    'Oscar trate de editarlo pa que lo subieras ahorita y no me gusto el capcut de movil no tiene buenas funciones para mejorar el audio y los subtitulos', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '23/03/2024', 
                    'Pedro Vergara', 
                    'Pedro asume control de calidad de ediciones — liderazgo técnico propio de socio'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-20', 
                    '238 obras audiovisuales unicas, 476 registros', 
                    'doc-certificado-dnda', 
                    NULL, 
                    '28/10/2025', 
                    'DNDA', 
                    'Certificado DNDA: 238 obras registradas por Pedro como AUTOR, DIRECTOR y PRODUCTOR — P-22, P-23. Oscar solo aparece como ARTISTA/INTERPRETE/EJECUTANTE, nunca como autor'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-20', 
                    'si tu desarrollas una aplicacion, tu eres socio para esto... papi, tu lo desarrollaste siendo socio de ParetoMed', 
                    'transcripciones', 
                    NULL, 
                    '13/07/2025', 
                    'Oscar Maldonado', 
                    'Oscar reconoce que las obras creadas por Pedro son de ParetoMed — confesión que confirma el carácter societario del aporte intelectual — P-50'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-21', 
                    'O sea de que estamos trabajando juntos comercializando un proyecto y que nos llamabamos socios SI claramente claramente', 
                    'transcripciones', 
                    NULL, 
                    '14/08/2025', 
                    'Oscar Maldonado', 
                    'CONFESIÓN EXTRAJUDICIAL DIRECTA: Oscar admite la sociedad en grabación telefónica — P-01. La palabra 'claramente' repetida dos veces refuerza la voluntariedad y conciencia de la admisión'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-21', 
                    'como te presente yo con el man de alla de Coventus, le dije ey te presento a mi socio', 
                    'transcripciones', 
                    NULL, 
                    '14/08/2025', 
                    'Oscar Maldonado', 
                    'Oscar admite conducta societaria ante terceros — P-01. Presentar a alguien como 'socio' públicamente es reconocimiento inequívoco de affectio societatis'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-22', 
                    'si claramente estaba implicito que tu ibas a formar parte de la SAS. eso yo no te lo niego en ningun momento claramente', 
                    'transcripciones', 
                    NULL, 
                    '14/08/2025', 
                    'Oscar Maldonado', 
                    'CONFESIÓN: Oscar reconoce pacto de acciones en la SAS — P-01. 'No lo niego en ningún momento' elimina cualquier defensa de negativa'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-22', 
                    'yo quiero honrar el acuerdo contigo... los abogados y contadores me dijeron, ey... si que sociedad de hecho con el man, pero tu puedes cortarlo', 
                    'transcripciones', 
                    NULL, 
                    '14/08/2025', 
                    'Oscar Maldonado', 
                    'DEVASTADOR: Los propios asesores de Oscar confirmaron la sociedad de hecho — P-01. Si sus abogados y contadores lo reconocieron, el demandado no puede negarlo en juicio'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-23', 
                    'tenemos que reunirnos para que hablemos bien de las condiciones que necesito para que legalicemos la cosa', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '01/07/2024', 
                    'Oscar Maldonado', 
                    'Oscar manifiesta voluntad de FORMALIZAR lo que ya existe — solo se legaliza algo que ya opera de hecho'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-23', 
                    'le pedi a mi papa que es abogado que le pegara una revisada... tu sabes que yo voy pa'' lante con la sociedad', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '28/11/2024', 
                    'Oscar Maldonado', 
                    'Oscar involucra abogado familiar para revisar la sociedad — reconoce su existencia al buscar asesoría'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-23', 
                    'lo que vamos a hacer es constituir la SAS y ahi iriamos como socios', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '13/01/2025', 
                    'Oscar Maldonado', 
                    'Oscar propone formalizar como SAS con Pedro — confirma que ya son socios de hecho'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-24', 
                    'yo soy socio, no trabajador tuyo... si quieres un vale que haga todo lo que tu digas... vas a tener que contratarlo', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '18/07/2025', 
                    'Pedro Vergara', 
                    'Pedro reivindica su calidad de socio y rechaza la subordinación — P-02'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-24', 
                    'no deberias poder tomar decisiones sin compartirmelas y recibir mi opinion antes, porque para algo es una sociedad', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '23/07/2025', 
                    'Pedro Vergara', 
                    'Pedro exige derechos de socio. Clave: Oscar NO niega la calidad de socio en su respuesta — reconocimiento tácito por omisión — P-02'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-25', 
                    '20% de las utilidades no se justifican por una labor que es contratable. La idea, como se planteo en las discusiones verbales iniciales, es que ademas trabaje para impulsar con nuevas ideas y trabajar DE LLENO en esta', 
                    'doc-acuerdo-aportes', 
                    NULL, 
                    'julio 2024', 
                    'Oscar Maldonado', 
                    'NOTA MANUSCRITA DE OSCAR: reconoce que el 20% no es por servicios contratables — destruye la defensa de prestación de servicios — P-09'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-25', 
                    'Recordar lo que propuse en el acuerdo inicial e informal donde especificaba: Funciones que Pedro considere necesarias para el crecimiento de la empresa', 
                    'doc-acuerdo-aportes', 
                    NULL, 
                    'julio 2024', 
                    'Oscar Maldonado', 
                    'Oscar admite que EXISTIÓ un acuerdo verbal previo ('inicial e informal') — el pacto constitutivo de la sociedad de hecho — P-09'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-25', 
                    'las ideas, vision, estrategia y trabajo para el crecimiento de la empresa son las que justifican la participacion accionaria', 
                    'doc-acuerdo-aportes', 
                    NULL, 
                    'julio 2024', 
                    'Oscar Maldonado', 
                    'Oscar justifica la participación de Pedro como ACCIONARIA, no como honorarios — P-09'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-26', 
                    'uds me diran como la ven', 
                    'chat-equipo', 
                    NULL, 
                    '21/03/2025', 
                    'Adriana', 
                    'Tercero (asesora Adriana) consulta a AMBOS como co-decisores — P-03. El plural 'uds' implica que tanto Oscar como Pedro tenían autoridad decisoria'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-26', 
                    'Entonces dejalo en 2,850,000', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '17/07/2025', 
                    'Oscar Maldonado', 
                    'Oscar y Pedro co-determinan precios del programa — decisión estratégica exclusiva de socios, nunca de contratistas — P-02'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-26', 
                    'evaluo el desempeno de la asesora de ventas Adriana y propuso su reemplazo', 
                    'doc-hechos', 
                    NULL, 
                    'mayo-julio 2025', 
                    'Pedro Vergara', 
                    'Pedro evalúa y decide sobre el personal del negocio — función directiva propia de socio — P-02, P-34'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-27', 
                    'Lidera cambio de campanas WhatsApp a formularios', 
                    'doc-reuniones', 
                    NULL, 
                    '16/05/2025', 
                    'Pedro Vergara', 
                    'Pedro lidera cambios estratégicos de marketing en reunión documentada — P-34'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-27', 
                    'Supervisa presupuesto publicitario, entrena asesora, propone nuevo vendedor', 
                    'doc-reuniones', 
                    NULL, 
                    '11/06/2025', 
                    'Pedro Vergara', 
                    'Pedro ejerce control simultáneo de presupuesto, personal y ventas — triple función directiva — P-34'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-27', 
                    'Evalua modelo hibrido con consultor externo como co-decisor', 
                    'doc-reuniones', 
                    NULL, 
                    '27/06/2025', 
                    'Pedro Vergara', 
                    'Pedro participa como co-decisor en evaluación del modelo de negocio con consultores externos — P-34'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-28', 
                    '$108.456.900 en ventas a fecha de hoy', 
                    'chat-equipo', 
                    NULL, 
                    'nov 2024', 
                    'Oscar Maldonado', 
                    'Oscar anuncia récord de ventas al equipo — ingresos reales del negocio documentados — P-03'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-29', 
                    'pilas con el acuerdo que estamos demorados', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '03/01/2025', 
                    'Pedro Vergara', 
                    'Pedro documenta la demora de Oscar en formalizar — la sociedad llevaba meses operando sin firma — P-02'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-29', 
                    'Ya ha pasado buen tiempo compadre... el objetivo desde un principio no era solo % de ganancia neta sino acciones en la empresa', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '08/01/2025', 
                    'Pedro Vergara', 
                    'Pedro reitera el plazo transcurrido y reclama acciones — 9 meses de operación sin formalizar — P-02'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-30', 
                    'pilas con el acuerdo que estamos demorados', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '03/01/2025', 
                    'Pedro Vergara', 
                    'Pedro presiona sistemáticamente para formalizar — la demora es atribuible exclusivamente a Oscar'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-30', 
                    'Ya ha pasado buen tiempo compadre... el objetivo desde un principio no era solo % de ganancia neta sino acciones en la empresa', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '08/01/2025', 
                    'Pedro Vergara', 
                    'Pedro reclama acciones (no solo utilidades) — coherente con el pacto original del 30% en vesting'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-30', 
                    'no vayas a pensar que te estoy mamando gallo', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '28/11/2024', 
                    'Oscar Maldonado', 
                    'Oscar reconoce la demora y pide paciencia — no niega la obligación de formalizar'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-31', 
                    '20% de las acciones', 
                    'doc-acuerdo-original', 
                    NULL, 
                    'inicios 2024', 
                    'Pedro Vergara / Oscar Maldonado', 
                    'El borrador original del Acuerdo de Socios establecía 20% de ACCIONES — P-06. La alteración posterior a 'utilidades' es evidencia de mala fe'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-31', 
                    'participacion del 20%, funciones detalladas de Pedro y asiento en consejo de administracion', 
                    'doc-acuerdo-sas', 
                    NULL, 
                    'nov 2024', 
                    'Oscar Maldonado', 
                    'El borrador versión SAS incluía asiento en consejo de administración — P-08. Solo un socio tiene asiento en consejo, nunca un contratista'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-32', 
                    'le tachaste acciones por utilidades, creo que no hay evidencia mas clara que eso... a ojo inexperto no tiene ninguna caracteristica de buena fe', 
                    'chat-oscar-pedro', 
                    NULL, 
                    'agosto 2025', 
                    'Pedro Vergara', 
                    'Pedro descubre y denuncia la alteración documental — P-06, P-07'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-32', 
                    'Compa, y de esto no fue mala intencion. Simplemente es un borrador que nunca se firmo', 
                    'chat-oscar-pedro', 
                    NULL, 
                    'agosto 2025', 
                    'Oscar Maldonado', 
                    'Oscar admite la alteración pero la minimiza — el hecho de admitirla destruye la defensa de que el borrador nunca existió'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-32', 
                    'acciones de una sociedad que gestiona un bien, en este caso es igual a utilidades', 
                    'chat-oscar-pedro', 
                    NULL, 
                    'agosto 2025', 
                    'Oscar Maldonado', 
                    'Oscar intenta equiparar acciones con utilidades — argumento internamente contradictorio: si fueran lo mismo, no habría necesidad de cambiar el texto'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-33', 
                    'No es el interes de las Partes constituir una persona juridica distinta de estas individualmente consideradas, ni una sociedad de hecho', 
                    'doc-contrato-cp', 
                    NULL, 
                    '22/08/2025', 
                    'Oscar Maldonado', 
                    'El Contrato de Cuentas en Participación NIEGA expresamente la sociedad de hecho — P-14. Regla lógica: solo se niega lo que existe. Si no hubiera sociedad, esta cláusula sería innecesaria'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-34', 
                    'O sea de que estamos trabajando juntos comercializando un proyecto y que nos llamabamos socios SI claramente claramente', 
                    'transcripciones', 
                    NULL, 
                    '14/08/2025', 
                    'Oscar Maldonado', 
                    'En la fecha exacta de la ruptura, Oscar admite la sociedad en grabación — P-01. La confesión ocurre DESPUÉS de descubrir la alteración documental, en contexto de confrontación'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-34', 
                    'los abogados y contadores me dijeron, ey... si que sociedad de hecho con el man, pero tu puedes cortarlo', 
                    'transcripciones', 
                    NULL, 
                    '14/08/2025', 
                    'Oscar Maldonado', 
                    'Oscar revela que buscó asesoría legal para 'cortar' la sociedad — el acto de buscar cómo terminarla confirma que existía — P-01'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-35', 
                    'se abstenga de continuar con la explotacion de los activos intangibles incluyendo pero no limitandose a metodos, contenido estatico, propiedad intelectual, videoclases, reels, videos comerciales', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '29/08/2025', 
                    'Pedro Vergara', 
                    'Notificación formal de cese de explotación — P-18. Enuncia los activos aportados por Pedro que Oscar no puede usar unilateralmente'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-36', 
                    'suma transaccional', 
                    'doc-transaccion-oscar', 
                    NULL, 
                    '12/09/2025', 
                    'Oscar Maldonado', 
                    'Oscar ofrece $40M como 'suma transaccional' — P-15. Monto equivale al 3.3% del patrimonio estimado de $1,200M. La oferta ridícula confirma que Oscar reconocía la deuda pero quería liquidarla a precio mínimo'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-36', 
                    'toda la propiedad intelectual le pertenecia exclusivamente', 
                    'doc-transaccion-oscar', 
                    NULL, 
                    '12/09/2025', 
                    'Oscar Maldonado', 
                    'Oscar intenta en la transacción adquirir toda la PI por $40M — demuestra que sin acuerdo, la PI de Pedro es el activo en disputa — P-15'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-37', 
                    'relacion contractual cuyo objeto consistio en la explotacion economica conjunta del Programa', 
                    'doc-transaccion-pedro', 
                    NULL, 
                    '14/10/2025', 
                    'Pedro Vergara', 
                    'La contrapropuesta de Pedro reconoce expresamente la explotación económica conjunta — P-16. Es la posición pública del demandante en el contexto transaccional'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-37', 
                    'tomar decisiones conjuntas', 
                    'doc-transaccion-pedro', 
                    NULL, 
                    '14/10/2025', 
                    'Pedro Vergara', 
                    'La contrapropuesta describe el derecho a 'tomar decisiones conjuntas' con distribución 80/20 — lenguaje societario — P-16'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-38', 
                    'Oscar ofrecio $40M (3.3% del patrimonio estimado de $1,200M), mientras Pedro pretendia $300M (25%)', 
                    'doc-hechos', 
                    NULL, 
                    'oct 2025', 
                    'Pedro Vergara', 
                    'La brecha entre $40M y $300M documenta la imposibilidad de acuerdo extrajudicial — P-15, P-16, P-17'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-39', 
                    'yo quiero honrar el acuerdo contigo... los abogados y contadores me dijeron... sociedad de hecho con el man no puedes cortarlo... presenteme una forma en que yo pueda mantenerme con el pero tambien pueda crear lo otro', 
                    'transcripciones', 
                    NULL, 
                    '14/08/2025', 
                    'Oscar Maldonado', 
                    'Oscar revela en la grabación que NETMED fue el 'vehículo' que sus asesores le propusieron para escapar de la sociedad con Pedro — P-01. Confesión directa del propósito fraudulento'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-39', 
                    'la politica de privacidad actual del sitio web de ParetoMed ya aparece a nombre de NETMED S.A.S.', 
                    'doc-politica-web', 
                    NULL, 
                    'oct 2025', 
                    'Oscar Maldonado', 
                    'ParetoMed migra formalmente a NETMED sin incluir a Pedro — P-24, P-52. Transferencia unilateral de activos de la sociedad de hecho'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-40', 
                    'activos vinculados declarados de $20.000.000 COP', 
                    'doc-camara-comercio', 
                    NULL, 
                    '17/08/2025', 
                    'Cámara de Comercio', 
                    'ParetoMed declara activos de solo $20M ante Cámara de Comercio — P-20. Contrasta con ingresos reales de $709M en 15 meses. Subvaloración manifiesta que perjudica la liquidación de la sociedad'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-40', 
                    'El 9 de agosto de 2025, Oscar renovo la matricula del establecimiento comercial PARETOMED sin consultar ni informar a Pedro', 
                    'doc-hechos', 
                    NULL, 
                    '09/08/2025', 
                    'Oscar Maldonado', 
                    'Renovación unilateral en plena crisis societaria — P-20. Un establecimiento compartido no puede renovarse sin el consentimiento del socio'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-41', 
                    'solicitud de conciliacion N 013-2026 ante el Centro de Conciliacion de la Corporacion Lonja de Propiedad Raiz de Barranquilla', 
                    'doc-constancia-conciliacion', 
                    NULL, 
                    '11/02/2026', 
                    'Pedro Vergara', 
                    'Agotamiento del requisito de procedibilidad — P-19. Primer acto procesal formal del caso'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-42', 
                    'CONSTANCIA DE NO CONCILIACION N 00-1844', 
                    'doc-constancia-conciliacion', 
                    NULL, 
                    '20/02/2026', 
                    'Francisco Daniel Ramírez Carreño, Conciliador', 
                    'Constancia oficial: las partes no llegaron a acuerdo — P-19. Habilita la vía judicial. Conciliador registrado: T.P. 30.770'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-43', 
                    '$108.456.900 en ventas a fecha de hoy', 
                    'chat-equipo', 
                    NULL, 
                    'nov 2024', 
                    'Oscar Maldonado', 
                    'Oscar anuncia ingresos de $108M en UN SOLO MES — P-03. Anchoring para la valoración de $1,200M: un mes pico a 47.2M promedio × 19 meses = $897M solo en fondo de comercio'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-43', 
                    'cuenta Instagram @Paretomed1 con 51.700 seguidores (segunda mas grande del nicho en Colombia)', 
                    'doc-valoracion', 
                    NULL, 
                    'agosto 2025', 
                    'Pedro Vergara', 
                    'La cuenta Instagram fue construida durante la sociedad — P-17. Su valor ($250M estimado) es un activo intangible de la sociedad de hecho'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-44', 
                    '20% de las utilidades no se justifican por una labor que es contratable', 
                    'doc-acuerdo-aportes', 
                    NULL, 
                    'julio 2024', 
                    'Oscar Maldonado', 
                    'El propio Oscar justifica que el 20% es participación accionaria — P-09. Esto da base para calcular $240M como el 20% de un negocio valuado en $1,200M'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-44', 
                    'la participacion del 20% de Pedro en el patrimonio estimado asciende a $240.000.000 COP', 
                    'doc-valoracion', 
                    NULL, 
                    'agosto 2025', 
                    'Pedro Vergara', 
                    'Pretensión económica principal: $240M por el 20% del patrimonio — P-17. Coherente con valoraciones de $300M (Dr. Flight) y $330M (EF Legal)'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-45', 
                    'agosto 2025: $52.790.000; septiembre 2025: $52.640.800; octubre 2025: $64.057.500. Total periodo post-ruptura: $169.488.300 COP', 
                    'doc-kpis-2025', 
                    NULL, 
                    '2025', 
                    'Oscar Maldonado', 
                    'KPIs propios del demandado documentan ingresos post-ruptura — P-43. Las utilidades de estos meses ($22M al 20% con 65% de margen) no fueron pagadas a Pedro'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-45', 
                    'ParetoMed continua operando con la metodologia co-desarrollada... generando ingresos de aproximadamente $50.000.000 mensuales', 
                    'doc-hechos', 
                    NULL, 
                    '2026', 
                    'Pedro Vergara', 
                    'El negocio sigue operando con activos de la sociedad — el enriquecimiento de Oscar continúa después de la ruptura — P-43'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-46', 
                    '14 transferencias bancarias de la cuenta de OSCAR MALDONADO a la cuenta Bancolombia **4483 de Pedro Vergara, por un total de $99.319.834 COP', 
                    'doc-pagos-bancolombia', 
                    NULL, 
                    'mayo 2024 - agosto 2025', 
                    'Oscar Maldonado', 
                    '14 transferencias documentadas con SMS Bancolombia — P-36, P-37. La variabilidad (de $1.4M a $16.7M) es inconsistente con honorarios fijos y solo se explica como participación en utilidades variables'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-47', 
                    'yo siempre he visto el tema de la firma como una mera formalidad. O sea yo pensaba que ya todo ese tema estaba hablado', 
                    'transcripciones', 
                    NULL, 
                    '08/01/2025', 
                    'Oscar Maldonado', 
                    'CONFESIÓN: La firma era formalidad, la sociedad YA existía — P-05, P-41. El documento es innecesario cuando el pacto ya está perfeccionado'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-47', 
                    'para mi el afirme es mas como un formalismo, ¿no? Listo', 
                    'transcripciones', 
                    NULL, 
                    '08/01/2025', 
                    'Oscar Maldonado', 
                    'Oscar reitera que la firma es mera formalidad — P-41. Confirma que la sociedad existe independientemente de la firma del documento'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-47', 
                    'yo necesitaria tener a alguien que tenga pertenencia, ¿si? No alguien contratado, sino alguien que sepa que eso es suyo tambien y que este pendiente de todo', 
                    'transcripciones', 
                    NULL, 
                    '08/01/2025', 
                    'Oscar Maldonado', 
                    'CONFESIÓN DEVASTADORA: Oscar distingue explícitamente entre 'alguien contratado' y 'alguien que sepa que eso es suyo' — P-41. Describe exactamente la relación de socio que tenía con Pedro'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-47', 
                    'mi plan es para que ya en 2026 yo comenzare el fellow. Entonces, ahi yo necesitaria tener a alguien... coordinando todo', 
                    'transcripciones', 
                    NULL, 
                    '08/01/2025', 
                    'Oscar Maldonado', 
                    'Oscar reveló dependencia permanente de Pedro como socio operativo — P-41. El negocio no era viable sin Pedro como co-director'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-48', 
                    'en los egresos de julio no meti el pago de Lina ni Kendy. Fresco que vamos a dejar asi, yo cargo con eso', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '07/08/2025', 
                    'Oscar Maldonado', 
                    'Error contable revela que ambos calculaban utilidades conjuntamente — los egresos se deducían antes del cálculo del 20% de Pedro'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-48', 
                    'Yo puedo devolverte los 500 o dartelos como credito en algun servicio aparte que favorezca a Paretomed', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '07/08/2025', 
                    'Pedro Vergara', 
                    'Pedro OFRECE devolver dinero mal calculado — un contratista jamás devolvería un pago; un socio sí asume pérdidas proporcionales'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-48', 
                    'es una empresa no una caridad y la responsabilidad de lo que se haga despues del error no cae solo en ti', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '07/08/2025', 
                    'Pedro Vergara', 
                    'Pedro trata el error contable como responsabilidad COMPARTIDA — conducta típica de socio, no de prestador de servicios'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-48', 
                    'Somos un equipo papa', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '07/08/2025', 
                    'Pedro Vergara', 
                    'Expresión que sintetiza la relación societaria — 'equipo' implica co-propiedad y responsabilidad compartida'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-49', 
                    'uds me diran como la ven', 
                    'chat-equipo', 
                    NULL, 
                    '21/03/2025', 
                    'Adriana', 
                    'Asesora de ventas consulta a AMBOS como co-decisores — P-03. El plural 'uds' demuestra que Adriana reconocía autoridad decisoria conjunta'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-49', 
                    'Entonces dejalo en 2,850,000', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '17/07/2025', 
                    'Oscar Maldonado', 
                    'Pedro y Oscar CO-DETERMINAN el precio final del programa — P-02. La fijación de precios es función directiva reservada a socios, no a contratistas'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-49', 
                    'Ok... ya te organizo algo rapido y lo explico', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '17/07/2025', 
                    'Pedro Vergara', 
                    'Pedro implementa el precio acordado — flujo de trabajo de socios: decisión conjunta, ejecución coordinada'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-50', 
                    'me sacaron de la cuenta de paretomed@gmail.com', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '01/08/2025', 
                    'Pedro Vergara', 
                    'Oscar remueve accesos de Pedro del correo institucional — P-02. Exclusión previa a la ruptura oficial, patrón de exclusión sistemática'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-50', 
                    'Es que estaba revisando y vi muchos dispositivos y computadores con esa cuenta abierta y cerre varios. No fue mala intencion', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '01/08/2025', 
                    'Oscar Maldonado', 
                    'Oscar justifica el cierre de sesiones — la explicación revela que Pedro tenía acceso como co-gestor, no como usuario externo'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-51', 
                    'la estructura de ''programa'' con ciclos de 90 dias, simulacros pre y post estudio, y talleres dominicales', 
                    'doc-hechos', 
                    NULL, 
                    '2025-2026', 
                    'Pedro Vergara', 
                    'La metodología de ParetoMed que sigue operando post-ruptura fue co-diseñada por Pedro — P-25, P-26, P-27. Oscar explota activos intangibles de la sociedad sin participar a Pedro'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-51', 
                    'Oscar Maldonado confirmo que la idea de los simulacros pre y post estudio... fue de Pedro Vergara', 
                    'doc-reunion-14jul', 
                    NULL, 
                    '14/07/2025', 
                    'Oscar Maldonado', 
                    'Oscar reconoce autoría metodológica de Pedro en reunión documentada — P-34. Los simulacros son el diferenciador principal del programa que sigue generando ingresos'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-52', 
                    'uds me diran como la ven', 
                    'chat-equipo', 
                    NULL, 
                    '21/03/2025', 
                    'Adriana', 
                    'Terceros trataban a ambos como co-directores del negocio — P-03. La percepción externa refuerza la existencia de sociedad de hecho ante cualquier observador razonable'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-53', 
                    '376 comprobantes de pago de estudiantes del programa ParetoMed, correspondientes a transacciones procesadas a traves de las plataformas Bold (190 pagos, $331.646.650), Bancolombia (106 pagos, $134.101.446)', 
                    'doc-comprobantes-excel', 
                    NULL, 
                    'feb 2024 - sep 2025', 
                    'Adriana / ParetoMed', 
                    '376 comprobantes multi-plataforma documentan ingresos mínimos de $579M — P-42. Base para el peritaje contable solicitado al despacho'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-53', 
                    'El total de ingresos brutos documentados asciende a $579.217.496 COP', 
                    'doc-comprobantes-excel', 
                    NULL, 
                    '2025', 
                    'Pedro Vergara', 
                    'Ingresos brutos mínimos documentados con 99% de confianza — P-42. Cualquier peritaje de menores ingresos quedaría desvirtuado por este comprobante directo'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-54', 
                    'Pedro recibio $99.419.834 COP (excluyendo $100.000 de consultoria Coventus), lo que equivale al 19.52% de los $509.900.000 documentados en comprobantes para el periodo comparable', 
                    'doc-analisis-comprobantes', 
                    NULL, 
                    '2026', 
                    'Pedro Vergara', 
                    'La consistencia estadística del 19.52% ≈ 20% pactado es evidencia de pericia contable de que el mecanismo de pago era proporcional a ingresos — P-42, P-36'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-54', 
                    'Ese porcentaje es virtualmente identico al 20% pactado', 
                    'doc-analisis-comprobantes', 
                    NULL, 
                    '2026', 
                    'Pedro Vergara', 
                    'La consistencia del 19.52% valida el mecanismo del 20% de utilidades y descarta la prestación de servicios a tarifa fija — P-42'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-55', 
                    'Si Pedro recibio $99.419.834 COP como el 20% de las utilidades netas, y el margen de ganancia documentado por Oscar oscilaba entre 56% y 81% (con un promedio conservador de 65%), los ingresos brutos reales del negocio se estiman en aproximadamente $765.000.000 COP', 
                    'doc-proyeccion-financiera', 
                    NULL, 
                    '2026', 
                    'Pedro Vergara', 
                    'Proyección financiera basada en datos reales de margen — P-42, P-02. Los $765M estimados superan los $709M reportados por Oscar, lo que sugiere ingresos no revelados'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-55', 
                    'Esta proyeccion es consistente con los KPIs de Oscar para 2025, que reportaban ventas totales de entre $46M y $97M mensuales', 
                    'doc-kpis-2025', 
                    NULL, 
                    '2025', 
                    'Oscar Maldonado', 
                    'Los KPIs propios de Oscar validan la proyección de Pedro — P-43. El demandado no puede contradecir sus propios datos'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-56', 
                    'yo me guio de la hoja de calculo personal mia', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '28/02/2025', 
                    'Oscar Maldonado', 
                    'Oscar revela contabilidad paralela personal oculta — P-47. Esta hoja de cálculo debe ser objeto de EXHIBICIÓN DE DOCUMENTOS (art. 265 CGP) en el proceso'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-56', 
                    'Joda, no tengo porque hacerlo y me ofende que me lo pidas', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '05/08/2025', 
                    'Oscar Maldonado', 
                    'Oscar se niega expresamente a rendir cuentas — P-48. Esta negativa viola el deber de información entre socios (art. 504 C. de Co.) y genera indicio grave de contabilidad oculta'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-57', 
                    'con Avanz, Pedro facturaba con concepto especifico de ''Creacion de contenido / guiones comerciales, produccion y edicion de videos publicitarios para redes sociales'', a tarifa fija por entregable ($1.680.672 + adicionales)', 
                    'doc-facturas-avanz', 
                    NULL, 
                    '2024-2025', 
                    'Doctor Flight S.A.S.', 
                    'Facturación a Avanz: concepto específico, tarifa fija, cesión de derechos — P-46 (FE1-FE15). Modelo completamente diferente al de ParetoMed'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-57', 
                    'el 75% de los pagos ($74.900.000) se hicieron SIN factura ni cuenta de cobro', 
                    'doc-analisis-fiscal', 
                    NULL, 
                    '2026', 
                    'Pedro Vergara', 
                    'Los pagos sin factura solo se explican como distribución de utilidades — P-12. Un prestador de servicios siempre factura; un socio recibe distribuciones que no requieren factura'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-58', 
                    'agosto 2025: $52.790.000; septiembre 2025: $52.640.800; octubre 2025: $64.057.500. Total periodo post-ruptura: $169.488.300 COP', 
                    'doc-kpis-2025', 
                    NULL, 
                    '2025', 
                    'Oscar Maldonado', 
                    'KPIs DEL PROPIO DEMANDADO documentan $169M de ingresos post-ruptura — P-43. Aplicando 65% de margen y 20% de participación = $22M adeudados a Pedro solo en Q3 2025'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-58', 
                    'noviembre: $84.102.500; diciembre: $46.050.000', 
                    'doc-kpis-2025', 
                    NULL, 
                    '2025', 
                    'Oscar Maldonado', 
                    'Ingresos adicionales Q4 2025 — P-43. Las utilidades de noviembre-diciembre también podrían ser reclamables si el juez fija la ruptura en fecha posterior'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-59', 
                    'tu eres socio, no es que vas a sacar tu aplicacion propia... tenemos el acuerdo de que lo que desarrolles es para ParetoMed porque tu eres socio', 
                    'transcripciones', 
                    NULL, 
                    '13/07/2025', 
                    'Oscar Maldonado', 
                    'CONFESIÓN: Oscar EXIGE deberes de socio a Pedro — P-50. Solo un mes antes de la ruptura, Oscar reconoce inequívocamente la condición de socio y exige obligaciones fiduciarias'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-59', 
                    'si tu desarrollas una aplicacion, tu eres socio para esto... papi, tu lo desarrollaste siendo socio de ParetoMed... yo creo que ahi no hay cabida, no hay duda', 
                    'transcripciones', 
                    NULL, 
                    '13/07/2025', 
                    'Oscar Maldonado', 
                    'Oscar reitera 'eres socio' en 3 frases distintas — P-50. La repetición demuestra convicción, no desliz verbal. 'No hay duda' es la eliminación de cualquier ambigüedad'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-60', 
                    'Si reconozco.', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '12/07/2025', 
                    'Oscar Maldonado', 
                    'Oscar reconoce con dos palabras los aportes metodológicos de Pedro — P-02. Respuesta directa a la lista de aportes presentada por Pedro'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-60', 
                    'lo de las tutorias ha sido una excelente idea y te he dejado llevarlo como has querido', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '11/04/2025', 
                    'Oscar Maldonado', 
                    'Oscar reconoce ideas de Pedro como mejoras al programa — P-02. 'Dejar llevarlo como has querido' implica autonomía directiva, no seguimiento de instrucciones'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-61', 
                    'El dia 1 de [espacio en blanco] de 2024', 
                    'doc-contrato-cp', 
                    NULL, 
                    'agosto 2025', 
                    'Oscar Maldonado', 
                    'Contrato predatado con mes sin completar — P-14. Evidencia de documento retroactivo: quien redacta un contrato para el presente no deja el mes en blanco'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-61', 
                    'estructura que tiene 90% de seguridad... tributaria', 
                    'transcripciones', 
                    NULL, 
                    '14/08/2025', 
                    'Oscar Maldonado', 
                    'Oscar revela que el Contrato de Cuentas en Participación fue diseñado por su abogada para beneficio fiscal, no para reflejar la relación real — P-01'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-62', 
                    'comenzar una empresa/emprendimiento/negocio que entre en competencia directa con Paretomed', 
                    'doc-acuerdo-sas', 
                    NULL, 
                    'nov 2024', 
                    'Oscar Maldonado', 
                    'Cláusula de 5 años de no competencia en todo el sector de educación médica virtual — P-08. Las restricciones de 5 años solo se justifican frente a un socio con conocimiento interno total, nunca frente a un contratista de marketing'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-62', 
                    'la clausula de no competencia', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '13/01/2025', 
                    'Oscar Maldonado', 
                    'Oscar incluye anticompetencia en estatutos de SAS propuesta — P-02. Patrón sistemático: todos los borradores incluyen anticompetencia de largo alcance'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-63', 
                    'yo quiero honrar el acuerdo contigo... los abogados y contadores me dijeron... sociedad de hecho con el man no puedes cortarlo... presenteme una forma en que yo pueda mantenerme con el pero tambien pueda crear lo otro', 
                    'transcripciones', 
                    NULL, 
                    '14/08/2025', 
                    'Oscar Maldonado', 
                    'Oscar revela en grabación el propósito real de NETMED: un vehículo para escapar de la sociedad con Pedro — P-01. Confesión directa de la estrategia post-ruptura'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-64', 
                    'la idea es crear una SAS aca en Colombia que le preste servicios a la LLC en EUA. Por la naturaleza de los servicios estaria exento de IVA', 
                    'chat-oscar-pedro', 
                    NULL, 
                    '10/07/2025', 
                    'Oscar Maldonado', 
                    'Oscar revela plan tributario en chat — P-02. La arquitectura fiscal diseñada mientras se dilataba la formalización con Pedro evidencia prioridades opuestas'
                );
INSERT INTO public.fragmentos_clave (hecho_id, cita, fuente, linea, fecha, autor, relevancia) VALUES (
                    'hecho-64', 
                    'la vamos a presentar como una empresa de cloud hosting... ya no va a ser una empresa educativa... y ahi no pago tanto impuesto', 
                    'transcripciones', 
                    NULL, 
                    '14/08/2025', 
                    'Oscar Maldonado', 
                    'Oscar admite en grabación que la reclasificación de ParetoMed como 'cloud hosting' era una estrategia para reducir impuestos — P-01. El demandado usa su propio discurso como evidencia de mala fe'
                );
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            '20251111 PEDRO VERGARA - Solicitud de conciliación por antiguos abogados EF LEGAL nunca radicada ni enviada.docx', 
            'raw_source/20251111 PEDRO VERGARA - Solicitud de conciliación por antiguos abogados EF LEGAL nunca radicada ni enviada.docx', 
            34848
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO APORTADO EN JULIO 2024.docx', 
            'raw_source/acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO APORTADO EN JULIO 2024.docx', 
            16487
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO.docx', 
            'raw_source/acuerdo socios ORIGINAL CON APORTES DE AMBOS NUNCA FIRMADO.docx', 
            16487
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'ANALISIS_FISCAL_FINANCIERO_PARETOMED_2026.md', 
            'raw_source/ANALISIS_FISCAL_FINANCIERO_PARETOMED_2026.md', 
            26634
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'ANALISIS_JURIDICO_SOLIDEZ_DEL_CASO.md', 
            'raw_source/ANALISIS_JURIDICO_SOLIDEZ_DEL_CASO.md', 
            18072
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Bitácora transcripción chat con Adriana asesora de ventas paretomed.docx', 
            'raw_source/Bitácora transcripción chat con Adriana asesora de ventas paretomed.docx', 
            50463
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'BORRADOR ACUERDO ORIGINAL DE PEDRO FECHADO 6 DE FEBRERO 2024.docx', 
            'raw_source/BORRADOR ACUERDO ORIGINAL DE PEDRO FECHADO 6 DE FEBRERO 2024.docx', 
            7878
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'BORRADOR DEMANDA 2.docx', 
            'raw_source/BORRADOR DEMANDA 2.docx', 
            69576
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Certificado de registro.pdf', 
            'raw_source/Certificado de registro.pdf', 
            106716
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'certificado EMPRESA PEDRO.pdf', 
            'raw_source/certificado EMPRESA PEDRO.pdf', 
            123298
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Certificado Obras Pedro Vergara.pdf', 
            'raw_source/Certificado Obras Pedro Vergara.pdf', 
            108831
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'certificado OSCAR.pdf', 
            'raw_source/certificado OSCAR.pdf', 
            60384
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Chat de WhatsApp con Correcciones y sugerencias PARETOMED.txt', 
            'raw_source/Chat de WhatsApp con Correcciones y sugerencias PARETOMED.txt', 
            123298
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Chat de WhatsApp con Equipo de Trabajo - Paretomed 🟠.txt', 
            'raw_source/Chat de WhatsApp con Equipo de Trabajo - Paretomed 🟠.txt', 
            1055374
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Chat de WhatsApp con Oscar Maldonado Paretomed.txt', 
            'raw_source/Chat de WhatsApp con Oscar Maldonado Paretomed.txt', 
            2957817
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            '00000018-PHOTO-2026-02-10-16-01-26.jpg', 
            'raw_source/chat-primo/00000018-PHOTO-2026-02-10-16-01-26.jpg', 
            198131
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            '00000044-Certificado_20260210.pdf', 
            'raw_source/chat-primo/00000044-Certificado_20260210.pdf', 
            104682
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            '_chat.txt', 
            'raw_source/chat-primo/_chat.txt', 
            5342
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'COMPROBANTES_PARETOMED_ANALISIS.csv', 
            'raw_source/COMPROBANTES_PARETOMED_ANALISIS.csv', 
            41639
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'COMPROBANTES_PARETOMED_ANALISIS.xlsx', 
            'raw_source/COMPROBANTES_PARETOMED_ANALISIS.xlsx', 
            32988
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Contrato de Cuentas en Participación Paretomed  APORTADO POR OSCAR VIERNES 22 DE AGOSTO 2025 NUNCA FIRMADO.docx', 
            'raw_source/Contrato de Cuentas en Participación Paretomed  APORTADO POR OSCAR VIERNES 22 DE AGOSTO 2025 NUNCA FIRMADO.docx', 
            38655
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Contrato de transacción No.10.09.2025.pdf', 
            'raw_source/Contrato de transacción No.10.09.2025.pdf', 
            226001
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Contrato de Transacción Dr. Flight 141025.docx', 
            'raw_source/Contrato de Transacción Dr. Flight 141025.docx', 
            38516
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Copia de Documento de Reels - 28 de abril, 14_12.docx', 
            'raw_source/Copia de Documento de Reels - 28 de abril, 14_12.docx', 
            600017
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Copia de KPIS 2025 .xlsx', 
            'raw_source/Copia de KPIS 2025 .xlsx', 
            1304250
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Copia de Reels Octubre - Noviembre - Diciembre.docx', 
            'raw_source/Copia de Reels Octubre - Noviembre - Diciembre.docx', 
            266548
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Copy of TESIS PEDRO VERGARA 2.pdf', 
            'raw_source/Copy of TESIS PEDRO VERGARA 2.pdf', 
            430955
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'CRM SHEETS CAMPAÑA.xlsx', 
            'raw_source/CRM SHEETS CAMPAÑA.xlsx', 
            247487
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'CUENTAS DE COBRO PEDRO VERGARA.docx', 
            'raw_source/CUENTAS DE COBRO PEDRO VERGARA.docx', 
            8557
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'DOCUMENTO_EJECUTIVO_PARA_ABOGADO_TOLEDO.md', 
            'raw_source/DOCUMENTO_EJECUTIVO_PARA_ABOGADO_TOLEDO.md', 
            9425
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Explicación de metodología fechado 14 de mayo 2024.docx', 
            'raw_source/Explicación de metodología fechado 14 de mayo 2024.docx', 
            188944
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'FE1 (AVANZ OTRO CLIENTE CON CONCEPTO DISTINTO).pdf', 
            'raw_source/FE1 (AVANZ OTRO CLIENTE CON CONCEPTO DISTINTO).pdf', 
            42176
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'FE15 (ULTIMA DE AVANZ).pdf', 
            'raw_source/FE15 (ULTIMA DE AVANZ).pdf', 
            42480
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'FE3.pdf', 
            'raw_source/FE3.pdf', 
            41154
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'FE4.pdf', 
            'raw_source/FE4.pdf', 
            40988
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'FE5.pdf', 
            'raw_source/FE5.pdf', 
            41957
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'HANDOFF_INSTANCIA_FINAL.md', 
            'raw_source/HANDOFF_INSTANCIA_FINAL.md', 
            15877
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'HANDOFF_SIGUIENTE_INSTANCIA.md', 
            'raw_source/HANDOFF_SIGUIENTE_INSTANCIA.md', 
            10957
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'HECHOS_DEMANDA_PARETOMED_2026.md', 
            'raw_source/HECHOS_DEMANDA_PARETOMED_2026.md', 
            63457
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'INVESTIGACION_DEMANDA_PARETOMED_2026.md', 
            'raw_source/INVESTIGACION_DEMANDA_PARETOMED_2026.md', 
            71106
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'PAGOS 1.jpeg', 
            'raw_source/PAGOS 1.jpeg', 
            370894
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'PAGOS 2.jpeg', 
            'raw_source/PAGOS 2.jpeg', 
            377143
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'PAGOS 3.jpeg', 
            'raw_source/PAGOS 3.jpeg', 
            354913
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'PAGOS 4.jpeg', 
            'raw_source/PAGOS 4.jpeg', 
            360353
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Paretomed - Educación Médica carta de recomendación.docx', 
            'raw_source/Paretomed - Educación Médica carta de recomendación.docx', 
            27778
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Planificador de Reels_Videos.xlsx', 
            'raw_source/Planificador de Reels_Videos.xlsx', 
            14785
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'PLAN_ACCION_DEMANDA_2026.md', 
            'raw_source/PLAN_ACCION_DEMANDA_2026.md', 
            16535
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'PLAN_WEB_CASO_PARETOMED.md', 
            'raw_source/PLAN_WEB_CASO_PARETOMED.md', 
            47306
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'PUNTOS_DEBILES_Y_PREPARACION.md', 
            'raw_source/PUNTOS_DEBILES_Y_PREPARACION.md', 
            17898
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Reels Julio 2024.docx', 
            'raw_source/Reels Julio 2024.docx', 
            106996
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Reels septiembre 2024.docx', 
            'raw_source/Reels septiembre 2024.docx', 
            446343
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'Reels y guiones 2025.docx', 
            'raw_source/Reels y guiones 2025.docx', 
            218218
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'RESPUESTAS_HECHOS_AMPLIADOS_2026.md', 
            'raw_source/RESPUESTAS_HECHOS_AMPLIADOS_2026.md', 
            32059
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'RESPUESTAS_INSTANCIA_3_PROPIEDAD_INTELECTUAL.md', 
            'raw_source/RESPUESTAS_INSTANCIA_3_PROPIEDAD_INTELECTUAL.md', 
            26908
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'SOP REUNION 1_1 REDACTADO 5 DE JUNIO 2024 POR PEDRO.docx', 
            'raw_source/SOP REUNION 1_1 REDACTADO 5 DE JUNIO 2024 POR PEDRO.docx', 
            8270
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'SOP SEGUIMIENTO PARETOMED REDACTADO POR PEDRO.docx', 
            'raw_source/SOP SEGUIMIENTO PARETOMED REDACTADO POR PEDRO.docx', 
            67188
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'TAREA_A_MONTOS_PARA_BORRADOR_DEMANDA.md', 
            'raw_source/TAREA_A_MONTOS_PARA_BORRADOR_DEMANDA.md', 
            9313
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt', 
            'raw_source/TRANSCRIPCIONES_CONSOLIDADAS_FINAL.txt', 
            1669348
        ) ON CONFLICT (nombre) DO NOTHING;
INSERT INTO public.documentos (nombre, ruta, tamano) VALUES (
            'VALUACION_PARETOMED_2026.md', 
            'raw_source/VALUACION_PARETOMED_2026.md', 
            20773
        ) ON CONFLICT (nombre) DO NOTHING;