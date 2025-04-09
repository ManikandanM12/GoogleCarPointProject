const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const sendEmail = require('../utils/sendEmail.js');

// GET /api/appointments (only non-replied)
router.get('/', async (req, res) => {
    try {
      const appointments = await Appointment.find({ reply: { $in: [null, ""] } }).sort({ createdAt: -1 });
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching non-replied appointments:", error);
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  });
  

router.post('/', async (req, res) => {
  const newAppointment = new Appointment(req.body);
  await newAppointment.save();
  res.status(201).json(newAppointment);
});

router.put('/:id/reply', async (req, res) => {
    try {
      const { reply } = req.body;
      const appointment = await Appointment.findById(req.params.id);
  
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
  
      appointment.reply = reply;
      await appointment.save();
  
      // Send email reply to client
      await sendEmail({
        to: appointment.email,
        subject: `Reply to your appointment at Google Car Point`,
        text: `Hello ${appointment.name},\n\nHere is our reply to your message:\n\n${reply}\n\nThank you!`,
      });
  
      res.json({ message: 'Reply sent and saved successfully', reply });
    } catch (error) {
      console.error('Error replying to appointment:', error);
      res.status(500).json({ error: 'Server error while replying' });
    }
  });

  router.get('/replied', async (req, res) => {
    try {
      const repliedAppointments = await Appointment.find({ reply: { $ne: "" } });
      res.json(repliedAppointments);
    } catch (err) {
      res.status(500).json({ error: 'Server error fetching replied appointments' });
    }
  });

  // Delete replied appointments based on filter
// DELETE /api/appointments/replied/delete?type=daily|weekly|monthly
// Example: routes/appointment.js or routes/api.js

router.delete('/appointments/replied/delete', async (req, res) => {
    const { type } = req.query;
  
    let startDate;
    const now = new Date();
  
    if (type === 'daily') {
      startDate = new Date(now.setHours(0, 0, 0, 0));
    } else if (type === 'weekly') {
      const day = now.getDay(); // Sunday = 0
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust when Sunday
      startDate = new Date(now.setDate(diff));
      startDate.setHours(0, 0, 0, 0);
    } else if (type === 'monthly') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      return res.status(400).json({ error: "Invalid type" });
    }
  
    try {
      const result = await Appointment.deleteMany({
        reply: { $exists: true, $ne: "" },
        createdAt: { $gte: startDate }
      });
      res.json({ message: `${result.deletedCount} appointments deleted.` });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete appointments" });
    }
  });
  
  
  

module.exports = router;
