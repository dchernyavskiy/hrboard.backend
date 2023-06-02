const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    department: {type: mongoose.Schema.Types.ObjectId, ref: 'Department'},
    candidates: [{type: mongoose.Schema.Types.ObjectId, ref: 'Candidate'}]
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
