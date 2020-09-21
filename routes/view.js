const express = require("express");
const router = express.Router();
const {
  viewStudent,
  viewClass,
  viewStaff,
  getAllStudents,
  getAllClasses,
  getAllStaff,
  getAllAdmins,
} = require("../controllers/view");

router.get("/student/:id", viewStudent);
router.get("/class/:id", viewClass);
router.get("/staff/:id", viewStaff);
router.get("/getAllStudents", getAllStudents);
router.get("/getAllClasses", getAllClasses);
router.get("/getAllStaff", getAllStaff);
router.get("/getAllAdmins", getAllAdmins);

module.exports = router;
