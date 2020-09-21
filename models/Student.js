const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  studentID: {
    type: String,
  },
  classID: {
    type: String,
  },
  rollNo: {
    type: String,
  },
  fullName: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("student", StudentSchema);
