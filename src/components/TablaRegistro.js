import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDataCondicionAtmosferica } from '../store/reducer';
import { formatearFecha } from '../recursos/formatearFecha';
import '../theme/TablaRegistro.scss';
import { useTableRegistro } from '../hooks/useTableRegistro';


export const TablaRegistro = () => {

    const { actionBtn, data = [], handleClick, isLoading, currentPage, totalPage } = useTableRegistro();

    return (
        <div className='container'>

            {
                isLoading ? <div>cargando....</div> : 
                <>
                    <table data-testid='table'>
                        <thead>
                            <tr>
                                <th className='table'>_id</th>
                                <th className='table'>cityid</th>
                                <th className='table'>name</th>
                                <th className='table'>state</th>
                                <th className='table'>probabilityofprecip</th>
                                <th className='table'>relativehumidity</th>
                                <th className='table'>Lastreporttime formato (YYYY/MM/DD)</th>
                                <th className='table'>{'LLUEVE Si se cumple = probabilityofprecip >60 || relativehumidity >50'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((data) => (
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
                    </table>
                    <div className='footer'>
                        <div className='btn-footer'>
                            <button className='btn-footer-prev' onClick={() => handleClick(currentPage - 1)}>Anterior</button>
                            <button className='btn-footer-next' onClick={() => handleClick(currentPage + 1)}>Siguiente</button>
                            <span className='btn-footer-page'>Pagina {currentPage} de { totalPage }</span>
                        </div>
                        <div>
                            <p>Total de registros = {data.length} </p>
                        </div>
                    </div>
                </>
                
            }
            
        </div>
    )
}
