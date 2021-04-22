
// // Creating map object
// var myMap = L.map("mapid", {
//   center: [37.09, -95.71],
//   zoom: 11
// });
//const API_KEY = "pk.eyJ1IjoiZG9yaXNha3BvdndhIiwiYSI6ImNrbmdsMjcydDIwMXIydW5zcmkzdmhrNzYifQ.3W6eNrRUwMFB3hmq8KIRkw";

// Assemble API query URL and Store API query variables
const baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab the data with d3
// d3.json(baseURL).then(function(data) {
//   console.log(data.features);
// });

///vvvvvvvvvvvv
// Store our API endpoint inside queryUrl
// var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
//   "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Perform a GET request to the query URL
d3.json(baseURL,function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});
// Define a function to colour the earthquake depths by colour 
function depthcolor(depth) {
  if (depth > 90) return "white"
  else if (depth > 70) return "green"
  else if (depth > 50) return "blue"
  else if (depth > 30) return "yellow"
  else if (depth > 10) return "orange"
  else return "red"
}
function createFeatures(earthquakeData) {
// Define a function to run once for each feature in the features array
// Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + (feature.properties.mag=" ","magnitude") + feature.geometry.coordinates[2] +"</p>");
  }
// Create a GeoJSON layer containing the features array on the earthquakeData object
// Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
   pointToLayer: function (feature, latlng) {
     return new L.circle(latlng, {
       radius: feature.properties.mag * 20000, 
       color: "grey", fillColor: depthcolor(feature.geometry.coordinates[2]),
       opacity: 0.5, fillOpacity: 0.3, stroke: true, weight: 0.5
     })
   },
   onEachFeature: onEachFeature
  });
// Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}
function createMap(earthquakes) {
// Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

/////////
// /********************************************************/
// function createMHIMap(mhiData) {
//   let options = {
//     onEachFeature: onEachFeature,
//     style: onStyle,
//     filter: onFilter,
//     valueProperty: "MHI2016", // which property in the features to use
//     scale: ["red", "blue"], // chroma.js scale - include as many as you like
//     steps: 15, // number of breaks or steps in range
//     mode: "q", // q for quantile, e for equidistant, k for k-means
//   };
//   let geojsonLayer = L.choropleth(mhiData, options);
//   geojsonLayer.addTo(myMap);
//   //console.log(geojsonLayer.options.colors);
//   console.log(feature.properties.mag);
//   //console.log(geojsonLayer.options.limits);
//   console.log(feature.geometry.coordinates[2]);
//   /*************************************************/
//   function onFilter(feature) {
//     if (feature.properties.MHI2016) {
//       return true;
//     }
//     return false;
//   }

// /////
// var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function () {
//     var div = L.DomUtil.create("div", "info legend");
//     var limits = geojsonLayer.options.limits;
//     var colors = geojsonLayer.options.colors;
//     var labels = [];
//     // // Add min & max
//     var legendInfo = `<h1>Median Income</h1>
//       <div class="labels">
//       <div class="min">
//       ${limits[0]}
//       </div>
//       <div class="max">
//       ${limits[limits.length - 1]}
//       </div>
//       </div>`;
//     legendInfo += "<ul>";
//     limits.forEach(function (limit, index) {
//       legendInfo += `<li style="background-color:${colors[index]}"></li>`;
//     });
//     legendInfo += "</ul>";
//     div.innerHTML = legendInfo;
//     return div;
//   };
//   legend.addTo(myMap);
// }

//vvvvvvvv
// // Adding tile layer to the map
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(myMap);

  // Create a new marker cluster group

  // Loop through data

    // Set the data location property to a variable

    // Check for location property

      // Add a new marker to the cluster group and bind a pop-up

  // Add our marker cluster layer to the map
