const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS options
const corsOptions = {
  origin: 'http://healuonline.netlify.app', 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://mskchaithanyaraj:zntwRfaGxAMQkxeu@feedback.0tjzc.mongodb.net/?retryWrites=true&w=majority&appName=feedback', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// POST endpoint to submit feedback
const Feedback = require('./models/Feedback');
app.post('/api/feedback', async (req, res) => {
  try {
    const newFeedback = new Feedback({ message: req.body.message });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(400).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
