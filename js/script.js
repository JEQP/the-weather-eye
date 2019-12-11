
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

// gets the weather information from openweathermap.org
// forecast weather
// takes data from returned json object and displays it in current-info
function getWeather() {

    var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySelected + "&APPID=" + API_KEY;
    console.log("URL: " + weatherURL);

    $.getJSON(weatherURL, function (json) {
        console.log(json);
        $("#city").html(citySelected);
        $("#main_weather").html(json.list[0].weather[0].main);
        $("#description_weather").html(json.list[0].weather[0].description);
        // var weatherIcon=json.list[0]weather[0].icon;
        // var iconURL="http://openweathermap.org/img/w/" + weatherIcon + ".png";
        // $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.list[0]weather[0].icon + ".png");
        $("#temperature").html(json.list[0].main.temp);
        $("#pressure").html(json.list[0].main.pressure);
        $("#humidity").html(json.list[0].main.humidity);
        // console.log("Date: "+sdf.format(json.list[0].dt * 1000);
        var a = new Date(json.list[0].dt * 1000); // current weather
        var b = new Date(json.list[7].dt * 1000); // 24 hours later
        var c = new Date(json.list[15].dt * 1000); // 48 hours later
        var d = new Date(json.list[23].dt * 1000); // 72 hours later
        var e = new Date(json.list[31].dt * 1000); // 96 hours later
        var f = new Date(json.list[39].dt * 1000); // 120 hours later
        $("#a").html(a);
        $("#b").html(b);
        $("#c").html(c);
        $("#d").html(d);
        $("#e").html(e);
        $("#f").html(f);

        // $("#a").html(json.list[0].dt);
        // $("#b").html(json.list[1].dt);
        // $("#c").html(json.list[2].dt);
        // $("#d").html(json.list[3].dt);
        // $("#e").html(json.list[4].dt);
        // $("#f").html(json.list[5].dt);
        // console.log("dt a: " +a);
        // console.log("dt b: " +b);
        // console.log("dt c: " +c);
        // console.log("dt d: " +d);
        // console.log("dt e: " +e);
        // console.log("dt f: " +f);
        // var date = a.getDate();
        // console.log("date: "+date);

    });
}
// function timeConverter(UNIX_timestamp){
//     var a = new Date(UNIX_timestamp * 1000);
//     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//     var year = a.getFullYear();
//     var month = months[a.getMonth()];
//     var date = a.getDate();
//     var hour = a.getHours();
//     var min = a.getMinutes();
//     var sec = a.getSeconds();
//     var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
//     return time;
//   }


// ajax function
// takes required string = city and date = and gets info from weather service
// calls current city function
// calls forecast function



// forecast function
// takes data from returned json object and displays it in forecast-info

// function getForecast(){




    
//     var forecastURL = "http://api.openweathermap.org/data/2.5/weather?q="+citySelected+",AU&APPID=" + API_KEY; // should get five days of weather forecast

//     $.getJSON(forecastURL, function (JSON) {
//         console.log(JSON);
//     });
// }


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
    getWeather();
    getForecast();
});

