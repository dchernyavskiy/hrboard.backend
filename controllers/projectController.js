const Project = require('../models/Project');

// Create a project
exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Get a specific project
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate({
                path:'employees',
                populate:[
                    {path: 'benefits'},
                    {path: 'position'},
                ]
            });
        if (!project) {
            return res.status(404).json({error: 'Project not found'});
        }
        res.status(200).json({
            "project":project
        });
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!project) {
            return res.status(404).json({error: 'Project not found'});
        }
        res.status(200).json(project);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({error: 'Project not found'});
        }
        res.status(200).json({message: 'Project deleted successfully'});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};
