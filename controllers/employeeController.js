const Employee = require('../models/Employee');
const Department = require('../models/Department');
const Position = require('../models/Position');
const mongoose = require("mongoose");

// Create an employee
exports.createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        if (employee.department) {
            await Department.updateOne(
                {_id: employee.department},
                {$push: {employees: employee._id}}
            )
        }
        if (employee.position) {
            await Position.updateOne(
                {_id: employee.position},
                {$push: {employees: employee._id}}
            )
        }

        res.status(201).json(employee);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Get all employees
// exports.getAllEmployees = async (req, res) => {
//     try {
//         const {page = 1, pageSize = 12} = req.query;
//         const employees = await Department.aggregate([
//             {
//                 $match: {
//                     hr: {$in: [new mongoose.Types.ObjectId(req.user.userId)]},
//                 },
//             },
//             {
//                 $lookup: {
//                     from: 'employees',
//                     localField: 'employees',
//                     foreignField: '_id',
//                     as: 'demployees'
//                 },
//             },
//             {
//                 $unwind: '$demployees',
//             },
//             {
//                 $project: {
//                     _id: '$demployees._id',
//                     firstName: '$demployees.firstName',
//                     lastName: '$demployees.lastName',
//                     email: '$demployees.email',
//                     phoneNumber: '$demployees.phoneNumber',
//                     hireDate: '$demployees.hireDate',
//                     department: '$demployees.department',
//                     position: '$demployees.position',
//                     salary: '$demployees.salary',
//                     address: '$demployees.address',
//                     birthDate: '$demployees.birthDate',
//                     benefits: '$demployees.benefits',
//                     timeOffRequests: '$demployees.timeOffRequests',
//                     feedbacks: '$demployees.feedbacks',
//                 }
//             },
//             {
//                 $skip: parseInt((page - 1) * pageSize)
//             },
//             {
//                 $limit: parseInt(pageSize)
//             }
//         ])
//
//         await Employee.populate(employees, {
//             path: 'department',
//         });
//         await Employee.populate(employees, {
//             path: 'position',
//         });
//         await Employee.populate(employees, {
//             path: 'benefits',
//         });
//         await Employee.populate(employees, {
//             path: 'timeOffRequests',
//         });
//         await Employee.populate(employees, {
//             path: 'feedbacks',
//         });
//         const count = await Department.aggregate([
//             {
//                 $match: {
//                     hr: {$in: [new mongoose.Types.ObjectId(req.user.userId)]},
//                 },
//             },
//             {
//                 $lookup: {
//                     from: 'employees',
//                     localField: 'employees',
//                     foreignField: '_id',
//                     as: 'demployees'
//                 },
//             },
//             {
//                 $unwind: '$demployees',
//             },
//             {
//                 $project: {
//                     _id: '$demployees._id',
//                     firstName: '$demployees.firstName',
//                     lastName: '$demployees.lastName',
//                     email: '$demployees.email',
//                     phoneNumber: '$demployees.phoneNumber',
//                     hireDate: '$demployees.hireDate',
//                     department: '$demployees.department',
//                     position: '$demployees.position',
//                     salary: '$demployees.salary',
//                     address: '$demployees.address',
//                     birthDate: '$demployees.birthDate',
//                     benefits: '$demployees.benefits',
//                     timeOffRequests: '$demployees.timeOffRequests',
//                     feedbacks: '$demployees.feedbacks',
//                 }
//             },
//             {
//                 $count: "tcount"
//             }
//         ])
//         const totalPages = Math.ceil(count[0].tcount / pageSize);
//         res.status(200).json({
//             "employees": employees,
//             "totalPages": totalPages,
//             "isThereNextPage": page < totalPages,
//             "isTherePreviousPage": page > 1,
//         });
//     } catch (err) {
//         res.status(400).json({error: err.message});
//     }
// };

exports.getAllEmployees = async (req, res) => {
    try {
        const {page = 1, pageSize = 12} = req.query;

        const pipeline = [
            {
                $match: {
                    hr: {$in: [new mongoose.Types.ObjectId(req.user.userId)]},
                },
            },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'employees',
                    foreignField: '_id',
                    as: 'demployees',
                },
            },
            {
                $unwind: '$demployees',
            },
            {
                $lookup: {
                    from: 'departments',
                    localField: 'demployees.department',
                    foreignField: '_id',
                    as: 'department',
                },
            },
            {
                $lookup: {
                    from: 'positions',
                    localField: 'demployees.position',
                    foreignField: '_id',
                    as: 'position',
                },
            },
            {
                $lookup: {
                    from: 'benefits',
                    localField: 'demployees.benefits',
                    foreignField: '_id',
                    as: 'benefits',
                },
            },
            {
                $lookup: {
                    from: 'requests',
                    localField: 'demployees.timeOffRequests',
                    foreignField: '_id',
                    as: 'timeOffRequests',
                },
            },
            {
                $lookup: {
                    from: 'feedbacks',
                    localField: 'demployees.feedbacks',
                    foreignField: '_id',
                    as: 'feedbacks',
                },
            },
            {
                $project: {
                    _id: '$demployees._id',
                    firstName: '$demployees.firstName',
                    lastName: '$demployees.lastName',
                    email: '$demployees.email',
                    phoneNumber: '$demployees.phoneNumber',
                    hireDate: '$demployees.hireDate',
                    department: {$arrayElemAt: ['$department', 0]},
                    position: {$arrayElemAt: ['$position', 0]},
                    salary: '$demployees.salary',
                    address: '$demployees.address',
                    birthDate: '$demployees.birthDate',
                    benefits: '$benefits',
                    timeOffRequests: '$timeOffRequests',
                    feedbacks: '$feedbacks',
                },
            },
        ];

        const [employees, countResult] = await Promise.all([
            Department.aggregate(pipeline)
                .skip(parseInt((page - 1) * pageSize))
                .limit(parseInt(pageSize)),
            Department.aggregate([
                ...pipeline,
                {
                    $count: 'tcount',
                },
            ]),
        ]);

        const count = countResult[0]?.tcount || 0;
        const totalPages = Math.ceil(count / pageSize);

        res.status(200).json({
            employees,
            totalPages,
            isThereNextPage: page < totalPages,
            isTherePreviousPage: page > 1,
        });
    } catch (err) {

        res.status(400).json({error: err.message});
    }
};


// Get a specific employee
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
            .populate('department')
            .populate('position')
            .populate({
                path: 'feedbacks',
                populate: [
                    {path: 'reviewer'},
                ]
            })
            .populate('timeOffRequests')
            .populate('benefits');
        if (!employee) {
            return res.status(404).json({error: 'Department not found'});
        }
        res.status(200).json({
            "employee": employee
        });
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.body._id, req.body, {new: true});
        if (!employee) {
            return res.status(404).json({error: 'Employee not found'});
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.body.employeeId);
        if (!employee) {
            return res.status(404).json({error: 'Employee not found'});
        }
        res.status(200).json({message: 'Employee deleted successfully'});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};
