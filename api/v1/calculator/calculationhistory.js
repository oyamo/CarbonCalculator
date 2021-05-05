const Calculation  = require('../../../models/calculation')

function get_history(req, res, next) {
    Calculation.find({user_id: req.user._id.toString()}, (err, docs) => {
        res.json({
            status:{
                status_message: "Success",
                status_code: 0
            },
            data: docs,
            length: docs.length
        })
    })
}

module.exports = get_history