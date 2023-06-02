const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    country: { type: String, required: true },
    region: { type: String },
    city: { type: String, required: true },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
