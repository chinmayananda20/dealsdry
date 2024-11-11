const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
router.get("/",async(req, res)=>{
    try {
        let employees =await Employee.find({})
        res.json(employees)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
module.exports = router;