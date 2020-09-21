const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const conifg = require("config");
const Student = require("../models/Student");
const Staff = require("../models/Staff");
const Admin = require("../models/Admin");

exports.studentLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let student = await Student.findOne({ email });

    if (!student) {
      return res
        .status(400)
        .json({ success: false, error: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Credentials" });
    }

    const payload = {
      studentID: student.studentID,
    };

    jwt.sign(
      payload,
      conifg.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ success: true, token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.staffLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let staff = await Staff.findOne({ email });

    if (!staff) {
      return res.status(400).json({ success: false, error: "Staff not found" });
    }

    const isMatch = await bcrypt.compare(password, staff.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Credentials" });
    }

    const payload = {
      staffID: staff.staffID,
    };

    jwt.sign(
      payload,
      conifg.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ success: true, token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ success: false, error: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Credentials" });
    }

    const payload = {
      adminID: admin.adminID,
    };

    jwt.sign(
      payload,
      conifg.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ success: true, token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.loadStudent = async (req, res) => {
  const studentID = req.studentID;
  try {
    const student = await Student.findOne({ studentID });
    res.json({ success: true, student, authType: "student" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, error: "Server error" });
  }
};

exports.loadStaff = async (req, res) => {
  const staffID = req.staffID;
  try {
    const staff = await Staff.findOne({ staffID });
    res.json({ success: true, staff, authType: "staff" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, error: "Server error" });
  }
};

exports.loadAdmin = async (req, res) => {
  const adminID = req.adminID;
  try {
    const admin = await Admin.findOne({ adminID });
    res.json({ success: true, admin, authType: "admin" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, error: "Server error" });
  }
};
