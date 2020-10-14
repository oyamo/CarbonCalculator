const express = require('express')
const User = require('../../models/user');
const router = express.Router()

router.post('/', (req, res) => {
    let token = req.cookies.auth;

    // get the password from the body of the request
    const passWord = req.body.passWord;
    const email = req.body.email;
    // Let Us see if the user has logged in

    if (token != null) {
        User.findByToken(token)
            .then(user => {
                if (user !== null) {
                    // lets not allow this because the user might try to spy the token patterns of our site
                    return res.status(400)
                        .json({message: "user already logged in"})
                }
            })
            .catch(err=>{
                console.log(err);
            });
    }
    /*
    * The user has not yet logged in, so lets log him in*/
    User.findOne({email: email}, (err, user) => {
        if (!user) {
            return res.status(401)
                .json({message: "User does not exist"})
        } else {
            user.attemptLogin(passWord)
                .then(matched => {
                    if (!matched) {
                        return res.status(401)
                            .json({message: "Passwords incorrect"});
                    }else{
                        user.generateToken()
                            .then(user => {
                                return res.status(200)
                                    .cookie('auth', user.token, {
                                        secure: true,
                                        httpOnly: true
                                    })
                                    .json({
                                        isAuth: true,
                                        id: user._id,
                                        email: user.email,
                                        firstName: user.firstName,
                                        lastName: user.lastName
                                    })
                            })
                            .catch(err => {
                                console.log(err);

                            });
                    }
                })
                .catch(err => {
                    console.log(err)
                });
            // When we reach here it means the user has successfully logged in

        }
    })


});

module.exports = router