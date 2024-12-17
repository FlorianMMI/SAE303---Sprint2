import { Candidats } from "./data-candidats.js";

let data = await fetch("./src/data/json/lycees.json");
data = await data.json();

let Lycees = {}

Lycees.getAll = function(){ 
    return data;
}

Lycees.getLyceecandidat = function(){
    data.shift();
    let candidats = Candidats.getAll();

    for (let Candidat of candidats){

        let UAI;
        let nbannnecesure = 0;
        for (let annee of Candidat.Scolarite){
            if (annee.UAIEtablissementorigine){
                UAI = annee.UAIEtablissementorigine;
                break
            }
            nbannnecesure++;
        }


            let lycee = data.find(lycee => lycee.numero_uai === UAI);
            if (lycee){
                if (!lycee.candidats){
                    lycee.candidats = [];
                }
                lycee.candidats.push(Candidat);
            }

    }

    
    return data;
}

Lycees.gettri = function(){
    return data.sort((a, b) => a.numero_UAI - b.numero_UAI);
}

export { Lycees };