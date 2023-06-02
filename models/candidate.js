const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
