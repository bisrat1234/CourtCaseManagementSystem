const express = require('express');
const { Hearing, Case } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all hearings
router.get('/', auth, async (req, res) => {
  try {
    const { date, status, caseId } = req.query;
    const filter = {};

    if (date) filter.date = { $gte: new Date(date), $lt: new Date(date + 'T23:59:59') };
    if (status) filter.status = status;
    if (caseId) filter.case = caseId;

    const hearings = await Hearing.find(filter)
      .populate('case judge')
      .sort({ date: 1 });

    res.json(hearings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create hearing
router.post('/', auth, async (req, res) => {
  try {
    const hearing = new Hearing({
      ...req.body,
      createdBy: req.user.userId
    });

    await hearing.save();
    await hearing.populate('case judge');

    res.status(201).json(hearing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update hearing
router.put('/:id', auth, async (req, res) => {
  try {
    const hearing = await Hearing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('case judge');

    if (!hearing) {
      return res.status(404).json({ message: 'Hearing not found' });
    }

    res.json(hearing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;