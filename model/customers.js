const mongoose = require('mongoose');
const Joi = require('joi');

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


function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(3).max(255).required()
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;