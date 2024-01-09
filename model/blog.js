const mongoose = require('mongoose')
const CommentSchema = require('./comments')

const BlogSchema = new mongoose.Schema ({

    title: {
        type: String,
        required: [true, 'Please provide a title'],
        minlength: 3,
        maxlength: 500,
    },
    description: {
        type: String,
        required: [true, 'Please insert a description'],
        minlength: 3,
        maxlength: 200, // Adjusted for example purposes
    },
    photoUrl: {
        type: String,
        required: [true, 'Please insert a photo'],
        maxlength: 255, // Adjusted for example purposes
    },
    category: {
        type: [String],
        required: [true, 'Please insert a category'],
        minlength: 3,
        maxlength: 50,
    },
    author: {
        type: String,
        required: [true, 'Please insert an author'],
        minlength: 3,
        maxlength: 50,
    },
    content: {
        type: String,
        required: [true, 'Blog Post Cannot be Empty'],
        minlength: 6,
    
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide User']
    },
    comments:[{
        type: String || mongoose.Types.ObjectId,
        ref:'Comment'
    }],
   
    
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
