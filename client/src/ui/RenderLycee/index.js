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
    let fillieres = {};
    let postbacCount = 0;

    lycee.candidats.forEach(candidat => {
        let code = candidat.Baccalaureat.SerieDiplomeCode;
        fillieres[code] = (fillieres[code] || 0) + 1;
        if (candidat.Baccalaureat.TypeDiplomeLibelle === 'Baccalauréat obtenu') {
            postbacCount += 1;
        }
    });

    let fillieresHtml = '<br>Filières:<br><ul>';
    for (let [filiere, count] of Object.entries(fillieres)) {
        fillieresHtml += `<li>${filiere}: ${count} candidats</li>`;
    }
    fillieresHtml += '</ul>';

    marker.bindPopup(`<b>${lycee.appellation_officielle}</b><br>Nombre de candidats : ${lycee.candidats.length}<br>Postbac candidats : ${postbacCount}<br>${fillieresHtml}<br>`);
    
    return marker;
}

let rendercluster = function (data){
    
    let cluster = L.markerClusterGroup({
        zoomToBoundsOnClick: false,
        disableClusteringAtZoom: 13,
    });

    cluster.on('clusterclick', function (a) {
        let totalCandidates = 0;
        let totalPostbacs = 0;
        let streams = { 'Générale': 0, 'STI2D': 0, 'Autre': 0 };

        a.layer.getAllChildMarkers().forEach(marker => {
            const popupContent = marker.getPopup().getContent();
            const match = popupContent.match(/Nombre de candidats : (\d+)/);
            if (match) {
                totalCandidates += parseInt(match[1], 10);
            }
            const postbacMatch = popupContent.match(/Postbac candidats : (\d+)/);
            if (postbacMatch) {
                totalPostbacs += parseInt(postbacMatch[1], 10);
            }
            const filiereMatch = popupContent.match(/Filières:<br><ul>(.*?)<\/ul>/);
            if (filiereMatch) {
                const items = filiereMatch[1].split('<li>').slice(1);
                items.forEach(item => {
                    const [filiere, count] = item.replace('</li>', '').split(': ');
                    if (filiere == 'STI2D' || filiere == 'Générale' ) {
                        streams[filiere] += parseInt(count.replace(' candidats', ''), 10);
                    
                    } else {
                        streams['Autre'] += parseInt(count.replace(' candidats', ''), 10);
                    }
                });
            }
        });
        let streamDetails = '';
        for (let [filiere, count] of Object.entries(streams)) {
            streamDetails += `${filiere}: ${count} candidats<br>`;
        }
        L.popup()
            .setLatLng(a.latlng)
            .setContent(`Nombre total de candidats : ${totalCandidates}<br>Nombre total de postbac : ${totalPostbacs}<br>${streamDetails}`)
            .openOn(map);
    });
    
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