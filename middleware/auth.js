const jwt = require("jsonwebtoken");
const config = require("config");

exports.studentAuth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "No token, authorization failed!" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.studentID = decoded.studentID;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "Invalid token" });
  }
};

exports.staffAuth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "No token, authorization failed!" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.staffID = decoded.staffID;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "Invalid token" });
  }
};

exports.adminAuth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "No token, authorization failed!" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.adminID = decoded.adminID;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, error: "Invalid token" });
  }
};
