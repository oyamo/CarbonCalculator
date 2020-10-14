const express = require('express');
const router = express.Router();
const {auth} = require('../../middlewares/auth')

/**
 * You are able to view sensitive information
 */
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

/**
 * Searching for users using different parameters
 */
router.get('/search', (req, res)=>{
    res.json({req});
});
/**
 *
 */
router.get('/:username',(req, res)=>{
    const username = req.params.username;
    res.json({ username })
});



/**
 * Only run once
 */
router.post('/', auth, (req, res) =>{
    res.json({});
});

/**
 * Can be run several times as possible
 */
router.patch('/', auth, (req, res)=>{
    res.json({})
});

module.exports = router;