/*
路由文件
 */

const express = require('express')
const Category = require('./models/category')
const Info = require('./models/info')
const User = require('./models/user')
const router = express.Router()

const myDate = new Date()

router.get('/', (req, res) => {
    res.render('./home/home.html')
})

//查询所有 category 并渲染
router.get('/category', (req, res) => {
    Category.find()
        .then((data) => res.render('./category/category.html', {category: data}))
        .catch(err => console.log(err))
})

//根据_id 删除 category
router.get('/category/delete', (req, res) => {
    const id = req.query.id.replace(/"/g, '')
    Category.findByIdAndRemove(id)
        .then(res.redirect('/category'))
        .catch(err => console.log(err))
})

//新增栏目
router.post('/category/new', (req, res) => {
    new Category(req.body).save()
        .then(res.redirect('/category'))
        .catch(err => console.log(err))
})

//根据 _id 批量删除栏目
router.post('/category/deletes', (req, res) => {
    const ids = req.body
    const arr = []

    for (let i in ids) {
        arr.push(ids[i])
    }
    Category.deleteMany({_id: {$in: arr}})
        .then(res.redirect('/category'))
})

//根据 _id 渲染编辑页面
router.get('/category/edit', (req, res) => {
    const id = req.query.id.replace(/"/g, '')
    Category.findById(id, (req, data) => {
        res.render('./category/edit.html', {edit: data})
    })
})

//更新编辑栏目
router.post('/category/edit', (req, res) => {
    const _id = req.body._id.replace(/"/g, '')
    const {id, name, comment} = req.body
    Category.findByIdAndUpdate(_id, {id, name, comment}, function (err) {
        if (err) {
            console.log('err')
        } else {
            res.redirect('/category')
        }
    })
})

//资讯管理
router.get('/info', (req, res) => {
    const arr = []
    let categoryName
    const category = req.query.id
    Category.find(function (err, data) {
        if (err) {
            throw err
        } else {
            data.map(item => arr.push(item.name))
            categoryName = Array.from(new Set(arr))
            if (!category) {
                Info.find(function (err, data) {
                    res.render('./info/info.html', {info: data, categoryName, category: "选择栏目"})
                })
            } else {
                Info.find({category}, function (err, data) {
                    res.render('./info/info.html', {info: data, categoryName, category})
                })
            }
        }
    })
})

//新增资讯
router.post('/info/new', (req, res) => {
    const comments = req.body
    comments.dateTime = myDate.toLocaleString()
    new Info(comments).save((err) => {
        if (err) {
            throw err
        } else {
            res.redirect('/info')
        }
    })
})

//删除资讯
router.get('/info/delete', (req, res) => {
    const id = req.query.id.replace(/"/g, '')
    Info.findByIdAndRemove(id)
        .then(res.redirect('/info'))
        .catch(err => console.log(err))
})

//根据 _id 渲染编辑页面
router.get('/info/edit', (req, res) => {
    const id = req.query.id.replace(/"/g, '')
    const arr = []
    let categoryName
    const category = req.query.id
    Category.find(function (err, data) {
        if (err) {
            throw err
        } else {
            data.map(item => arr.push(item.name))
            categoryName = Array.from(new Set(arr))
            Info.findById(id, (req, data) => {
                res.render('./info/edit.html', {edit: data, categoryName, category})
            })
        }
    })
})

//更新资讯
router.post('/info/edit', (req, res) => {
    const _id = req.body._id.replace(/"/g, '')
    const dateTime = myDate.toLocaleString()
    const {title, category, arrange, author, article} = req.body
    Info.findByIdAndUpdate(_id, {title, category, arrange, author, article, dateTime}, function (err) {
        if (err) {
            console.log('err')
        } else {
            res.redirect('/info')
        }
    })
})

//根据 id 批量删除资讯
router.post('/info/deletes', (req, res) => {
    const ids = req.body
    const arr = []
    for (let i in ids) {
        arr.push(ids[i])
    }
    console.log(arr)
    Info.deleteMany({_id: {$in: arr}})
        .then(res.redirect('/info'))
})

//用户管理
router.get('/user', (req, res) => {
    User.find()
        .then(data => res.render('./user/user.html', {users: data}))
        .catch(err => console.log(err))
})

//新增用户
router.post('/user/new', (req, res) => {
    const created_time = myDate.toLocaleString()
    const {nickname, password, username, email,} = req.body
    const user = {nickname, password, username, email, created_time}
    new User(user).save((err) => {
        if (err) {
            res.status(500).json({
                err_code: 500,
                message: 'Internal error'
            })
        } else {
            res.status(200).json({
                err_code: 0,
                message: 'ok'
            })
        }
    })
    console.log(user)
})

module.exports = router

// const cate = {
//     "nickname" : "lil",
//     "username" : "tsj",
//     "password" : "199791",
//     "email":"1035409298@qq.com",
// }
// const data = new User(cate)
// data.save(function (err) {
//     if (err){
//         console.log('err')
//     }
// })