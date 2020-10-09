const mongoose = require('mongoose');

const Schema = mongoose.Schema

const profileSchema = new Schema({
    userId: {
        index:true,
        type: String
    },
    industry:{
        type: String
    },
    skills: {
        type: Array
    },
    profilePictures:{
      type: Array
    },
    featuredProfilePic :{
        type: String
    },
    coverPhoto:{
        type: String,
    },
    resumeURL:{
        type: String,
        trim: true
    },
    website:{
        type: String,
        trim: true
    },
    linkedinProfile:{
        type: String,
        trim: true
    },
    twitterProfile:{
        type: String,
        trim: true
    },
    facebookProfile:{
        type: String,
        trim: true
    },
    profileViews:{
        type: Number
    },
    profileLikes:{
        type: Number
    }

});

module.exports = mongoose.model("Profile",profileSchema);
