const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, required: true },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
