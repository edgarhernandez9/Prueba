import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { Detalles } from "../components/Detalles";
import store from "../store/storeData";

describe('Prueba unitaria del componente Detalles', () => {

    it('deberia mostrar un mensaje "sin datos" cuando no hay datos en el state', () => {

        const { getByText } = render(
            <Provider store={store}>
                <Detalles />
            </Provider>
        );

        expect(getByText('sin datos')).toBeInTheDocument()
    })

    it('deberia de mostrar los datos filtrados en formato json cuando hay datos en el state', () => {

        store.dispatch({
            type: 'condicionAtmosferica/consultaId',
            payload: [
                { 
                    _id: '123', 
                    cityid: '123', 
                    name: 'city', 
                    state: 'state', 
                    probabilityofprecip: '10', 
                    relativehumidity: '10', 'date-insert': '2022-05-05' 
                }
            ],
        });

        const { getByText } = render(
            <Provider store={store}>
                <Detalles />
            </Provider>
        )


        waitFor(() => {
            expect(getByText('"_id": "123"')).toBeInTheDocument();
            expect(getByText('"cityid": "123"')).toBeInTheDocument();
            expect(getByText('"name": "city"')).toBeInTheDocument();
            expect(getByText('"state": "state"')).toBeInTheDocument();
            expect(getByText('"probabilityofprecip": "10"')).toBeInTheDocument();
            expect(getByText('"relativehumidity": "10"')).toBeInTheDocument();
            expect(getByText('"date-insert": "2022-05-05"')).toBeInTheDocument();
        })
        
    })
})