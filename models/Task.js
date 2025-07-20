const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: String,
  assignedTo: String, 
  status: {
    type: String,
    enum: ["Pending", "In-Progress", "Completed"],
    default: "Pending"
  }
});

module.exports = mongoose.model("Task", taskSchema);
