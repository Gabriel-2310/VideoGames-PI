import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {searchVideogames, searchpage} from '../../../store/actions/index.js';
import '../Navbar.css'

export default function SearchBar() {
    const [search, setSearch] = useState('');
    
    let dispatch = useDispatch();

    function onSubmit (e){
        e.preventDefault();
        dispatch(searchVideogames(search))
        dispatch(searchpage(0))
        setSearch('')
    };
    function onInputChange(e){
        e.preventDefault();
        setSearch(e.target.value) 
    };
    return(
        <React.Fragment>
            <form onSubmit={onSubmit}>
                <input className='cuadrohome' type="text" onChange={onInputChange} value={search} />
                <input className='butonHome' type="submit" value="Buscar" />
            </form>
        </React.Fragment>
    )
}