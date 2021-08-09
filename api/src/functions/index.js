const axios = require('axios');
const {Type} = require('../db');
const {Pokemon} = require('../db')


//            TRAE 12 POKEMONS PARA HOME
async function GetPokemons(req, res){
    let pokemons = [];
    let api = 'https://pokeapi.co/api/v2/pokemon';
    const fetch = (await axios.get(api)).data;
    for(let i=0; i<12; i++){
        let pokeInfo = (await axios.get(fetch.results[i].url)).data;
        var pokemon = {
            name: fetch.results[i].name,
            id: pokeInfo.id,
            type: pokeInfo.types.map(t => t.type.name).join(', '),
            source: 'api',
            img: pokeInfo.sprites.other.dream_world.front_default,
        }
        pokemons = pokemons.concat(pokemon);
    }
    res.send(pokemons);
}

//            TRAE 40 POKEMONS DE LA API Y CONCATENA LOS DE DATABASE
async function GetMorePokemons(req, res){
    let pokemons = [];
    let dbPokemons = await Pokemon.findAll()
    let jsonPoke = dbPokemons.map((J) => J.toJSON())
    jsonPoke.forEach(elem => {
    elem.source = "Created" ,
    pokemons = pokemons.concat(elem)
    });

    let api = 'https://pokeapi.co/api/v2/pokemon';
    for(let j = 0; j < 2; j++){
        const fetch = (await axios.get(api)).data;
        for(let i=0; i<fetch.results.length; i++){
            let pokeInfo = (await axios.get(fetch.results[i].url)).data;
            var pokemon = {
                name: fetch.results[i].name,
                id: pokeInfo.id,
                type: pokeInfo.types.map(t => t.type.name).join(', '),
                source: 'api',
                attack: pokeInfo.stats[1].base_stat,
                img: pokeInfo.sprites.other.dream_world.front_default,
            }
            pokemons = pokemons.concat(pokemon);
        }
        api = fetch.next
    }
    res.send(pokemons);
}

async function GetApiPokemons(req, res){
    let pokemons = [];
    let api = 'https://pokeapi.co/api/v2/pokemon';
    for(let j = 0; j < 2; j++){
        const fetch = (await axios.get(api)).data;
        for(let i=0; i<fetch.results.length; i++){
            let pokeInfo = (await axios.get(fetch.results[i].url)).data;
            var pokemon = {
                name: fetch.results[i].name,
                id: pokeInfo.id,
                type: pokeInfo.types.map(t => t.type.name).join(', '),
                source: 'api',
                img: pokeInfo.sprites.other.dream_world.front_default,
            }
            pokemons = pokemons.concat(pokemon);
        }
        api = fetch.next
    }
    res.send(pokemons);
}

//             BUSCA POR ID EN API 
// async function GetById(req, res){
//     // if(id && source === 'api')

//     let id = req.params.id;
//     let fetch = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
//     let pokemon = {
//         type: fetch.types.map(t => t.type.name).join(', '),
//         name: fetch.name,
//         img: fetch.sprites.other.dream_world.front_default,
//         id: fetch.id,
//         height: fetch.height,
//         weight: fetch.weight,
//         hp: fetch.stats[0].base_stat,
//         attack: fetch.stats[1].base_stat,
//         defense: fetch.stats[2].base_stat,
//         speed: fetch.stats[5].base_stat,
//         source: 'api'
//     }
//     res.send(pokemon);
// }

//             BUSCA POR NAME SOLO EN API
 async function GetByName(req, res, next){
    let name = req.query.name;
    let fetch = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data;
    let pokemon = {
        type: fetch.types.map(t => t.type.name).join(', '),
        name: fetch.name,
        img: fetch.sprites.other.dream_world.front_default,
        id: fetch.id,
        height: fetch.height,
        weight: fetch.weight,
        hp: fetch.stats[0].base_stat,
        atack: fetch.stats[1].base_stat,
        defense: fetch.stats[2].base_stat,
        speed: fetch.stats[5].base_stat
    }
    res.send(pokemon);
}

//              POSTEA UN POKEMON EN DATABASE
async function PostPokemon(req, res, next){
    // FUNCIONA 
    // const newpokemon = req.body.newpokemon;
    // return Pokemon.create(newpokemon)
    // .then(pokemons => res.send(pokemons))
    // .catch(error => next(error))
    const {
        id,
        name,
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
            id,
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
async function GetAllPokemons(req, res){
    try{
        const api = await axios.get('https://pokeapi.co/api/v2/type')
        var i = 1;
        api.data.results.forEach(element => 
            {
            Type.findOrCreate({
                where: { name: element.name,
                id: i}
            })
            i = i +1;
        })
        const types = await Type.findAll()
        res.send(types);
    } catch (err) {
        res.send(err); 
    }
}

async function GetById(req, res, next){
    let id = req.params.id;
    let pokemons = [];
    let dbPokemons = await Pokemon.findAll()
      let jsonPoke = dbPokemons.map((J) => J.toJSON())
      jsonPoke.forEach(elem => {
        elem.source = "Created" ,
        pokemons = pokemons.concat(elem)
      });

    let api = 'https://pokeapi.co/api/v2/pokemon';
    for(let j = 0; j < 2; j++){
        const fetch = (await axios.get(api)).data;
        for(let i=0; i<fetch.results.length; i++){
            let pokeInfo = (await axios.get(fetch.results[i].url)).data;
            var pokemon = {
                name: fetch.results[i].name,
                id: pokeInfo.id,
                type: pokeInfo.types.map(t => t.type.name).join(', '),
                source: 'api',
                attack: pokeInfo.stats[1].base_stat,
                img: pokeInfo.sprites.other.dream_world.front_default,
                height: pokeInfo.height,
                weight: pokeInfo.weight,
                hp: pokeInfo.stats[0].base_stat,
                defense: pokeInfo.stats[2].base_stat,
                speed: pokeInfo.stats[5].base_stat,
            }
            pokemons = pokemons.concat(pokemon);
        }
        api = fetch.next
    }
    for(let t = 0; t < pokemons.length; t++){
        if(pokemons[t].id == id){
            res.send(pokemons[t]);
        }
    }
}

async function GetFromDB(req, res){
    let arr = [];
    let dbPokemons = await Pokemon.findAll()
      let jsonPoke = dbPokemons.map((J) => J.toJSON())
      jsonPoke.forEach(C => {
        C.source = "Created" 
      });
      arr = arr.concat(jsonPoke)
      res.send(arr)
}

module.exports ={
    GetPokemons,
    GetById,
    GetByName,
    PostPokemon,
    GetAllPokemons, 
    GetFromDB ,
    GetApiPokemons, 
    GetMorePokemons
};