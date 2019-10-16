 // Create a all LayerGroups
 var layers = {
  Magnitude_Small: new L.LayerGroup(),
  Magnitude_Medium: new L.LayerGroup(),
  Magnitude_High: new L.LayerGroup()
};

var map = null

function createMap(earthquake) {
    // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });


  // Create the map object with options
 map = L.map("map-id", {
    center: [20.0, 5.0],
    minzoom: 2.2,
    zoom: 3,
    layers: [
      layers.Magnitude_Small,
      layers.Magnitude_Medium,
      layers.Magnitude_High
    ]
  });

  // ADd our lightmap to tile Layer to map
  lightmap.addTo(map);

  // Creat an overlays object to add to the layer control
  var overlays = {
    "Magnitude 4.5": layers.Magnitude_Small,
    "Magnitude 4.6 to 4.7": layers.Magnitude_Medium,
    "Magnitude 4.7+": layers.Magnitude_High
  };

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(null, overlays).addTo(map);
}
// create circles
function createCircles(response) {

    // Pull the "earthquakeData" property off of response.data
    var earthquakeData = response.features;
    console.log(earthquakeData)

    // create an object to keep the number of markes in each layer
  
    // Initialize an array to hold bike marker
    var earthquakeLocations = [];
    
    var circleCount ={
      Magnitude_Small: 0,
      Magnitude_Medium: 0,
      Magnitude_High: 0
    };
    
    var status;
    
    // Loop through the earthquakeData array
    for (var index = 0; index < earthquakeData.length; index++) {
      var quakeData = earthquakeData[index];
      // if quake is 4.5 than update status 
      if (quakeData["properties"]["mag"] == 4.5) {
        status = "Magnitude_Small"
      }
      // esle if quake is between 4.6 & 4.7 then update status to medium
      else if (quakeData["properties"]["mag"] >= 4.6 && quakeData["properties"]["mag"] <= 4.8) {
        status = "Magnitude_Medium"
      }
      else {
        status = "Magnitude_High"
      }

      // Update circleCount
      circleCount[status]++;

      
      // initialize circles
      var circleDesign = {
        Magnitude_Small: {radius: 150000, color: "green" },
        Magnitude_Medium: {radius: 250000, color: "yellow"},
        Magnitude_High: {radius: 500000, color: "red"}
        };

      // For each station, create a marker and bind a popup with the station's name
      var earthquakeLocation = L.circle([quakeData["geometry"]["coordinates"]["1"], quakeData["geometry"]["coordinates"]["0"]], {
        // fillOpacity
        radius: circleDesign[status]["radius"],
        color: circleDesign[status]["color"]
      });
      
      earthquakeLocation.addTo(layers[status]);

      earthquakeLocation.bindPopup("<h3>" + quakeData["properties"]["place"] + "<h3><h3>Capacity: " + quakeData["properties"]["mag"] + "<h3>");
  
      // Add the marker to the bikeMarkers array
      earthquakeLocations.push(earthquakeLocation);

    }
  
    // Create a layer group 
    createMap(L.layerGroup(earthquakeLocations));

    // Legend code here
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');

    labels = ['<strong>Earthquake Key</strong>'],
    categories = ["Magnitude 4.5 - Green", "Magnitude 4.6 to 4.8 - Yellow", "Magnitude 4.9+ - Red"];
      var colorKeys = [
        'Magnitude_Small',
        'Magnitude_Medium',
        'Magnitude_High'
      ]
    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + circleDesign[colorKeys[i]]["color"] + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    legend.addTo(map);
    
  }
  
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", createCircles);