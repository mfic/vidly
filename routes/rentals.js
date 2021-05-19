const express = require('express');
const router = express.Router();
const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const mongoose = require('mongoose');
const Fawn = require('fawn');

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-rentalDate');
    res.json(rentals);
});

router.get('/:id', async (req, res) => {
    const rentals = await Rental.findById(req.params.id);
    res.json(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).json({ message: 'Invalid customer.' });

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).json({ message: 'Invalid movie.' });

    if (movie.numberInStock === 0) return res.status(400).json({ message: 'Movie not in stock' });

    const rental = new Rental({
        customer: {
            _id: customer.id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie.id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    // Transaction alternative for mongo
    new Fawn.Task()
        .save('rentals', rental)
        .update('update', { _id: movie._id }, {
            $inc: { numberInStock: -1 }
        })
        .run();

    res.status(201).json(rental);
});

module.exports = router;