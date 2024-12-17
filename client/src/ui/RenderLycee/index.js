import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';




var map = L.map('map').setView([45.838643, 1.261065], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);




let renderlycee = function(lycee) {
    
        
        if (lycee.latitude === "" || lycee.longitude === "") {
            return;
        }
        
        let marker = L.marker([parseFloat(lycee.latitude), parseFloat(lycee.longitude)]);
            marker.bindPopup(`<b>${lycee.appellation_officielle}</b><br>Nombre de candidats : ${lycee.candidats.length}`);
            return marker
        

}

let rendercluster = function (data){
    
    let cluster = L.markerClusterGroup({
        zoomToBoundsOnClick: false}
    );
    
    for (let lycee of data){
        if (lycee.candidats){
            let marker = renderlycee(lycee);
            if (marker){
                cluster.addLayer(marker);
            }
        }
    }

    map.addLayer(cluster);
}




export { renderlycee };
export { rendercluster };