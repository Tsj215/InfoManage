const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/viewinfo',{useNewUrlParser:true});

const Schema = mongoose.Schema

const userSchema = new Schema({
    nickname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    created_time: {
        type:String,
        default:Date.now
    },
    avatar: {
        type:String,
    },
    checked:{
        type:String,
    }
})

module.exports = mongoose.model('User',userSchema)