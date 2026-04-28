import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Check if the request has a "Bearer" token in the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (it looks like "Bearer <token>")
      token = req.headers.authorization.split(" ")[1];

      // Decode the token using your secret from .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in DB and attach them to the request (req.user)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Move to the next function (the Controller)
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No token found, access denied" });
  }
};

// Simple Role Check (Security Guard check)
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You don't have permission for this!" });
    }
    next();
  };
};
