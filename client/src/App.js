import './App.css';
import {Route} from 'react-router-dom';
import Home from './components/Home/home'
import Landing from './components/Landing/landing';
import Navbar from './components/NavBar/navbar';
import Search from './components/Search/search'
import PokeDetails from './components/PokemonDetails/pokemondetails';
import Create from './components/CreatePokemon/create';
// import Container from './components/FilterContainer/container';
// import ApiContainer from './components/apiPokemons/apiPokemons';

function App() {
  return (
    <div className="App">
      <Route
      path='/home'
      component={Navbar}
      />

      <Route
      path= '/home'
      component={Home}
      /> 

      <Route
      path= '/landing'
      component={Landing}
      /> 

      <Route
      exact path="/results/:name"
      component={Search} 
      />  

      <Route
      path='/pokedetails/:id'
      render={({match}) => <PokeDetails id={match.params.id}/>}
      />

      <Route
      exact path="/create"
      component={Create} 
      />     

      {/* <Route
      path="/DBpokemons"
      component={Container} 
      />    

      <Route
      path="/APIpokemons"
      component={ApiContainer} 
      /> */}

    </div>
  );
}

export default App;
