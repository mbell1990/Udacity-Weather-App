// Setup empty JS object to act as endpoint for all routes
const projectData = {};

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

// get request with callback function added

app.get("/all", sendData);

// callback

function sendData(req, res) {
  res.send(projectData);
  console.log(projectData);
}

// Post route

app.post("/add", addData);

function addData(req, res) {
  newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    content: req.body.content,
  };

  projectData.push(newEntry);
  res.send(projectData);
}
