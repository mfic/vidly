const { Genre, validate } = require('../models/genre');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const validateObjectId = require('../middlewares/validateObjectId');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
});

router.post('/', auth, async (req, res) => {

    // Validate incoming request
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // Construct Object
    let genre = {
        name: req.body.name
    };
    genre = await new Genre(genre).save();

    res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {

    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the requested id does not exist.');

    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }, { new: true });

    res.send(genre);

});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send('The genre with the requested id does not exist.');

    res.send(genre);
});

module.exports = router;
