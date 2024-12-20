import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { exp } from '@amcharts/amcharts5/.internal/core/util/Ease';

// Initialisation de la carte avec une vue centrée sur les coordonnées spécifiées
var map = L.map('map').setView([45.838643, 1.261065], 13);

setTimeout(() => {
    map.invalidateSize();           //Problème au chargement de la taille de carte 
}, 400);

// Ajout de la couche de tuiles OpenStreetMap à la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Déclaration du cluster de marqueurs en tant que variable globale
let cluster = null;

/**
 * Crée un marqueur pour un lycée donné et bind une popup avec les informations sur les candidats.
 *
 * @param {Object} lycee - Objet représentant un lycée avec ses détails et candidats.
 * @returns {Object} - Marqueur Leaflet avec les informations du lycée.
 */

let renderlycee = function(lycee) {
    // Vérifie si les coordonnées du lycée sont disponibles
    if (lycee.latitude === "" || lycee.longitude === "") {
        return;
    }
    
    // Création du marqueur à la position du lycée
    let marker = L.marker([parseFloat(lycee.latitude), parseFloat(lycee.longitude)]);
    let fillieres = {};
    let totalPostbac = 0;
    
    // Comptage des filières et des postbacs
    lycee.candidats.forEach(candidat => {
        let code = candidat.Baccalaureat.SerieDiplomeCode;
        fillieres[code] = (fillieres[code] || 0) + 1;
        if (candidat.Baccalaureat.TypeDiplomeLibelle === 'Baccalauréat obtenu') {
            totalPostbac += 1;
        }
    });
    
    // Construction du HTML pour afficher les filières
    let fillieresHtml = '<br>Filières:<br><ul>';
    for (let [filiere, count] of Object.entries(fillieres)) {
        if (filiere === 'Générale' ) {
            fillieresHtml += `<li>${filiere}: ${count} candidats</li>`;
        } 
        
        if (filiere === 'STI2D' ) {
            fillieresHtml += `<li>${filiere}: ${count} candidats</li>`;
        }
        
        else {
            // Agrège tous les comptes des filières 'Autre' en une seule
            if (!fillieresHtml.includes('Autre')) {
                fillieresHtml += `<li>Autre: ${count} candidats</li>`;
            } else {
                const regex = /<li>Autre: (\d+) candidats<\/li>/;
                const match = fillieresHtml.match(regex);
                if (match) {
                    const newCount = parseInt(match[1], 10) + count;
                    fillieresHtml = fillieresHtml.replace(regex, `<li>Autre: ${newCount} candidats</li>`);
                }
            }
        }
    }
    fillieresHtml += '</ul>';
    
    // Binding de la popup avec les informations du lycée
    marker.bindPopup(`<b>${lycee.appellation_officielle}</b><br>Nombre de candidats : ${lycee.candidats.length}<br>Nombre de postbacs : ${totalPostbac}<br> ${fillieresHtml}<br>`);
    
    return marker
}

/**
 * Initialise et rend les clusters de marqueurs sur la carte en utilisant les données fournies.
 *
 * @param {Array<Object>} data - Tableau d'objets représentant les lycées, chacun contenant des informations sur les candidats.
 */
let rendercluster = function (data){
    // Création du groupe de clusters avec des options spécifiques
    let cluster = L.markerClusterGroup({
        zoomToBoundsOnClick: false,
        disableClusteringAtZoom: 13,
    });

    // Gestion de l'événement de clic sur un cluster
    cluster.on('clusterclick', function (a) {
        let totalCandidates = 0;
        let totalPostbac = 0;
        let streams = { 'Générale': 0, 'STI2D': 0, 'Autre': 0 };

        // Parcours de tous les marqueurs enfants du cluster
        a.layer.getAllChildMarkers().forEach(marker => {
            const popupContent = marker.getPopup().getContent();
            const match = popupContent.match(/Nombre de candidats : (\d+)/);
            if (match) {
                totalCandidates += parseInt(match[1], 10);
            }
            const postbacMatch = popupContent.match(/Nombre de postbacs : (\d+)/);
            if (postbacMatch) {
                totalPostbac += parseInt(postbacMatch[1], 10);
            }
            const filiereMatch = popupContent.match(/Filières:<br><ul>(.*?)<\/ul>/);
            if (filiereMatch) {
                const items = filiereMatch[1].split('<li>').slice(1);
                items.forEach(item => {
                    const [filiere, count] = item.replace('</li>', '').split(': ');
                    if (filiere == 'STI2D' || filiere == 'Générale' ) {
                        streams[filiere] += parseInt(count.replace(' candidats', ''), 10);
                    
                    } else {
                        streams['Autre'] += parseInt(count.replace(' candidats', ''), 10);
                    }
                });
            }
        });
        let streamDetails = '';
        for (let [filiere, count] of Object.entries(streams)) {
            streamDetails += `${filiere}: ${count} candidats<br>`;
        }
        // Affichage d'une popup avec les informations agrégées
        L.popup()
            .setLatLng(a.latlng)
            .setContent(`Nombre total de candidats : ${totalCandidates}<br>Nombre total de postbacs : ${totalPostbac}<br>${streamDetails}`)
            .openOn(map);
    });
    
    // Ajout des marqueurs au cluster
    for (let lycee of data){
        if (lycee.candidats){
            let marker = renderlycee(lycee);
            if (marker){
                cluster.addLayer(marker);
            }
        }
    }

    // Ajout du cluster à la carte
    map.addLayer(cluster);
}

let test = 0

export { renderlycee };
export { rendercluster };
export { test };