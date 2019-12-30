
var citySelected = "string";
var API_KEY = "8d81f57ecd6887950a785296ebf29d30";
var cityListArray = [];
var currentWeatherURL = "string";
var uvURL = "string";
var weatherURL = "string";
const API_KEY_AQ = "db37dfcafd8cb5d9d27b6dce03d92f0fd89ebf44";
var aqURL = "string";
// SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

// On click Search function
// takes input from search form, converts to city string
// calls ajax
// adds city to button list if it is not there
// When save icon is clicked, gets hourText from storage, checks it exists, parses to an array. Changes relevant text based on user input, saves array, calls display function


function buttonList() {

    var cityListString = localStorage.getItem("citiesSearched"); // this is the string from the local storage
    //convert string toDoList into array daysActivities
    if (cityListString === null) {
        cityListArray = [citySelected];
        $("#cityButtons").html("");
        $("#cityButtons").empty();
    
        for (x in cityListArray) {
            $("#cityButtons").append("<br><button type='button' class='btn btn-primary m-1'>" + cityListArray[x] + "</button><button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
        }
    
    }
    else {
        cityListArray = JSON.parse(cityListString);
        // NEED TO CHECK IF citySelected is in the array already
        // need to check if city exists
        if (cityListArray.includes(citySelected)) {

        }
        else {
            cityListArray.push(citySelected);
        }
        $("#cityButtons").html("");
        $("#cityButtons").empty();
    
        for (x in cityListArray) {
            $("#cityButtons").append("<br><button type='button' class='btn btn-primary m-1'>" + cityListArray[x] + "</button><button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
        }
    
    }
    // $("#cityButtons").html("");
    // $("#cityButtons").empty();

    // for (x in cityListArray) {
    //     $("#cityButtons").append("<br><button type='button' class='btn btn-primary m-1'>" + cityListArray[x] + "</button><button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
    // }

    // restore city list

    cityListString = JSON.stringify(cityListArray);
    localStorage.setItem("citiesSearched", cityListString);

    $(".close").on("click", function (event) {
        event.stopPropagation();
        console.log("x clicked");
        citySelected = $(this).prev().text(); // this will select the previous button to the one clicked, which will be the city button
        console.log("citySelected: " + citySelected)
        cityListArray.splice($.inArray(citySelected, cityListArray), 1);

        // $("#cityButtons").html("");
        // $("#cityButtons").empty();

        // for (x in cityListArray) {
        //     $("#cityButtons").append("<div><button type='button' class='btn btn-primary m-1'>" + cityListArray[x] + "</button><button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
        // }
        cityListString = JSON.stringify(cityListArray);
        localStorage.setItem("citiesSearched", cityListString);
        popCityList();
    });

    $(".btn").on("click", function (event) {
        event.stopPropagation();
        citySelected = $(this).text();
        getWeather();
        getForecast();
    });


}




// on click button function
// takes the city from the search form, converts to city string
// calls ajax


function getWeather() {

    if (location.protocol === 'http:') {
        currentWeatherURL = "http://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + citySelected + "&APPID=" + API_KEY;
    } else {
        currentWeatherURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + citySelected + "&APPID=" + API_KEY;
    }



    $.getJSON(currentWeatherURL, function (response) {
        $("#cityCurrent").html(response.name);
        var a = new Date(response.dt * 1000);

        var month = "" + (a.getMonth() + 1);
        var day = a.getDate();
        var year = "" + a.getFullYear();
        var dateCurrent = [day, month, year].join("-");



        $("#dateCurrent").html(dateCurrent);
        var currentIcon = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + currentIcon + ".png";
        $("#iconCurrent").attr("src", iconURL);
        var cTemp = response.main.temp - 273.15;
        cTemp = cTemp.toFixed(1);


        var hour = a.getHours();
        if (hour.toString().length < 2) {
            hour = "0" + hour;
        }

        var min = a.getMinutes();
        if (min.toString().length < 2) {
            min = "0" + min;
        }
        var tempTime = [hour, min].join(":");


        $("#tempCurrent").html("Temperature at " + tempTime + ": " + cTemp + " °C");
        $("#humidityCurrent").html("Humidity: " + response.main.humidity);
        var wSpeed = response.wind.speed * 3.6;
        wSpeed = wSpeed.toFixed(1);
        $("#windCurrent").html("Wind Speed: " + wSpeed + " kph");

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        if (location.protocol === 'http:') {
            uvURL = "http://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/uvi?appid=" + API_KEY + "&lat=" + lat + "&lon=" + lon;
        } else {
            uvURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/uvi?appid=" + API_KEY + "&lat=" + lat + "&lon=" + lon;
        }

        // Get UV index and display it, changing colour based on value

        $.getJSON(uvURL, function (uvResponse) {
            // console.log("uvURL: "+uvURL);
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

        // Air quality API call based on geolocation. (the colons in the documentation are superfluous). Change colour based on level.

        if (location.protocol === 'http:') {
            aqURL = "http://api.waqi.info/feed/geo:" + lat + ";" + lon + "/?token=" + API_KEY_AQ;
        }
        else {
            aqURL = "https://api.waqi.info/feed/geo:" + lat + ";" + lon + "/?token=" + API_KEY_AQ;
        }


        $.getJSON(aqURL, function (aqResponse) {

            $("#aqCurrent").html('Air Quality Index: ' + aqResponse.data.aqi);

            if (aqResponse.data.aqi < 51) {
                $("#aqCurrent").css('color', 'teal');
            }
            if (aqResponse.data.aqi > 50 && aqResponse.data.aqi < 101) {
                $("#aqCurrent").css('color', 'gold');
            }
            if (aqResponse.data.aqi > 100 && aqResponse.data.aqi < 151) {
                $("#aqCurrent").css('color', 'coral');
            }
            if (aqResponse.data.aqi > 150 && aqResponse.data.aqi < 201) {
                $("#aqCurrent").css('color', 'crimson');
            }
            if (aqResponse.data.aqi > 200 && aqResponse.data.aqi < 301) {
                $("#aqCurrent").css('color', 'indigo');
            }
            if (aqResponse.data.aqi > 300) {
                $("#aqCurrent").css('color', 'maroon');
            }


        });




        // If the callback fails, ensure that the city is not included in the string
    }).fail(function () {
        var cityListString = localStorage.getItem("citiesSearched"); // this is the string from the local storage
        cityListArray = JSON.parse(cityListString);
        if (cityListArray.includes(citySelected)) {
            cityListArray.pop(); // This will remove the last entry in the array, which SHOULD be and ONLY be the erroneous entry 
        }

        // redo button list and save array
        $("#cityButtons").html("");
        $("#cityButtons").empty();

        for (x in cityListArray) {
            $("#cityButtons").append("<br><button type='button' class='btn btn-primary m-1'>" + cityListArray[x] + "</button><button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
        }
        cityListString = JSON.stringify(cityListArray);
        localStorage.setItem("citiesSearched", cityListString);
    });


}




// gets the weather information from openweathermap.org
// forecast weather
// takes data from returned json object and displays it in forecast-info
function getForecast() {

    if (location.protocol === 'http:') {
        weatherURL = "http://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + citySelected + "&APPID=" + API_KEY;
    } else {
        weatherURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + citySelected + "&APPID=" + API_KEY;
    }


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
        $("#tempb").html("<br></br>Temp: " + bTemp + "°C");
        $("#humidityb").html("<br></br>Humidity: " + json.list[7].main.humidity);

        var c = new Date(json.list[15].dt * 1000); // 48 hours later
        var cmonth = "" + (c.getMonth() + 1);
        var cday = c.getDate();
        var cyear = "" + c.getFullYear();
        var datec = [cday, cmonth, cyear].join("-");
        $("#c").html(datec);
        $("#iconc").attr("src", "http://openweathermap.org/img/w/" + json.list[15].weather[0].icon + ".png");
        var cTemp = json.list[15].main.temp - 273.15;
        cTemp = cTemp.toFixed(1);
        $("#tempc").html("<br></br>Temp: " + cTemp + "°C");
        $("#humidityc").html("<br></br>Humidity: " + json.list[15].main.humidity);

        var d = new Date(json.list[23].dt * 1000); // 72 hours later
        var dmonth = "" + (d.getMonth() + 1);
        var dday = d.getDate();
        var dyear = "" + d.getFullYear();
        var dated = [dday, dmonth, dyear].join("-");
        $("#d").html(dated);
        $("#icond").attr("src", "http://openweathermap.org/img/w/" + json.list[23].weather[0].icon + ".png");
        var dTemp = json.list[23].main.temp - 273.15;
        dTemp = dTemp.toFixed(1);
        $("#tempd").html("<br></br>Temp: " + dTemp + "°C");
        $("#humidityd").html("<br></br>Humidity: " + json.list[23].main.humidity);



        var e = new Date(json.list[31].dt * 1000); // 96 hours later
        var emonth = "" + (e.getMonth() + 1);
        var eday = e.getDate();
        var eyear = "" + e.getFullYear();
        var datee = [eday, emonth, eyear].join("-");
        $("#e").html(datee);
        $("#icone").attr("src", "http://openweathermap.org/img/w/" + json.list[31].weather[0].icon + ".png");
        var eTemp = json.list[31].main.temp - 273.15;
        eTemp = eTemp.toFixed(1);
        $("#tempe").html("<br></br>Temp: " + eTemp + "°C");
        $("#humiditye").html("<br></br>Humidity: " + json.list[31].main.humidity);


        var f = new Date(json.list[39].dt * 1000); // 120 hours later
        var fmonth = "" + (f.getMonth() + 1);
        var fday = f.getDate();
        var fyear = "" + f.getFullYear();
        var datef = [fday, fmonth, fyear].join("-");
        $("#f").html(datef);
        $("#iconf").attr("src", "http://openweathermap.org/img/w/" + json.list[39].weather[0].icon + ".png");
        var fTemp = json.list[39].main.temp - 273.15;
        fTemp = fTemp.toFixed(1);
        $("#tempf").html("<br></br>Temp: " + fTemp + "°C");
        $("#humidityf").html("<br></br>Humidity: " + json.list[39].main.humidity);



    });
}







// Checks for saved cities when page loads and adds them 
$(document).ready(function popCityList() {
    var cityListString = localStorage.getItem("citiesSearched"); // this is the string from the local storage
    if ($("#cityCurrent").text() == "") {
        getLocation();
    }
    if (cityListString === null) {
        return;
    }
    else {
        cityListArray = JSON.parse(cityListString);
        $("#cityButtons").html("");
        $("#cityButtons").empty();

        for (x in cityListArray) {
            $("#cityButtons").append("<br><button type='button' class='btn btn-primary m-1'>" + cityListArray[x] + "</button><button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
        }
    }


    // Delete from list

    $(".close").click(function (event) {
        event.stopPropagation();
        console.log("x clicked");
        citySelected = $(this).prev().text(); // this will select the previous button to the one clicked, which will be the city button
        console.log("citySelected: " + citySelected)
        cityListArray.splice($.inArray(citySelected, cityListArray), 1);

        // $("#cityButtons").html("");
        // $("#cityButtons").empty();

        // for (x in cityListArray) {
        //     $("#cityButtons").append("<div><button type='button' class='btn btn-primary m-1'>" + cityListArray[x] + "</button><button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
        // }
        cityListString = JSON.stringify(cityListArray);
        localStorage.setItem("citiesSearched", cityListString);
        popCityList();


    })

    // select city to display
    $(".btn").click(function (event) {
        event.stopPropagation();
        citySelected = $(this).text();
        getWeather();
        getForecast();


    })
});

//gets geolocation from browser
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
// shows weather based on geolocation when page loads
function showPosition(position) {

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    if (location.protocol === 'http:') {
        startURL = "http://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY;
    } else {
        startURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY;
    }
    console.log("startURL: " + startURL);



    $.getJSON(startURL, function (response) {
        $("#cityCurrent").html(response.name);
        if (response.name == "") {
            $("#cityCurrent").html("Local Weather");
        }

        citySelected = response.name;
        getWeather();
        getForecast();


        // If the callback fails, ensure that the city is not included in the string
    }).fail(function () {
        $("#cityCurrent").html("Location Undetected");
    });


}

$(".close").on("click", function (event) {
    event.stopPropagation();
    console.log("x clicked");
    citySelected = $(this).prev().text(); // this will select the previous button to the one clicked, which will be the city button
    console.log("citySelected: " + citySelected)
    cityListArray.splice($.inArray(citySelected, cityListArray), 1);

    // $("#cityButtons").html("");
    // $("#cityButtons").empty();

    // for (x in cityListArray) {
    //     $("#cityButtons").append("<div><button type='button' class='btn btn-primary m-1'>" + cityListArray[x] + "</button><button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
    // }
    cityListString = JSON.stringify(cityListArray);
    localStorage.setItem("citiesSearched", cityListString);
    popCityList();
});

$(".btn").on("click", function (event) {
    event.stopPropagation();
    citySelected = $(this).text();
    getWeather();
    getForecast();
});

// On click function to get data entered in search box. Returns as citySelected
$("#searchButton").click(function (event) {
    event.stopPropagation();

    if ($(this).parent().attr("id") === "searchForm") {

        citySelected = $("#textInput").val().trim();
    }

    getForecast();
    getWeather();
    buttonList();
});

$("#textInput").on('keyup', function (event) {

    if (event.keyCode === 13) {
        $("#searchButton").click();

    }
});