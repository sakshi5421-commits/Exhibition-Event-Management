const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: String,
  product: String,
  stall: String,
  status: String
});

module.exports = mongoose.model("Application", applicationSchema);