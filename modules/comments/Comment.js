// 1 - import mongoose from 'mongoose';
const mongoose = require('mongoose');

// 2 - Create a schema
const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please add a content']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }
}, {timestamps: true});

// 3 - Export the model
module.exports = Comment = mongoose.model('Comment', CommentSchema);
