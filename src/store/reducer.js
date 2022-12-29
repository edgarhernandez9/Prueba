
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import actions from "./actions";

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
    },
    reducers: {
        consultaId: (state, action) => {
            console.log(actions)
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