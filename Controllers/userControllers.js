const { User } = require('../dbSetup/sequelizeSetup')
const { UniqueConstraintError, ValidationError } = require('sequelize')
const bcrypt = require('bcrypt')

const findAllUsers = (req , res)=> {
  User.findAll()
  .then((results) => {
    res.json(results)
  })
  .catch(error => {
    res.status(500).json(error.message)
  })
}

const findUserByPk = (req, res) => {
  User.findByPk((parseInt(req.params.id)))
      .then((result) => {
          if (result) {
              res.json({ message: 'an user finded by given id. ', data: result })
          } else {
              res.status(404).json({ message: `there is not user by given id .` })
          }
      })
      .catch((error) => {
          res.status(500).json({ message: 'error from server.', data: error.message })
      })
}

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
      .then((hash) => {
          User.create({ ...req.body, password: hash })
              .then((user) => {
                  user.password = ""
                  res.status(201).json({ message: `user created!`, data: user })
              })
              .catch((error) => {
                  if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                      return res.status(400).json({ message: error.message })
                  }
                  res.status(500).json({ message: `user did not created!`, data: error.message })
              })
      })
      .catch(error => {
          console.log(error.message)
      })
}


const updateUser = (req, res) => {
  User.findByPk(req.params.id)
      .then((result) => {
          if (result) {
              if (req.body.password) {
                  return bcrypt.hash(req.body.password, 10)
                      .then((hash) => {
                          req.body.password = hash

                          // On empêche l'utilisateur de mettre à jour son username
                          req.body.username = result.username

                          return result.update(req.body)
                              .then(() => {
                                  res.status(201).json({ message: `user updated!`, data: result })
                              })
                      })
              }
          } else {
              res.status(404).json({ message: `there is not use by this information .` })
          }
      })
      .catch(error => {
          if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
              return res.status(400).json({ message: error.message })
          }
          res.status(500).json({ message: `an error from server.`, data: error.message })
      })
}

const deleteUser = (req, res) => {
  User.findByPk(req.params.id)
      .then((result) => {
          if (result) {
              return result.destroy()
                  .then((result) => {
                      res.json({ mesage: `the user is deleted successfully!`, data: result })
                  })
          } else {
              res.status(404).json({ mesage: `user not found.` })
          }
      })
      .catch((error) => {
          res.status(500).json({ mesage: `The request was not successful.`, data: error.message })
      })
}

module.exports = { findAllUsers , findUserByPk , createUser , updateUser , deleteUser }
