// routes/appointments.js

const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new appointment
router.post("/add", async (req, res) => {
  try {
    const { patientName, doctorName, date } = req.body;

    const newAppointment = new Appointment({
      patientName,
      doctorName,
      date,
    });

    const savedAppointment = await newAppointment.save();
    res.json(savedAppointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update appointment
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        patientName: req.body.patientName,
        doctorName: req.body.doctorName,
        date: req.body.date,
      },
      { new: true } // return updated object
    );

    if (!updated) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json({ message: "Appointment updated!", updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete appointment
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;