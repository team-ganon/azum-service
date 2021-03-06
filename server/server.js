const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Rental = require("./db/Rental.js");

mongoose.connect("mongodb://localhost:27017/airbnb", { useNewUrlParser: true, useUnifiedTopology: true });

var app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, "../public")));

app.get("/api/rentals", (req, res) => {
  const id = parseInt(req.query.id);
  Rental.findOne({ _id: id })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/bundle.js"));
});

app.listen(3003, err => {
  console.log("Listening on port 3003...");
});