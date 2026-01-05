const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.cookie('token',"")
    res.redirect("/")
})

module.exports = router