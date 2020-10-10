const  express = require('express');
const router =express.Router();
const {auth} = require('../../middlewares/auth');

router.get('/logout', auth, (req, res) => {
    req.user.clearToken(req.token)
        .then(()=>{
           return res.status(200)
                .json({success: true});
        })
        .catch(()=>{
            return res.status(400)
                .json({message:"logout error"});
        })
});

module.exports = router;