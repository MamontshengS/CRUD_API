const express = require('express');
const Candidate = require('../db/schema');
const validateCandidate = require('../middlewares/validateCandidate');

const router = express.Router();

router.get('/', async (req, res) => {
  const candidates = await Candidate.find({});
  res.json(employees);
});

const { check, validationResult } = require('express-validator');

// Create a new Candidate
router.post('/', [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid email address'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const Candidate = new Candidate(req.body);
  await candidate.save();
  res.status(201).json(candidate);
});

// Update an existing Candidate
router.put('/:id', [
    check('id').isMongoId().withMessage('Invalid Candidate ID'),
    check('name').notEmpty().withMessage('Name is required'),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { id, name, email } = req.body;
    const updateCandidate = await Candidate.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
    if (!updatedCandidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.json(updatedCandidate);
  });

  // Delete an existing Candidate
router.delete('/:id', async (req, res) => {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.json({ message: 'Candidate deleted successfully' });
  });
module.exports = router;