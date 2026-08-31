const app = require("../src/app");
const connectDB = require("../db/db");

connectDB();

module.exports = app;