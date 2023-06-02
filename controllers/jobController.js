const Job = require('../models/Job');
const Department = require('../models/Department');
const mongoose = require("mongoose");
// Create a job
exports.createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);
        await Department.updateOne({_id: job.department}, {$push: {jobs: job._id}});
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

exports.getAllJobs = async (req, res) => {
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
                    from: "jobs",
                    localField: "jobs",
                    foreignField: "_id",
                    as: "djobs",
                },
            },
            {
                $unwind: "$djobs",
            },
            {
                $lookup: {
                    from: "departments",
                    localField: "djobs.department",
                    foreignField: "_id",
                    as: "department",
                },
            },
            {
                $lookup: {
                    from: "candidates",
                    localField: "djobs.candidates",
                    foreignField: "_id",
                    as: "candidates",
                },
            },
            {
                $lookup: {
                    from: "locations",
                    localField: "department.location",
                    foreignField: "_id",
                    as: "location",
                },
            },
            {
                $project: {
                    _id: "$djobs._id",
                    title: "$djobs.title",
                    department: {
                        $let: {
                            vars: {
                                departmentObj: {
                                    $arrayElemAt: ["$department", 0],
                                },
                                locationObj: {
                                    $arrayElemAt: ["$location", 0],
                                },
                            },
                            in: {
                                $mergeObjects: [
                                    "$$departmentObj",
                                    {location: "$$locationObj"},
                                ],
                            },
                        },
                    },
                    description: "$djobs.description",
                    candidates: "$candidates",
                },
            },
        ];

        const [jobs, countResult] = await Promise.all([
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
            jobs,
            totalPages,
            isThereNextPage: page < totalPages,
            isTherePreviousPage: page > 1,
        });
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Get a specific job
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('candidates')
            .populate({
                path: 'department',
                populate: [
                    {path: 'location'}
                ]
            });
        if (!job) {
            return res.status(404).json({error: 'Department not found'});
        }
        res.status(200).json({
            "job": job
        });
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Update a job
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!job) {
            return res.status(404).json({error: 'Job not found'});
        }
        res.status(200).json(job);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Delete a job
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.body.jobId);
        if (!job) {
            return res.status(404).json({error: 'Job not found'});
        }
        res.status(200).json({message: 'Job deleted successfully'});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};
