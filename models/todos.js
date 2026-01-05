const mongoose = require('mongoose')

let todoSchema = mongoose.Schema({
    todo_title : {
        type : String,
        required : true
    },
    status :{
        type : Boolean,
        default : false
    },
    user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }  
},{timestamps : true})

module.exports = mongoose.model('todo', todoSchema)