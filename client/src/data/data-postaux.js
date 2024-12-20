import { Candidats } from "./data-candidats.js";



let data = await fetch("./src/data/json/postaux.json");


data = await data.json();




let CodePostaux = {}
let compare = function(a, b){
    if (a.code_postal < b.code_postal){
        return -1;
    }
    if (a.code_postal > b.code_postal){
        return 1;
    }
}

data.sort(compare);

CodePostaux.getAll = function(){
    return data;
}

CodePostaux.binarySearch = function(code) {
    let left = 0;
    let right = data.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (data[mid].code_postal === code) {
            return data[mid];
        } else if (data[mid].code_postal < code) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return null;
}


CodePostaux.getPostlat = function(){

    
    /**
     * Transforme les données de la commune en un tableau d'objets avec latitude et longitude.
     *
     * @param {Array} data - Tableau d'objets contenant les informations des communes.
     * @param {string} data[].nom_de_la_commune - Nom de la commune.
     * @param {string} data[].code_postal - Code postal de la commune.
     * @param {string} data[]._geopoint - Coordonnées géographiques de la commune sous forme de chaîne de caractères "latitude,longitude".
     * @returns {Array} Tableau d'objets contenant les informations des communes avec latitude et longitude.
     * @returns {string} temp[].nom_de_la_commune - Nom de la commune.
     * @returns {string} temp[].code_postal - Code postal de la commune.
     * @returns {number} temp[].latitude - Latitude de la commune.
     * @returns {number} temp[].longitude - Longitude de la commune.
     */
    let temp = data.map(({ nom_de_la_commune, code_postal, _geopoint }) => {
        const [latitude, longitude] = _geopoint.split(',');
        return {
            nom_de_la_commune,
            code_postal,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
        };
    });

    console.log ("ceci est temp" , temp);
    
    return temp;
}






export { CodePostaux };
