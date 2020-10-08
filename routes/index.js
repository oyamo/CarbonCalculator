const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
/* GET home page. */
router.get('/', (req, res) => {
  res.send({ "msg" : "Hello world" });
});

module.exports = router;
