
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import actions from "./actions";

export const getDataCondicionAtmosferica = createAsyncThunk('obtenerCondicionAts', async () => {
    const response = await fetch('https://api.datos.gob.mx/v1/condiciones-atmosfericas')
        .then((res) => res.json())
        .then((data) => data);
    return response;
})


export const crearDatos = createSlice(({
    name: 'condicionAtmosferica',
    initialState: {
        datos: null,
        isLoading: true,
        datosFiltrados: []
    },
    reducers: {
        consultaId: (state, action) => {
            // const filtrados = state.datos.results.filter(detalles => detalles._id === action.payload);

            // state.datosFiltrados = filtrados;
            if (state.datos) {
                const filtrados = state.datos.results.filter(detalles => detalles._id === action.payload);
                state.datosFiltrados = filtrados;
            } else {
                // Manejar el caso cuando state.datos es null
                state.datosFiltrados = []
            }
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(getDataCondicionAtmosferica.fulfilled, (state, action) => {
            state.isLoading = false;
            state.datos = action.payload;
        })
    }
}))

export const { consultaId } = crearDatos.actions;

export default crearDatos;