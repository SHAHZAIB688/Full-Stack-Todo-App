const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn')
const postModel = require('../models/todos')
const userModel = require('../models/user')
router.post('/create',isLoggedIn, async (req,res)=>{
    let user = await userModel.findById(req.user.id)
    let { title } = req.body
    let createdTodo = await postModel.create({
        todo_title : title,
        user : user._id
    })
    user.todos.push(createdTodo._id)
    await user.save()
    res.redirect('/profile')
})

router.get('/',isLoggedIn, async (req,res)=>{
    let user = await userModel.findById(req.user.id).populate('todos')
    res.render("profile",{user})
})

module.exports = router