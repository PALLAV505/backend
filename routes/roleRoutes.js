const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect, adminOnly } = require("../middlewares/authMiddleware");


router.put("/change/:id", protect, adminOnly, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Role updated", user: updatedUser });
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(400).json({ message: "Failed to update role" });
  }
});

module.exports = router;
