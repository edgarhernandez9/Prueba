import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


export const Detalles = () => {

    const [filterData, setFilterData] = useState([])
    const { id } = useParams();
    const stateDatos = useSelector(state => state);
    console.log(id)

    useEffect(() => {
        const filterData = stateDatos.datos.datos.results.filter(detalles => detalles._id === id);

        setFilterData(filterData)
    }, [])
    
    return (
        <pre>
            {
                filterData.length > 0 ?
                JSON.stringify(filterData, null, 2)
                : ''
            }
        </pre>
    )
}
