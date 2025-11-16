const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// GET all
router.get('/', async (req, res) => {
  try {
    const docs = await Doctor.find().sort({ name: 1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add
router.post('/add', async (req, res) => {
  try {
    const newDoc = new Doctor(req.body);
    const saved = await newDoc.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await Doctor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;