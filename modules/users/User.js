// 1-import mongoose from 'mongoose';
const mongoose = require('mongoose');
const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
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
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
    blockedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

}, {timestamps: true});

// 3-Create a model
module.exports = User = mongoose.model('user', UserSchema);
