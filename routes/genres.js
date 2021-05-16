const { Genre, validate } = require('../model/genres');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find().sort({ name: 1 });
        res.send(genres);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('There was an error handeling your request.')
    }
});

router.post('/', async (req, res) => {
    try {
        // Validate incoming request
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        // Construct Object
        let genre = {
            name: req.body.name
        };
        genre = await new Genre(genre).save();

        res.send(genre)
    } catch (err) {
        console.error(err.message);
        res.status(400).send('There was an error handeling your request.')
    }
});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send('The genre with the requested id does not exist.');

        res.send(genre);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('There was an error handeling your request.')
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const genre = await Genre.findByIdAndUpdate({ _id: req.params.id }, {
            $set: req.body
        }, { new: true });

        res.send(genre);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('There was an error handeling your request.')
    }

});

router.delete('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if (!genre) return res.status(404).send('The genre with the requested id does not exist.');

        res.send(genre);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('There was an error handeling your request.')
    }
});

module.exports = router;