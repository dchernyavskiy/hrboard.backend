const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Create a location
router.post('/locations', locationController.createLocation);

// Get all locations
router.get('/locations', locationController.getAllLocations);

// Get a specific location
router.get('/locations/:id', locationController.getLocationById);

// Update a location
router.put('/locations/:id', locationController.updateLocation);

// Delete a location
router.delete('/locations/:id', locationController.deleteLocation);

module.exports = router;
