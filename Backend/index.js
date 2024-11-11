const connectToMongo = require("./db");
connectToMongo();
require('dotenv').config();
var cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000; 
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const cors = require('cors');
app.use(cors({
    origin:'https://dealsdry.vercel.app/'   // Replace with your frontend URL
}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use("/api/signup", require("./routes/adduser"));
app.use("/api/login", require("./routes/login"));
app.use("/api/forgotpassword", require("./routes/forgotpassword"));
app.use("/api/resetpassword", require("./routes/resetpassword"));
app.use("/api/addEmployee", require("./routes/addEmployee"));
app.use("/api/getEmployees", require("./routes/getEmployees"));
app.use("/api/deleteEmployee", require("./routes/deleteEmployee"));
app.use("/api/fetchEmployee", require("./routes/fetchEmployee"));
app.use("/api/updateEmployee", require("./routes/updateEmployee"));







app.listen(port, () => {
  console.log(`dealsdry Backend listening on port ${port}`);
});
