import React , { Fragment, useState, useEffect } from 'react';
import {Navbar, Container, Nav, Button, ButtonGroup, ToggleButton} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom'
import './Header.css'

const Header = (props) => {
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Light Theme', value: '1', variant : 'outline-light' },
        { name: 'Dark Theme', value: '2', variant : 'outline-dark' },
    ];

    const handleClick = (event) =>{
        setRadioValue(event.currentTarget.value);
        if(radioValue == '1'){
            document.body.style.backgroundColor = "rgb(13,17,23)";
        }
        if(radioValue == '2'){
            document.body.style.backgroundColor = "white";
        }
    }

    return (
        <Navbar collapseOnSelect expand="lg" className = "Navbar">
        <Container>
            <Navbar.Brand style={{color:'white', fontWeight: 'bold'}}>Herolo's Weather App </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <ButtonGroup>
                    {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={radio.variant}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={handleClick}
                    >
                        {radio.name}
                    </ToggleButton>
                    ))}
                </ButtonGroup>
                </Nav>
                <Nav>
                <Nav.Link>
                <Link to ="/home" className = "Link">Home</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link to ="/favorites" className = "Link">Favorites</Link>
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
      );
}
 
export default Header;