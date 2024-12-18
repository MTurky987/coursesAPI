const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
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
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    helpMessages: {
        type: [String], 
        default: []
    },
    pendingCourses: {
        type: [String],  
        default: []
    }
});

module.exports = mongoose.model('admin', adminSchema);
