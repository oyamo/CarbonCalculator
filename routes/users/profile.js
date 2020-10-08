const express = require('express');
const router = express.Router();
const {auth} = require('../../middlewares/auth')
router.get('/', auth, (req, res) => {
    return res.status(200)
        .json({
            isAuthenticated: true,
            id: req.user._id,
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName
        })
});

module.exports = router;