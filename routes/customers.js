const { Customer, validate } = require('../model/customer');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const customer = await Customer.find().sort('name');
        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('There was an error handeling your request.')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send('Customer not found');
        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('There was an error handeling your request.')
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        const customer = req.body;
        await new Customer(customer).save();

        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('There was an error handeling your request.')
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const customer = await Customer.findByIdAndUpdate({ _id: req.params.id }, {
            $set: req.body
        }, { new: true });

        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('There was an error handeling your request.')
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).send('The customer with the requested id does not exist.');

        res.send(customer);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('There was an error handeling your request.')
    }
});

module.exports = router;