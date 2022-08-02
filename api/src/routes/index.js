const { Router } = require('express');
const GenreRouter = require('./Genre.js');
const VideogameRouter = require('./Videogame.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/genres', GenreRouter);
router.use('/videogames', VideogameRouter);

module.exports = router;
