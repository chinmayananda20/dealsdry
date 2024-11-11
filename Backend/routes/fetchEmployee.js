const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

router.post("/", async (req, res) => {
  const employee = await Employee.findOne({ _id: req.body._id });
  if (!employee) {
    res.status(500).json({ error: "No such Employee exists" });
  }
  try {

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
