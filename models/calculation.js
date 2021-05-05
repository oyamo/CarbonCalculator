const mongoose = require('mongoose');


const calcSchema = mongoose.Schema({
    weight :{type: Number},
    start_zip: {type: Number},
    stop_zip: {type: Number},
    date: { type: Date },
    user_id: { type: String}
})


module.exports = mongoose.model('Calc', calcSchema)