const express = require('express')
const router = express.Router()
const { findAllUsers, findUserByPk, createUser, updateUser, deleteUser } = require('../Controllers/userControllers')
const { login, protect, restrict, correctUser } = require('../Controllers/authControllers')


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
    .put(protect, correctUser, updateUser)
    .delete(protect, restrict("superadmin"), deleteUser)
module.exports = router