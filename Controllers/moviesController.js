// const { Op } = require('sequelize')
const { UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize')
const { Movies , User, Review, sequelize } = require('../dbSetup/sequelizeSetup')

const findAllMovies = (req, res) => {
    // paramètre optionnel qui permet d'ajouter les données relatives aux commentaires d'un movie
    Movies.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findAllMoviesRawSQL = (req, res) => {
    sequelize.query("SELECT moviesName, rating FROM movies LEFT JOIN reviews ON movies.id = reviews.moviesId", { type: QueryTypes.SELECT })
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findMoviesByPk = (req, res) => {
    Movies.findByPk((parseInt(req.params.id)))
        .then((result) => {
            if (result) {
                res.json({ message: 'a Movies found!.', data: result })
            } else {
                res.status(404).json({ message: `Movies was not found.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'error from server.', data: error.message })
        })
}

const createMovies = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `user was not found.` })
            }
            const newMovies = { ...req.body, UserId: user.id }

            Movies.create(newMovies)
                .then((Movies) => {
                    res.status(201).json({ message: 'the Movies is posted .', data: Movies })
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message })
                    }
                    res.status(500).json({ message: `the Movies was not posted .`, data: error.message })
                })
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const updateMovies = (req, res) => {
    Movies.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.update(req.body)
                    .then(() => {
                        res.status(201).json({ message: 'the Movies details is updated.', data: result })
                    })
            } else {
                res.status(404).json({ message: `the Movies for update is not found.` })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'an error from the server.', data: error.message })
        })
}


const deleteMovies = (req, res) => {
    // A. On vérifie que l'id passé en req.params.id renvoie bien une ligne de notre table.
    Movies.findByPk(req.params.id)
        .then((result) => {
            // B. Si un movie correspond à l'id alors on exécute la méthode destroy()
            if (result) {
                return result.destroy()
                    // C. Si le movie est bien supprimé, on affiche un message avec comme data le movie récupéré dans le .findByPk()
                    .then((result) => {
                        res.json({ mesage: `the Movies is successfully deleted .`, data: result })
                    })
            } else {
                // B Si aucun movie ne correspond à l'id alors on retourne une réponse à POSTMAN
                res.status(404).json({ mesage: `Movies was not found.` })
            }
        })
        .catch((error) => {
            // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
            res.status(500).json({ mesage: `the Movies with given information was not found.`, data: error.message })
        })
}

module.exports = { findAllMovies, findMoviesByPk, createMovies, updateMovies, deleteMovies, findAllMoviesRawSQL}