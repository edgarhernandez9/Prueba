import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDataCondicionAtmosferica } from '../store/reducer';
import '../theme/TablaRegistro.scss';
import { formatearFecha } from '../recursos/formatearFecha';

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
                <div className='table'>
                    <div className='tableHeader'>
                        <div className='tableHeader-title' style={{ width: '212px'}}>
                            <p>_id</p>
                        </div>
                        <div className='tableHeader-title' style={{ width: '69px'}}>
                            <p>cityid</p>
                        </div>
                        <div className='tableHeader-title' style={{ width: '95px'}}>
                            <p>name</p>
                        </div>
                        <div className='tableHeader-title' style={{ width: '95px'}}>
                            <p>state</p>
                        </div>
                        <div className='tableHeader-title' style={{ width: '136px'}}>
                            <p>probabilityofprecip</p>
                        </div>
                        <div className='tableHeader-title' style={{ width: '136px'}}>
                            <p>relativehumidity</p>
                        </div>
                        <div className='tableHeader-title' style={{ width: '136px'}}>
                            <p>Lastreporttime formato (YYYY/MM/DD)</p>
                        </div>
                        <div className='tableHeader-title' style={{ width: '136px'}}>
                            <p>LLUEVE Si se cumple = probabilityofprecip >60 || relativehumidity >50</p>
                        </div>
                    </div>
                    
                    <div className='table-body'>
                        {
                            stateDatos.datos.datos.results.map((data) => (
                                <div key={data._id} className="table-body-container">
                                    <div className='table-body-container-titleid' style={{ width: '218px'}}>
                                        <p onClick={() => actionBtn(data._id)}>{data._id}</p>
                                    </div>
                                    <div className='table-body-container-titlecity' style={{ width: '76px'}}>
                                        <p>{data.cityid}</p>
                                    </div>
                                    <div className='table-body-container-titlecity' style={{ width: '102px'}}>
                                        <p>{data.name}</p>
                                    </div>
                                    <div className='table-body-container-titlecity' style={{ width: '102px'}}>
                                        <p>{data.state}</p>
                                    </div>
                                    <div className='table-body-container-titlecity' style={{ width: '143px'}}>
                                        <p>{data.probabilityofprecip}</p>
                                    </div>
                                    <div className='table-body-container-titlecity' style={{ width: '143px'}}>
                                        <p>{data.relativehumidity}</p>
                                    </div>
                                    <div className='table-body-container-titlecity' style={{ width: '143px'}}>
                                        <p>{formatearFecha(data['date-insert'])}</p>
                                    </div>
                                    <div className='table-body-container-titlecity' style={{ width: '143px'}}>
                                        <p></p>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            }

            <p>Total de registros = {stateDatos.datos.isLoading ?  0 : stateDatos.datos.datos.results.length} </p>

        </div>
    )
}
