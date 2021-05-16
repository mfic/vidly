const mongoose = require('mongoose');
const Joi = require('joi');

const rentalsSchema = mongoose.Schema({
    rentalDate: {
        type: Date,
        default: Date.now
    }
});