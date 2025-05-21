const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const authenticate = require("./middleware/authenticate");
const Feedback = require("./models/Feedback");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS options to allow requests from localhost:3000
const corsOptions = {
  origin: ["https://healuonline.netlify.app", "http://localhost:3000"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST endpoint to submit feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const newFeedback = new Feedback({ message: req.body.message });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(400).json({ message: error.message });
  }
});

// GET endpoint to fetch all feedback
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Error fetching feedback" });
  }
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Example of a protected route
app.get("/api/protected", authenticate, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
