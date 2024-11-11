const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    f_userName: { type: String, required: true , unique: true},
    f_email: { type: String,required: true , unique: true},
    f_pswd: { type: String, required: true },
  },
  { timestamps: true }
);
mongoose.models = {};

module.exports = mongoose.model("User", UserSchema);
