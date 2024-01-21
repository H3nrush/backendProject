const express = require('express')
const router = express.Router()
const { findAllMovies , findMoviesByPk , createMovies , updateMovies , deleteMovies , findAllMoviesRawSQL} = require('../Controllers/moviesController');
const { protect, restrictToOwnUser } = require('../Controllers/authControllers')
const { Movies } = require('../dbSetup/sequelizeSetup')

router
    .route('/')
    .get(findAllMovies)
    .post(protect, createMovies)
    
router
    .route('/rawsql')
    .get(findAllMoviesRawSQL)

router
    .route('/:id')
    .get(findMoviesByPk) 
    .put(protect, restrictToOwnUser(Movies), updateMovies)
    .delete(protect, restrictToOwnUser(Movies), deleteMovies)
    
module.exports = router