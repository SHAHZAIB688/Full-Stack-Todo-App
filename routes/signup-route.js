const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')

router.post('/create', async (req,res)=>{
    let {name,fullname,email,password} = req.body
    let user = await userModel.findOne({email})
    if(user) res.status(504).send("User Already Exist...")
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            let createdUser = await userModel.create({
                name,
                fullname,
                email,
                password : hash
            })
            let token = jwt.sign({email},process.env.JWT_SECRET)
            res.cookie('token',token)
            // console.log(createdUser);
            res.redirect('/profile')
            
        });
    });
})




router.get('/',(req,res)=>{
    res.render('signup')
})

module.exports = router