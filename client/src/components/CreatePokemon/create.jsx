import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPokemon, getTypes } from '../../actions/index';
import style from './create.module.css';

export default function Create(){
    const dispatch = useDispatch();
    const types = useSelector((store) => store.types);

    const [pokemon, setPokemon] = useState({
        source: "",
        name: "",
        img: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        type: [],
    });

    useEffect(() => {
        dispatch(getTypes());
    }, []);

    const ChangeInput = (e) => {
        if (e.target.name === "type") {
        const arr = pokemon[e.target.name];
        setPokemon({
            ...pokemon,
            [e.target.name]: arr.concat(e.target.value),
        });
    } else {
        setPokemon({
            ...pokemon,
            [e.target.name]: e.target.value,
        });
    }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const obj = {
            source: 'Created',
            name: pokemon.name,
            img: pokemon.img,
            hp: pokemon.hp,
            attack: pokemon.attack,
            defense: pokemon.defense,
            speed: pokemon.speed,
            height: pokemon.height,
            weight: pokemon.weight,
            type: pokemon.type,
        };

        // Validaciones
        if (!obj.name) {
            alert("Hey! Don't forget the name.")
            return
        }

        dispatch(createPokemon(obj));
        e.target.reset();
        alert("Pokemon created successfully!");

        setPokemon({
            source: "",
            name: "",
            img: "",
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            type: [],
        });
    };




    return (
        <form 
        onSubmit={(e) => handleSubmit(e)}
        onChange={(e) => ChangeInput(e)}
        className={style.cont}>
            <div>
                <h1 className={style.text}>Create your pokemon!</h1>
            </div>
            <div>
                <div>
                    <h3 className={style.text}>Name: </h3>
                    <input 
                    type="text"
                    name="name"
                    value={pokemon.name} 
                    className={style.input}
                    />
                </div>
                <div>
                    <h3 className={style.text}>Image URL: </h3>
                    <input type="text" name='img' value={pokemon.img} className={style.input}/>
                </div>
                <div>
                    <h3 className={style.text}>Select the type of pokemon</h3>
                    <div>
                    {types.map(elem =>(
                        <div key={elem.name} className={style.check} >
                            {elem.name}
                            <input type="checkbox" value={elem.name} name='type' />
                        </div>
                    ))}
                    </div>
                </div>
                <div>
                    <h3 className={style.text}>Hp:</h3>
                    <input type="text" name='hp' value={pokemon.hp} className={style.input}/>
                </div>
                <div>
                    <h3 className={style.text}>Attack:</h3>
                    <input type="text" name='attack' value={pokemon.attack} className={style.input}/>
                </div>
                <div>
                    <h3 className={style.text}>Defence:</h3>
                    <input type="text" name='defense' value={pokemon.defense} className={style.input}/>
                </div>
                <div>
                    <h3 className={style.text}>Speed:</h3>
                    <input type="text" name='speed' value={pokemon.speed} className={style.input}/>
                </div>
                <div>
                    <h3 className={style.text}>Height:</h3>
                    <input type="text" name='height' value={pokemon.height} className={style.input}/>
                </div>
                <div>
                    <h3 className={style.text}>Weight:</h3>
                    <input type="text" name='weight' value={pokemon.weight} className={style.input}/>
                </div>
                <div>
                    <button type='submit' className={style.button}>Create</button>
                </div>
            </div> 
        </form>
    )
}