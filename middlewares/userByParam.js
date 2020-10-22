const User = require("../models/user");

exports.findUserByUserName = async function (req, res, next) {
    const userName = req.params.username||'';
    console.log(userName)
    const user = await User.findOne({userName}).exec();
    req.user = user;
    next();
}