// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require("express");

// Start up an instance of app

const app = express();

// dependencies

const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

const port = 8000;

// Setup Server

const server = app.listen(port, listening);

function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

// ***  Routes and GET requests ***

// get request with callback - this gets the data required

app.get("/all", sendData);

// callback

function sendData(req, res) {
  res.send(projectData);
  projectData = {}; // try
}

// Post route - POST request sends data to the project's endpoint, where it is stored and can be accessed through a GET request
// /add is added to postData function in app.js

app.post("/add", addData); // /add this the url we want to use

// put data into server that we recievied from the postData function in app/js via getZip get request

function addData(req, res) {
  newEntry = {
    weather: req.body.weather,
    city: req.body.city,
    temperature: req.body.temperature, // data received by using req.body and later adds to projectData
    icon: req.body.icon,
    date: req.body.date,
  };

  projectData = newEntry;
  res.send(projectData);
}
