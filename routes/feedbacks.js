const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Create a performance review (feedback)
router.post('/feedbacks', feedbackController.createFeedback);

// Get all performance reviews (feedbacks)
router.get('/feedbacks', feedbackController.getAllFeedbacks);

// Get a specific performance review (feedback)
router.get('/feedbacks/:id', feedbackController.getFeedbackById);

// Update a performance review (feedback)
router.put('/feedbacks/:id', feedbackController.updateFeedback);

// Delete a performance review (feedback)
router.delete('/feedbacks/:id', feedbackController.deleteFeedback);

module.exports = router;
