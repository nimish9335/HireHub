const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    fullname:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    phoneNumber:{
        type:Number,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["candidate","recruiter","admin"],
        required:true
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("User",userSchema);