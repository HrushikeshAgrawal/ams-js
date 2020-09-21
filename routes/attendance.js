const express = require("express");
const router = express.Router();

const {
  addAttendance,
  getByClass,
  getByStudent,
} = require("../controllers/attendance");

const { staffAuth: auth } = require("../middleware/auth");

router.post("/addAttendance", auth, addAttendance);
router.get("/getByClass/:id", getByClass);
router.get("/getByStudent/:id", getByStudent);

module.exports = router;
