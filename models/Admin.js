const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  adminID: {
    type: String,
  },
  adminName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("admin", AdminSchema);
