import { Lycees } from "./data-lycees.js";

/**
 * Récupère les données de candidature à partir d'un fichier JSON.
 * 
 * @async
 * @function
 * @returns {Promise<Response>} Une promesse qui résout avec la réponse de la requête fetch.
 * @throws {Error} Lance une erreur si la requête échoue.
 */
let data = await fetch("./src/data/json/candidatures.json");

data = await data.json();


let Candidats = {}



Candidats.getAll = function(){
    return data;
}




export { Candidats };
