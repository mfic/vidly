const auth = require('../middlewares/auth');
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const config = require('config')

router.get('/', auth, async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/:id', auth, async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');

    res.send(user);
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).send('User not found');

    res.send(user);
});

router.post('/', async (req, res) => {
    // Validate incoming request
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // Check if user exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User aleady exists.');

    // Generate user model
    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    // hash password
    user.password = await bcrypt.hash(user.password, config.saltRounds);

    await user.save();

    res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;