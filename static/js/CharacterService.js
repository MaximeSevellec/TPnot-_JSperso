import Character from './Character.js';
import { getCurrentPage, ajouterBoutonPageSupp, getCharactersPerPage } from './Pagination.js';
import { readParamsFromURL } from './UrlService.js';

export async function loadCharacters(recherche, start, end) {
    try {
        const response = await fetch('./static/json/characters.json');
        const data = await response.json();
        var characters = data.characters.filter(character => character.name.toLowerCase().includes(recherche.toLowerCase()));
        if (characters.length < end) {
        end = characters.length;
        }
        const charactersData = (start === undefined || end === undefined) ? characters : characters.slice(start, end);
        return charactersData.map(characterData => {
        const { name, role, provenance, description, equipements, abilities, image } = characterData;
        return new Character(name, role, provenance, description, equipements, abilities, image);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des personnages :', error);
        return [];
    }
}

async function getChatacterByName(name) {
    const characters = await loadCharacters("");
    return characters.find(character => character.name === name);
}

export async function displayCharacter(character) {
    const characterList = document.getElementById('character-list');
    const divElement = document.createElement('div');
    const imgElement = document.createElement('img');
    divElement.classList.add('character');
    imgElement.setAttribute('data-src', character.image);
    imgElement.alt = character.name;
    imgElement.classList.add('lazy-load');
    const characterElement = document.createElement('p');
    characterElement.textContent = character.name;
    divElement.addEventListener('click', () => character.render());
    divElement.appendChild(imgElement);
    divElement.appendChild(characterElement);
    characterList.appendChild(divElement);
    addLazyLoad(imgElement);
}

function addLazyLoad(img){
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.removeAttribute('data-src');
            observer.unobserve(lazyImage);
            }
        });
    });

    lazyImageObserver.observe(img);
}


export async function displayCharactersByPage(recherche) {
    if (readParamsFromURL().character){
        var character = await getChatacterByName(readParamsFromURL().character);
        character.render();
        return;
    }
    const characters = await loadCharacters(recherche, (getCurrentPage() - 1) * getCharactersPerPage(), getCurrentPage() * getCharactersPerPage());
    characters.forEach(displayCharacter);
}

export async function initializeApp() {
    const characters = await loadCharacters("");
    document.getElementById('character-list').innerHTML = '';
    document.getElementById('character-list').classList.remove('character-detail');
    var nbPages = Math.ceil(characters.length / getCharactersPerPage());
    document.getElementById('pagination').innerHTML = '';
    for (let i = 1; i <= nbPages; i++) {
        ajouterBoutonPageSupp(i);
    }
    displayCharactersByPage("");
}