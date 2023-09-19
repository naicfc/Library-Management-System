const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("../server/config/db");

const app = express();

connectDB();

app.use(cors());

app.listen(5000, console.log(`Server is running on port ${port}`));
