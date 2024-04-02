import { getNotesByCharacter } from './NotesService.js';
import * as CharacterService from './CharacterService.js';
import * as NotesService from './NotesService.js';
import * as FavorisService from './FavorisService.js';
import { addParamsToURL, clearURLParams } from './UrlService.js';

/**
 * Classe représentant un personnage.
 * @class
 */
export default class Character {
  
  constructor(name, role, provenance, description, equipements, abilities, image) {
    this.name = name;
    this.role = role;
    this.provenance = provenance;
    this.description = description;
    this.equipements = equipements;
    this.abilities = abilities;
    this.image = image;
  }

  async render() {
    // Affichage les détails du personnage
    const characterName = this.name;
    addParamsToURL({ character: this.name });
    document.getElementById('pagination').innerHTML = '';
    const characterDetail = document.getElementById('character-list');
    characterDetail.classList.add('character-detail');
    document.getElementById('search').classList.add('hidden');
    
    characterDetail.innerHTML = `
      <div>
        <div>
          <img src="${this.image}" alt="${this.nom}">
          <h2>${this.name}</h2>
          <p>${this.description}</p>
        </div>
        
        <div>
          <h3>Equipements:</h3>
          <ul>
            ${this.equipements.map(equipment => `<li>${equipment.nom}: ${equipment.description}</li>`).join('')}
          </ul>
        </div>

        <div>
          <h3>Abilities:</h3>
          <ul>
            ${this.abilities.map(ability => `<li>${ability.nom}: ${ability.description}</li>`).join('')}
          </ul>
        </div>

        <div>
          <h3>Provenance:</h3>
          <p>${this.provenance}</p>
        </div>
        <div>
          <h3>Note moyenne:</h3>
          <p>
          ${await getNotesByCharacter(this.name).then(notes => {
              const average = notes.length > 0 ? notes.reduce((a, b) => a + b) / notes.length : 'Pas de note';
              const numberOfNotes = notes.length;
              return `${average} (${numberOfNotes} notes)`;
          })}
          </p>
        </div>
        <button id="retour">Retour</button>
        <button id="noter">Noter</button>
        <button id="favo">Ajouter des favoris</button>
      </div>
    `;
    if (localStorage.getItem('fav') != null && localStorage.getItem('fav').includes(this.name)) {
      document.getElementById('favo').textContent = 'Retirer des favoris';
      document.getElementById('favo').onclick = function() { FavorisService.removeFav(characterName); };
    } else {
      document.getElementById('favo').textContent = 'Ajouter des favoris';
      document.getElementById('favo').onclick = function() { FavorisService.addFav(characterName); };
    }
    document.getElementById('retour').addEventListener('click', () => {
      clearURLParams();
      CharacterService.initializeApp()
    });
    document.getElementById('noter').addEventListener('click', () => NotesService.noter(this.name));
  }
}
