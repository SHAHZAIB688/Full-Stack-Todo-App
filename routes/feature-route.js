const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn')

router.get('/', isLoggedIn , async (req,res)=>{
    res.render('feature')
})


module.exports = router