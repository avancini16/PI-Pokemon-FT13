const initialState = {
    pokemons: [],
    DBpokemons: [],
    APIpokemons: [],
    searchPokemonByName: [],
    searchPokemonById: [], 
    createPokemon: null,
    types: [],
    filteredPokemons: [],
    filterBy: "All",
    orderBy: "Select"

}
export default function rootReducer(state = initialState, action){
    switch(action.type){
        case "GET_POKEMONS":
        return {
          ...state,
          pokemons: action.payload,
        };
        case "GET_DB_POKEMONS":
          return{
            ...state,
            DBpokemons: action.payload,
          }
          case "GET_API_POKEMONS":
          return{
            ...state,
            APIpokemons: action.payload,
          }
        case "SEARCH_POKEMON":
         return {
          ...state,
          searchPokemonByName: action.payload,
        };
        case "GET_POKEMON_BY_ID":
        return {
        ...state,
        searchPokemonById: action.payload,
        };
        case "CREATE_POKEMON":
          return {
            ...state,
            createPokemon: action.payload,
          }; 
          case "GET_TYPES":
           return {
              ...state,
              types: action.payload,
            };  
          case "FILTER_BY_TYPES":
          return {
              ...state,
              filteredPokemons: action.payload.pokeType,
              filterBy: action.payload.types,
            };   
            case "ORDER_ASC_NAME":
            case "ORDER_ASC_FORCE":
            case "ORDER_DESC_NAME":
            case "ORDER_DESC_FORCE":
            return {
              ...state,
              filteredPokemons: action.payload.pokeOrder,
              orderBy: action.payload.name,
            };    
            case "ORDER_BY_CREATOR":
            return {
              ...state,
              filteredPokemons: action.payload.pokemons,
              filterBy: action.payload.source,
            }; 
        default:
            return state;
    }

}