const express = require('express');
const Employee = require('../db/schema');
const validateEmployee = require('../middlewares/validateEmployee');

const router = express.Router();

router.get('/', async (req, res) => {
  const employees = await Employee.find({});
  res.json(employees);
});

const { check, validationResult } = require('express-validator');

// Create a new employee
router.post('/', [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid email address'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json(employee);
});

// Update an existing employee
router.put('/:id', [
    check('id').isMongoId().withMessage('Invalid employee ID'),
    check('name').notEmpty().withMessage('Name is required'),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { id, name, email } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(updatedEmployee);
  });

  // Delete an existing employee
router.delete('/:id', async (req, res) => {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  });
module.exports = router;