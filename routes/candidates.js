const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

// Create a candidate
router.post('/candidates', candidateController.createCandidate);

// Get all candidates
router.get('/candidates', candidateController.getAllCandidates);

// Get a specific candidate
router.get('/candidates/:id', candidateController.getCandidateById);

// Update a candidate
router.put('/candidates/:id', candidateController.updateCandidate);

// Delete a candidate
router.delete('/candidates/:id', candidateController.deleteCandidate);

module.exports = router;
