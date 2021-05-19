const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genre');
const { Movie, validate } = require('../models/movie');

router.get("/", async (req, res) => {
    const movies = await Movie.find().sort({ title: 1 });
    res.json(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'The movie with the given id could not be found.' });
    res.json(movie);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).json({ message: 'Invalid genre.' });

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre.id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();
    res.status(201).json(movie);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).json({ message: 'Invalid genre.' });

    let movie = {
        title: req.body.title,
        genre: {
            _id: genre.id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    };

    movie = await Movie.findByIdAndUpdate({ _id: req.params.id }, {
        $set: movie
    }, { new: true });

    res.status(200).json(movie);
});

router.delete('/:id', async (req, res) => {
    movie = await Movie.findByIdAndRemove(req.params.id);
    res.status(200).json(movie);
});

module.exports = router;