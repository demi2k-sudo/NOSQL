const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    state:{
        type:String,
        required:[true,'City is required']
    },
    DOB:{
        type:String
    },
    gender:{
        type:String,
        required:[true,'Gender is required']
    },
    height:{
        type:String,
        required:[true,'Height is required']
    },
    weight:{
        type:String,
        required:[true,'Weight is required']
    },
    blood:{
        type:String,
        required:[true,'Blood Group is required']
    }

})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel;