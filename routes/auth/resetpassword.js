 const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.get('/sendtoken',async (req, res) => {
   const email = req.query.email || '';
   console.log(email)
   const user = await User.findOne({email: email}).exec();
   if(user != null){
      //Clear the user tokens to force-log-out
      await user.clearToken();
      // Wait till the password is reset
      console.log(user)
      await user.resetTokenSync(email, (err, doc, token)=>{
         //Send an Email
         // The email will be in a HTML edited form
         // noreply.
         console.log(doc)
         console.log("Password reset started")
      });
   }
   return res.status(200)
       .json({message: "Link sent. It will expire after 1 hour."});
});

router.post('/reset/:resetToken',async (req, res) => {
   const resetToken = req.params.resetToken || '';
   const password = req.body.passWord || '';
   const user = await User.findOne({resetToken: resetToken});
   if(user != null){
      user.resetPassword(password, resetToken)
          .then(([ err, is_success ]) =>{
             if (!err) {
                if (!is_success) {
                   console.log(err);
                   res.status(401)
                       .json("Reset denied");
                } else {
                   res.status(200)
                       .json("Reset successful");
                }
             } else {
                res.status(200)
                    .json("Reset successful");
             }
          });
   }else{

      res.status(401)
          .json("Reset denied");
   }

});


module.exports = router