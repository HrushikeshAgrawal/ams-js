const express = require("express");
const router = express.Router();

const {
  addAdmin,
  addStaff,
  addClass,
  addStudent,
  clearDB,
} = require("../controllers/add");

const { adminAuth: auth } = require("../middleware/auth");

router.post("/admin", addAdmin);
router.post("/staff", auth, addStaff);
router.post("/class", auth, addClass);
router.post("/student", auth, addStudent);
router.get("/clearDB", clearDB);

module.exports = router;
