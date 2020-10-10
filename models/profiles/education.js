const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const educationSchema = new Schema({
   profileId: {
        type: String
   },
    educationLevel:{
       type: String
    },
    schoolName:{
        type: String
    },
    monthStarted:{ // Month
       type: String
    },
    monthGraduated:{
      type: String
    },
    monthGraduating:{
       type: String
    },
    yearStarted: {
       type: Number,
    },
    yearGraduated:{
       type: Number
    },
    yearGraduating:{
      type: Number
    }

});