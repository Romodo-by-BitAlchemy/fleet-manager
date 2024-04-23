// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/romodo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define schema for Signup collection
const signupSchema = new mongoose.Schema({
  companyName: String,
  address: String,
  registeredNumber: String,
  contactNumber: String,
  companyEmail: String
});

// Create model for Signup collection
const Signup = mongoose.model('Signup', signupSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle signup form submission
app.post('/signup', async (req, res) => {
  try {
    // Create new Signup document from request body
    const newSignup = new Signup(req.body);
    // Save the new document to the database
    await newSignup.save();
    res.status(201).send('Signup successful');
  } catch (error) {
    console.error('Error saving signup:', error);
    res.status(500).send('Error saving signup');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
