import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { creategame, fetchVideogames } from "../../store/actions";
import './GameCreate.css'

export default function GameCreate() {
    const [newgame, setnewgame] = useState({
      platforms: [],
      vergeneros: false,
      despliegue: 0,
      home:0
    });
    const [genero, setgenero] = useState({
      id1: []
    });
    const [error, setError] = useState({
      name: 'Campo obligatorio',
      description_raw: 'Campo obligatorio' 
    });
    let dispatch = useDispatch()
    let history = useHistory()
    let gamecreate = useSelector((state)=> state.newgame)
    let geners = useSelector((state)=> state.genres)
    console.log('info del game', newgame)
  function validateName(e) {
    if(!/^[^]+$/.test(e.target.value)) {
      setError({...error, [e.target.name]:'No puede estar vacio'});
    } else {setError({
      ...error,
      [e.target.name]:''
    });}
    setnewgame({...newgame, [e.target.name]: e.target.value});
  }
  function validateImage(e) {
    if(!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(e.target.value)) {
      setError({...error, [e.target.name]:'Debe ser un URL'});
    } else {setError({
      ...error,
      [e.target.name]:''
    });}
    setnewgame({...newgame, [e.target.name]: e.target.value});
  }
  function validateDescription(e) {
    if(!/^[^]+$/.test(e.target.value)) {
      setError({...error, [e.target.name]:'No puede estar vacio'});
    } else {setError({
      ...error,
      [e.target.name]:''
    });}
    setnewgame({...newgame, [e.target.name]: e.target.value});
  }
  function validateReleased(e) {
    if(!/^\d{4}([-])(0[1-9]|1[1-2])\1(3[01]|[12][0-9]|0[1-9])$/.test(e.target.value)) {
      setError({...error, [e.target.name]:'Debe cumplir con el formato'});
    } else {setError({
      ...error,
      [e.target.name]:''
    });}
    setnewgame({...newgame, [e.target.name]: e.target.value});
  }
  function validateRating(e) {
    if(!/^[0-4]\.[0-9]{2}|[5]\.[0]{2}?$/.test(e.target.value)) {
      setError({...error, [e.target.name]:'Debe ser un numero entre 0.00 y 5.00'});
    } else {setError({
      ...error,
      [e.target.name]:''
    });}
    setnewgame({...newgame, [e.target.name]: e.target.value});
  } 
  function validatePlataformas(e) {
    newgame.platforms.includes(e.target.name)?
    setnewgame({
      ...newgame,
      platforms: newgame.platforms.filter((element)=> element !== e.target.name) 
  }):
    setnewgame({
        ...newgame,
        platforms: [...newgame.platforms, e.target.name] 
    })
  }
  function onsubmit(e){
    e.preventDefault();
    setnewgame({...newgame,
      vergeneros: true,
      despliegue: 0,
      home: 1
    })
    dispatch(creategame(newgame))
    
  }

  function validategeneros(e){
    genero.id1.includes(e.target.name)?
    setgenero({
      ...genero,
      id1: genero.id1.filter((element)=> element !== e.target.name) 
  }):
    setgenero({
        ...genero,
        id1: [...genero.id1, e.target.name] 
    })   
  }

function onsubmitgenero(e){
    e.preventDefault()
    let [gamecret]= gamecreate
    console.log(genero)
    console.log(gamecreate)
    axios.post(`http://localhost:3001/api/videogames/genre/${gamecret.id}`, genero)
    .then((res)=> {
        console.log(res)
        dispatch(fetchVideogames())
        history.push(`/gamesdetail/${gamecret.id}`)
    }).catch ((err)=>{
        console.log(err)
    })
    
}
function onbutton (e){
  e.preventDefault()
  setnewgame({...newgame,
    despliegue: e.target.value
  })
  console.log(e.target.value)
}

  return (
    <div className="entorno"> 
      <div className="create">
        <div className="titulo"> <h1>Agregar videojuegos</h1></div>        
        <form onSubmit={onsubmit}>          
          <div className="partesuperior"> 
            <div className="general">  
              <div className="generalitems">     
                <label htmlFor="">Nombre: </label>
                <input className={error.name? 'danger':'cuadrohome'}
                  name="name" value={newgame.name} placeholder="Nombre del juego" onChange={(e) => validateName(e)}/>
                {!error.name ? null : <span>{error.name}</span>}
              </div>      
              <div className="generalitems">
                <label htmlFor="">Descripcion: </label>
                <input className={error.description_raw? 'danger':'cuadrohome'}
                  name="description_raw" value={newgame.description_raw} placeholder="Descripcion del juego" onChange={(e) => validateDescription(e)}/>
                {!error.description_raw ? null : <span>{error.description_raw}</span>}
              </div>        
              <div className="generalitems">
                <label htmlFor="">Clasificacion: </label>
                <input className={error.rating? 'danger':'cuadrohome'}
                  name="rating" value={newgame.rating} placeholder="0.00" onChange={(e) => validateRating(e)}/>
                {!error.rating ? null : <span>{error.rating}</span>}
              </div>        
              <div className="generalitems">
                <label htmlFor="">Fecha de lanzamiento: </label>
                <input className={error.released? 'danger':'cuadrohome'}
                  name="released" value={newgame.released} placeholder="AAAA-MM-DD" onChange={(e) => validateReleased(e)}/>
                {!error.released ? null : <span>{error.released}</span>}
              </div>
              <div className="generalitems">
                <label htmlFor="">Imagen: </label>
                <input className={error.background_image? 'danger':'cuadrohome'}
                  name="background_image" value={newgame.background_image} placeholder="Url de la imagen" onChange={(e) => validateImage(e)}/>
                {!error.background_image ? null : <span>{error.background_image}</span>}
              </div>         
            </div>
            <div className="imagensearch">
              {newgame.background_image&&<img className="imagen" src={newgame.background_image} alt="imagen" width="150" height="150"/>}
            </div>
          </div>
          <h3>Plataformas: </h3>
          <div className="botones">
          <button className="butonHome2" type="button" value="1" onClick={onbutton}>Computador</button>
          <button className="butonHome2" type="button" value="2" onClick={onbutton}>Sistema operativo</button>
          <button className="butonHome2" type="button" value="3" onClick={onbutton}>PlayStation</button>
          <button className="butonHome2" type="button" value="4" onClick={onbutton}>Xbox</button>
          <button className="butonHome2" type="button" value="5" onClick={onbutton}>Nintendo</button>
          <button className="butonHome2" type="button" value="6" onClick={onbutton}>Consola</button>
          <button className="butonHome2" type="button" value="7" onClick={onbutton}>Web</button>
          </div>
          { newgame.despliegue == 1&&
            <div>
              <label htmlFor="">PC</label>
              <input type="checkbox"  name="PC" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Classic Macintosh</label>
              <input type="checkbox"  name="Classic Macintosh" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Commodore / Amiga</label>
              <input type="checkbox"  name="Commodore / Amiga" onChange={(e) => validatePlataformas(e)}/>        
              <label htmlFor="">Apple II</label>
              <input type="checkbox"  name="Apple II" onChange={(e) => validatePlataformas(e)}/>
            </div> 
          }          
          { newgame.despliegue == 2&&
            <div>
              <label htmlFor="">iOS</label>
              <input type="checkbox"  name="iOS" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">macOS</label>
              <input type="checkbox"  name="macOS" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Linux</label>
              <input type="checkbox"  name="Linux" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Windows</label>
              <input type="checkbox"  name="Windows" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Linux</label>
              <input type="checkbox"  name="Linux" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Android</label>
              <input type="checkbox"  name="Android" onChange={(e) => validatePlataformas(e)}/>
            </div> 
          }
          { newgame.despliegue == 3&&
            <div>
              <label htmlFor="">PlayStation 5</label>
              <input type="checkbox"  name="PlayStation 5" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">PlayStation 4</label>
              <input type="checkbox"  name="PlayStation 4" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">PlayStation 3</label>
              <input type="checkbox"  name="PlayStation 3" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">PlayStation 2</label>
              <input type="checkbox"  name="PlayStation 2" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">PlayStation</label>
              <input type="checkbox"  name="PlayStation" onChange={(e) => validatePlataformas(e)}/>
            </div> 
          }            
          { newgame.despliegue == 4&&
            <div>
              <label htmlFor="">Xbox</label>
              <input type="checkbox"  name="Xbox" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Xbox One</label>
              <input type="checkbox"  name="Xbox One" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Xbox Series S/X</label>
              <input type="checkbox"  name="Xbox Series S/X" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Xbox 360</label>
              <input type="checkbox"  name="Xbox 360" onChange={(e) => validatePlataformas(e)}/>
            </div> 
          }            
          { newgame.despliegue == 5&&
            <div>
              <label htmlFor="">Nintendo Switch</label>
              <input type="checkbox"  name="Nintendo Switch" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Nintendo 3DS</label>
              <input type="checkbox"  name="Nintendo 3DS" onChange={(e) => validatePlataformas(e)}/> 
              <label htmlFor="">Nintendo DS</label>
              <input type="checkbox"  name="Nintendo DS" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Nintendo DSi</label>
              <input type="checkbox"  name="Nintendo DSi" onChange={(e) => validatePlataformas(e)}/>       
              <label htmlFor="">Nintendo 64</label>
              <input type="checkbox"  name="Nintendo 64" onChange={(e) => validatePlataformas(e)}/>       
              <label htmlFor="">Wii</label>
              <input type="checkbox"  name="Wii" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">NES</label>
              <input type="checkbox"  name="NES" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">SNES</label>
              <input type="checkbox"  name="SNES" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">GameCube</label>
              <input type="checkbox"  name="GameCube" onChange={(e) => validatePlataformas(e)}/>
            </div> 
          }            
          { newgame.despliegue == 6&&
            <div>
              <label htmlFor="">PSP</label>
              <input type="checkbox"  name="PSP" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">PS Vita</label>
              <input type="checkbox"  name="PS Vita" onChange={(e) => validatePlataformas(e)}/>       
              <label htmlFor="">Game Boy Advance</label>
              <input type="checkbox"  name="Game Boy Advance" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Game Boy Color</label>
              <input type="checkbox"  name="Game Boy Color" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Game Boy</label>
              <input type="checkbox"  name="Game Boy" onChange={(e) => validatePlataformas(e)}/>      
              <label htmlFor="">Wii U</label>
              <input type="checkbox"  name="Wii U" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Atari 7800</label>
              <input type="checkbox"  name="Atari 7800" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Atari 5200</label>
              <input type="checkbox"  name="Atari 5200" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Atari 2600</label>
              <input type="checkbox"  name="Atari 2600" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Atari Flashback</label>
              <input type="checkbox"  name="Atari Flashback" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Atari 8-bit</label>
              <input type="checkbox"  name="Atari 8-bit" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Atari ST</label>
              <input type="checkbox"  name="Atari ST" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Atari Lynx</label>
              <input type="checkbox"  name="Atari Lynx" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Atari XEGS</label>
              <input type="checkbox"  name="Atari XEGS" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Atari Jaguar</label>
              <input type="checkbox"  name="Jaguar" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">SEGA Genesis</label>
              <input type="checkbox"  name="Genesis" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">SEGA Saturn</label>
              <input type="checkbox"  name="SEGA Saturn" onChange={(e) => validatePlataformas(e)}/>        
              <label htmlFor="">SEGA CD</label>
              <input type="checkbox"  name="SEGA CD" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">SEGA 32X</label>
              <input type="checkbox"  name="SEGA 32X" onChange={(e) => validatePlataformas(e)}/>        
              <label htmlFor="">SEGA Master System</label>
              <input type="checkbox"  name="SEGA Master System" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Dreamcast</label>
              <input type="checkbox"  name="Dreamcast" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">3DO</label>
              <input type="checkbox"  name="3DO" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Game Gear</label>
              <input type="checkbox"  name="Game Gear" onChange={(e) => validatePlataformas(e)}/>
              <label htmlFor="">Neo Geo</label>
              <input type="checkbox"  name="Neo Geo" onChange={(e) => validatePlataformas(e)}/>
            </div>
          }
          { newgame.despliegue == 7&&
            <div>
              <label htmlFor="">Web</label>
              <input type="checkbox"  name="Web" onChange={(e) => validatePlataformas(e)}/>
            </div> 
          }
          <br />
          { newgame.name&&newgame.description_raw&&newgame.platforms.length?<button className="butonHome2">Guardar</button>:null}
         
        </form> 
             
        <form onSubmit={onsubmitgenero}>
          {newgame.vergeneros && geners.length &&<h3>Generos: </h3>}
          <div className="gener">
            { newgame.vergeneros && geners.length && 
              geners.map((genero)=>{
                return (
                  <div className="gen">
                    <label htmlFor="">{genero.name}</label>
                    <input type="checkbox"  name={genero.id} onChange={(e) => validategeneros(e)}/>
                  </div>
                )
              }) 
            }
          </div>
          { genero.id1.length?<button className="butonHome2">Guardar</button>:null} 
        </form>       
        {newgame.home===0?<NavLink to={'/home'}><button className="butonHome2">Regresar</button></NavLink>:null}
      </div>
      <img id="imagenfondo" src="https://c4.wallpaperflare.com/wallpaper/277/256/957/video-game-rust-wallpaper-preview.jpg"  />            
      <div className="capa"></div> 
    </div>
  )
          
}