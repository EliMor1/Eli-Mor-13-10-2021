import React , { Fragment } from 'react';
import {Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import {useSelector, useDispatch} from 'react-redux';
import { favoritesActions } from '../../Store/Redux.js';



const FavoritesCard = (props) => {
    const favoritesState = useSelector(state => state.favorites);
    //const iconNumber = props.weatherIcon;
    const iconSource = 'https://www.accuweather.com/images/weathericons/'
    const fileType = '.svg';
    return (
        <>
        <Card id = "Card" className = "d-flex flex-row cardstyle" style={{marginTop:'5%',marginLeft:'1%',width: '10%',height:'100%', borderImageSlice:1, borderWidth:'1px', borderImageSource:'linear-gradient(to bottom, rgba(5, 250, 144, 1) 0%, rgba(13, 202, 240, 1) 100% ) ', background:'linear-gradient(45deg,  rgba(5, 250, 144, 0.1) 0%, rgba(5, 250, 144, 0.02) 40%, rgba(13, 202, 240, 0.02) 60%,  rgba(13, 202, 240, 0.1) 100% ) ', color:'black', justifyContent:'center', fontSize:'1.5vw'}}>
        <Card.Body className = "d-flex flex-column bd-highlight" >
            <Card.Title style={{textAlign:'center', marginTop:'1%', width: '16.5vh', fontSize:'1.5vw', color:'rgb(107, 107, 107)'}}>{props.cityName}</Card.Title>
            <Card.Text style={{textAlign:'center', marginTop:'1%', width: '16.5vh', color:'rgb(107, 107, 107)'}}>
            {Math.round((props.cityWeather )/1)}°C
            </Card.Text>
            <Card.Img  className = "d-flex flex-column bd-highlight" variant="bottom" src={iconSource + props.weatherIcon + fileType} style={{width:'60%', marginLeft:'20%'}} />
        </Card.Body>
        </Card>
    </>
      );
}
 
export default FavoritesCard;