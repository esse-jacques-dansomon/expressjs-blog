// 1 - impost mongoose from 'mongoose';
const mongoose = require('mongoose');

// 2 - Create a schema
const ArticleSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: [true, 'Please add a titre'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    interactions: [{
        type: Number,
        default: 0
    }],
    likes: [{
        type: Number,
        default: 0
    }],
    dislikes: [{
        type: Number,
        default: 0
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        default: 'no-photo.jpg',
        required: [true, 'Please add an image']
    }
}, {timestamps: true});

// 3 - Export the model
module.exports = Article = mongoose.model('Article', ArticleSchema);


