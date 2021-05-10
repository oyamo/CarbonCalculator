

module.exports = (req, res) => {

    req.user.clearToken(req.token)
    .then(()=>{
        return res.status(200)
        .json({
            status:{status_message:"Success", status_code : 0}});
    })
    .catch(()=>{
        return res.status(400)
        .json({message:"logout error"});
    })
};