const express = require('express')
const router = express.Router()
const postModel = require('../models/todos')
const isLoggedIn = require('../middlewares/isLoggedIn')

router.get('/:id', isLoggedIn , async (req,res)=>{
    let todo = await postModel.findOneAndDelete({_id : req.params.id})
    res.redirect('/profile')
})


module.exports = router