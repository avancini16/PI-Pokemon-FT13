import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { getApiPokemons } from '../../actions';
import Card from '../Card/card';
import Loading from '../Loading/loading';

export default function ApiContainer(){
    const dispatch = useDispatch();

    const pokemons = useSelector((state) => state.APIpokemons);
    
    useEffect(()=>{
        dispatch(getApiPokemons())
    }, [])

    return(
        <div>
            {console.log(pokemons)}
            {pokemons.length > 0 ?
                pokemons.map((data) => (
                  <Card data={data} />
                ))
                : <Loading/>
                }
        </div>
    )
}