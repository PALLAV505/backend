const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { taskName, assignedTo, status } = req.body;
    const task = new Task({ taskName, assignedTo, status });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

exports.getTasksByUser = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.email });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskName, assignedTo, status } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.taskName = taskName;
    task.assignedTo = assignedTo;
    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};