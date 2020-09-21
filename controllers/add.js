const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");
const Class = require("../models/Class");
const Staff = require("../models/Staff");
const Admin = require("../models/Admin");

exports.addStudent = async (req, res, next) => {
  const { classID, rollNo, firstName, lastName, email, password } = req.body;
  try {
    let student = await Student.findOne({ email });
    if (student) {
      return res
        .status(400)
        .json({ success: false, error: "Email already taken." });
    }
    let _class = await Class.findOne({ classID });
    if (!_class) {
      return res
        .status(400)
        .json({ success: false, error: "Class does not exist ._." });
    }

    const all = await Student.find();
    let count = all.length + 1;
    count = ("000" + count).slice(-4);
    const studentID = "S" + count;
    let studentsArr = _class.studentsArr;
    studentsArr.push(studentID);
    const salt = await bcrypt.genSalt(10);
    student = new Student({
      studentID,
      classID,
      rollNo,
      fullName: { firstName, lastName },
      email,
      password,
    });
    student.password = await bcrypt.hash(password, salt);

    const payload = {
      studentID: student.studentID,
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      async (err, token) => {
        if (err) throw err;
        await student.save();
        await Class.updateOne({ classID }, { studentsArr });
        return res.json({ success: true, token, student });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.addClass = async (req, res, next) => {
  const { className } = req.body;
  try {
    let _class = await Class.findOne({ className });
    if (_class) {
      return res
        .status(400)
        .json({ success: false, error: "ClassName already taken." });
    }
    const all = await Class.find();
    let count = all.length + 1;
    count = ("000" + count).slice(-4);
    const classID = "C" + count;
    _class = new Class({
      classID,
      className,
    });
    await _class.save();
    return res.json({ success: true, _class });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.addStaff = async (req, res, next) => {
  const { staffName, initials, email, password } = req.body;
  try {
    let staff = await Staff.findOne({ email });
    if (staff) {
      return res
        .status(400)
        .json({ success: false, error: "Email already taken." });
    }
    const all = await Staff.find();
    let count = all.length + 1;
    count = ("000" + count).slice(-4);
    const staffID = "F" + count;
    const salt = await bcrypt.genSalt(10);
    staff = new Staff({
      staffID,
      staffName,
      initials,
      email,
      password,
    });
    staff.password = await bcrypt.hash(password, salt);

    const payload = {
      staffID: staff.staffID,
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      async (err, token) => {
        if (err) throw err;
        await staff.save();
        return res.json({ success: true, token, staff });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.addAdmin = async (req, res, next) => {
  const { adminName, email, password, secret } = req.body;
  try {
    if (secret !== "swoosh +.+") {
      return res.json({
        success: false,
        error: "Invalid Secret. Go away! >:(",
      });
    }
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res
        .status(400)
        .json({ success: false, error: "Email already taken." });
    }
    const all = await Admin.find();
    let count = all.length + 1;
    count = ("000" + count).slice(-4);
    const adminID = "A" + count;
    const salt = await bcrypt.genSalt(10);
    admin = new Admin({
      adminID,
      adminName,
      email,
      password,
    });
    admin.password = await bcrypt.hash(password, salt);

    const payload = {
      adminID: admin.adminID,
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      async (err, token) => {
        if (err) throw err;
        await admin.save();
        return res.json({ success: true, token, admin });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
