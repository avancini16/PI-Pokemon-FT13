import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {searchPokemon} from '../../actions/index';
import Card from '../Card/card';
import style from './search.module.css'

export default function Search() {
  const dispatch = useDispatch();
  let { name } = useParams()

  const searchPokemons = useSelector((state) => state.searchPokemonByName);

  useEffect(() => {
    dispatch(searchPokemon(name));
  }, [name]); 

  return (
    <div className={style.cont}>
        <Card data={searchPokemons} />
    </div>
  )
};