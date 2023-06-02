const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    date: { type: Date },
    rating: { type: Number },
    comment: { type: String }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
