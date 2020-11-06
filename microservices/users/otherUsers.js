const express = require('express');
const router = express.Router();
const {auth} = require('../../middlewares/auth');
const {findUserByUserName} = require("../../middlewares/userByParam");
router.get('/:username', findUserByUserName, async (req, res)=>{
   const user = req.user;
   if(req.user == null){
       return res.status(404)
           .json({message:"No such user"});
   }else{
       return res.status(200)
           .json(user);
   }
});

module.exports = router;

