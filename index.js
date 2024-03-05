// import the pets array from data.js
const pets = require("./data.js");

// init express app
const express = require("express");
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get("/", (req, res) => {
  // serve up the public folder as static index.html file
  res.send("<h1>Pet Finder</h1>");
});

// hello world route
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// get all pets from the database
app.get("/api/v1/pets", (req, res) => {
  // send the pets array as a response
  try {
    console.log({ pets });
    res.send({ pets });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred!");
  }
});

// get pet by owner with query string
app.get("/api/v1/pets/owner", (req, res) => {
  // get the owner from the request
  const owner = req.query.owner;

  // find the pet in the pets array
  const pet = pets.find((pet) => pet.owner === owner);

  // send the pet as a response
  try {
    console.log(owner);
    res.send(pet);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred!");
  }
});

// get pet by name
app.get("/api/v1/pets/:name", (req, res) => {
  // get the name from the request
  const name = req.params.name;

  // find the pet in the pets array
  const pet = pets.find((pet) => pet.name === name);

  // send the pet as a response
  try {
    console.log(name);
    res.send({ pet });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred!");
  }
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

module.exports = app;
