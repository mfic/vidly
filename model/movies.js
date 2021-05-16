const mongoose = require('mongoose');
const { genreSchema } = require('./genres')
const Joi = require('joi');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        trim: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        trim: true,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        trim: true,
        required: true,
        min: 0,
        max: 255
    }
}));

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    });

    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;