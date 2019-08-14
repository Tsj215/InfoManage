const mongoose = require('mongoose')
//连接 mongoodb
mongoose.connect('mongodb://localhost/viewinfo', {useNewUrlParser: true})

const Schema = mongoose.Schema

const categorySchema = new Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required: true
    },
    comment:{
        type:String,
        required:true
    },
    no:{
        type:String,
        required:false
    },
    parrent:{
        type:Object,
        required:false
    }
})

module.exports = mongoose.model('Category',categorySchema)