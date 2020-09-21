const mongoose = require("mongoose");

const AttendanceSchema = mongoose.Schema({
  attendanceID: {
    type: String,
  },
  classID: {
    type: String,
  },
  date: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  subject: {
    type: String,
  },
  staffInchargeID: {
    type: String,
  },
  staffTakingID: {
    type: String,
  },
  attendanceArr: [],
});

module.exports = mongoose.model("attendance", AttendanceSchema);
