const express = require("express");
const jwt = require('jsonwebtoken');
const  User = require('../../models/user')
const router = express.Router();
router.post("/",(req, res) => {

    // Check if all the fields exist;
    //Validate if password matches
    // firstName, lastName, email, password

    const firstName = req.body['firstName'];
    const lastName = req.body['lastName'];
    const password1 = req.body['passWord1'];
    const password2 = req.body['passWord2'];
    const email = req.body['email'];
    // Perfom Validations
    // firstName validation
    // Lets see if first Name is undefined
    if(typeof firstName != "string" || !/.+/.test(lastName)){
        return res.status(400)
            .json({message:'First name cannot be null'})
    }
    // Lets see if second Name is undefined
    if(typeof lastName != "string" || !/.+/.test(lastName)){
        return res.status(400)
            .json({message:'Last name cannot be null'})
    }
    //
    // Lets see if  Password is undefined
    if(typeof password1 != "string" || !/.{8,}/.test(password1)){
        return res.status(400)
            .json({message:'Password must be of the right length'})
    }
    //
    // Lets see if the passwords do match

    if(password1 !== password2){
        return res.status(400)
            .json({message:'Password Passwords must match'})
    }
    //
    const newUser = new User({
        firstName: firstName,
        passWord: password1,
        lastName: lastName,
        email: email
    });
    if(password1 !== password2){
        return res.status(400)
            .json({message: "Passwords do not match"});
    }
    User.findOne({email: email}, (err, user) =>{
        if(user) {
            return res.status(400)
                .json({message: "User already exists"});
        }

        newUser.save((err,doc) =>{
            if(err){
                return res.status(200)
                    .json({success: false});
            }else{
                newUser.generateToken()
                    .then(user=>{
                        return res.status(200)
                            .cookie('auth',user.token,{
                                secure: true,
                                httpOnly: true
                            })
                            .json({
                                isAuth: true,
                                id: user._id,
                                email: user.email
                            })
                    })
                    .catch(err=>{
                        return res.status(400)
                            .json({message: 'Signup failed'})
                    });
            }
        });
    });


});
module.exports = router;