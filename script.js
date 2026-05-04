var map = L.map('map').setView([48.8566, 2.3522], 12);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Layers
var trainStationLayer = L.layerGroup().addTo(map);
var busStationLayer = L.layerGroup().addTo(map);
var collegeLayer = L.layerGroup().addTo(map);
var universityLayer = L.layerGroup().addTo(map);
var radiusLayer = L.layerGroup();

fetch('data/paris.geojson')
  .then(res => res.json())
  .then(data => {

    L.geoJSON(data, {

      onEachFeature: function(feature, layer) {

        var amenity = feature.properties.amenity;
        var building = feature.properties.building;

        // FIX geometry
        var latlng = layer.getLatLng ? layer.getLatLng() : layer.getBounds().getCenter();


        // ======================
        // TRAIN STATION (FIXED TOTAL)
        if (building === "train_station") {

          var name = feature.properties.name || "Train Station";

          var marker = L.circleMarker(latlng, {
            radius: 6,
            fillColor: "#ff4d6d",
            color: "#fff",
            weight: 1,
            fillOpacity: 0.9
          });

          marker.bindPopup(`<b>${name}</b><br>Train Station`);

          trainStationLayer.addLayer(marker);

          // radius
          var circle = L.circle(latlng, {
            radius: 500,
            color: "#4cc9f0",
            fillOpacity: 0.1
          });

          radiusLayer.addLayer(circle);
        }


        // ======================
        // BUS STATION
        if (amenity === "bus_station") {

          var marker = L.circleMarker(latlng, {
            radius: 4,
            fillColor: "#f77f00",
            color: "#000",
            weight: 1,
            fillOpacity: 0.9
          });

          marker.bindPopup("Bus Station");

          busStationLayer.addLayer(marker);
        }


        // ======================
        // COLLEGE
        if (amenity === "college") {

          var marker = L.circleMarker(latlng, {
            radius: 4,
            fillColor: "#06d6a0",
            color: "#000",
            weight: 1,
            fillOpacity: 0.9
          });

          marker.bindPopup("College");

          collegeLayer.addLayer(marker);
        }


        // ======================
        // UNIVERSITY
        if (amenity === "university") {

          var marker = L.circleMarker(latlng, {
            radius: 5,
            fillColor: "#7209b7",
            color: "#000",
            weight: 1,
            fillOpacity: 0.9
          });

          marker.bindPopup("University");

          universityLayer.addLayer(marker);
        }

      }

    });

  });


// FILTER
document.addEventListener("change", function(e) {

  if (e.target.id === "train") {
    e.target.checked ? map.addLayer(trainStationLayer) : map.removeLayer(trainStationLayer);
  }

  if (e.target.id === "bus") {
    e.target.checked ? map.addLayer(busStationLayer) : map.removeLayer(busStationLayer);
  }

  if (e.target.id === "college") {
    e.target.checked ? map.addLayer(collegeLayer) : map.removeLayer(collegeLayer);
  }

  if (e.target.id === "university") {
    e.target.checked ? map.addLayer(universityLayer) : map.removeLayer(universityLayer);
  }

});