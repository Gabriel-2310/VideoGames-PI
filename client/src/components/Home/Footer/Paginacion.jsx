import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {searchpage} from '../../../store/actions'
import image from '../../../recursos/imagenes/videogame.png'
import './Paginacion.css'

export default function Paginacion(){
  const [page, setpage] = useState(0)
  let pag = useSelector((state) => state.page)
  let games = useSelector((state) => state.filtergames)
  let dispatch = useDispatch();
    function nextpage (e){
      e.preventDefault();
      console.log('next pagina')
      setpage(page + 1) 
    }
    
    function prevpage (e) {
      e.preventDefault();
      console.log('prev pagina');
      setpage(page - 1)      
    }

    useEffect(() => {    
      setpage(pag)
    }, [games])

    useEffect(()=>{
      dispatch(searchpage(page))        
    }, [page])   
    
    return (  
        <div className="contenedorfooter">
          <div>             
            {games.length < 16? 
              <h3></h3>:
              games.length < 30? 
                page === 0?         
                  <button className='butonHome' onClick={nextpage}>Siguiente</button>:
                  <button className='butonHome' onClick={prevpage}>Anteriror</button>:
                page === 0?         
                  <button className='butonHome' onClick={nextpage}>Siguiente</button>:
                  page === 6?
                      <button className='butonHome' onClick={prevpage}>Anteriror</button>:        
                      <div>
                        <button className='butonHome' onClick={prevpage}>Anteriror</button>
                        <button className='butonHome' onClick={nextpage}>Siguiente</button>
                      </div>    
            } 
          </div>
          <div className="footer">
            <div className="columnaf">
              <h1 className="titulo">VIDEOGAMES PI</h1>
              <p className="texto">Esta aplicacion es una biblioteca de videojuegaos, donde podras buscar,
                filtrar y ordenar, agregar nuevos a la base de datos y visualizar algunos detalles relevantes.
                Posee un menu paginado, algunas animaciones y funcionalidades que podras ir descubriendo.
                Este es un proyecto academico, para fortalecer y afianzar conocimientos, pido excusas por cualquier 
                falla en el sistema, agradesco enormente comunicarme cualquier pregunta, queja,
                recomendacion o sugerencia por medio de los contactos suministrados. 
              </p>
            </div>
            <div className="columnaf">
              <p className="texto">La informacion suministrada sobre videojuegos fue extraido de un servidor externo,
                los animaciones de fondo es de origen diferente; por consiguiente representa material 
                de otra autoria. 
              </p>
              <img id="imgenf" src={image} alt="imagen de mario bros" />
            </div>
            <div className="columnaf">
              <h3>Desarrollado y diseñado por:</h3><p className="texto">Luis Gabriel Valencia Morales</p>
              <h3>Contacto</h3>
              <div id="imagenes">
              <a target="_blank" href="https://github.com/Gabriel-2310"><img className="logos" src="https://cdn-icons-png.flaticon.com/512/25/25231.png?w=360" alt="" /></a>
              <a target="_blank" href="https://www.linkedin.com/in/luis-gabriel-valencia-morales"><img className="logos" src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" alt="" /></a>
              <a target="_blank" href="https://www.facebook.com/profile.php?id=100009368113038"><img className="logos" src="https://cdn-icons-png.flaticon.com/512/1384/1384005.png" alt="" /></a>
              <a target="_blank" href="https://api.whatsapp.com/send?phone=573137859962"><img className="logos" src="https://cdn-icons-png.flaticon.com/512/1384/1384007.png" alt="" /></a>
              </div>
            </div>
          </div>      
        </div>
         
            
    )
}

                
                