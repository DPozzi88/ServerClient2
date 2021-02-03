const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const serverName = "server";
const port = 7000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/" + serverName, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection;

const daySchema = new mongoose.Schema({
  numero: { type: Number },
  riordino: { type: Boolean },
  yoga: { type: Boolean },
  coding: { type: Boolean },
});
const Day = mongoose.model("Day", daySchema);

const day = new Day({
  numero: 1,
  riordino: 0,
  yoga: 0,
  coding: 1,
});

app.get("/api/calendar", function (req, res) {
  Day.find({}, function (err, foundDays) {
    res.json(foundDays);
  });
  console.log("Successfully zero");
});

app.listen(port, () => console.log("Server started on port " + port));
