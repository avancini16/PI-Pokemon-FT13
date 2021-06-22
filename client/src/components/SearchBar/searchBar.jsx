import React, {useState} from "react";
import {NavLink} from 'react-router-dom';
// import {searchPokemons} from '../../actions/index';
import style from './searchbar.module.css';

export default function SearchBar() {
    const [name, setName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        setName("");
    }

  return (
    // <form onSubmit={(e) => handleSubmit(e)}>
    //   <input
    //     type="text"
    //     placeholder="Pokemon..."
    //   />
    //   <input type="submit" value="Search"  />
    // </form>
    <form onSubmit={(e) => handleSubmit(e)}>
    <input
    className = {style.input}
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Search pokemon..."
    type="text"
    ></input>
    <NavLink to={`/results/${name}`}>
        <button type="submit" className={style.submit}> Search </button>
    </NavLink>
</form>
  );
}