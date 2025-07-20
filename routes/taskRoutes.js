const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTasksByUser,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/user/:email", getTasksByUser);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
