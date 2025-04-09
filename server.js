const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv").config();
const billingRoutes = require("./routes/billing");
const checkinRoutes = require("./routes/check.js");
const bodyParser = require("body-parser");
const appointmentRoutes = require("./routes/appointmentRoutes");
const jobOrdersRoute = require("./routes/jobOrder.js");
const reviewRoutes = require("./routes/review.js");
const activityRoutes = require("./routes/useractivity.js");

const app = express();

const allowedOrigins = [
  'https://zippy-youtiao-283e87.netlify.app',
  'http://localhost:3000',"https://gcarpoint.netlify.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI)

  .then(() => console.log("MongoDB Connected"));

app.use("/api/auth", authRoutes);
app.use("/api/billing", billingRoutes);
app.use("/", billingRoutes);
app.use("/api/checkin", checkinRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/job-orders", jobOrdersRoute);
app.use("/api/reviews", reviewRoutes);
app.use("/api/user-activity", activityRoutes);

app.listen(5000, () => console.log("Server running at http://localhost:5000"));
