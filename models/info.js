const mongoose = require('mongoose')
//连接mongodb
mongoose.connect('mongodb://localhost/viewinfo', {useNewUrlParser: true})

const Schema = mongoose.Schema

const infoSchema = new Schema({
    title:{//文章标题
        type:String,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    arrange:{
        type:String,
        required:true
    },
    author:{
        type:String
    },
    article:{
        type:String
    },
    dateTime:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Info',infoSchema)