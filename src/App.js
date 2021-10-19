import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import {BrowserRouter as Router, Switch, Route, Link , Redirect} from 'react-router-dom';
import React , { Fragment } from 'react';
import Header from './components/Header/Header';


function App() {
  return (
  <Router>
    <Switch>
      <Route>
        <Header/>
        <Route path ="/home" component ={Home} exact />
        <Route path ='/favorites' component = {Favorites} />
        <Redirect to="/home" />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
