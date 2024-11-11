const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

router.post(
  "/",
  [
    body("password", "Password must be a minimum of 6 characters").isLength({
      min: 6,
    }),
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      let user = await User.findOne({ f_email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this Email already exists!" });
      }
      let user2 = await User.findOne({ f_userName: req.body.name });
      if (user2) {
        return res
          .status(400)
          .json({ error: "User with this user name already exists!" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        f_userName: req.body.name,
        f_email: req.body.email,
        f_pswd: secPass,
      });

      return res.status(201).json({ success: "Signin Successful" });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
