const User = require('../models/user');

let auth = (req, res, next) => {
    let token = req.header("Authorization") || '';

    if (token.length === 0) {
        return res.status(403).json(
            {
                status: {
                    status_code : 403,
                    message:"Token not found",
                    status_message: `Unauthorised`
                }
            }
        )
    }

    token = token.replace("Bearer ", "");


    User.findByJWTToken(token)
        .then(user => {
            if (!user) {
                return res.status(403).json(
                    {
                        status: {
                            status_code : 403,
                            message:"Token not found",
                            status_message: `Unauthorised`
                        }
                    }
                )
            } else {
                req.token = token;
                req.user = user;
                next();
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(401)
                .send({'message':'Token invalid or has expired'});
        })
}

module.exports = { auth }