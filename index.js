const charactersPerPage = 12;
let nbCharacters = 0;
let nbPages = 1;
let currentPage = 1;

class Character {
  constructor(name, role, provenance, description, equipements, abilities, image) {
    this.name = name;
    this.role = role;
    this.provenance = provenance;
    this.description = description;
    this.equipements = equipements;
    this.abilities = abilities;
    this.image = image;
  }
}

async function loadCharacters(recherche, start, end) {
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

async function loadNotes() {
  try {
    const reponse = await fetch('./static/json/notes.json');
    const data = await reponse.json();
    console.log(data);
    return data;
  }
  catch (error) {
    console.error('Erreur lors du chargement des notes :', error);
    return [];
  }
}

async function getNotesByCharacter(characterName) {
  try {
    const data = await loadNotes();
    const characterNotes = data.character[characterName];
    
    if (characterNotes) {
      console.log(`Les notes de ${characterName} sont :`, characterNotes);
      return characterNotes;
    } else {
      console.log(`Le personnage ${characterName} n'a pas de notes.`);
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des notes :', error);
    return [];
  }
}

async function getNotes() {
  const response = await fetch('http://localhost:3000/character');
  if (!response.ok) {
    throw new Error('Erreur de récupération des données.');
  }
  return await response.json();
}

async function noter(characterData) {
  var maNote = prompt("Entrez votre note pour ce personnage");
  if (maNote === null || maNote === "") {
    return;
  }
  else if (isNaN(maNote)) {
    alert("Veuillez entrer un nombre");
    return;
  }
  if (maNote < 0 || maNote > 10) {
    alert("Veuillez entrer une note entre 0 et 10");
    return;
  }
  const notes = await getNotes();
  if (notes[characterData] === undefined) {
    notes[characterData] = [parseInt(maNote)];
  } else {
    notes[characterData].push(parseInt(maNote));
  }
  const response = await fetch('http://localhost:3000/character', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(notes)
  });
  if (!response.ok) {
    throw new Error('Erreur de sauvegarde des données.');
  }
  console.log('Note ajoutée');
}

async function displayCharacterDetail(character) {
  document.getElementById('pagination').innerHTML = '';
  const characterDetail = document.getElementById('character-list');
  characterDetail.classList.add('character-detail');
  
  characterDetail.innerHTML = `
    <div>
      <div>
          <img src="${character.image}" alt="${character.nom}">
          <h2>${character.name}</h2>
          <p>${character.description}</p>
      </div>
      
      <div>
          <h3>Equipements:</h3>
          <ul>
              ${character.equipements.map(equipment => `<li>${equipment.nom}: ${equipment.description}</li>`).join('')}
          </ul>
      </div>

      <div>
          <h3>Abilities:</h3>
          <ul>
              ${character.abilities.map(ability => `<li>${ability.nom}: ${ability.description}</li>`).join('')}
          </ul>
      </div>

      <div>
          <h3>Provenance:</h3>
          <p>${character.provenance}</p>
      </div>
      <div>
          <h3>Note moyenne:</h3>
          <p>
          ${await getNotesByCharacter(character.name).then(notes => {
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
  if (localStorage.getItem('fav') != null && localStorage.getItem('fav').includes(character.name)) {
    document.getElementById('favo').textContent = 'Retirer des favoris';
    document.getElementById('favo').removeEventListener('click', () => addFav(character.name));
    document.getElementById('favo').addEventListener('click', () => removeFav(character.name));
  }
  else {
    document.getElementById('favo').addEventListener('click', () => addFav(character.name));
  }
  document.getElementById('retour').addEventListener('click', () => initializeApp());
  document.getElementById('noter').addEventListener('click', () => noter(character.name));


}

document.getElementById('search').addEventListener('keyup', async function (event) {
  currentPage = 1;
  const search = event.target.value.toLowerCase();
  const characterList = await loadCharacters(search);
  document.getElementById('character-list').innerHTML = '';
  nbCharacters = characterList.length;
  nbPages = Math.ceil(nbCharacters / charactersPerPage);
  document.getElementById('pagination').innerHTML = '';
  for (let i = 1; i <= nbPages; i++) {
    ajouterBoutonPageSupp(i);
  }
  displayCharactersByPage(search);
});

document.getElementById('fav').addEventListener('click', () => displayFav());

function displayCharacter(character) {
  const characterList = document.getElementById('character-list');
  const divEleme = document.createElement('div');
  const imgElement = document.createElement('img');
  divEleme.classList.add('character');
  imgElement.src = character.image;
  const characterElement = document.createElement('p');
  characterElement.textContent = character.name;
  divEleme.addEventListener('click', () => displayCharacterDetail(character));
  divEleme.appendChild(imgElement);
  divEleme.appendChild(characterElement);
  characterList.appendChild(divEleme);
}

async function initializeApp() {
  const characters = await loadCharacters("");
  document.getElementById('character-list').innerHTML = '';
  document.getElementById('character-list').classList.remove('character-detail');
  nbCharacters = characters.length;
  nbPages = Math.ceil(nbCharacters / charactersPerPage);
  document.getElementById('pagination').innerHTML = '';
  for (let i = 1; i <= nbPages; i++) {
    ajouterBoutonPageSupp(i);
  }
  displayCharactersByPage("");
}

function ajouterBoutonPageSupp(numPage) {
  const boutonPage = document.createElement('button');
  boutonPage.textContent = numPage;
  boutonPage.addEventListener('click', () => {
    currentPage = numPage;
    document.getElementById('character-list').innerHTML = '';
    displayCharactersByPage(document.getElementById('search').value || '');
  });
  document.getElementById('pagination').appendChild(boutonPage);
}

async function displayCharactersByPage(recherche) {
  const characters = await loadCharacters(recherche, (currentPage - 1) * charactersPerPage, currentPage * charactersPerPage);
  characters.forEach(displayCharacter);
}

// ajouter des perso en favoris
function addFav(character) {
  var fav = JSON.parse(localStorage.getItem('fav')) || [];
  fav.push(character);
  localStorage.setItem('fav', JSON.stringify(fav));
  alert("Personnage ajouté aux favoris");
}

function removeFav(character) {
  var fav = JSON.parse(localStorage.getItem('fav')) || [];
    fav = fav.filter(item => item !== character);
    localStorage.setItem('fav', JSON.stringify(fav));
    alert("Personnage retiré des favoris");
  }

function displayFav() {
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
      const characters = await loadCharacters(character);
      characters.forEach(displayCharacter);
    });
  }
  const retour = document.createElement('button');
  retour.textContent = 'Retour';
  retour.addEventListener('click', () => initializeApp());
  document.getElementById('pagination').appendChild(retour);
}

initializeApp();