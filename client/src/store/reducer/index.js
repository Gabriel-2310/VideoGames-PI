import { FETCH_VIDEOGAMES, SEARCH_VIDEOGAMES, SORT, PAGE_VIDEOGAMES, GENRES, CREATE_VIDEOGAMES, FILTER } from '../actions'

const initialState = {
    videogames: [],
    filtergames: [],
    genres: [],
    page: 0,
    newgame: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_VIDEOGAMES:
    return { ...state,
       videogames: action.payload,
       filtergames: action.payload 
      }
  case SEARCH_VIDEOGAMES:
    return { ...state,
       filtergames: action.payload,
       page: 0 
      }
  case PAGE_VIDEOGAMES:
    return { ...state,
      page: action.payload 
     }
  case GENRES:
    return { ...state,
      genres: action.payload 
     }
  case CREATE_VIDEOGAMES:
    return { ...state,
      newgame:[action.payload] 
     }
  case FILTER:
    let filtgames= [] 
    let filtgame = [...state.filtergames]
    if (action.payload === 'Agregados'){
      for (let i = 0; i < filtgame.length; i++) {
        if (typeof filtgame[i].id === 'string' ){
          filtgames.push(filtgame[i])
        }        
      }
    }else if (action.payload === 'Api'){     
        for (let i = 0; i < filtgame.length; i++) {
          if (typeof filtgame[i].id === 'number'){
            filtgames.push(filtgame[i])
          }        
        }
    } else{
      for (let i = 0; i < filtgame.length; i++) {
       for (let j = 0; j < filtgame[i].genres.length; j++) {
        if (filtgame[i].genres[j].name === action.payload ){
          filtgames.push(filtgame[i])
        } 
       }
    }
    }
    return {...state,
      filtergames: filtgames
  }  
  case SORT:
    let orderGames = [...state.filtergames];    
    if(action.payload === 'desorden'){
      orderGames = [...state.videogames];
    }else{    
    orderGames.sort((a, b) => {
      if(action.payload[action.payload.length -1] === 'A'){
      if (a.name < b.name){
        return action.payload === 'AscendenteA'? -1 : 1;
      }if (b.name < a.name) {
        return action.payload === 'AscendenteA'? 1 : -1;
      } return 0
     } else{
      if (a.rating < b.rating){
        return action.payload === 'AscendenteR'? -1 : 1;
      }if (b.rating < a.rating) {
        return action.payload === 'AscendenteR'? 1 : -1;
      } return 0
     }
    })}
    return { ...state,
      filtergames: orderGames
    }      
  default:
    return state
  }
}
