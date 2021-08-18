const axios = require('axios');
const {Type} = require('../db');
const {Pokemon} = require('../db')


//            TRAE POKEMONS DE LA DB
async function GetPokemons(req, res){ 
    try{
        // let j = 1;
        let api = 'https://pokeapi.co/api/v2/pokemon';
        for ( let i = 0; i < 2; i++){
            let fetch = (await axios.get(api)).data;
            for(let i = 0; i < fetch.results.length; i++){
                let pokeInfo = (await axios.get(fetch.results[i].url)).data;
                await Pokemon.findOrCreate({
                    where:{
                        name: pokeInfo.name,
                        // id: j,
                        source: 'api',
                        type: pokeInfo.types.map(t => t.type.name).join(', '),
                        img: pokeInfo.sprites.other.dream_world.front_default,
                        attack: pokeInfo.stats[1].base_stat,
                        img: pokeInfo.sprites.other.dream_world.front_default,
                        height: pokeInfo.height,
                        weight: pokeInfo.weight,
                        hp: pokeInfo.stats[0].base_stat,
                        defence: pokeInfo.stats[2].base_stat,
                        speed: pokeInfo.stats[5].base_stat,
                    }
                })
                // j = j + 1;
            }
            api = fetch.next;
        }
        let Pokemons = await Pokemon.findAll();
        res.send(Pokemons);
    }
    catch(error){
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
}

//             BUSCA POR NAME 
 async function GetByName(req, res, next){
    const name = req.query.name;
    if(name){
        try{
            let dbPokemons = await Pokemon.findAll();
            let found =  dbPokemons.find(elem => elem.name == name);
            res.send(found);
        }
        catch(error){
            res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
        }
    }
    else{
        res.send('Error. Nombre no recibido.')
    }
}

//             BUSCA POR ID
async function GetById(req, res, next){
    const id = req.params.id;
    if(id){
        try{
            let dbPokemons = await Pokemon.findAll();
            let found = dbPokemons.find(elem => elem.id == id);
            res.send(found);
        }
        catch(error){
            res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
        }
    }
    else{
        res.send('Error. Id no recibido.')
    }
}

//              POSTEA UN POKEMON EN DATABASE
async function PostPokemon(req, res, next){
    const {
        name,
        source,
        img,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        type
    } = req.body;
    return Pokemon.create(
        {
            name,
            source,
            img,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            type: type.join(', ')
        }
    )
    .then(pokemons => res.send(pokemons))
    .catch(error => next(error))
}

//              BUSCA Y GUARDA EN DATABASE TODOS LOS TYPES
async function GetTypes(req, res){
    try{
        const api = await axios.get('https://pokeapi.co/api/v2/type')
        // var i = 1;
        api.data.results.forEach(element => 
            {
            Type.findOrCreate({
                where: { 
                    name: element.name,
                    // id: i
                }
            })
            // i = i +1;
        })
        const types = await Type.findAll()
        res.send(types);
    } catch (err) {
        res.send(err); 
    }
}

module.exports ={
    GetPokemons,
    GetById,
    GetByName,
    PostPokemon,
    GetTypes, 
};