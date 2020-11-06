const Profile = require('../models/profiles/profile');
const User = require('../models/user');
const Validator = require('../utils/validator');

exports.catchAndSave = async (req, res, next)=>{
    const skills = req.body.skills
    const headline = req.body.headline;
    const about = req.body.about;
    const website = req.body.website;
    const facebookProfile = req.body.facebookProfile;
    const linkedinProfile = req.body.linkedinProfile;
    const twitterProfile = req.body.linkedinProfile;
    const resumeURL = req.body.resumeURL;

    let tmpUser = {};
    let caughtErrors = [];
    if(skills != null){
        tmpUser.skills = skills;
    }
    if(headline != null){
        if(Validator.with(headline).hasMinLen(20).hasMaxLen(100).exec()){
            tmpUser.headline = headline;
        }else{
            caughtErrors.push("Headline should be between 20-100 letters");
        }
    }
    if(about != null){
        if(Validator.with(about).hasMinLen(50).hasMaxLen(300).exec()){
            tmpUser.about = about;
        }else{
            caughtErrors.push("About should be between 50-300 letters");
        }
    }
    if(website != null){
        if(Validator.with(website).isUrl(true).exec()){
            tmpUser.website = website;
        }else{
            caughtErrors.push("Not a valid website");
        }
    }
    if(twitterProfile != null){
        if(Validator.with(twitterProfile).isUrl(true).exec()){
            tmpUser.twitterProfile = twitterProfile;
        }else{
            caughtErrors.push("Not a valid Twitter profile");
        }
    }
    if(linkedinProfile != null){
        if(Validator.with(linkedinProfile).isUrl(true).exec()){
            tmpUser.linkedinProfile = linkedinProfile;
        }else{
            caughtErrors.push("Not a valid LinkedIn profile");
        }
    }
    if(facebookProfile != null){
        if(Validator.with(facebookProfile).isUrl().exec()){
            tmpUser.facebookProfile = facebookProfile;
        }else{
            caughtErrors.push("Not a valid Facebook profile");
        }
    }
    if(resumeURL != null){
        if(Validator.with(resumeURL).isUrl().exec()){
            tmpUser.resumeURL = resumeURL;
        }else{
            caughtErrors.push("Not a valid Resume URL");
        }
    }
    console.log("Saving")
    console.log(caughtErrors)
    console.log(tmpUser);
    if(caughtErrors.length < 1){
        if (Object.keys(tmpUser).length > 0){
            next();
        }else{
            next()
        }
    }else{
        req.caughtErrors = caughtErrors;
        next();
    }


}