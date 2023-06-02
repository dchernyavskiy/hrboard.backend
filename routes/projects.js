const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Create a project
router.post('/projects', projectController.createProject);

// Get all projects
router.get('/projects', projectController.getAllProjects);

// Get a specific project
router.get('/projects/:id', projectController.getProjectById);

// Update a project
router.put('/projects/:id', projectController.updateProject);

// Delete a project
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;
