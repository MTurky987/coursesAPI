const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    accountHolder: {
        type: String,
        required: true
    },
    cardId: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    purchasedCourses: {
        type: [String],
        required: true
    },
    helpMessage: {
        type: [String], 
        required: true
    },
    rating: {
        type: [[String,Number]], 
        required: true
    },
    publishedCourses:{
        type: [String], 
        required: true
    },
    earnings:{
        type:Number,
        required: true
    },
    isPublisher:{
        type:Boolean,
        default: true
    }
});



module.exports = mongoose.model('users', postSchema);
