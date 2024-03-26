const charactersPerPage = 14;
let nbCharacters = 0;
let nbPages = 1;
let currentPage = 1;

// Définition des classes
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

// Fonction pour charger les personnages depuis un fichier JSON
async function loadCharacters() {
  try {
    const response = await fetch('./static/json/characters.json');
    const data = await response.json();
    return data.characters.map(characterData => {
      const { name, role, provenance, description, equipements, abilities, image } = characterData;
      return new Character(name, role, provenance, description, equipements, abilities, image);
    });
  } catch (error) {
    console.error('Erreur lors du chargement des personnages :', error);
    return [];
  }
}

async function loadCharactersByStartAndEnd(start, end) {
  try {
    const response = await fetch('./static/json/characters.json');
    const data = await response.json();
    if (data.characters.length < end) {
      end = data.characters.length;
    }
    const charactersData = data.characters.slice(start, end);
    return charactersData.map(characterData => {
      const { name, role, provenance, description, equipements, abilities, image } = characterData;
      return new Character(name, role, provenance, description, equipements, abilities, image);
    });
  } catch (error) {
    console.error('Erreur lors du chargement des personnages :', error);
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
    if(maNote === null || maNote === "") {
        return;
    }
    else if(isNaN(maNote)) {
        alert("Veuillez entrer un nombre");
        return;
    }
    if(maNote < 0 || maNote > 10) {
        alert("Veuillez entrer une note entre 0 et 10");
        return;
    }
    const notes = await getNotes();
    if(notes[characterData] === undefined) {
        notes[characterData] = [parseInt(maNote)];
    }else{
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
  characterDetail.innerHTML = `
    <h2>${character.name}</h2>
    <p><strong>Role:</strong> ${character.role}</p>
    <p>${character.description}</p>
    <h3>Equipements:</h3>
    <ul>
      ${character.equipements.map(equipment => `<li>${equipment.nom}: ${equipment.description}</li>`).join('')}
    </ul>
    <h3>Abilities:</h3>
    <ul>
      ${character.abilities.map(ability => `<li>${ability.nom}: ${ability.description}</li>`).join('')}
    </ul>
    <h3>Provenance:</h3>
    <p>${character.provenance}</p>
    <img src="${character.image}" alt="${character.nom}">
  `;
  const noteButton = document.createElement('button');
  noteButton.textContent = 'Noter';
  noteButton.addEventListener('click', () => noter(character.name));
  const retour = document.createElement('button');
  retour.textContent = 'Retour';
  retour.addEventListener('click', () => initializeApp());
  characterDetail.appendChild(retour);
  characterDetail.appendChild(noteButton);
}

document.getElementById('search').addEventListener('keyup', function(event) {
  const search = event.target.value.toLowerCase();
  const characterList = document.getElementById('character-list');
  const characters = characterList.getElementsByTagName('li');
  Array.from(characters).forEach(character => {
    const name = character.textContent.toLowerCase();
    if (name.indexOf(search) === -1) {
      character.style.display = 'none';
    } else {
      character.style.display = 'block';
    }
  });
});

function displayCharacter(character) {
    const characterList = document.getElementById('character-list');
    const divEleme = document.createElement('div');
    const imgElement = document.createElement('img');
    imgElement.src = character.image;
    const characterElement = document.createElement('p');
    characterElement.textContent = character.name;
    divEleme.addEventListener('click', () => displayCharacterDetail(character));
    divEleme.appendChild(imgElement);
    divEleme.appendChild(characterElement);
    characterList.appendChild(divEleme);
}

async function initializeApp() {
  const characters = await loadCharacters();
  document.getElementById('character-list').innerHTML = '';
  nbCharacters = characters.length;
  nbPages = Math.ceil(nbCharacters / charactersPerPage);
  document.getElementById('pagination').innerHTML = '';
  for (let i = 1; i <= nbPages; i++) {
    ajouterBoutonPageSupp(i);
  }
  displayCharactersByPage();
}

function ajouterBoutonPageSupp(numPage) {
  const boutonPage = document.createElement('button');
  boutonPage.textContent = numPage;
  boutonPage.addEventListener('click', () => {
    currentPage = numPage;
    document.getElementById('character-list').innerHTML = '';
    displayCharactersByPage();
  });
  document.getElementById('pagination').appendChild(boutonPage);
}

async function displayCharactersByPage() {
  const characters = await loadCharactersByStartAndEnd((currentPage - 1) * charactersPerPage, currentPage * charactersPerPage);
  characters.forEach(displayCharacter);
}

initializeApp();