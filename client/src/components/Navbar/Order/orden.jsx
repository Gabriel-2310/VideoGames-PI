import React from "react";
import { useDispatch } from "react-redux";
import { sort, searchpage } from "../../../store/actions";

export default function Order() {
    let dispatch = useDispatch()
    function onSelectChange(e){
        dispatch(sort(e.target.value))
        dispatch(searchpage(0))
    }
    return(
        <React.Fragment>
            <select className='cuadrohome' name="Select" onChange={onSelectChange}>                
                <option selected>Ordenar</option>
                <optgroup  label="Alfabeto">
                <option value="AscendenteA">Ascendente</option>
                <option value="DescendenteA">Descendente</option>
                </optgroup>
                <optgroup label="Clasificacion">
                <option value="AscendenteR">Ascendente</option>
                <option value="DescendenteR">Descendente</option>
                </optgroup>                
            </select>
        </React.Fragment>
    )
}