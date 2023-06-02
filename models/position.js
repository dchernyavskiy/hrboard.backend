const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    responsibilities: { type: String },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }]
});

const Position = mongoose.model("Position", positionSchema);

module.exports = Position;
