const User = require('../../../models/user');

function Login (req, res) {
    // get the password and email from the body of the request
    const passWord = req.body.password || '';
    const email = req.body.email || '';
    // Let Us see if the user.js has logged in
    const response = {
        status: {
            status_code: 0,
            status_message: "Success"
        }
    }
    User.findOne({$or: [{email}]}, (err, user) => {
        if (!user) {
            response.status.status_code = 127;
            response.status.status_message = "User does not exist"
            return res.json(response)

        } else {
            user.attemptLogin(passWord).
                then(matched => {
                    if (!matched) {
                        // Password incorrect
                        response.status.status_code = 127;
                        response.status.status_message = "Passwords incorrect";
                        return res.json(response)
                    } else {
                        user.generateToken().
                            then(user => {
                                response.data = {
                                    authorization: user.Authorization,
                                    email: user.email,
                                    firstName: user.firstName,
                                    lastName: user.lastName
                                }

                                return res.json(response)
                            }).
                            catch(err => {
                                console.log(err);

                            });
                    }
                }).
                catch(err => {
                    console.log(err)
                });
            // When we reach here it means the user.js has successfully logged in

        }
    })
}



module.exports = Login