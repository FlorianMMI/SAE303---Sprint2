import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';


var map = L.map('map').setView([45.838643, 1.261065], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);


let markers = [];

let renderlycee = function(data) {
    markers = []; // Clear existing markers

    departmentCluster.clearLayers();
    cityCluster.clearLayers();
    lyceeCluster.clearLayers();

    data.forEach((lycee, index) => {
        let nbcandidat = lycee.candidats.length;
        console.log(nbcandidat)
        if (index === 0) {
            return;
        }

        if (lycee.latitude === "" || lycee.longitude === "") {
            return;
        }
        
        markers.push(L.marker([parseFloat(lycee.latitude), parseFloat(lycee.longitude)])
            .bindPopup(`<b>${lycee.appellation_officielle}</b><br>Nombre de candidats : ${nbcandidat}`));
           
    })
}


const departmentCluster = L.markerClusterGroup();
const cityCluster = L.markerClusterGroup();
const lyceeCluster = L.markerClusterGroup();

map.addLayer(departmentCluster);

map.on('zoomend', () => {
    const zoom = map.getZoom();
    map.removeLayer(departmentCluster);
    map.removeLayer(cityCluster);
    map.removeLayer(lyceeCluster);

    if (zoom < 6) {
        map.addLayer(departmentCluster);
    } else if (zoom >= 6 && zoom < 10) {
        map.addLayer(cityCluster);
    } else {
        map.addLayer(lyceeCluster);
    }
});

const addMarkerToCluster = (marker) => {
    departmentCluster.addLayer(marker);
    cityCluster.addLayer(marker);
    lyceeCluster.addLayer(marker);
};

let rendercluster = function() {
    markers.forEach((marker) => {
        addMarkerToCluster(marker);
    });
};


export { renderlycee };
export { rendercluster };