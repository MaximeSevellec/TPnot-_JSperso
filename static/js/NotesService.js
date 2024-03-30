export async function getNotesByCharacter(characterName) {
    /**
     * Récupère les notes d'un personnage.
     * @param {string} characterName - Le nom du personnage.
     * @returns {Promise<number>} La note moyenne du personnage.
     */
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

export async function noter(characterData) {
    /**
     * Permet de noter un personnage.
     * @param {string} characterData - Les données du personnage.
     */
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

async function loadNotes() {
    /**
     * Charge les notes depuis le fichier JSON.
     */
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

async function getNotes() {
    /**
     * Récupère les notes.
     */
    const response = await fetch('http://localhost:3000/character');
    if (!response.ok) {
      throw new Error('Erreur de récupération des données.');
    }
    return await response.json();
}