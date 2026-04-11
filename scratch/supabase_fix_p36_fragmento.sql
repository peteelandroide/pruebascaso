begin;
update public.pruebas
set descripcion = 'Transferencias bancarias Bancolombia cuenta 4483 de Pedro Vergara (14 transferencias a cuenta personal, $99.319.834 subtotal)'
where id = 'P-36';

update public.fragmentos_clave
set relevancia = 'Oscar documentó simultáneamente rentabilidad neta y participación del 20% — P-02. Esa relación permite proyectar ingresos brutos a partir de los pagos totales acreditados a Pedro'
where hecho_id = 'hecho-55' and relevancia ilike '%765M%';
commit;
