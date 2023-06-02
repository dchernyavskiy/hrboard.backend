const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Create a department
router.post('/departments', departmentController.createDepartment);

// Get all departments
router.get('/departments', departmentController.getAllDepartments);

// Get a specific department
router.get('/departments/:id', departmentController.getDepartmentById);

// Update a department
router.put('/departments', departmentController.updateDepartment);

// Delete a department
router.delete('/departments', departmentController.deleteDepartment);

module.exports = router;
