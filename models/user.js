const mongoose = require('mongoose');
const _ = require('lodash');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const config = require('config')
const jwt = require('jsonwebtoken');

const complexityOptions = {
    min: 8,
    max: 26,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateToken = function () {
    const token = jwt.sign(_.pick(this, ['_id', 'name', 'isAdmin']), config.jwtPrivateKey);
    return token;
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(3).max(255).email(),
        password: new passwordComplexity(complexityOptions)
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;