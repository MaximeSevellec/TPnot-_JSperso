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

// Fonction pour afficher les détails d'un personnage
function displayCharacterDetail(character) {
  const characterDetail = document.getElementById('character-detail');
  characterDetail.innerHTML = `
    <h2>${character.name}</h2>
    <p><strong>Role:</strong> ${character.role}</p>
    <p>${character.description}</p>
    <h3>Equipements:</h3>
    <ul>
      ${character.equipements.map(equipment => `<li>${equipment.name}: ${equipment.description}</li>`).join('')}
    </ul>
    <h3>Abilities:</h3>
    <ul>
      ${character.abilities.map(ability => `<li>${ability.name}: ${ability.description}</li>`).join('')}
    </ul>
    <h3>Provenance:</h3>
    <p>${character.provenance}</p>
    <img src="${character.image}" alt="${character.name}">
  `;
}

function displayCharacter(character) {
    const characterList = document.getElementById('character-list');
    const characterElement = document.createElement('li');
    characterElement.textContent = character.name;
    characterElement.addEventListener('click', () => displayCharacterDetail(character));
    characterList.appendChild(characterElement);
}


// Fonction principale pour initialiser l'application
async function initializeApp() {
  const characters = await loadCharacters();
  characters.forEach(displayCharacter);
}

// Appel de la fonction principale pour démarrer l'application
initializeApp();
