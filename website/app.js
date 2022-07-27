/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=bbcbcf9880f406de3b4994757d9c97c6";

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const newZip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getZip(baseURL, newZip, apiKey).then(function (data) {
    postData("/add", {
      temperature: data.main.temp,
      date: d,
      content: feelings,
    }).then(function () {
      updateUI();
    });
  });
}

// get the data from the API

const getZip = async (baseURL, newZip, apiKey) => {
  const request = await fetch(baseURL + newZip + apiKey);
  try {
    // Transform into JSON
    const allData = await request.json();
    return allData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// Post

const postData = async (url = "/add", data = {}) => {
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
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temperature;
    document.getElementById("content").innerHTML = allData.content;
  } catch (error) {
    console.log("error", error);
  }
};
