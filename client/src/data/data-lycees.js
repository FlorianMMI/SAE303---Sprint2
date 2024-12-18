import { Candidats } from "./data-candidats.js";
import { CodePostaux } from "./data-postaux.js";

let data = await fetch("./src/data/json/lycees.json");
data = await data.json();
data.shift();

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
    
    let candidats = Candidats.getAll();
    let villes = [];
    
    

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
        let codepostal;
        for (let annee of Candidat.Scolarite){
            if (annee.UAIEtablissementorigine){
                UAI = annee.UAIEtablissementorigine;
                codepostal = annee.CommuneEtablissementOrigineCodePostal;
                break;
            }
            
        }


            let lycee = Lycees.binarySearch(UAI);
            console.log("ceci est lycee dans datalycee", Candidat.Baccalaureat.TypeDiplomeCode);
            if (lycee){
                if (!lycee.candidats){
                    lycee.candidats = [];
                }
                lycee.candidats.push(Candidat);

               
            }
            else{
                if (codepostal){
                    codepostal = codepostal.slice(0, 2);
                    codepostal += "000";
                    let ville = CodePostaux.binarySearch(codepostal);
                    if  (ville){
                        if (!villes.includes(ville)){
                            ville.appellation_officielle = ville.nom_de_la_commune;
                            ville.latitude = ville._geopoint.split(",")[0] ;
                            ville.longitude = ville._geopoint.split(",")[1];
                            ville.numero_uai = ville.code_postal;
                            ville.candidats = [Candidat];
                            villes.push(ville);
                        }
                        else{
                            ville.candidats.push(Candidat);
                        }
                    }
                }
            }

    }

    
    data = data.filter(lycee => lycee.candidats && lycee.candidats.length > 0);
    data = data.concat(villes);
    console.log("ceci est data dans datalycee", data);
    return data;
}




Lycees.getLyceePostaux = function() {

}




export { Lycees };