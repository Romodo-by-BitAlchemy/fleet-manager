const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/tutorial")
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
// Import necessary modules
const { MongoClient } = require("mongodb");
const Cookies = require("js-cookie");

// MongoDB connection URL
const uri = "mongodb://localhost:27017/tutorial"; // Change this to your MongoDB connection URL

// Database Name
const dbName = "tutorial"; // Change this to your database name

// Connect to MongoDB
async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB client
    await client.connect();

    console.log("Connected to MongoDB");

    // Get the database reference
    const db = client.db(dbName);

    // Get the collection reference (assuming you have a collection named 'cookies')
    const cookiesCollection = db.collection("cookies");

    // Get cookies data
    const cookiesData = {
      companyName: Cookies.get("companyName") || "",
      contactNumber: Cookies.get("contactNumber") || "",
      companyEmail: Cookies.get("companyEmail") || "",
      // Add other cookie data as needed
    };

    // Insert cookies data into the database
    const result = await cookiesCollection.insertOne(cookiesData);

    console.log(
      `Inserted ${result.insertedCount} document into the cookies collection`
    );
  } catch (err) {
    console.error("Error:", err);
  } finally {
    // Close the MongoDB client
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

// Call the main function to connect to MongoDB and insert cookies data
main();
