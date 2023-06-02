const Benefit = require('../models/Benefit');

// Create a benefit
exports.createBenefit = async (req, res) => {
    try {
        const benefit = await Benefit.create(req.body);
        res.status(201).json(benefit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all benefits
exports.getAllBenefits = async (req, res) => {
    try {
        const benefits = await Benefit.find();
        res.status(200).json(benefits);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a specific benefit
exports.getBenefitById = async (req, res) => {
    try {
        const benefit = await Benefit.findById(req.params.id);
        if (!benefit) {
            return res.status(404).json({ error: 'Benefit not found' });
        }
        res.status(200).json(benefit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a benefit
exports.updateBenefit = async (req, res) => {
    try {
        const benefit = await Benefit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!benefit) {
            return res.status(404).json({ error: 'Benefit not found' });
        }
        res.status(200).json(benefit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a benefit
exports.deleteBenefit = async (req, res) => {
    try {
        const benefit = await Benefit.findByIdAndDelete(req.params.id);
        if (!benefit) {
            return res.status(404).json({ error: 'Benefit not found' });
        }
        res.status(200).json({ message: 'Benefit deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
