const express = require('express')
const router = express.Router()
const postModel = require('../models/todos')
const isLoggedIn = require('../middlewares/isLoggedIn')

router.post('/:id', isLoggedIn , async (req,res)=>{
    let { todo_title  } = req.body
    let todo = await postModel.findOneAndUpdate({_id : req.params.id},{todo_title},{new:true})
    res.redirect('/profile')
})


module.exports = router