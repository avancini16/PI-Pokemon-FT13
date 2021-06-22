import React from 'react';
import SearchBar from '../SearchBar/searchBar'
import {Link} from 'react-router-dom'
import style from './navBar.module.css'

export default function Navbar(){
    return(
        <nav className={style.navbar}>
            <div className={style.info}>
                <span >Pokemons</span>
                <span> | </span>
                <Link to='/home' className={style.links}>
                <span className={style.falsebutton}>Home</span>
                </Link>
                <span> | </span>
                <Link to='/create' className={style.links}>
                <span className={style.falsebutton}>Create Pokemon</span>
                </Link>
                <span> | </span>
                <span className={style.falsebutton}>About</span>
            </div>
            <SearchBar/>

        </nav>
    )
}