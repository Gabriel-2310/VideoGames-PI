import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, searchpage } from "../../../store/actions";

export default function Filter() {
    let genres = useSelector((state) => state.genres)
    console.log('filtro', genres)
    let dispatch = useDispatch()
    function onSelectChange(e){
        dispatch(filter(e.target.value))
        dispatch(searchpage(0))
    }
    return(
        <React.Fragment>
            <select className='cuadrohome' name="Select" onChange={onSelectChange}>
                <option selected>Filtrar</option>
                <optgroup label="Generos">
                    {
                        genres.map((gen) =>{
                            return <option value={gen.name}>{gen.name}</option>
                        })
                    }                
                </optgroup>
                <optgroup label="Origen">
                <option value="Agregados">Agregados</option>
                <option value="Api">Servidor</option>
                </optgroup>
            </select>
        </React.Fragment>
    )
}