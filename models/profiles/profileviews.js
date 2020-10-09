/**
 * This model is a schema for recording the profile view clicks
 * @type {Mongoose}
 * @author Oyamo Brian
 * @company HirePipu Inc
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema

const profileViewSchema = new Schema({
    viewerUserId :{
        type: String
    },
    profileViewedUID: {
        type: String
    },
    dateViewed: {
        type: Date
    }
});

mongoose.exports = mongoose.model("ProfileViews", profileViewSchema);