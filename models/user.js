const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    fullname :{
        type : String,
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
    },
    googleId :{
        type : String,
    },
    avatar :{
        type : String,
    },
    todos:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'todo'
        }
    ]
},{timestamps:true})

module.exports = mongoose.model('user', userSchema)