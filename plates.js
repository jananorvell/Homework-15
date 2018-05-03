var queryUrl2 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

d3.json(queryUrl2, function(data) {
  createFeatures(data.features);
});

function createFeatures(faultData) {
  console.log(faultData);

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.PlateName + "</h3>");
  }

  var faults = L.geoJSON(faultData, {
    onEachFeature: onEachFeature
  });

  createMap(faults);
}

function createMap(faults) {

  let mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
  let accessToken = 'pk.eyJ1IjoicmluY2tkIiwiYSI6ImNpamc3ODR1aDAxMmx0c2x0Zm9lc3E1OTAifQ.pIkP7PdJMrR5TBIp93Dlbg';
  let streetMap = L.tileLayer(mapboxUrl, {id: 'mapbox.dark', maxZoom: 20, accessToken: accessToken});

  var baseMaps = {
    "Dark Map": streetMap
  };

  var overlayMaps = {
    Faults: faults
  };

  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [streetMap, faults]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
