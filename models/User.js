const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "manager", "team-lead", "engineer"],
    default: "admin"
  }
});

module.exports = mongoose.model("User", userSchema);
