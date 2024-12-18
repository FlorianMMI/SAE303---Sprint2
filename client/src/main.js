import { HeaderView } from "./ui/header/index.js";
import { Candidats } from "./data/data-candidats.js";

import { Lycees } from "./data/data-lycees.js";
import { CodePostaux } from "./data/data-postaux.js";
import { rendercluster, renderlycee } from "./ui/RenderLycee/index.js";
import { graph } from "./ui/Graph/graph.js";

import './index.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



let C = {};

C.init = async function(){
    let datalycee =  Lycees.getLyceecandidat();
    console.log(Lycees.getdpt());  
    V.init(datalycee);
}








let V = {
    header: document.querySelector("#header"),
    map : document.querySelector("#map")
};

V.init = function(datalycee){
    V.renderHeader();
    V.rendercluster(datalycee);
    V.rendergraph();
    
}

V.renderHeader= function(){
    V.header.innerHTML = HeaderView.render();
}

V.rendercluster= function (datalycees){
    rendercluster(datalycees);
}

V.rendergraph = function(){
    graph("chartdiv")
}















C.init();