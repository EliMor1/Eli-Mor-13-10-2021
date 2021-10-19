import React, {useState} from 'react';
import {Card, Col, Toast, Button,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WeatherCard from '../WeatherCard/WeatherCard'
import axios from 'axios';
import './Frame.css';
import {useSelector, useDispatch} from 'react-redux';
import { favoritesActions } from '../../Store/Redux.js';

const Frame = (props) => {
    const dispatch = useDispatch();
    const favoritesState = useSelector(state => state.favorites);

    const [city, setCity] = useState('');
    const [weatherTextData, setWeatherTextData] = useState('');
    const [temp, setTemp] = useState('');
    const [dailyForecasts, setDailyForecasts] = useState([]);
    const [headlineText, setHeadlineText] = useState('');
    const [flag, setFlag] = useState(false);
    const [show, setShow] = useState(false);
    const [errorHandle, setErrorHandle] = useState(false);
    const [weatherIcon, setIconNumber] = useState('');

    const handleFavorite = (event) =>{
        if(event.target.id == "favoriteBorder"){
            document.getElementById("favoriteBorder").style.display = "none";
            document.getElementById("favoriteFilled").style.display = "block";
            dispatch(favoritesActions.updateName({cityName : city}));
            dispatch(favoritesActions.updateWeather({cityWeather : temp}));
            dispatch(favoritesActions.updateIcon({weatherIcon : weatherIcon}));
            
        }
        if(event.target.id == ""){
            document.getElementById("favoriteFilled").style.display = "none";
            document.getElementById("favoriteBorder").style.display = "block";
        }
        setShow(true);
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            setCity(event.target.value);
            handleLocationKeyRequest(event.target.value);
          }
    }

    const handleLocationKeyRequest = async (city) => {
        const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        const query = `?apikey=L9SRkt3LCyG0Z3hPV3JxPSbhUkKh1p8X&q=${city}`
        try{
            const res = await axios.get(baseUrl + query);
            if(res.data[0].Key !=='undefined'){
                handleForecastRequest(res.data[0].Key);
                handleWeatherRequest(res.data[0].Key);
            }
        }catch(error){
            //console.log(error);
            setErrorHandle(true);
        }
    }

    const handleWeatherRequest = async (locationKey) =>{
        const apiKey = '?apikey=L9SRkt3LCyG0Z3hPV3JxPSbhUkKh1p8X';
        const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
        const res = await axios.get(baseUrl + locationKey + apiKey);
        setWeatherTextData(res.data[0].WeatherText)
        setTemp(res.data[0].Temperature.Metric.Value); 
    }

    const handleForecastRequest = async (locationKey) =>{
        const apiKey = '?apikey=L9SRkt3LCyG0Z3hPV3JxPSbhUkKh1p8X';
        const baseUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
        const res = await axios.get(baseUrl + locationKey + apiKey);
        setDailyForecasts(res.data.DailyForecasts);
        setHeadlineText(res.data.Headline.Text);
        setIconNumber(res.data.DailyForecasts[0].Day.Icon);
        setFlag(true);
    }
    if(flag == true)
        return (
            <>
                <div class="d-flex justify-content-center" style={{marginTop:'1.5%'}} >
                    <input type='text' placeholder='Search' onKeyPress={handleKeyPress}></input>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Body>Weather's Favorite settings changed successfully!</Toast.Body>
                    </Toast>
                </div>
                <Card className = "Card">
                    <Card.Body>
                        <FavoriteBorderIcon id="favoriteBorder"  style = {{marginLeft:'95%', width:'4vw', height:'4vh', display:'block', color:'#ff5858'}} onClick ={handleFavorite}/>
                        <FavoriteIcon id="favoriteFilled"  style = {{marginLeft:'95%', width:'4vw', height:'4vh', display:'none', color:'#ff5858'}} onClick ={handleFavorite}/>
                        <Card.Title id = "Title" style={{textAlign:'center', fontSize:'35px', height:'20%', color:'rgb(107, 107, 107)'}}>
                            {city}
                            <br></br>
                            {temp}°C    
                        </Card.Title>
                        <Card.Text id = "Text" style={{textAlign:'center', fontSize:'1.5vw', fontStyle:'bold', height:'25%', color:'rgb(107, 107, 107)'}}>
                            {weatherTextData}
                            <br></br>
                            {headlineText}
                        </Card.Text>
                        <div class="d-flex justify-content-evenly" style={{ marginBottom:'10%', height:'40%'}}>
                            {dailyForecasts.map((forecast, idx) => (
                                <WeatherCard
                                    dailyMinWeather = {dailyForecasts[idx].Temperature.Minimum.Value}
                                    dailyMaxWeather = {dailyForecasts[idx].Temperature.Maximum.Value}
                                    dailyWeatherIcon = {dailyForecasts[idx].Day.Icon}
                                    date = {dailyForecasts[idx].EpochDate}
                                />
                            ))}
                        </div>
                </Card.Body>
                </Card>
            </>
        );
    else if(flag == false)
        return(
            <div class="d-flex justify-content-center" style={{marginTop:'1.5%'}} >
                <input type='text' placeholder='Search' onKeyPress={handleKeyPress} style={{width:'20%', borderRadius:'50px', fontWeight: 'bold', textAlign:'center',  boxShadow:'0px 0px 15px 10px rgba(0,0,0,0.1)', borderColor:'rgba(5, 250, 144, 0.7)'}}></input>
                <Toast onClose={() => setErrorHandle(false)} show={errorHandle} delay={3000} autohide>
                    <Toast.Body>Unable to track the given city, please try again.</Toast.Body>
                </Toast>
            </div>
        );
}
 
export default Frame;