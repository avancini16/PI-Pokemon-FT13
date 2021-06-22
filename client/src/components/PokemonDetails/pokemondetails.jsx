import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPokemonById } from "../../actions/index";
import style from './pokemondetails.module.css'

export default function PokeDetails(){
    let { id } = useParams()

    const dispatch = useDispatch();
    const pokemon = useSelector((store) => store.searchPokemonById);

    useEffect(() => {
        dispatch(getPokemonById(id));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return(
        <div className={style.container}>
            <div className={style.image}>
            <img src={pokemon.img} alt="" />
            </div>
            <h1>{pokemon.name}</h1>
            <div className={style.text}>
                <div>Height: </div>
                <div>{pokemon.height}</div>
            </div>
            <div className={style.text}>
                <div>Weight: </div>
                <div>{pokemon.weight}</div>
            </div>
            <div className={style.text}>
                <div>Height: </div>
                <div>{pokemon.height}</div>
            </div>
            <div className={style.text}>
                <div>Stats: </div>
                <div>Hp: {pokemon.hp}</div>
                <div>Attack: {pokemon.attack}</div>
                <div>Defense: {pokemon.defense}</div>
                <div>Speed: {pokemon.speed}</div>
            </div>
        </div>
    )
}