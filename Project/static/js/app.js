function createMap(earthquake) {
    // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {

    "Earth Quakes": earthquake
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [20.0, 5.0],
    minzoom: 2.2,
    zoom: 3,
    layers: [lightmap, earthquake]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}
function createMarkers(response) {

    // Pull the "earthquakeData" property off of response.data
    var earthquakeData = response.features;
    console.log(earthquakeData)
  
    // Initialize an array to hold bike markers
    var earthquakeLocations = [];
    var magnatudes = [];
    
    // Loop through the earthquakeData array
    for (var index = 0; index < earthquakeData.length; index++) {
      var quakeData = earthquakeData[index];

      //code is currently breaking here.  Pickup here
  
      // For each station, create a marker and bind a popup with the station's name
      var earthquakeLocation = L.circle([quakeData["geometry"]["coordinates"]["1"], quakeData["geometry"]["coordinates"]["0"]])
        .bindPopup("<h3>" + quakeData["properties"]["place"] + "<h3><h3>Capacity: " + quakeData["properties"]["mag"] + "<h3>");
  
      // Add the marker to the bikeMarkers array
      earthquakeLocations.push(earthquakeLocation);

    }
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(earthquakeLocations));
  }
  
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", createMarkers);