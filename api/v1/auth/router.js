const express = require("express")
const Login = require("../../../api/v1/auth/login")
const Logout = require("../../../api/v1/auth/logout")
const {auth} = require('../../../middlewares/auth');

const router = express.Router()


router.post('/login', Login)
router.get('/logout',auth, Logout)

module.exports = router