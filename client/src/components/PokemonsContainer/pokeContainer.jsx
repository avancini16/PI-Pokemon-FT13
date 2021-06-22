import React, { useEffect} from "react";
import {useSelector} from 'react-redux';
import style from'./pokeContainer.module.css';
import Card from '../Card/card';
import Loading from '../Loading/loading';
import {Link} from 'react-router-dom';

export default function PokeContainer ({pokemons}) {
  return (
    <div className={style.content}>
      {pokemons.length > 0 ?
                pokemons.map((data) => (
                  <Card data={data} />
                ))
                : <Loading/>
                }
    </div>
  );
};