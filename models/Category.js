// 1- import mongoose from 'mongoose';
const mongoose = require('mongoose');

// 2- Create a schema
// utilisateur qui a cree la categorie
//
// title

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

// 3 - compile model
module.exports = Category = mongoose.model('Category', CategorySchema);
