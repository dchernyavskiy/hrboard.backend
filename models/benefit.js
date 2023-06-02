const mongoose = require("mongoose");

const benefitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String }
});

const Benefit = mongoose.model("Benefit", benefitSchema);

module.exports = Benefit;
