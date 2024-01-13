const { ValidationError } = require('sequelize')
const { feedBacks, User } = require('../dbSetup/sequelizeSetup')

const findAllFeedBacks = (req, res) => {
    feedBacks.findAll({ include: User })
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}
const findFeedBacksByPk = (req, res) => {
    const userId = req.params.UserId; // Assuming UserId is part of the route parameters

    feedBacks.findAll({
        where: { UserId: userId },
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

const createfeedBacks = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `user not found.` })
            }
            return feedBacks.create({ ...req.body, UserId: user.id })
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

const deletefeedBacks = (req, res) => {
  // A. On vérifie que l'id passé en req.params.id renvoie bien une ligne de notre table.
  feedBacks.findByPk(req.params.id)
      .then((result) => {
          // B. Si un coworking correspond à l'id alors on exécute la méthode destroy()
          if (result) {
              return result.destroy()
                  // C. Si le coworking est bien supprimé, on affiche un message avec comme data le coworking récupéré dans le .findByPk()
                  .then((result) => {
                      res.json({ mesage: `the feedBacks is successfully deleted .`, data: result })
                  })
          } else {
              // B Si aucun coworking ne correspond à l'id alors on retourne une réponse à POSTMAN
              res.status(404).json({ mesage: `feedBacks was not found.` })
          }
      })
      .catch((error) => {
          // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
          res.status(500).json({ mesage: `the feedBacks with given information was not found.`, data: error.message })
      })
}


module.exports = { findAllFeedBacks, findFeedBacksByPk, createfeedBacks , deletefeedBacks }