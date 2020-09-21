const Student = require("../models/Student");
const Class = require("../models/Class");
const Attendance = require("../models/Attendance");
const { v4: uuidv4 } = require("uuid");

exports.addAttendance = async (req, res) => {
  const {
    classID,
    date,
    startTime,
    endTime,
    subject,
    staffInchargeID,
    staffTakingID,
    attendanceArr,
  } = req.body;
  try {
    const attendanceID = uuidv4();
    const _class = await Class.findOne({ classID });
    if (!_class) {
      return res
        .status(400)
        .json({ success: false, error: "Class does not exist" });
    }
    if (_class.studentsArr.length !== attendanceArr.length) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid attendance length" });
    }
    const attendance = new Attendance({
      attendanceID,
      classID,
      date,
      startTime,
      endTime,
      subject,
      staffInchargeID,
      staffTakingID,
      attendanceArr,
    });
    attendance.save();
    res.json({ success: true, attendance });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.getByClass = async (req, res) => {
  const classID = req.params.id;
  try {
    const _class = await Class.findOne({ classID });
    if (!_class) {
      return res
        .status(400)
        .json({ success: false, error: "Class does not exist" });
    }
    const classAttendance = await Attendance.find({ classID });
    res.json({ success: true, total: classAttendance.length, classAttendance });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.getByStudent = async (req, res) => {
  const studentID = req.params.id;
  try {
    const student = await Student.findOne({ studentID });
    if (!student) {
      return res
        .status(400)
        .json({ success: false, error: "Student does not exist" });
    }
    const classID = student.classID;
    const _class = await Class.findOne({ classID });
    const studentIndex = _class.studentsArr.findIndex((t) => t === studentID);
    const classAttendance = await Attendance.find({ classID });
    res.json({
      success: true,
      total: classAttendance.length,
      studentIndex,
      classAttendance,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
