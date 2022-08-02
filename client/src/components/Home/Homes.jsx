import React from "react";
import { NavLink } from "react-router-dom";
import imagen from '../../recursos/imagenes/imagen2.jpg';
import './Home.css';

export default function House({id, image, name, genres, rating}) {
    return(
        <React.Fragment >
            <div className="cardgame">
                <div className="face front">
                    {image?<img src={image} alt="imagen" />: <img src={imagen} alt="imagen"/> }
                    <NavLink to={`/gamesdetail/${id}`}><h3>{name}</h3></NavLink>
                </div>
                <div className="face back">
                    <h3>{name}</h3>
                    <h5>Clasificacion: {rating}</h5>
                    <h5>Generos</h5>
                    <ul>
                        {  genres.map((genero) =>{
                            return <li>{genero.name}</li>
                        })}   
                    </ul>
                    <div className="linkdetail">
                        <NavLink to={`/gamesdetail/${id}`}><p>Detalles</p></NavLink>
                    </div>
                     
                </div>  
            </div>                     
        </React.Fragment>
    )
}