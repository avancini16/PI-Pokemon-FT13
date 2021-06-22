import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import Pagination from '../Pagination/pagination';
import Filter from '../filter/filter';
import {getPokemons} from '../../actions/index';
import PokeContainer from '../PokemonsContainer/pokeContainer';


export default function Home(){
    const dispatch = useDispatch();
    const filteredPokemons = useSelector((state) => state.filteredPokemons);
    const filterBy = useSelector((state) => state.filterBy);
    const orderBy = useSelector((state) => state.orderBy);
    const pokemons = useSelector((state) => state.pokemons);
    
    useEffect(()=>{
        dispatch(getPokemons())
    }, [])

    let allPokemons;
    filterBy === "All" && orderBy === "Select"
    ? (allPokemons = pokemons)
    : (allPokemons = filteredPokemons);

    function paginate(e, num) {
        e.preventDefault();
        setCurrentPage(num);
      }

    const [currentPage, setCurrentPage] = useState(1);
    const [PokemonsPerPage, setPokemonsPerPage] = useState(9);

    const indexOfLastPost = currentPage * PokemonsPerPage;
    const indexOfFirstPost = indexOfLastPost - PokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPost, indexOfLastPost);

    return(
        <div>
            <div >
            <Filter paginate={paginate}/>
                <PokeContainer pokemons={currentPokemons}/>
                <Pagination pokemonsPerPage={PokemonsPerPage} totalPokemons={pokemons.length} paginate={paginate} />
            </div>
        </div>
    )
}