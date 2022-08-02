const { Router } = require('express');
const axios = require('axios');
const {Op} = require('sequelize')
const {Videogame, Genre} = require('../db.js');
const router = Router();
const {API_KEY} = process.env;

router.get('/:id', async(req, res, next) => {
    const {id} = req.params; 
    try {
        if (id.length < 10) {
            let gameapi= await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);    
            gamedatail= {
                name: gameapi.data.name, 
                background_image: gameapi.data.background_image,
                rating: gameapi.data.rating,
                genres: gameapi.data.genres,
                released: gameapi.data.released,
                platforms: gameapi.data.platforms,
                description_raw: gameapi.data.description_raw  
            }
            res.status(200).json(!gameapi.data.length? gamedatail : "Videogame no encontrado")  
       } else {
            let gamedb = await Videogame.findByPk(id, {include: Genre})
            res.status(200).json(gamedb? gamedb : "Videogame no encontrado")
        }             
    } catch (error) {
        next(error)
    }         
} );

router.get('/', async(req, res, next) => {
    const {name} = req.query;
    try {
        if (name){
            let gamedb = await Videogame.findAll({ where: { name:{[Op.iLike]:`%${name}%`}}, include:[{model: Genre}]});
            let gameapi =await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);
            let results =gameapi.data.results
            let gam = results.map((games)=>{
                return {
                    id: games.id,
                    name: games.name, 
                    background_image: games.background_image,
                    rating: games.rating,
                    genres: games.genres,
                }
            })             
            let gameres = gamedb.concat(gam);           
            let game = gameres.slice(0,105);
            console.log(gameres.length)
            console.log(game.length)
            res.status(200).json(game.length>0? game : "No hay videogames creados");
            }else {
            let gamedb = await Videogame.findAll({ include: [{model: Genre}]}); 
            let results = [];           
            for (let i = 1; i < 7; i++) {
                let gameapi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
                results = results.concat(gameapi.data.results);
            }
            let gam = results.map((games)=>{
                return {
                    id: games.id,
                    name: games.name, 
                    background_image: games.background_image,
                    rating: games.rating,
                    genres: games.genres,
                }
            })  
            let gameres = gamedb.concat(gam);           
            let game = gameres.slice(0,105);
            console.log(gameres.length)
            console.log(game.length)
            res.status(200).json(game.length>0? game : "No hay videogames creados");    
    }} catch (error) {
        next(error)
    }        
} );

router.post('/', async(req, res, next) => {
    try {
        const newGame = await Videogame.create(req.body);
        res.status(201).json(newGame)
    } catch (error) {
        next(error)
    }    
} );

router.post('/genre/:id', async(req, res, next) => {
    const {id} = req.params;
    const {id1} = req.body;
    console.log(id1) 
    try {
        const game = await Videogame.findByPk(id)
        for (let i = 0; i < id1.length; i++) {
            game.addGenre(id1[i])            
        }        
        res.status(201).json('videojuego agregado con exito')
    } catch (error) {
        next(error)
    }    
} );

// router.put('/:id', async (req, res, next) => {
//     try {
//     const { id } = req.params;
//     const response = await Videogame.update(req.body,{ where: {id}});
//     res.status(201).json(`Juegos modificados ${response}`)
// } catch (error) {
//     next(error)
// }
// } );

// router.delete('/:id', async (req, res, next) => {
//     const { id } = req.params;  
//     try {
//         const games = await Videogame.findAll({where: {id}});
//         await Videogame.destroy({where: {id}});
//         res.status(200).json(games.length>0? `El videogames ${games[0].name} fue eliminado con exito` : "Videogames no encontrado")
//     } catch (error) {
//         next(error)
//     } 
// } )

module.exports = router;