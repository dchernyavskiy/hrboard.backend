const Position = require('../models/Position');

// Create a position
exports.createPosition = async (req, res) => {
    try {
        const position = await Position.create(req.body);
        res.status(201).json(position);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Get all positions
exports.getAllPositions = async (req, res) => {
    try {
        const positions = await Position.find();
        res.status(200).json({
            "positions": positions
        });
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Get a specific position
exports.getPositionById = async (req, res) => {
    try {
        const position = await Position.findById(req.params.id);
        if (!position) {
            return res.status(404).json({error: 'Position not found'});
        }
        res.status(200).json(position);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Update a position
exports.updatePosition = async (req, res) => {
    try {
        const position = await Position.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!position) {
            return res.status(404).json({error: 'Position not found'});
        }
        res.status(200).json(position);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Delete a position
exports.deletePosition = async (req, res) => {
    try {
        const position = await Position.findByIdAndDelete(req.params.id);
        if (!position) {
            return res.status(404).json({error: 'Position not found'});
        }
        res.status(200).json({message: 'Position deleted successfully'});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};
