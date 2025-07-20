const jwt = require("jsonwebtoken");


const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};


const adminOnly = (req, res, next) => {
  console.log("Decoded user in adminOnly:", req.user); 
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

module.exports = { protect, adminOnly };
