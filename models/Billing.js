const mongoose=require("mongoose")

const billingSchema = new mongoose.Schema({
    billItems: [
      {
        category: String,
        service: String,
        quantity: Number,
        rate: Number,
        amount: Number,
      },
    ],
    labourItems: [
      {
        desc: String,
        amount: Number,
      },
    ],
    totalAmount: Number,
    carNumber: {
        type: String,
        required: true,
      },customer:{
        type: String,
        
      },
      phone:{
        type: Number,
        required: true,
      },
     
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('Billing', billingSchema);