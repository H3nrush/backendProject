const express = require('express')
const router = express.Router()
const { findAllSeries , findSeriesByPk , createSeries , updateSeries , deleteSeries , findAllSeriesRawSQL} = require('../Controllers/seriesController');
const { protect, restrictToOwnUser } = require('../Controllers/authControllers')
const { Series } = require('../dbSetup/sequelizeSetup')

router
    .route('/')
    .get(findAllSeries)
    .post(protect, createSeries)
    
router
    .route('/rawsql')
    .get(findAllSeriesRawSQL)

router
    .route('/:id')
    .get(findSeriesByPk)
    .put(protect, restrictToOwnUser(Series), updateSeries)
    .delete(protect, restrictToOwnUser(Series), deleteSeries)
    
module.exports = router