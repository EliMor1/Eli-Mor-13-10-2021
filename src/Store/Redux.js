import React from 'react'
import redux , {createStore} from 'redux';
import {createSlice, configureStore} from '@reduxjs/toolkit'

const initialFavoriteState = {cityName:[], cityWeather:[], weatherIcon:[]};
const initialAutoState = {auto:false};

const favoritesSlice = createSlice({
    name:'favorites',
    initialState:initialFavoriteState,
    reducers:{
        updateName(state,action){
            state.cityName.push(action.payload.cityName);
        },
        updateWeather(state,action){
            state.cityWeather.push(action.payload.cityWeather);
        },
        updateIcon(state,action){
            state.weatherIcon.push(action.payload.weatherIcon);
        },
        clearStore(state, action){
            state.cityName.pop(action.payload.cityName);
            state.cityName.pop(action.payload.cityWeather);
            state.cityName.pop(action.payload.weatherIcon);
            
        }
    }
})

const autoSlice = createSlice({
    name:'autoComplete',
    initialState : initialAutoState,
    reducers:{
        autoComplete(state){
            state.auto = true;
        }
    }
})

const store = configureStore({
    reducer:{
        auto : autoSlice.reducer , favorites : favoritesSlice.reducer
    }
});

export const favoritesActions = favoritesSlice.actions;
export const autoActions = autoSlice.actions;
export default store;