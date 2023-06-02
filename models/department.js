const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    hr: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
