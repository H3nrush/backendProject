const express = require('express')
const router = express.Router()
const { findAllUsers, findUserByPk, createUser, updateUser, deleteUser } = require('../Controllers/userControllers')
const { login, protect, restrict, correctUser, restrictToOwnUser } = require('../Controllers/authControllers')
const { User } = require('../dbSetup/sequelizeSetup')


router
    .route('/')
    .get(findAllUsers)
    .post(createUser)

router
    .route('/login')
    .post(login)

router
    .route('/:id')
    .get(findUserByPk)
    .put(protect, restrictToOwnUser(User), updateUser) 
    .delete(protect, restrictToOwnUser(User), deleteUser)
module.exports = router