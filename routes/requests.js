const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Create a time off request
router.post('/requests', requestController.createRequest);

// Get all time off requests
router.get('/requests', requestController.getAllRequests);

// Get a specific time off request
router.get('/requests/:id', requestController.getRequestById);

// Update a time off request
router.put('/requests/:id', requestController.updateRequest);

// Delete a time off request
router.delete('/requests/:id', requestController.deleteRequest);

module.exports = router;
