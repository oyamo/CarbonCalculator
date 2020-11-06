const mongoose = require('mongoose');

const Schema = mongoose.Schema

const profileSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref:'User'
    },
    industry:{
        type: String
    },
    skills: [{
        type: String
    }],
    headline:{
        type: String
    },
    about:{
        type: String
    },
    profilePictures:[{
      type: String
    }],
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
