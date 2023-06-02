const express = require('express');
const router = express.Router();
const positionController = require('../controllers/positionController');

// Create a position
router.post('/positions', positionController.createPosition);

// Get all positions
router.get('/positions', positionController.getAllPositions);

// Get a specific position
router.get('/positions/:id', positionController.getPositionById);

// Update a position
router.put('/positions/:id', positionController.updatePosition);

// Delete a position
router.delete('/positions/:id', positionController.deletePosition);

module.exports = router;
