const mongoose = require("mongoose");
const policeSchema = new mongoose.Schema({
  name: String,
  unique_id: String,
  station: String,
  password: String,
});

module.exports = mongoose.model("Police", policeSchema);
