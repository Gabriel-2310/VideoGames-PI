import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import imagen from '../../recursos/imagenes/imagen2.jpg';
import './GameDetail.css'

export default function GameDetail() {
    const [boton, setboton] = useState(0)
    const [gamedetail, setgamedetail] = useState(null);
    let {id} = useParams();
    function onbutton(e){
        e.preventDefault()
        setboton(e.target.value)
    }
    useEffect(()=> {
        axios.get(`http://localhost:3001/api/videogames/${id}`)
        .then((res)=>{
            setgamedetail(res.data)
        })
        return ()=>{
            setgamedetail(null)
        }
    }, [])
    console.log('gamedeatil',gamedetail)
    return(
        <div className="entorno">
            <div className="Detalles">
                {gamedetail?
                <div className="contenedordetalles">                    
                    <div className="tite">
                       { gamedetail.name&&<h1>{gamedetail.name}</h1>}
                    </div>
                    <div className="botones">
                        <button className="butonHome2" type="button" value="0" onClick={onbutton}>Imagen</button>
                        <button className="butonHome2" type="button" value="1" onClick={onbutton}>Clasificacion</button>
                        <button className="butonHome2" type="button" value="2" onClick={onbutton}>Generos</button>
                        <button className="butonHome2" type="button" value="3" onClick={onbutton}>Lanzamiento</button>
                        <button className="butonHome2" type="button" value="4" onClick={onbutton}>Plataformas</button>
                        <button className="butonHome2" type="button" value="5" onClick={onbutton}>Descripcion</button>
                    </div>
                        {boton == 0 &&
                            <div className="contendinf">
                                { gamedetail.background_image? 
                                    <img src={gamedetail.background_image} alt="imagen" />: 
                                    <img src={imagen} alt="imagen"/>
                                }
                            </div>
                        }
                        {boton == 1 &&
                            <div className="contendinf">
                                {gamedetail.rating&&<p>{gamedetail.rating}</p>}
                            </div>
                        } 
                        {boton == 2 &&
                            <div className="contendinf">
                                {gamedetail.genres&&gamedetail.genres.map((genero) =>{
                                        console.log('generos',genero.name)
                                        return <div className="lista"><p>{genero.name}</p></div>
                                    })
                                }                            
                            </div>
                        } 
                        {boton == 3 &&
                            <div className="contendinf">
                                {gamedetail.released&&<p>{gamedetail.released.slice(0, 10)}</p>}
                            </div>
                        } 
                        {boton == 4 &&
                            <div className="contendinf">
                                { gamedetail.platforms&&gamedetail.platforms.map((platforms) =>{
                                        if (typeof platforms === 'string'){
                                            console.log(platforms)
                                            return <div className="lista"><p>{platforms}</p></div> 
                                        } else{ console.log(platforms.platform.name)
                                            return <div className="lista"><p>{platforms.platform.name}</p></div>
                                        }
                                    })
                                }
                            </div>
                        }
                        {boton == 5 &&
                            <div className="contendinf">
                                {gamedetail.description_raw&&<p>{gamedetail.description_raw}</p>}
                            </div>
                        }                          
                                    
                </div>
                :<h4>Cargando...</h4>}
                <NavLink to={'/home'}><button className="butonHome2">Regresar</button></NavLink>                
            </div>
            <img id="imagenfondo" src="https://i.pinimg.com/736x/f7/0f/c7/f70fc759c5c13493ca9e21862b914dbd.jpg" />           
            <div className="capa"></div>        
        </div>
    )
}