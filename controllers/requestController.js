const Request = require('../models/Request');

// Create a request
exports.createRequest = async (req, res) => {
    try {
        const request = await Request.create(req.body);
        res.status(201).json(request);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Get all requests
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Get a specific request
exports.getRequestById = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) {
            return res.status(404).json({error: 'Request not found'});
        }
        res.status(200).json(request);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Update a request
exports.updateRequest = async (req, res) => {
    try {
        const request = await Request.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!request) {
            return res.status(404).json({error: 'Request not found'});
        }
        res.status(200).json(request);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Delete a request
exports.deleteRequest = async (req, res) => {
    try {
        const request = await Request.findByIdAndDelete(req.params.id);
        if (!request) {
            return res.status(404).json({error: 'Request not found'});
        }
        res.status(200).json({message: 'Request deleted successfully'});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};
