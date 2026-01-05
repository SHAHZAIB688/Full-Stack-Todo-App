const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

router.post('/create', async (req,res)=>{
    let {email,password} = req.body
    let user = await userModel.findOne({email})
    if(!user) res.status(504).send("User Not Found")
    bcrypt.compare(password, user.password, async function(err, result) {
        if(result){
            let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET)
            res.cookie('token',token)
            res.redirect('/profile')
        }else{
            res.send('Incorrect Password')
        }
              
    });
})

router.get('/',(req,res)=>{
    res.render('login')
})

module.exports = router