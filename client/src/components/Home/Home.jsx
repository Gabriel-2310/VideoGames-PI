import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genres } from '../../store/actions/index.js';
import House from './Homes';
import './Home.css';


export default function Home(){
        let videogames = useSelector((state) => state.filtergames);
        let page = useSelector((state) => state.page)
        let gen = useSelector((state)=> state.genres)
        let dispatch = useDispatch();
        useEffect(() =>{
            dispatch(genres())
        }, [])        
        console.log('Home',videogames)
        console.log('Home',gen)
        return (
            <React.Fragment>
                <div className="contencardsgame">
                {
                    videogames.length?
                    videogames.slice(page*15, (page+1)*15).map((game) => {
                        return <House 
                                id={game.id} 
                                image ={game.background_image} 
                                name ={game.name} 
                                genres={game.genres} 
                                rating={game.rating}/>
                    }):null
                }                                                
                                
            <img id="imagenfondo" src="https://thumbs.dreamstime.com/b/dots-pattern-background-amarillo-83776176.jpg"  />            
            <div className="capa"></div> 
            </div>
            </React.Fragment>
        )
}
