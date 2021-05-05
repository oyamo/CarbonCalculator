const express = require('express')
const router = express.Router()
const Calculate = require("../../../api/v1/calculator/calculate")
const {auth} = require('../../../middlewares/auth')
const CalculationHistory = require("../../../api/v1/calculator/calculationhistory")
const CalculationReport = require("../../../api/v1/calculator/report")

router.get("/history",auth, CalculationHistory)
router.post("/calculate",auth, Calculate)
router.get('/report',auth, CalculationReport)

module.exports = router