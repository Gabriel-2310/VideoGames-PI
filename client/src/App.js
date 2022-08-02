import React from 'react';
import {Route} from 'react-router-dom';
import GameCreate from './components/GameCreate/GameCreate.jsx';
import GameDetail from './components/GameDetail/GameDetail.jsx';
import Home from './components/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Paginacion from './components/Home/Footer/Paginacion.jsx';
import Inicio from './components/Inicio/inicio.jsx';
import './App.css';


function App() {
  return (
    <React.Fragment>
      <Route exact path={'/'} component={Inicio}/>
      <Route path={'/home'} component={Navbar}/>
      <Route path={'/home'} component={Home}/>
      <Route path={'/home'} component={Paginacion}/>
      <Route path={'/gamesdetail/:id'} component={GameDetail}/>
      <Route path={'/gamescreate'} component={GameCreate}/>
    </React.Fragment>
  );
}

export default App;
