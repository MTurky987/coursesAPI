const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
    paymentId: {
        type: Number,
        required: true
    },
    customer: {
        type: String,  
        required: true
    },
    cart_id: {
        type: Number,  
        required: true
    },
    paymentDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Payment', paymentSchema);
