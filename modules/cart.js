const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    customer: {
        type: String, 
        required: true
    },
    courses: {
        type: [String],  
        required: true
    }
});

module.exports = mongoose.model('cart', cartSchema);
