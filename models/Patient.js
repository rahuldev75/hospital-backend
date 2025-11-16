const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number },
    gender: { type: String },
    contact: { type: String },
    address: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', PatientSchema);