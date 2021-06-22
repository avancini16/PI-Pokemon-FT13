import React from 'react';
import style from './card.module.css';
import {Link} from 'react-router-dom';
// import PokeDetails from '../PokemonDetails/pokemondetails'

export default function Card({data}) {
	return (
		<Link to={`/pokedetails/${data.id}`} className={style.links}>
		<div className={style.card}>
			<div className={style.image}>
				<img src={data.img} alt="" />
			</div>
			<div className={style.text}>

			<span className={style.type}>
				{data.type}
			</span>
			<h2 className={style.name}>{data.name}</h2>
			</div>
		</div>
		</Link>
	);
}