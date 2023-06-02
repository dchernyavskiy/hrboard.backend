const Location = require('../models/Location');

// Create a location
exports.createLocation = async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.status(201).json(location);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all locations
exports.getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a specific location
exports.getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.status(200).json(location);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a location
exports.updateLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.status(200).json(location);
    } catch (err) {
        res.status(400).json({ error:
            err.message });
    }
};

// Delete a location
exports.deleteLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

