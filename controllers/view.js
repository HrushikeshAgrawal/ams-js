const Student = require("../models/Student");
const Staff = require("../models/Staff");
const Class = require("../models/Class");
const Admin = require("../models/Admin");

exports.viewStudent = async (req, res) => {
  const studentID = req.params.id;
  try {
    const student = await Student.findOne({ studentID });
    if (!student) {
      return res
        .status(400)
        .json({ success: false, error: "Student not found" });
    }
    res.json({ success: true, student });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.viewStaff = async (req, res) => {
  const staffID = req.params.id;
  try {
    const staff = await Staff.findOne({ staffID });
    if (!staff) {
      return res.status(400).json({ success: false, error: "Staff not found" });
    }
    res.json({ success: true, staff });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.viewClass = async (req, res) => {
  const classID = req.params.id;
  try {
    const _class = await Class.findOne({ classID });
    if (!_class) {
      return res.status(400).json({ success: false, error: "Class not found" });
    }
    res.json({ success: true, _class });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ success: true, students });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json({ success: true, staff });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json({ success: true, classes });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json({ success: true, admins });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
