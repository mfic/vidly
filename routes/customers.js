const Customer = require('../model/customers');
const Joi = require('joi');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name');
    res.json(customer);
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) res.status(404).send('Customer not found');
    res.json(customer);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) res.status(400).send(error.details[0].message)

    let customer = req.body;
    customer = await new Customer(customer).save();

    res.json(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }, { new: true });

    res.json(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send('The customer with the requested id does not exist.');

    res.send(customer);
});

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(3).max(255).required()
    });
    return schema.validate(customer);
}

module.exports = router;