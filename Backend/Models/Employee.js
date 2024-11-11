const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema(
  {
    f_Image: { type: Object, required: true ,},
    f_Name: { type: String,required: true , },
    f_Email: { type: String, required: true ,unique: true},
    f_Mobile: { type: String,required: true , },
    f_Designation: { type: String,required: true , },
    f_gender: { type: String,required: true , },
    f_course: [{ type: String,required: true , }],
  },
  { timestamps: true }
);
mongoose.models = {};

module.exports = mongoose.model("Employee", EmployeeSchema);
