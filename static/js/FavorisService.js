import { loadCharacters, displayCharacter, initializeApp } from './CharacterService.js';

export function addFav(character) {
    /**
     * Ajoute un personnage aux favoris.
     * @param {string} character - Le personnage à ajouter aux favoris.
     */
    var fav = JSON.parse(localStorage.getItem('fav')) || [];
    fav.push(character);
    localStorage.setItem('fav', JSON.stringify(fav));
    document.getElementById('favo').textContent = 'Retirer des favoris';
    document.getElementById('favo').onclick = function() { removeFav(character); };

    console.log('bonjour');
}

export function removeFav(character) {
    /**
     * Retire un personnage des favoris.
     * @param {string} character - Le personnage à retirer des favoris.
     */
    var fav = JSON.parse(localStorage.getItem('fav')) || [];
    fav = fav.filter(item => item !== character);
    localStorage.setItem('fav', JSON.stringify(fav));
    document.getElementById('favo').textContent = 'Ajouter aux favoris';
    document.getElementById('favo').onclick = function() { addFav(character); };
}


export async function displayFav() {
    /**
     * Affiche les personnages favoris.
     */
    document.getElementById('character-list').classList.remove('character-detail');
    document.getElementById('search').classList.remove('hidden');
    const fav = JSON.parse(localStorage.getItem('fav')) || [];
    document.getElementById('character-list').innerHTML = '';
    document.getElementById('pagination').innerHTML = '';
    if (fav.length === 0) {
        const aucunFav = document.createElement('p');
        aucunFav.textContent = 'Aucun favoris';
        document.getElementById('character-list').appendChild(aucunFav);
    }
    else {
        fav.forEach(async function (character) {
            if(character !== '') {
        const characters = await loadCharacters(character);
        characters.forEach(displayCharacter);
            }
        });
    }
    const retour = document.createElement('button');
    retour.textContent = 'Retour';
    retour.addEventListener('click', () => initializeApp());
    document.getElementById('pagination').appendChild(retour);
}