import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDataCondicionAtmosferica } from '../store/reducer';
import { formatearFecha } from '../recursos/formatearFecha';
import '../theme/TablaRegistro.scss';


export const TablaRegistro = () => {

    const stateDatos = useSelector(state => state);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDataCondicionAtmosferica())
    }, [])



    const actionBtn = (id) => {
        // const navigate = useNavigate()
        
        navigate(`/detalles/${id}`);
    }


    return (
        <div className='container'>

            {
                stateDatos.datos.isLoading ? <div>cargando....</div> : 
                <table>
                    <thead>
                        <tr>
                            <th className='table'>_id</th>
                            <th className='table'>cityid</th>
                            <th className='table'>name</th>
                            <th className='table'>state</th>
                            <th className='table'>probabilityofprecip</th>
                            <th className='table'>relativehumidity</th>
                            <th className='table'>Lastreporttime formato (YYYY/MM/DD)</th>
                            <th className='table'>LLUEVE Si se cumple = probabilityofprecip >60 || relativehumidity >50</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stateDatos.datos.datos.results.map((data) => (
                                <tr key={data._id}>
                                    <td className='table' 
                                        onClick={() => actionBtn(data._id)}
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    >{data._id}</td>
                                    <td className='table'>{data.cityid}</td>
                                    <td className='table'>{data.name}</td>
                                    <td className='table'>{data.state}</td>
                                    <td className='table'>{data.probabilityofprecip}</td>
                                    <td className='table'>{data.relativehumidity}</td>
                                    <td className='table'>{formatearFecha(data['date-insert'])}</td>
                                    <td className='table'></td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <div>
                            <p>Total de registros = {stateDatos.datos.datos.results.length} </p>
                        </div>
                    </tfoot>
                </table>
            }
            
        </div>
    )
}
