const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Employee = require("../models/Employee");
const { body, validationResult } = require("express-validator");

// Configure multer to store images in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Save in 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded image
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp to avoid name conflicts
  },
});

const upload = multer({ storage });

// POST route for adding a new employee with an image
router.post(
  "/",
  upload.single("file"), // Multer middleware to handle image upload
  [
    body("emp_email", "Enter a valid email").isEmail(),
    body("emp_number", "Enter a valid Mobile number").isMobilePhone('en-IN', { strictMode: false }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Enter Valid Email and Mobile Number" });
    }

    try {
      let employee = await Employee.findOne({ f_Email: req.body.emp_email });
      if (employee) {
        return res.status(400).json({ error: "Employee with this Email already exists!" });
      }

      // Create a new employee with the uploaded image and other details
      employee = await Employee.create({
        f_Name: req.body.emp_name,
        f_Email: req.body.emp_email,
        f_Mobile: req.body.emp_number,
        f_Image: req.file.filename, // Save the filename of the uploaded image
        f_Designation: req.body.selectedOption,
        f_gender: req.body.gender,
        f_course: JSON.parse(req.body.selectedCourses),
      });

      return res.status(201).json({ success: "Employee added successfully" });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
