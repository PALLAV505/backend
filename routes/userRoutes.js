const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  changePassword,
  getAllUsers,
  updateUserRole
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:email", getUserProfile);
router.put("/change-password", changePassword);
router.get("/", getAllUsers);
router.put("/role/:email", updateUserRole);

module.exports = router;
