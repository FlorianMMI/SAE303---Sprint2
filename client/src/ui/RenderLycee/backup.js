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

let renderlycee = function(lycee) {
    markers = []; // Clear existing markers

    departmentCluster.clearLayers();
    cityCluster.clearLayers();
    lyceeCluster.clearLayers();

    
        
        if (lycee.latitude === "" || lycee.longitude === "") {
            return;
        }
        
        markers.push(L.marker([parseFloat(lycee.latitude), parseFloat(lycee.longitude)])
            .bindPopup(`<b>${lycee.appellation_officielle}</b><br>Nombre de candidats : ${lycee.candidats.length}<br>fillière : ${lycee.candidats[0].Baccalaureat[0].SerieDiplomeLibelle}<br>`));
        

}



const departmentCluster = L.markerClusterGroup({
    zoomToBoundsOnClick: false}
);
const cityCluster = L.markerClusterGroup({
    zoomToBoundsOnClick: false});
const lyceeCluster = L.markerClusterGroup({
    zoomToBoundsOnClick: false});



map.addLayer(departmentCluster);

map.on('zoomend', () => {
    const zoom = map.getZoom();
    map.removeLayer(departmentCluster);
    map.removeLayer(cityCluster);
    map.removeLayer(lyceeCluster);

    if (zoom < 5) {
        map.addLayer(departmentCluster);
    } else if (zoom >= 5 && zoom < 10) {
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

departmentCluster.on('clusterclick', function (a) {
    const markers = a.layer.getAllChildMarkers();
    let totalCandidats = 0;
    let generale = 0;
    let sti2d = 0;
    let autre = 0;

    markers.forEach(marker => {
        const popupContent = marker.getPopup().getContent();
        const nombreMatch = popupContent.match(/Nombre de candidats : (\d+)/);
        const filiereMatch = popupContent.match(/fillière\s*:\s*(\w+)/i);

        if (nombreMatch) {
            const nombre = parseInt(nombreMatch[1], 10);
            totalCandidats += nombre;

            const filiere = filiereMatch ? filiereMatch[1].toLowerCase() : 'autre';
            if (filiere === 'générale') {
                generale += nombre;
            } else if (filiere === 'sti2d') {
                sti2d += nombre;
            } else {
                autre += nombre;
            }
        }
    });

    L.popup()
        .setLatLng(a.latlng)
        .setContent(
            `Nombre total de candidats : ${totalCandidats}<br>` +
            `Générale : ${generale}<br>` +
            `STI2D : ${sti2d}<br>` +
            `Autre : ${autre}`
        )
        .openOn(map);
});

cityCluster.on('clusterclick', function (a) {
    const markers = a.layer.getAllChildMarkers();
    let totalCandidats = 0;
    let generale = 0;
    let sti2d = 0;
    let autre = 0;

    markers.forEach(marker => {
        const popupContent = marker.getPopup().getContent();
        const nombreMatch = popupContent.match(/Nombre de candidats : (\d+)/);
        const filiereMatch = popupContent.match(/fillière\s*:\s*(\w+)/i);

        if (nombreMatch) {
            const nombre = parseInt(nombreMatch[1], 10);
            totalCandidats += nombre;

            const filiere = filiereMatch ? filiereMatch[1].toLowerCase() : 'autre';
            if (filiere === 'générale') {
                generale += nombre;
            } else if (filiere === 'sti2d') {
                sti2d += nombre;
            } else {
                autre += nombre;
            }
        }
    });

    L.popup()
        .setLatLng(a.latlng)
        .setContent(
            `Nombre total de candidats : ${totalCandidats}<br>` +
            `Générale : ${generale}<br>` +
            `STI2D : ${sti2d}<br>` +
            `Autre : ${autre}`
        )
        .openOn(map);
});

lyceeCluster.on('clusterclick', function (a) {
    const markers = a.layer.getAllChildMarkers();
    let totalCandidats = 0;
    let generale = 0;
    let sti2d = 0;
    let autre = 0;

    markers.forEach(marker => {
        const popupContent = marker.getPopup().getContent();
        const nombreMatch = popupContent.match(/Nombre de candidats : (\d+)/);
        const filiereMatch = popupContent.match(/fillière\s*:\s*(\w+)/i);

        if (nombreMatch) {
            const nombre = parseInt(nombreMatch[1], 10);
            totalCandidats += nombre;

            const filiere = filiereMatch ? filiereMatch[1].toLowerCase() : 'autre';
            if (filiere === 'générale') {
                generale += nombre;
            } else if (filiere === 'sti2d') {
                sti2d += nombre;
            } else {
                autre += nombre;
            }
        }
    });

    L.popup()
        .setLatLng(a.latlng)
        .setContent(
            `Nombre total de candidats : ${totalCandidats}<br>` +
            `Générale : ${generale}<br>` +
            `STI2D : ${sti2d}<br>` +
            `Autre : ${autre}`
        )
        .openOn(map);
});


export { renderlycee };
export { rendercluster };