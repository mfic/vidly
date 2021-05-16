const Joi = require('joi');
const Genre = require('../model/genres');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
});

router.post('/', async (req, res) => {

    // Validate incoming request
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    // Construct Object
    let genre = {
        name: req.body.name
    };
    genre = await new Genre(genre).save();

    res.send(genre)

});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the requested id does not exist.');

    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }, { new: true });

    res.send(genre);

});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send('The genre with the requested id does not exist.');

    res.send(genre);
});

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required()
    });

    return schema.validate(genre);
}

module.exports = router;
