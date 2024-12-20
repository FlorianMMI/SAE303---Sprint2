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
    let datadpt = Lycees.getdpt(datalycee);
    C.handlerslider(datadpt);
    V.init(datalycee, datadpt);
}


C.handlerslider = function(datadpt){
    let slider = document.querySelector("#slider");
    slider.addEventListener("change", function(){
        let value = slider.value;
        V.rendergraph(value, datadpt);
    });
}






let V = {
    header: document.querySelector("#header"),
    map : document.querySelector("#map")
};

V.init = function(datalycee, datadpt){
    V.renderHeader();
    V.rendercluster(datalycee);
    V.rendergraph(3, datadpt);
    
}

V.renderHeader= function(){
    V.header.innerHTML = HeaderView.render();
}

V.rendercluster= function (datalycees){
    rendercluster(datalycees);
    console.log("ceci est datalycee", datalycees);
}

V.rendergraph = function(value, datadpt){
    graph("chartdiv", value, datadpt);
}















C.init();