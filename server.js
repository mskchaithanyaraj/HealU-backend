const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());

mongoose.connect('mongodb+srv://mskchaithanyaraj:zntwRfaGxAMQkxeu@feedback.0tjzc.mongodb.net/?retryWrites=true&w=majority&appName=feedback', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const Feedback = require('./models/Feedback');

// POST endpoint to submit feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const newFeedback = new Feedback({ message: req.body.message });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
