export function getPokemons() {
    return function (dispatch) {
      return fetch('http://localhost:3001/pokemons')
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "GET_POKEMONS", payload: json });
        });
    }
}

export function searchPokemon(name) {
    return (dispatch) =>
      fetch(`http://localhost:3001/name?name=${name}`)
        .then((resp) => resp.json())
        .then((json) => {
          dispatch({
            type: "SEARCH_POKEMON",
            payload: json,
          });
        });
  }

export function getPokemonById(id) {
  return (dispatch) =>
    fetch(`http://localhost:3001/pokemon/${id}`)
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "GET_POKEMON_BY_ID",
          payload: json,
        });
      });
}

export function createPokemon(obj) {
  console.log(obj)
  return (dispatch) =>
    fetch("http://localhost:3001/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "CREATE_POKEMON",
          payload: json,
        });
      });
}

export function getTypes() {
  return (dispatch) =>
    fetch(`http://localhost:3001/types`)
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "GET_TYPES",
          payload: json,
        });
      });
}

export const filterByType = (types) => (dispatch, getState) => {
  let filteredPokemons = [];

  if (types === "All") {
    filteredPokemons = getState().pokemons;
  } else {
    filteredPokemons = getState().pokemons.filter((pokemon) =>
      (pokemon.type).includes(types)
    )
  };
  dispatch({
    type: "FILTER_BY_TYPES",
    payload: {
      types,
      pokeType: filteredPokemons,
    },
  });
};

export const orderAsc = (type) => (dispatch, getState) => {
  const filtered = getState().filteredPokemons;
  let pokeOrder = []

    if (type === "asc_name") {
      pokeOrder = filtered.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    }  if (type === "asc_force") {
      pokeOrder = filtered.sort(
        (a, b) => a.attack - b.attack
      );
    }
    dispatch({
      type: "ORDER_ASC_FORCE",
      payload: {
        pokeOrder,
        name: type,
      },
    });
}

export const orderDesc = (type) => (dispatch, getState) => {
  const filtered = getState().filteredPokemons;
  let pokeOrder = []

    if (type === "desc_name") {
      pokeOrder = filtered.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
    } else if (type === "desc_force") {
      pokeOrder = filtered.sort(
        (a, b) => b.attack - a.attack
      );
    }
    dispatch({
      type: "ORDER_DESC_FORCE",
      payload: {
        pokeOrder,
        name: type,
      },
    });
}

export const orderByCreator = (source) => (dispatch, getState) => {
  const pokemons = getState().pokemons.filter(function (G) {
      return G.source === source
    });
  dispatch({
    type: "ORDER_BY_CREATOR",
    payload: {
      pokemons,
      source,
    },
  });
};