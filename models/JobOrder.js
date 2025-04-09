const mongoose =require("mongoose");

const JobOrderSchema = new mongoose.Schema({
  model: String,
  jobDate: String,
  requests: [String],
  checklist: [String],
  fuelLevel: String,
  jackHandle: Boolean,
  spareWheel: Boolean,
  toolkit: Boolean,
  estimatedCost: String,
  deliveryDate: String,
  time: String,
  customerSignature: String,
  workDone: String,
  pendingWorks: String,
}, { timestamps: true });

module.exports= mongoose.model("JobOrder", JobOrderSchema);
