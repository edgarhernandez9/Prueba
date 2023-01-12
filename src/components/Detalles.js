import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export const Detalles = () => {

    const stateDatos = useSelector(state => state);

    
    
    return (
        <pre>
            {
                stateDatos.datos && stateDatos.datos.datosFiltrados ?
                JSON.stringify(stateDatos.datos.datosFiltrados, null, 2)
                : <div>sin datos</div>
            }
        </pre>
    )
}
