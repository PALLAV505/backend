const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5170;

mongoose.set("strictQuery", false); 


app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const roleRoutes = require("./routes/roleRoutes");

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/roles", roleRoutes);


app.get("/", (req, res) => {
  res.send("🚀 Task Manager Backend is Running");
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
