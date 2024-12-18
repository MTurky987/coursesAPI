const mongoose = require('mongoose');


const helpSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    customer: {
        type: String,  
        required: true
    },
    message: {
        type: String,
        required: true
    },
    responseMessage: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "Pending"
    },
    timestamp: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('help', helpSchema);
