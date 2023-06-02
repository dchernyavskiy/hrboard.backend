const express = require('express');
const router = express.Router();
const benefitController = require('../controllers/benefitController');

// Create a benefit
router.post('/benefits', benefitController.createBenefit);

// Get all benefits
router.get('/benefits', benefitController.getAllBenefits);

// Get a specific benefit
router.get('/benefits/:id', benefitController.getBenefitById);

// Update a benefit
router.put('/benefits/:id', benefitController.updateBenefit);

// Delete a benefit
router.delete('/benefits/:id', benefitController.deleteBenefit);

// Give benefit to an employee
//router.post('/benefits/give', benefitController.giveBenefit);

module.exports = router;


