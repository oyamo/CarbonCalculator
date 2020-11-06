const express = require('express')
const User = require('../../models/user');
const router = express.Router()

router.post('/', (req, res) => {

    // get the password and email from the body of the request
    const passWord = req.body.passWord || '';
    const email = req.body.email || '';
    const userName = req.body.userName || '';
    // Let Us see if the user has logged in
    User.findOne( {$or: [{email},{userName}] }, (err, user) => {
        if (!user) {
            return res.status(401)
                .json({message: "User does not exist"})
        } else {
            user.attemptLogin(passWord)
                .then(matched => {
                    if (!matched) {
                        // Password incorrect
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