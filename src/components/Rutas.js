import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Detalles } from './Detalles';
import { TablaRegistro } from './TablaRegistro';


export const Rutas = () => {

    return(
        <>
            <Router>
                <Routes>
                    <Route path='/' element={ <TablaRegistro />} />
                    <Route path='/detalles/:id' element={<Detalles />} />
                </Routes>
            </Router>
        </>
    )
}