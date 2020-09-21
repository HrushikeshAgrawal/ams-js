const express = require("express");
const router = express.Router();
const {
  studentLogin,
  staffLogin,
  adminLogin,
  loadAdmin,
  loadStaff,
  loadStudent,
} = require("../controllers/auth");

const { staffAuth, studentAuth, adminAuth } = require("../middleware/auth");

router.post("/student", studentLogin);
router.post("/staff", staffLogin);
router.post("/admin", adminLogin);

router.get("/student", studentAuth, loadStudent);
router.get("/staff", staffAuth, loadStaff);
router.get("/admin", adminAuth, loadAdmin);

module.exports = router;
