import React,{useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
import { filterByType, getTypes, orderAsc, orderDesc, orderByCreator } from '../../actions';
import style from './filter.module.css'

export default function Filter({paginate}){
    const dispatch = useDispatch()
    const types = useSelector((store) => store.types);

    useEffect(() => {
        dispatch(getTypes());
    }, []); 

    const handleFilter = (e) => {
        dispatch(filterByType(e.target.value))
        paginate(e, 1);
    };

    //Ordenado
    const handleOrder = (e) => {
        if (e.target.value === "asc_name" || e.target.value === "asc_force") {
          dispatch(orderAsc(e.target.value));
        } else if (e.target.value === "desc_name" || e.target.value === "desc_force") {
          dispatch(orderDesc(e.target.value));
        } else {
          dispatch(filterByType(e.target.value));
        }
      };
    
    // Filtrado por API/DB
    const handleCreator = (e) => {
      if (e.target.value === "api" || e.target.value === "Created") {
        dispatch(orderByCreator(e.target.value));
        paginate(e, 1);
      } else {
        dispatch(filterByType(e.target.value));
        paginate(e, 1);
      }
      
    };


    return(
        <div className={style.cont}>
            {/* <div>
                Filter
                <Link to='/APIpokemons'>
            <button>Api's pokemons</button>
                </Link>
            <Link to='/DBpokemons'>
            <button>DB'S Pokemons</button>
            </Link>
            </div> */}
    <div >
      <div>
        <div className={style.text}>Filter by Genre</div>
        <select onChange={(e) => handleFilter(e) } className={style.box}>
          <option>All</option>
          {types.map(type=>(
              <option value={type.name}>{type.name}</option>
          ))}
          <option >types</option>

        </select>
      </div>
      <div>
        <div className={style.text}>Order</div>
        <select onChange={(e) => handleOrder(e)} className={style.box}>
          <option value="All" default>All</option>
          <option value="asc_name">Alphabetically (A-Z)</option>
          <option value="desc_name">Alphabetically (Z-A)</option>
          <option value="asc_force">Force (Lower-Higher)</option>
          <option value="desc_force">Force (Higher-Lower)</option>
        </select>
      </div>
      <div>
        <div className={style.text}>Filter by Creator</div>
        <select onChange={(e) => handleCreator(e)} className={style.box}>
          <option default>All</option>
          <option value='api'>Api </option>
          <option value='Created'>Database</option>
        </select>
      </div>
    </div>
        </div>
    )
}