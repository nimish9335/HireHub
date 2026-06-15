const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    requirements:[{
        type:String
    }],

    salary:{
        type:Number,
        required:true
    },

    location:{
        type:String,
        required:true
    },

    jobType:{
        type:String,
        enum:["Full Time","Part Time","Internship","Remote"],
        default:"Full Time"
    },

    experienceLevel:{
        type:Number,
        default:0
    },

    position:{
        type:Number,
        default:1
    },

    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Job",jobSchema);