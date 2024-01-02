// const { Op } = require('sequelize')
const { UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize')
const { Series , User, Review, sequelize } = require('../dbSetup/sequelizeSetup')

const findAllSeries = (req, res) => {
    // paramètre optionnel qui permet d'ajouter les données relatives aux commentaires d'un coworking
    Series.findAll({ include: [Review, User] })
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findAllSeriesRawSQL = (req, res) => {
    sequelize.query("SELECT seriesName, rating FROM Series LEFT JOIN reviews ON Series.id = reviews.SeriesId", { type: QueryTypes.SELECT })
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findSeriesByPk = (req, res) => {
    Series.findByPk((parseInt(req.params.id)))
        .then((result) => {
            if (result) {
                res.json({ message: 'a series found!.', data: result })
            } else {
                res.status(404).json({ message: `series was not found.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'error from server.', data: error.message })
        })
}

const createSeries = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `user was not found.` })
            }
            const newSeries = { ...req.body, UserId: user.id }

            Series.create(newSeries)
                .then((Series) => {
                    res.status(201).json({ message: 'the series is posted .', data: series })
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message })
                    }
                    res.status(500).json({ message: `the series was not posted .`, data: error.message })
                })
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const updateSeries = (req, res) => {
    Series.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.update(req.body)
                    .then(() => {
                        res.status(201).json({ message: 'the series details is updated.', data: result })
                    })
            } else {
                res.status(404).json({ message: `the series for update is not found.` })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'an error from the server.', data: error.message })
        })
}


const deleteSeries = (req, res) => {
    // A. On vérifie que l'id passé en req.params.id renvoie bien une ligne de notre table.
    Series.findByPk(req.params.id)
        .then((result) => {
            // B. Si un coworking correspond à l'id alors on exécute la méthode destroy()
            if (result) {
                return result.destroy()
                    // C. Si le coworking est bien supprimé, on affiche un message avec comme data le coworking récupéré dans le .findByPk()
                    .then((result) => {
                        res.json({ mesage: `the series is successfully deleted .`, data: result })
                    })
            } else {
                // B Si aucun coworking ne correspond à l'id alors on retourne une réponse à POSTMAN
                res.status(404).json({ mesage: `series was not found.` })
            }
        })
        .catch((error) => {
            // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
            res.status(500).json({ mesage: `the series with given information was not found.`, data: error.message })
        })
}

module.exports = { findAllSeries, findSeriesByPk, createSeries, updateSeries, deleteSeries, findAllSeriesRawSQL}