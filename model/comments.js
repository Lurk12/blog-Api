const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    name:{
        type:String,
        min: 1,
        max:50
    },
    comment:{
        type : String,
        min:1, 
        max: 250,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Comment', CommentSchema);