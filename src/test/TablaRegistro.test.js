import { fireEvent, render, waitFor } from "@testing-library/react"
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { TablaRegistro } from "../components/TablaRegistro";
import store from "../store/storeData";
import { Router } from "react-router-dom";


describe('Prueba unitaria del componente TablaRegistros', () => {

    const history = createMemoryHistory({
        initialEntries: ['/']
    })

    it('deberia mostrar un mensaje de cargando cuando isLoading es true', () => {
        
        const { getByText } = render(
            <Provider store={store}>
                <Router location={ history.location } navigator={ history }>
                    <TablaRegistro isLoading={true} />
                </Router>
                
            </Provider>
        );

        expect(getByText('cargando....')).toBeInTheDocument()
    })

    it('Deberia de mostrar una tabla cuando isLoading es false', () => {

        const { getByTestId } = render(
            <Provider store={store}>
                <Router location={ history.location } navigator={ history }>
                    <TablaRegistro 
                        isLoading={false} 
                        data={[
                            {
                                _id:1,
                                cityid:1,
                                name:"nombre",
                                state:"estado",
                                probabilityofprecip:10,
                                relativehumidity:10,'date-insert':"2022-05-05"}
                        ]}
                    />
                </Router>
            </Provider>
        )

        waitFor(() => {
            expect(getByTestId('table')).toBeInTheDocument()
        })

    });

    it('deberia ejecutar la funcion handleClick al presionar el boton de siguiente', () => {
        const handleClick = jest.fn();
        const { getByText } = render(
            <Provider store={store}>
                <Router location={ history.location } navigator={ history }>
                    <TablaRegistro 
                        isLoading={false}
                        handleClick={handleClick} 
                        currentPage={1} 
                        totalPage={2}
                        data={[
                            {
                                _id:1,
                                cityid:1,
                                name:"nombre",
                                state:"estado",
                                probabilityofprecip:10,
                                relativehumidity:10,'date-insert':"2022-05-05"}
                        ]}
                    />
                </Router>
            </Provider>
        );


        waitFor(() => {
            const nextBtn = getByText(/Siguiente/i);
            fireEvent.click(nextBtn);

            expect(handleClick).toHaveBeenLastCalledWith(2);
        })
        
    })

    it('deberia ejecutar la funcion handleClick al presionar el boton de anterior', () => {
        const handleClick = jest.fn();
        const { getByText } = render(
            <Provider store={store}>
                <Router location={ history.location } navigator={ history }>
                    <TablaRegistro 
                        isLoading={false}
                        handleClick={handleClick} 
                        currentPage={1} 
                        totalPage={2}
                        data={[
                            {
                                _id:1,
                                cityid:1,
                                name:"nombre",
                                state:"estado",
                                probabilityofprecip:10,
                                relativehumidity:10,'date-insert':"2022-05-05"}
                        ]}
                    />
                </Router>
            </Provider>
        );


        waitFor(() => {
            const nextBtn = getByText(/Anterior/i);
            fireEvent.click(nextBtn);

            expect(handleClick).toHaveBeenLastCalledWith(1);
        })
        
    })
    
})