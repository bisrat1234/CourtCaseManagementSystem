const express = require('express');
const { Case, Party, User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all cases
router.get('/', auth, async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (type) filter.caseType = type;

    // Role-based filtering
    if (req.user.role === 'judge') {
      filter.judge = req.user.userId;
    }

    const cases = await Case.find(filter)
      .populate('plaintiff defendant judge clerk')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Case.countDocuments(filter);

    res.json({
      cases,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get case by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const case_ = await Case.findById(req.params.id)
      .populate('plaintiff defendant judge clerk documents');

    if (!case_) {
      return res.status(404).json({ message: 'Case not found' });
    }

    res.json(case_);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new case
router.post('/', auth, async (req, res) => {
  try {
    const {
      title,
      caseType,
      description,
      plaintiff,
      defendant,
      priority = 'medium'
    } = req.body;

    // Create parties
    const plaintiffParty = new Party(plaintiff);
    const defendantParty = new Party(defendant);
    
    await plaintiffParty.save();
    await defendantParty.save();

    // Generate case number
    const year = new Date().getFullYear();
    const count = await Case.countDocuments() + 1;
    const caseNumber = `EGH-${year}-${count.toString().padStart(3, '0')}`;

    const newCase = new Case({
      caseNumber,
      title,
      caseType,
      description,
      plaintiff: plaintiffParty._id,
      defendant: defendantParty._id,
      clerk: req.user.userId,
      priority
    });

    await newCase.save();
    await newCase.populate('plaintiff defendant clerk');

    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update case
router.put('/:id', auth, async (req, res) => {
  try {
    const case_ = await Case.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('plaintiff defendant judge clerk');

    if (!case_) {
      return res.status(404).json({ message: 'Case not found' });
    }

    res.json(case_);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign judge to case
router.patch('/:id/assign-judge', auth, async (req, res) => {
  try {
    const { judgeId } = req.body;

    const case_ = await Case.findByIdAndUpdate(
      req.params.id,
      { judge: judgeId, status: 'in-progress' },
      { new: true }
    ).populate('plaintiff defendant judge clerk');

    res.json(case_);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;