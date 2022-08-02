import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import {fetchVideogames} from '../../store/actions';
import './inicio.css';

export default function Inicio() {
    let dispatch = useDispatch();
        useEffect(() =>{
            dispatch(fetchVideogames());
            axios.post('http://localhost:3001/api/genres/init')        
            .then((genres) => {
            console.log(genres)
            })
        }, [])
   
    return(
        <div className="entorno" >                       
            <div className="contenidoinicio">
                <h1>BIENVENIDO A VIDEOGAMES PI</h1>                
                <NavLink to={'/home/0'}><button className="buttonAmaEfect" type="button">INICIO</button></NavLink>                
            </div>            
            <img id="imagenfondo" src="https://cdn.wallpapersafari.com/4/14/e5i9RD.jpg"/>         
            <div className="capa"></div>             
        </div>
    )
}