/*
项目入口文件
 */

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()

//配置模板引擎
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/'))

app.use('/node_modules/', express.static('./node_modules'));
app.use('/public/', express.static('./public'));

//配置 body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(router)

app.listen(5000,function () {
    console.log('running at 5000 port')
})

module.export = app