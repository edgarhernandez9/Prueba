
export const formatearFecha = (fecha) => {

    const date = new Date(fecha);
    const formatearFecha = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })

    return formatearFecha;
}