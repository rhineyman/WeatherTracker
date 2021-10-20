const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const uvIndex = document.getElementById("uvIndex");
const forecast = document.getElementById("forecast");
const historyItems = document.getElementById("historyItems");
const cardRow = document.getElementById("cardRow");

const history = document.getElementById("historyItems");

const imperial = "&units=imperial";
const apiKey = "3d6d91ee3b7dd01993df98095dbd1320";
const cityUrl0 = "https://api.openweathermap.org/data/2.5/weather?q=";
const cityUrl1 = "&appid=";
const uviUrl0 = "https://api.openweathermap.org/data/2.5/uvi?lat=";
const uviUrl1 = "&lon="
const fiveUrl0 = "https://api.openweathermap.org/data/2.5/forecast?q=";
const fiveUrl1 = "&appid="

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", citySearch);

var searchHis = [];

function citySearch(event) {
    event.preventDefault();
    var searchInput = document.getElementById("searchInput");
    var searchInput = searchInput.value;
    var cityUrl = cityUrl0 + searchInput + cityUrl1 + apiKey + imperial;
    fetch(cityUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById("cityName").textContent = data.name;
            document.getElementById("temp").textContent = "Temperature: " + data.main.temp + " F";
            document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity + "%";
            document.getElementById("windSpeed").textContent = "Wind Speed: " + data.wind.speed + "mph";
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            // city storage for filling history
            var cityStore = data.name;
            setLocal(cityStore);
            var uviUrl = uviUrl0 + lat + uviUrl1 + lon + cityUrl1 + apiKey + imperial;
            fetch(uviUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (uviData) {
                    document.getElementById("uvIndex").textContent = "UV Index: " + uviData.value;
                    // console.log(uviData);
                    var fiveUrl = fiveUrl0 + data.name + fiveUrl1 + apiKey + imperial;
                    fetch(fiveUrl)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (fiveUrlData) {
                            console.log(fiveUrlData);
                            for (i = 3; i < 40; i += 8) {
                                console.log(fiveUrlData.list[i]);
                                document.getElementById("date" + i).textContent = "Date: " + fiveUrlData.list[i].dt_txt.split(' ')[0];
                                // document.getElementById("img" + i) = fiveUrlData.list[i].weather[0].icon;
                                document.getElementById("temp" + i).textContent = "Temp: " + fiveUrlData.list[i].main.temp;
                                document.getElementById("hum" + i).textContent = "Humidity: " + fiveUrlData.list[i].main.humidity;

                                // console.log("date" + i);
                                // console.log(fiveUrlData.list[i].main.temp);

                            }

                            // document.getElementById("cardRow").textContent = fiveUrlData.list[0];
                        });

                });

            function setLocal() {
                localStorage.setItem("searchHis", JSON.stringify(searchHis));
                // console.log(cityStore);
            }
        });
}

// "http://openweathermap.org/img/wn/" + iconID + "@2x.png"
