const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String},
    hireDate: {type: Date},
    department: {type: mongoose.Schema.Types.ObjectId, ref: 'Department'},
    position: {type: mongoose.Schema.Types.ObjectId, ref: 'Position'},
    salary: {type: Number},
    address: {type: String},
    birthDate: {type: Date},
    benefits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Benefit'}],
    timeOffRequests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Request'}],
    feedbacks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Feedback'}]
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

