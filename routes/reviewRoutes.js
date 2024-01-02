const express = require('express')
const router = express.Router()
const { findAllReviews, findReviewByPk, createReview, updateReview, deleteReview } = require('../Controllers/reviewControllers')
const { protect, restrictToOwnUser } = require('../Controllers/authControllers')
const { Review } = require('../dbSetup/sequelizeSetup')

router
    .route('/')
    .get(findAllReviews)
    .post(protect, createReview)

router
    .route('/:id')
    .get(findReviewByPk)
    .put(protect, restrictToOwnUser(Review), updateReview)
    .delete(protect, restrictToOwnUser(Review), deleteReview)

module.exports = router 