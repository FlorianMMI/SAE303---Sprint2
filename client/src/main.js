import { HeaderView } from "./ui/header/index.js";
import { Candidats } from "./data/data-candidats.js";
import { Lycees } from "./data/data-lycees.js";
import { renderlycee } from "./ui/RenderLycee/index.js";

import './index.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


let C = {};

C.init = async function(){
    V.init();
}

let Lycee = Lycees.getAll();



let V = {
    header: document.querySelector("#header"),
    map : document.querySelector("#map")
};

V.init = function(){
    V.renderHeader();
    V.rendermap(Lycee);
    
}

V.renderHeader= function(){
    V.header.innerHTML = HeaderView.render();
}

V.rendermap = function(Lycees){
    
    renderlycee(Lycees);
}















C.init();