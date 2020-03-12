const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Property = require("../db/schema.js");

mongoose.connect("http://localhost:27017", { useMongoClient: true });

var app = express();

app.use(express.static(path.resolve(__dirname, "../public")));

app.listen(3003, err => {
  console.log("Listening on port 3003...");
});