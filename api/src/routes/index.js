const { Router } = require('express');
var cors = require('cors')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
let {
    GetPokemons,
    GetById,
    GetByName,
    PostPokemon,
    GetAllPokemons, 
    GetFromDB,
    GetMorePokemons,
    GetApiPokemons
} = require('../functions/index')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', GetPokemons); 
router.use('/pokemon/:id', GetById);
router.use('/name', GetByName);
router.use('/post', cors(), PostPokemon);
router.use('/types', GetAllPokemons);
// router.use('/DBPokemons', GetFromDB);
router.use('/morePoke', GetMorePokemons)
// router.use('/APIPoke', GetApiPokemons)


module.exports = router;
