const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Create an employee
router.post('/employees', employeeController.createEmployee);

// Get all employees
router.get('/employees', employeeController.getAllEmployees);

// Get a specific employee
router.get('/employees/:id', employeeController.getEmployeeById);

// Update an employee
router.put('/employees', employeeController.updateEmployee);

// Delete an employee
router.delete('/employees', employeeController.deleteEmployee);

module.exports = router;
