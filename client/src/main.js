import { HeaderView } from "./ui/header/index.js";
import { Candidats } from "./data/data-candidats.js";
import { Lycees } from "./data/data-lycees.js";

import './index.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


let C = {};

C.init = async function(){
    V.init();
    C.loadMarkerLycee();
    console.log(Candidats.getAll());
    console.log(Lycees.getAll());
}

C.loadMarkerLycee = function(){

    Lycees.getAll().forEach((lycee, index) => {
        if (index === 0) {
            return;
        }

        if (lycee.latitude === "" || lycee.longitude === "") {
            return;
        }
        V.renderMarkerLycee(lycee);
    });
}



let V = {
    header: document.querySelector("#header")
};

V.init = function(){
    V.renderHeader();
    V.loadmap();
}

V.renderHeader= function(){
    V.header.innerHTML = HeaderView.render();
}

let map;

V.loadmap = function(){
    map = L.map('map').setView([45.838643, 1.261065], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
} // la map appartient au modèle de la vue car elle est l'affichage de la vue

V.renderMarkerLycee = function(lycee){
    L.marker([parseFloat(lycee.latitude), parseFloat(lycee.longitude)]).addTo(map);
};













C.init();