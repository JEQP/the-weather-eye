

// On click Search function
// takes input from search form, converts to city string
// calls ajax
// adds city to button list if it is not there

// on click button function
// takes the city from the button, converts to city string
// calls ajax

// ajax function
// takes required string = city and date = and gets info from weather service
// calls current city function
// calls forecast function

// current city function
// takes data from returned json object and displays it in current-info

// forecast function
// takes data from returned json object and displays it in forecast-info

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