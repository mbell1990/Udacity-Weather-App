/* Global Variables */
//let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=bbcbcf9880f406de3b4994757d9c97c6&units=metric';/Celcius";

// Create a new date instance dynamically with JS

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1; // add 1 to get the correct month (January is 0)
const year = today.getFullYear();

let newDate = `${day}/${month}/${year}`;

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const newZip = document.getElementById("city").value;

  // here we call postData, pass in the path (/add), add information that we want to post to UI - this is retrieved from the API and user input

  getZip(baseURL, newZip, apiKey).then(function (data) {
    postData("/add", {
      weather: data.weather[0].description,
      city: data.name,
      temperature: Math.floor(data.main.temp - 273.15),
      icon: data.weather[0].icon,
      date: newDate,
    }).then(function () {
      updateUI();
    });
  });
  clearInput();
}
// ***GET request *** get the data from the API

const getZip = async (baseURL, newZip, apiKey) => {
  const request = await fetch(baseURL + newZip + apiKey);
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    return allData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// *** POST request *** - this adds the data we get from get request to the server - adds data to '/add'

const postData = async (url = "/add", data = {}) => {
  // where we want to make the post too = url
  const res = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {}
};

const updateUI = async () => {
  const request = await fetch("/all");

  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById("title").innerHTML = "Todays Weather";
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("name").innerHTML = allData.city;
    document.getElementById("weather").innerHTML = allData.weather;
    document.getElementById("icon").src =
      "http://openweathermap.org/img/wn/" + allData.icon + ".png";
    document.getElementById("temp").innerHTML = allData.temperature + " °C";
  } catch (error) {
    console.log("error", error);
  }
};

function clearInput() {
  document.getElementById("city").value = "";
}
