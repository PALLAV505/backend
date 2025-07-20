const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken= (user)=>{
    return jwt.sign({id:user._id, email:user.email},process.env.KEY,{expiresIn:"1d"})
}

exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Bad Request: All fields are required" });
  }
  

  try {
    let exists = await User.findOne({ email });
  if (exists) {
     res.status(409).json({ message: " User already exists" });
  }else{

    const user = new User({ username, email, password, role });
    await user.save();
    res.status(201).json({ message: "User registered" });
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
  { _id: user._id, email: user.email, role: user.role }, // ✅ include role
  "secretkey",
  { expiresIn: "1d" }
);

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get profile" });
  }
};

exports.changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== currentPassword) {
      return res.status(400).json({ message: "Incorrect current password" });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to change password" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get users" });
  }
};

exports.updateUserRole = async (req, res) => {
  const { email } = req.params;
  const { role } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    user.role = role;
    await user.save();
    res.json({ message: "Role updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update role" });
  }
};
