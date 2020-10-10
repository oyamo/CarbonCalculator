const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
/* GET home page. */
router.get('/', (req, res) => {
  // This will send the homepage Assets to the user
  res.send({ "msg" : "Hello world" });
});

module.exports = router;
