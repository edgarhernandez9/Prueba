import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { crearDatos } from './reducer';

const rootReducer = combineReducers({
    datos: crearDatos.reducer
});


const store = configureStore({
    reducer: rootReducer,
})

export default store;