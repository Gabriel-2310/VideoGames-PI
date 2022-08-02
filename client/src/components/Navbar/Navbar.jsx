import React from "react";
import Order from "./Order/orden.jsx";
import Filter from "./filter/Filtro.jsx";
import SearchBar from "./SearchaBar/SearchBar.jsx";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sort } from "../../store/actions/index.js";
import './Navbar.css'

export default function Navbar() {
    let dispatch = useDispatch()
    function onSelectChange(e){
        e.preventDefault();
        dispatch(sort(e.target.value))
    }
    
        return (
            <div id="contenedornav"> 
                <div className="titunavabar"><h1>VIDEOGAMES PI</h1></div>   
                <div className="navbar" >
                    <div className="contenfilter">
                        <div className="items">
                            <Order/>
                        </div>
                        <div className="items">
                            <Filter/> 
                        </div>
                        <div className="items">
                            <SearchBar/>
                        </div>
                    </div>
                    <div id="contenboton">
                        <div className="creategame">
                                <button className="butonHome" value="desorden" onClick={onSelectChange}>Reiniciar</button>
                        </div>                             
                        <div className="creategame">
                            <NavLink to={'/gamescreate'}>
                                <button id="savegame" className="butonHome">Agregar videojuego</button>
                            </NavLink>
                        </div>                        
                    </div>
                    <div id="contenexit">
                        <div id="botonexit">
                            <NavLink to={'/'}>
                                <button className="butonHome3">Salir</button>
                            </NavLink>
                        </div>
                    </div>                                
                </div>
            </div>      
        )
    
}