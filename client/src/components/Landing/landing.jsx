import React from 'react';
import {Link} from 'react-router-dom';
import style from './landing.module.css'  


export default function Landing(){
    return (
        <div >
            <div>
            <img className={style.pokeimage} src="http://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG10.png" alt="" />
            </div>
            <div>
            <Link to='/home'>
            <button className={style.pokebutton} >START</button>
            </Link>
            </div>
        </div>
    )
}