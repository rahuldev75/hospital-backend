const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const patientsRouter = require("./routes/patients");
const doctorsRouter = require("./routes/doctors");
const appointmentsRouter = require("./routes/appointments");

const app = express();
const PORT = 5000;

// CORS FIX
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

// MongoDB connect
mongoose
  .connect(
    "mongodb+srv://denzmorray118_db_user:9lip42Ov9n1GWAtX@cluster0.afvxa6t.mongodb.net/hospitalDB?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Hospital Management API (MERN Stack)");
});

// Routers
app.use("/patients", patientsRouter);
app.use("/doctors", doctorsRouter);
app.use("/appointments", appointmentsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));