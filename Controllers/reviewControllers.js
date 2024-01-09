const { ValidationError } = require('sequelize')
const { Review, User } = require('../dbSetup/sequelizeSetup')

const findAllReviews = (req, res) => {
    Review.findAll({ include: User })
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}
const findAllReview = (req, res) => {
    const movieId = req.params.movieId; // Assuming movieId is part of the route parameters

    Review.findAll({
        where: { MovieId: movieId },
        include: User,
        order: [['createdAt', 'DESC']] // Order by createdAt in descending order
    })
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
};

const findReviewByPk = (req, res) => {
    return res.json({ message: `find by pk`})
}

const createReview = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `user not found.` })
            }
            return Review.create({ ...req.body, UserId: user.id })
                .then(result => {
                    res.json({ message: `comment is created .`, data: result })
                })
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: error.message })
        })
}

const updateReview = (req, res) => {
    Review.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.update(req.body)
                    .then(() => {
                        res.status(201).json({ message: 'commented.', data: result })
                    })
            } else {
                res.status(404).json({ message: `comment was not found.` })
            }
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'an error from server.', data: error.message })
        })
}

const deleteReview = (req, res) => {
    Review.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.destroy()
                    .then((result) => {
                        res.json({ mesage: `comment is deleted .!`, data: result })
                    })
            } else {
                res.status(404).json({ mesage: `comment was not found.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ mesage: `did not find the information .`, data: error.message })
        })
}

module.exports = { findAllReviews, findReviewByPk, createReview, updateReview, deleteReview, findAllReview }