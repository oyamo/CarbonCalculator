const express = require("express")
const Login = require("../../../api/v1/auth/login")

const router = express.Router()


router.post('/login', Login)
