const express = require('express');
const router = express.Router();
const { Genre } = require('../model/genre');
const { Movie, validate } = require('../model/movie');

router.get("/", async (req, res) => {
    const movies = await Movie.find().sort({ title: 1 });
    res.json(movies);
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) res.status(404).json({ message: 'The movie with the given id could not be found.' });
        res.json(movie);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: 'There was an error handeling your request.' })
    }
});

router.post('/', async (req, res) => {
    try {
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

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: 'There was an error handeling your request.' })
    }
});

router.put('/:id', async (req, res) => {
    try {
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
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: 'There was an error handeling your request.' })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        movie = await Movie.findByIdAndRemove(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: 'There was an error handeling your request.' })
    }
});

module.exports = router;