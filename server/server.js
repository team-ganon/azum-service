const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Rental = require("./db/Rental.js");

mongoose.connect("mongodb://localhost:27017/airbnb", { useNewUrlParser: true, useUnifiedTopology: true });

var app = express();

app.use(express.static(path.resolve(__dirname, "../public")));

// app.get("/:id", (req, res) => {
//   if(req.params.id >= 1 && req.params.id <= 100) {
//     res.sendFile(path.join(__dirname, "../public/index.html"), err => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   } else {
//     res.status(404).send("<h1>404 error: page not found</h1>");
//   }
// });

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

app.listen(3003, err => {
  console.log("Listening on port 3003...");
});