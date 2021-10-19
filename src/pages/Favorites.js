import React , { Fragment } from 'react';
import FavoritesCard from '../components/FavoritesCard/FavoritesCard'
import {useSelector, useDispatch} from 'react-redux';

const Favorites = (props) => {
    const favoritesState = useSelector(state => state.favorites);
    let favorites = [];
    let cities =[];
    let weathers = [];
    let icons = [];
    favoritesState.cityName.map((city,idx) =>{
        cities.push(city);
    });
    favoritesState.cityWeather.map((weather,idx) =>{
        weathers.push(weather);
    });
    favoritesState.weatherIcon.map((icon,idx) =>{
        icons.push(icon);
    });

    for(var i = 0; i < cities.length; i++){
        favorites.push({cityName : cities[i], cityWeather : weathers[i], weatherIcon : icons[i]});
    }

    return (
        <>
         <div class="d-flex justify-content-center" >
            {favorites.map((favorite, idx) =>
                <FavoritesCard
                    key={idx}
                    id={`favorite-${idx}`}
                    type="favorite"
                    name="favorite"
                    cityName = {favorite.cityName}
                    cityWeather = {favorite.cityWeather}
                    weatherIcon = {favorite.weatherIcon}
                />
            )}
         </div>
        </>
    );
}
 


export default Favorites;