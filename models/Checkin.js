const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
  carNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  phone: { type: String },
  serviceType: { type: String, required: true },
  notes: { type: String },
  checkInDate: { type: Date, required: true },       // New field for date
  address: {                                          // Nested object for full address details
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

const CheckIn = mongoose.model('CheckIn', checkInSchema);
module.exports = CheckIn;
