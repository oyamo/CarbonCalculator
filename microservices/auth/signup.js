const express = require("express");
const jwt = require('jsonwebtoken');
const  User = require('../../models/user')
const Validator = require('../../utils/validator');
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
    const userName = req.body['userName'];
    const telephone = req.body['telephone'];

    // Perfom Validations
    // firstName validation
    // Lets see if first Name is undefined
    const errors = [];
    if(typeof firstName != "string" ||
        !Validator
        .with(firstName)
        .hasMinLen(2)
        .hasMaxLen(100)
        .isOnlyLetters()
        .exec()

    ){
        errors.push("First name format invalid");
    }
    // Lets see if second Name is undefined
    if(typeof lastName != "string" ||
        !Validator
        .with(lastName)
        .hasMinLen(2)
        .hasMaxLen(100)
        .isOnlyLetters()
        .exec()
    ){
        errors.push("Last name format invalid");
    }


    // Validate password
    if(typeof password1 != "string" ||
        !Validator
        .with(password1)
        .hasMinLen(8)
        .hasMaxLen(100)
        .exec()
    ){
        errors.push("Password is very weak");
    }

    // Validate username
    if (typeof userName != "string") {
        errors.push("Username is required");
    }
    if (!(Validator.with(userName).
            hasMinLen(2).
            hasMaxLen(100).
            exec()
    )) {
        errors.push("Username must have a minimum length of 2 and maximum of 100");
    }
    if(!/^[a-zA-Z][a-zA-Z_0-9-.]+$/.test(userName)){
        errors.push("Username begins with a letter and must only have letters numbers or -,_ and . symbols");
    }

    // Validate telephone
    if(
        !Validator.with(telephone).isTelephone().exec()
    ){
        errors.push("Telephone format invalid");
    }


    // Lets see if the passwords do match
    if(password1 !== password2){
        errors.push("Passwords do not match");
    }

    // Send a response if there is an error
    if(errors.length > 0){
        return res.status(400)
        .json({message: "Registration failed", errors});
    }

    User.findOne({ $or : [ { email }, { userName }, { telephone }]}, (err, user) =>{
        if(user) {
            const tempUser = {};
            tempUser['email'] = user.email;
            tempUser['userName'] = user.userName;
            tempUser['telephone'] = user.telephone;

            const filtered = Object.keys(tempUser).filter(v=>
                v === "email" && user[v] === email ||
                v === "userName" && user[v] === userName ||
                v === "telephone" && user[v] === telephone
            );

            errors.push(`User already exists with the same ${[...filtered]}`);

            return res.status(400)
                .json({message: "Registration failed", errors});
        }
        const newUser = new User({
            firstName,
            passWord: password1,
            lastName,
            email,
            userName,
            telephone
        });
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