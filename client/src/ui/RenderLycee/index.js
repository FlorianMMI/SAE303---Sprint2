import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


var map = L.map('map').setView([45.838643, 1.261065], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);


let renderlycee = function(data) {

    data.forEach((lycee, index) => {
        if (index === 0) {
            return;
        }

        if (lycee.latitude === "" || lycee.longitude === "") {
            return;
        }
        
        L.marker([parseFloat(lycee.latitude), parseFloat(lycee.longitude)]).addTo(map)
           
    })

}


export { renderlycee };