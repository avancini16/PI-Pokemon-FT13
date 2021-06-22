import React from 'react';
import style from './pagination.module.css';

export default function Pagination({pokemonsPerPage, totalPokemons, paginate}){
    const pageNumbers = [];
    const numberOfPages = Math.ceil(totalPokemons/pokemonsPerPage);
    
    for(let i=0; i <= numberOfPages; i++){
        pageNumbers.push(i)
    }
    
    return(
        <nav className={style.pagination} >
            <div className={style.cont}>
            {pageNumbers.map((num)=>(
                <div key={num} className={style.item}>
                    <button onClick={(e)=> paginate(e, num)}>
                        {num}
                    </button>
                </div>
            ))}
            </div>
        </nav>
    );
}