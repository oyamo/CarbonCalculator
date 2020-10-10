const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const workSchema = new Schema({
    profileId: {
        type: String,
        required: true
    },
    workTitle: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyId:{
        type: String
    },
    workDescription: {
        type: String
    },

});