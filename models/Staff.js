const mongoose = require("mongoose");

const StaffSchema = mongoose.Schema({
  staffID: {
    type: String,
  },
  staffName: {
    type: String,
  },
  initials: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("staff", StaffSchema);
