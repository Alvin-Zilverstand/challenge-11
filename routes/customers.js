const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');

// Get all customers
router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find().sort({ name: 1 });
    res.json(customers);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get single customer
router.get('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create customer
router.post('/', auth, async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update customer
router.put('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    Object.keys(req.body).forEach(key => {
      customer[key] = req.body[key];
    });

    await customer.save();
    res.json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add modification to customer
router.put('/:id/modifications', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.modifications.push(req.body);
    await customer.save();
    res.json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete customer
router.delete('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.remove();
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router; 