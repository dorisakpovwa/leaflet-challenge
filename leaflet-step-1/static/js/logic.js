
// Assemble API query URL and Store API query variables
const baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab the data with d3
// d3.json(baseURL).then(function(data) {
//   console.log(data.features);
// });

// Perform a GET request to the query URL
d3.json(baseURL, function (data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});
// Define a function to colour the earthquake depths by colour 
function depthcolor(depth) {

  if (depth > 90) return "purple"
  //else if (depth > 90) return "blue"
  else if (depth > 70) return "blue"
  else if (depth > 50) return "green"
  else if (depth > 30) return "red"
  else if (depth > 10) return "orange"
  else return "yellow"

}
function createFeatures(earthquakeData) {
  // Define a function to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + "magnitude:" + feature.properties.mag + "<hr>"+ "depth:" +feature.geometry.coordinates[2] + "</p>");
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
/////
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
    Earthquakes: earthquakes,
   // TectonicPlate : tectonic
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

var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
        depth = [-10, 10, 30, 50, 70, 90]
     //   colors = ["yellow", "orange", "red", "green", "blue", "purple"]

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < depth.length; i++) {
        div.innerHTML +=
            '<i style="background:' + depthcolor(depth[i] + 1) + '"></i> ' +
            depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+' + "<br>");
    }

    return div;
};


legend.addTo(myMap);

}
// var earthquake_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// d3.json(earthquake_url, function (quakeData) {
//   L.geoJSON(quakeData, {
//     color: "purple",
//     weight: .8
//   }).addTo(tectonic); 
// tectonic.addTo(myMap);
// })



/////////
// /********************************************************/

  // Create a new marker cluster group

  // Loop through data

    // Set the data location property to a variable

    // Check for location property

      // Add a new marker to the cluster group and bind a pop-up

  // Add our marker cluster layer to the map


//////////
// var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function () {
//     var div = L.DomUtil.create("div", "info legend");
//     //var limits = geojsonLayer.options.limits;

//     var legendInfo = "<h1>Color LEGEND</h1> <div> <ul> <li> green <= 5 </li> </ul> </div>";

//     div.innerHTML = legendInfo;
//     return div;
//   };
//   legend.addTo(myMap);
/////////////////////
// function createLegend() {
//   var info = L.control({ position: "bottomright" });
//   info.onAdd = function () {
//     var div = L.DomUtil.create("div", "legend");
///////////////////
//var limits = geojsonLayer.options.limits;

// var legendInfo = "<h1>Color LEGEND</h1> <div> <ul> <li> green <= 5 </li> </ul> </div>";

// div.innerHTML = legendInfo;
//     return div;
//   };
//   return info;
// }

// function updateLegend(data) {
//   depths = data.features.map(d => d.geometry.coordinates[2]);
//   limits = [0, 5, 10, 15, 20, 25, 30, 35]
//   colors = ["white", "yellow", "orange", "red", "green", "blue", "purple"]
//   var labels = [];
//   console.log(Math.min.apply(Math, depths));
//   limits.forEach(function (limit, index) {
//   labels.push("li style=\"background-color: " + colors[index] + "\></li>");
//   });

//   var html_legend = "<h1> EarthQuake </h1>" + "<div class=\"labels\">" +
//     "<div class=\"min\">" + Math.min.apply(Math, depths) + "</div>" +
//     "<div class=\"max\">" + Math.max.apply(Math, depths) + "</div>" +
//     "<ul>" + labels.join("") + "</ul>" +
//     "</div>";

//   div = d3.selectAll(".legend").html(html_legend);
// }
//////////////////