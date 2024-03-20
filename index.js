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

async function noter(nameCharacter) {
  const note = prompt('Entrez votre note :');
  
  try {
    // Charger les données existantes de notes
    const response = await fetch('./static/json/notes.json');
    let notesData = await response.json();
    let characters = notesData.characters;

    // Rechercher le personnage dans la liste des personnages
    const characterIndex = characters.findIndex(character => character.name === nameCharacter);
    if (characterIndex === -1) {
      console.error('Personnage non trouvé');
      return;
    }

    // Ajouter la note à la liste des notes
    if (!characters[characterIndex].notes) {
      characters[characterIndex].notes = [];
    }

    characters[characterIndex].notes.push(parseInt(note));

    // Sauvegarder les données de notes

    const responseSave = await fetch('./static/json/notes.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notesData)
    });

    if (responseSave.ok) {
      alert('Note ajoutée avec succès');
    }

  } catch (error) {
    console.error('Erreur lors de l\'ajout de la note :', error);
  }
}

// Fonction pour afficher les détails d'un personnage
function displayCharacterDetail(character) {
  const characterDetail = document.getElementById('character-detail');
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
  characterDetail.appendChild(noteButton);
}

function hideCharacterDetail() {
  const characterDetail = document.getElementById('character-detail');
  characterDetail.innerHTML = '';
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
} );

function displayCharacter(character) {
    const characterList = document.getElementById('character-list');
    const characterElement = document.createElement('li');
    characterElement.textContent = character.name;
    characterElement.addEventListener('click', () => displayCharacterDetail(character));
    characterElement.addEventListener('dblclick', hideCharacterDetail);
    characterList.appendChild(characterElement);
}

// Fonction principale pour initialiser l'application
async function initializeApp() {
  const characters = await loadCharacters();
  characters.forEach(displayCharacter);
}

// Appel de la fonction principale pour démarrer l'application
initializeApp();

