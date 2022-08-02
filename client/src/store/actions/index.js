import axios from 'axios';
export const FETCH_VIDEOGAMES = 'FETCH_VIDEOGAMES';
export const SEARCH_VIDEOGAMES = 'SEARCH_VIDEOGAMES';
export const SORT = 'SORT';
export const PAGE_VIDEOGAMES = 'PAGE_VIDEOGAMES';
export const GENRES = 'GENRES';
export const FILTER = 'FILTER';
export const CREATE_VIDEOGAMES = 'CREATE_VIDEOGAMES';

export function fetchVideogames(){
    return function (dispatch){
        axios.get('http://localhost:3001/api/videogames')
        .then((videogames) => {
            dispatch({
                type: FETCH_VIDEOGAMES,
                payload: videogames.data
            })
        }).catch((error)=> {
            console.log(error)
        })
    }
} 

export function searchVideogames(search){
    return function (dispatch){
        axios.get(`http://localhost:3001/api/videogames?name=${search}`)        
        .then((videogames) => {
            dispatch({
                type: SEARCH_VIDEOGAMES,
                payload: videogames.data
            })
        }).catch((error)=> {
            console.log(error)
        })
    }
}

export function genres(){
    return function (dispatch){
        axios.get('http://localhost:3001/api/genres')        
        .then((genres) => {
            dispatch({
                type: GENRES,
                payload: genres.data
            })
        }).catch((error)=> {
            console.log(error)
        })
    }
}

export function creategame(newgame){
    return function (dispatch){
        axios.post('http://localhost:3001/api/videogames', newgame)        
        .then((game) => {
            dispatch({
                type: CREATE_VIDEOGAMES,
                payload: game.data
            })
        }).catch((error)=> {
            console.log(error)
        })
    }
}


export function searchpage(num){
    return{
        type: PAGE_VIDEOGAMES,
        payload: num
    }    
}

export function sort(order){ 
    return{
        type: SORT,
        payload: order
    }    
}

export function filter(order){ 
    return{
        type: FILTER,
        payload: order
    }    
}