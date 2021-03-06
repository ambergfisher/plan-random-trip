const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const citiesRoutes = express.Router();
const PORT = 4000;
require('dotenv').config()

let City = require("./cities-model");

app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@plan-random-trip.e3mba.mongodb.net/cities?retryWrites=true&w=majority`, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

citiesRoutes.route("/").get(function (req, res) {
  City.find(function (err, cities) {
    if (err) {
      console.log(err);
    } else {
      res.json(cities);
    }
  });
});

citiesRoutes.route("/single").get(function (req, res) {
  City.count().exec(function (err, count) {
    // Get a random entry
    var rand = Math.floor(Math.random() * count);

    // Again query all users but only fetch one offset by our random #
    City.findOne()
      .skip(rand)
      .exec(function (err, result) {
        // Tada! random user
        res.json(result);
      });
  });
});

citiesRoutes.route("/multiple/:num").get(function (req, res) {
  let num = req.params.num
  let sample = [{$sample: {size: parseInt(num)}}]
  City.aggregate(sample, function(err, results) {
    if (!err) {
      res.status(200).json(results)
    }
    else {
      res.status(400).send(err)
    }
  });
});

citiesRoutes.route("/add").post(function (req, res) {
  let city = new City(req.body);
  city
    .save()
    .then((city) => {
      res.status(200).json({ city: "city added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new city failed");
    });
});

app.use("/cities", citiesRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
