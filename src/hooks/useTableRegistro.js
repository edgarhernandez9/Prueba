import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { consultaId, getDataCondicionAtmosferica } from "../store/reducer";




export const useTableRegistro = () => {

    const stateDatos = useSelector(state => state);
    const [datosRecibidos, setDatosRecibidos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(10);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDataCondicionAtmosferica())
    }, [])


    useEffect(() => {

        if (stateDatos.datos.isLoading === false) {
            setDatosRecibidos(stateDatos.datos.datos.results);
            setIsLoading(stateDatos.datos.isLoading)
        } else {
            setDatosRecibidos([])
            setIsLoading(stateDatos.datos.isLoading)
        }
    }, [stateDatos]);

    
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const data = datosRecibidos.slice(indexOfFirstData, indexOfLastData);
    const totalPage = Math.ceil(datosRecibidos.length / dataPerPage)

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber)

        if(pageNumber < 1){
            setCurrentPage(1);
        }else if (pageNumber > totalPage) {
            setCurrentPage(totalPage)
        } else {
            setCurrentPage(pageNumber)
        }
    }

    const actionBtn = (id) => {

        dispatch(consultaId(id));

        navigate('/detalles')
    }

    return{
        data,
        actionBtn,
        handleClick,
        isLoading,
        currentPage,
        totalPage,
    }
}