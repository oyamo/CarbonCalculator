const User = require('../models/user');

let auth = (req, res, next) => {
    let token = req.header("Authorization");

    token = token.replace("Bearer ", "");

    User.findByToken(token)
        .then(user => {
            if (!user) return res.status(401)
                .json({message: 'Token not verified' })
            req.token = token;
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err.message);
            return res.status(401)
                .send({'message':'Token invalid or has expired'});
        })
}

module.exports = { auth }