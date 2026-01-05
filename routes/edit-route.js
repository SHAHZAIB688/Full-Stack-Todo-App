const express = require('express')
const router = express.Router()
const postModel = require('../models/todos')
const isLoggedIn = require('../middlewares/isLoggedIn')

router.get('/:id', isLoggedIn , async (req,res)=>{
    let todo = await postModel.findById({_id : req.params.id})
    
    res.render('edit',{todo})
})


module.exports = router