const { Router} = require('express');
const axios = require('axios');
const {Genre} = require('../db.js')
const router = Router();
const {API_KEY} = process.env;


router.post('/init', async(req, res, next) => {
    try {
        let genapi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        let gendb = await Genre.findAll()
        if (!gendb.length){
        genapi.data.results.map((genres) => {
        let nombre = genres.name;
        Genre.create({name: nombre});        
    });} 
    res.json('Generos agregados correctamente') 
    } catch (error) {
        next(error)
    }
   
}),


router.get('/', async(req, res, next) => {
    try {
        let genapi = await Genre.findAll();
        console.log(genapi.length)
    res.json(genapi)
    } catch (error) {
        next(error)
    }           
} );

// router.post('/', async(req, res, next) => {
//     try {
//         const newGenre = await Genre.create(req.body);
//         res.status(201).json(newGenre)
//     } catch (error) {
//         next(error)
//     } 
// } );

// router.put('/:id', async(req, res, next) => {
//     try {
//         const { id } = req.params;
//         const response = await Genre.update(req.body,{ where: {id}});
//         console.log(`confirmacion ${response}`)
//         res.status(201).json(response)
//     } catch (error) {
//         next(error)
//     }
// } );

// router.delete('/:id', async(req, res, next) => {
//     const { id } = req.params;  
//     try {
//         const genre = await Genre.findAll({where: {id}});
//         await Genre.destroy({where: {id}});
//         res.status(200).json(genre.length>0? `El genero ${genre[0].name} fue eliminado con exito` : "Genero no encontrado")
//     } catch (error) {
//         next(error)
//     } 
// } )

module.exports = router;
