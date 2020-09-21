const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema({
  classID: {
    type: String,
  },
  className: {
    type: String,
  },
  studentsArr: [],
});

module.exports = mongoose.model("class", ClassSchema);
