// 1-import mongoose from 'mongoose';
const mongoose = require('mongoose');

// 2-Create a schema
const UserSchema = new mongoose.Schema({
    fistName: {
        type: String,
        required: [true, 'Please add a name']
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Please add an email']
    },
    image: {
        type: String,
        default: 'no-photo.jpg',
        required: [true, 'Please add an image']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    active: {
        type: Boolean,
        default: true

    },
    isBlocked: {
        type: Boolean,
        default: false

    },
    role: {
        type: String,
        enum: ['Guest', 'User', 'Admin'],
        default: 'User'
    },
    numberArticles: {
        type: Number,
        default: 0
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],

}, {timestamps: true});

// 3-Create a model
module.exports = User = mongoose.model('user', UserSchema);


