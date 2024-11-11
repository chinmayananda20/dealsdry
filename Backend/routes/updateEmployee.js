const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Employee = require("../models/Employee");
const { body, validationResult } = require("express-validator");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route for adding a new employee with an image
router.post(
  "/",
  upload.single("file"), // Multer middleware to handle image upload
  [
    body("emp_email", "Enter a valid email").isEmail(),
    body("emp_number", "Enter a valid Mobile number").isMobilePhone("en-IN", { strictMode: false }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {_id, emp_name, emp_email, emp_number, selectedOption, gender, selectedCourses } = req.body;

    try {
      let employee = await Employee.findOne({ _id: _id });
      if (!employee) {
        return res.status(400).json({ error: "Employee  doesn't exist!" });
      }

      // Update employee details
      employee.f_Name = emp_name;
      employee.f_Email = emp_email;
      employee.f_Mobile = emp_number;

      // Handle file upload
      if (req.file && req.file.filename) {
        employee.f_Image = req.file.filename;
      }

      employee.f_Designation = selectedOption;
      employee.f_gender = gender;
      employee.f_course = JSON.parse(selectedCourses);

      await employee.save();

      return res.status(201).json({ success: "Employee Updated successfully" });
    } catch (error) {
      console.error("Error updating employee:", error.message);
      return res.status(500).json({ error: "Server Error" });
    }
  }
);

module.exports = router;
