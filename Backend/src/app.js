const express = require('express');
// required all the routes here
const authRoutes = require("./routes/auth.routes")
const ticketRoutes = require("./routes/ticket.routes")
const cookieParser = require("cookie-parser")
const cors = require('cors')

const app = express();
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
// using all the routes here
app.use("/api/auth", authRoutes)
app.use("/api/tickets", ticketRoutes)


module.exports = app;