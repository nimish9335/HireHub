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
        required:true,
        select:false
    },

    role:{
        type:String,
        enum:["candidate","recruiter","admin"],
        required:true
    },

    profile:{
        bio:{
            type:String,
            default:""
        },

        skills:[{
            type:String
        }],

        resume:{
            type:String,
            default:""
        },

        resumeOriginalName:{
            type:String,
            default:""
        },

        profilePhoto:{
            type:String,
            default:""
        }
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("User",userSchema);