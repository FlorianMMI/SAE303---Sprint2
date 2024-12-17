import { Candidats } from "./data-candidats.js";

let data = await fetch("./src/data/json/lycees.json");
data = await data.json();

let Lycees = {}

Lycees.getAll = function(){ 
    return data;
}

Lycees.binarySearch = function(UAI) {
    let left = 0;
    let right = data.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (data[mid].numero_uai === UAI) {
            return data[mid];
        } else if (data[mid].numero_uai < UAI) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return null;
}


Lycees.getLyceecandidat = function(){
    data.shift();
    
    let candidats = Candidats.getAll();
    
    let compare = function(a, b){
        if (a.numero_uai < b.numero_uai){
            return -1;
        }
        if (a.numero_uai > b.numero_uai){
            return 1;
        }
    }
    data.sort(compare);

    console.log(data);
    for (let Candidat of candidats){

        let UAI;
        let nbannnecesure = 0;
        for (let annee of Candidat.Scolarite){
            if (annee.UAIEtablissementorigine){
                UAI = annee.UAIEtablissementorigine;
                break;
            }
            nbannnecesure++;
        }


            let lycee = Lycees.binarySearch(UAI);
            if (lycee){
                if (!lycee.candidats){
                    lycee.candidats = [];
                }
                lycee.candidats.push(Candidat);
            }

    }

    
    return data;
}


export { Lycees };