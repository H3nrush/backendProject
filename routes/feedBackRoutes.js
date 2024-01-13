const express = require('express')
const router = express.Router()
const { findAllFeedBacks , findFeedBacksByPk , createfeedBacks , deletefeedBacks } = require('../Controllers/FeedBacksControllers')
const { protect , restrict } = require('../Controllers/authControllers')

router
    .route('/')
    .get(findAllFeedBacks)
    .post(protect, createfeedBacks)

router
    .route('/:id')
    .get(findFeedBacksByPk)
    .delete(protect, restrict("superadmin"), deletefeedBacks)
module.exports = router 