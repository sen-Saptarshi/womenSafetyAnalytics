const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: String,
  countOfCrimes: Number,
});

module.exports = mongoose.model("Location", locationSchema);
