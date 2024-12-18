const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    courseId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    videos: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    numberOfRatings: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Pending"
    },
    publisher: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        default: 0
    },
    numberOfBuyers: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model('courses', postSchema);
