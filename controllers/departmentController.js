const Department = require('../models/Department');
const Location = require('../models/Location');

// Create a department
exports.createDepartment = async (req, res) => {
    try {
        const location = await Location.create(req.body.location);
        req.body.location = location._id;
        req.body.hr = [req.user.userId];
        const department = await Department.create(req.body);
        res.status(201).json(department);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Get all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const {page = 1, pageSize = 12} = req.query;
        const departments = await Department.find({hr: req.user.userId})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .populate('location')
            .populate('manager')
            .populate('employees')
            .populate('projects')
            .populate('jobs');

        const totalPages = Math.ceil(await Department.countDocuments({hr: req.user.userId}) / pageSize);
        res.status(200).json({
            "departments": departments,
            "totalPages": totalPages,
            "isThereNextPage": page < totalPages,
            "isTherePreviousPage": page > 1,
        });
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Get a specific department
exports.getDepartmentById = async (req, res) => {
    try {
        const department = await Department
            .findById(req.params.id)
            .populate('location')
            .populate('manager')
            .populate({
                path: 'employees',
                populate: [
                    {path: 'position'},
                    {path: 'benefits'},
                ]
            })
            .populate('projects')
            .populate('jobs');
        if (!department) {
            return res.status(404).json({error: 'Department not found'});
        }
        res.status(200).json({
            "department": department
        });
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Update a department
exports.updateDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!department) {
            return res.status(404).json({error: 'Department not found'});
        }
        res.status(200).json(department);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.body.departmentId);
        if (!department) {
            return res.status(404).json({error: 'Department not found'});
        }
        res.status(200).json({message: 'Department deleted successfully'});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};
