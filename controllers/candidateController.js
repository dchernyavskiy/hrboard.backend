const Candidate = require('../models/Candidate');

// Create a candidate
exports.createCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.create(req.body);
        res.status(201).json(candidate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all candidates
exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a specific candidate
exports.getCandidateById = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a candidate
exports.updateCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a candidate
exports.deleteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
