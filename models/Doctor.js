const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialization: { type: String },
    contact: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', DoctorSchema);