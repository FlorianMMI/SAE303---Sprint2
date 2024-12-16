import { HeaderView } from "./ui/header/index.js";
import { Candidats } from "./data/data-candidats.js";

import { Lycees } from "./data/data-lycees.js";
import { renderlycee } from "./ui/RenderLycee/index.js";

import './index.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



let C = {};

C.init = async function(){
    await C.loadLyceeCandidat()
    console.log( await C.loadLyceeCandidat());
    V.init();
}


C.loadLyceeCandidat = async function(){
    let Lycee =  Lycees.getAll();
    let candidats = Candidats.getAll();

    let  data = [];

    

    for (let Candidat of candidats){
        for (let lycee of Lycee){
            
            if (Candidat.Scolarite[0].UAIEtablissementorigine == lycee.numero_uai){
                if (data.includes(lycee)) {
                    lycee.candidats.push(Candidat);
                    console.log(lycee.candidats)
                }
                else {
                    lycee.candidats = [Candidat];
                    console.log(lycee.candidats)
                    data.push(lycee);
                }
                
            }
        }
    }

    V.rendermap(data);

}


let V = {
    header: document.querySelector("#header"),
    map : document.querySelector("#map")
};

V.init = function(){
    V.renderHeader();
    
    
}

V.renderHeader= function(){
    V.header.innerHTML = HeaderView.render();
}

V.rendermap = function(Lycees){
    
    renderlycee(Lycees);
    
}















C.init();