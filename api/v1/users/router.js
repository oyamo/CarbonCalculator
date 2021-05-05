const express = require("express")
const newUserHandler = require('./../users/newUser')
const router = express.Router()

router.post('/new', newUserHandler)

module.exports = router