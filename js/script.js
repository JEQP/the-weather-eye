
var citySelected = "string";
var API_KEY = "8d81f57ecd6887950a785296ebf29d30";
// SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

// On click Search function
// takes input from search form, converts to city string
// calls ajax
// adds city to button list if it is not there


// on click button function
// takes the city from the button, converts to city string
// calls ajax


function getWeather() {
    var currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySelected + "&APPID=" + API_KEY;
    console.log("CurrentURL: " + currentWeatherURL);

    $.getJSON(currentWeatherURL, function (response) {
        console.log(response);
        $("#cityCurrent").html(response.name);
        var a = new Date(response.dt * 1000);

        var month = "" + (a.getMonth() + 1);
        var day = a.getDate();
        var year = "" + a.getFullYear();
        var dateCurrent = [day, month, year].join("-");



        $("#dateCurrent").html(dateCurrent);
        var currentIcon = response.weather[0].icon;
        console.log("icon: " + currentIcon);
        var iconURL = "http://openweathermap.org/img/w/" + currentIcon + ".png";
        $("#iconCurrent").attr("src", iconURL);
        var cTemp = response.main.temp - 273.15;
        cTemp = cTemp.toFixed(1);


        var hour = a.getHours();
        var min = a.getMinutes();
        var tempTime = [hour, min].join(":");


        $("#tempCurrent").html("Temperature at " + tempTime + ": " + cTemp + " °C");
        $("#humidityCurrent").html("Humidity: " + response.main.humidity);
        var wSpeed = response.wind.speed * 3.6;
        $("#windCurrent").html("Wind Speed: " + wSpeed + " kph");

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + API_KEY + "&lat=" + lat + "&lon=" + lon;

        $.getJSON(uvURL, function (uvResponse) {

            $("#uvCurrent").html("UV Index: " + uvResponse.value);
            if (uvResponse.value < 2.5) {
                $("#uvCurrent").css('color', 'palegoldenrod');
            }
            if (uvResponse.value > 2.5 && uvResponse.value < 5.5) {
                $("#uvCurrent").css('color', 'lemonchiffon');
            }
            if (uvResponse.value > 5.5 && uvResponse.value < 7.5) {
                $("#uvCurrent").css('color', 'bisque');
            }
            if (uvResponse.value > 7.5 && uvResponse.value < 10.5) {
                $("#uvCurrent").css('color', 'lightpink');
            }
            if (uvResponse.value > 10.5) {
                $("#uvCurrent").css('color', 'red');
            }

        });



    });


}




// gets the weather information from openweathermap.org
// forecast weather
// takes data from returned json object and displays it in forecast-info
function getForecast() {

    var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySelected + "&APPID=" + API_KEY;

    $.getJSON(weatherURL, function (json) {
        $("#city").html(citySelected);
        $("#main_weather").html(json.list[0].weather[0].main);
        $("#description_weather").html(json.list[0].weather[0].description);
        $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.list[0].weather[0].icon + ".png");



        var b = new Date(json.list[7].dt * 1000); // 24 hours later
        var bmonth = "" + (b.getMonth() + 1);
        var bday = b.getDate();
        var byear = "" + b.getFullYear();
        var dateB = [bday, bmonth, byear].join("-");
        $("#b").html(dateB);
        $("#iconb").attr("src", "http://openweathermap.org/img/w/" + json.list[7].weather[0].icon + ".png");
        var bTemp = json.list[7].main.temp - 273.15;
        bTemp = bTemp.toFixed(1);
        $("#tempb").html("Temp: " + bTemp + " °C");
        $("#humidityb").html("Humidity: " + json.list[7].main.humidity);

        var c = new Date(json.list[15].dt * 1000); // 48 hours later
        var cmonth = "" + (c.getMonth() + 1);
        var cday = c.getDate();
        var cyear = "" + c.getFullYear();
        var datec = [cday, cmonth, cyear].join("-");
        $("#c").html(datec);
        $("#iconc").attr("src", "http://openweathermap.org/img/w/" + json.list[15].weather[0].icon + ".png");
        var cTemp = json.list[15].main.temp - 273.15;
        cTemp = cTemp.toFixed(1);
        $("#tempc").html("Temp: " + cTemp + " °C");
        $("#humidityc").html("Humidity: " + json.list[15].main.humidity);

        var d = new Date(json.list[23].dt * 1000); // 72 hours later
        var dmonth = "" + (d.getMonth() + 1);
        var dday = d.getDate();
        var dyear = "" + d.getFullYear();
        var dated = [dday, dmonth, dyear].join("-");
        $("#d").html(dated);
        $("#icond").attr("src", "http://openweathermap.org/img/w/" + json.list[23].weather[0].icon + ".png");
        var dTemp = json.list[23].main.temp - 273.15;
        dTemp = dTemp.toFixed(1);
        $("#tempd").html("Temp: " + dTemp + " °C");
        $("#humidityd").html("Humidity: " + json.list[23].main.humidity);



        var e = new Date(json.list[31].dt * 1000); // 96 hours later
        var emonth = "" + (e.getMonth() + 1);
        var eday = e.getDate();
        var eyear = "" + e.getFullYear();
        var datee = [eday, emonth, eyear].join("-");
        $("#e").html(datee);
        $("#icone").attr("src", "http://openweathermap.org/img/w/" + json.list[31].weather[0].icon + ".png");
        var eTemp = json.list[31].main.temp - 273.15;
        eTemp = eTemp.toFixed(1);
        $("#tempe").html("Temp: " + eTemp + " °C");
        $("#humiditye").html("Humidity: " + json.list[31].main.humidity);


        var f = new Date(json.list[39].dt * 1000); // 120 hours later
        var fmonth = "" + (f.getMonth() + 1);
        var fday = f.getDate();
        var fyear = "" + f.getFullYear();
        var datef = [fday, fmonth, fyear].join("-");
        $("#f").html(datef);
        $("#iconf").attr("src", "http://openweathermap.org/img/w/" + json.list[39].weather[0].icon + ".png");
        var fTemp = json.list[39].main.temp - 273.15;
        fTemp = fTemp.toFixed(1);
        $("#tempf").html("Temp: " + fTemp + " °C");
        $("#humidityf").html("Humidity: " + json.list[39].main.humidity);



    });
}


// on click delete city button function
// remove city from localstorage
// call button list function

// button list function
// gets localstorage
// displays buttons for previously searched cities

// geolocation function
// detect location, convert to city string
// calls ajax

// start doc
// call button list function
// call geolocation


// On click function to get data entered in search box. Returns as citySelected
$("#searchButton").click(function (event) {
    event.stopPropagation();
    console.log("Clicked " + $(this).parent().children("#textInput").attr("id"));
    console.log("Parent ID: " + $(this).parent().attr("id"));
    if ($(this).parent().attr("id") === "searchForm") {

        citySelected = $("#textInput").val().trim();
    }
    console.log("city entered: " + citySelected);
    getForecast();
    getWeather();
});

