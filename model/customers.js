const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        tring: true,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        minlength: 3,
        maxlength: 255,
        tring: true,
        required: true
    }
}));

module.exports = Customer;