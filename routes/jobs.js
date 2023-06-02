const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Create a job
router.post('/jobs', jobController.createJob);

// Get all jobs
router.get('/jobs', jobController.getAllJobs);

// Get a specific job
router.get('/jobs/:id', jobController.getJobById);

// Update a job
router.put('/jobs/', jobController.updateJob);

// Delete a job
router.delete('/jobs/', jobController.deleteJob);

module.exports = router;
