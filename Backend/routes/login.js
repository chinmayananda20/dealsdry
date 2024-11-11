const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;

router.post(
  "/",
  [body("password", "password cannot be blank").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    //if there are any errors in the request it will return errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "please enter valid details" });
    }

    const { name, password } = req.body;
    try {
      let user = await User.findOne({ f_userName: name });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.f_pswd);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user._id,
          name: user.f_userName,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send({ error: "Something went wrong!" });
    }
  }
);

module.exports = router;
