const express = require('express');
const router = express.Router();
const Modification = require('../models/Modification');
const auth = require('../middleware/auth');

// Get all modifications
router.get('/', async (req, res) => {
  try {
    const modifications = await Modification.find().sort({ name: 1 });
    res.json(modifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new modification (admin only, or for seeding)
router.post('/', auth, async (req, res) => {
  try {
    const mod = new Modification(req.body);
    await mod.save();
    res.status(201).json(mod);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 