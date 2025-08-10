const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','employer'],
        default:'student'
    },
    image:{
        type:String,
        default:''
    },
    bio:{
        type:String,
        default:''
    },
    education:{
        type:String,
        default:''
    },
    skills:{
        type:String,
        default:""
    },
    experience:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:''
    },
    resume:{
        type:String,
        default:''
    },
    location:{
        type:String,
        default:''
    },

},{timestamps:true});

module.exports = mongoose.model('User',userSchema);