//middleware/authenticate.js
const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("Access denied. No token provided.");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    if (!req.user) {
      return res.status(401).send("Access denied. Invalid token.");
    }
    next();
  } catch (ex) {
    if (ex.name === "TokenExpiredError") {
      return res.status(401).send("Access denied. Token expired.");
    }
    res.status(400).send("Invalid token.");
  }
};
