import { HeaderView } from "./ui/header/index.js";
import { Candidats } from "./data/data-candidats.js";

import { Lycees } from "./data/data-lycees.js";
import { CodePostaux } from "./data/data-postaux.js";
import { rendercluster, renderlycee } from "./ui/RenderLycee/index.js";

import './index.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



let C = {};

C.init = async function(){
    let datalycee =  Lycees.getLyceecandidat();
    let tempPall = CodePostaux.getAll();
    let temppostlat = CodePostaux.getPostlat();
    // let temp = Lycees.getpostbac();
    console.log(datalycee, tempPall, temppostlat);
    V.init(datalycee);
}




// C.loadLyceeCandidat = async function(){
    
//     let data = Lycees.getLyceecandidat();
//     V.rendermap(data);

// }


let V = {
    header: document.querySelector("#header"),
    map : document.querySelector("#map")
};

V.init = function(datalycee){
    V.renderHeader();
    V.rendercluster(datalycee);
    
    
}

V.renderHeader= function(){
    V.header.innerHTML = HeaderView.render();
}

V.rendercluster= function (datalycees){
    rendercluster(datalycees);
}

V.rendermap = function(Lycees){
    // renderlycee(Lycees);
    
}















C.init();