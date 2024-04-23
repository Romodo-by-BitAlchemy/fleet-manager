const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/mydatabase")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Error");
  });
const signupSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  registeredNumber: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
});
const Signup = mongoose.model("Signup", signupSchema);
