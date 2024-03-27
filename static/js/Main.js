import * as CharacterService from './CharacterService.js';
import * as Pagination from './Pagination.js';
import * as FavorisService from './FavorisService.js';

document.getElementById('search').value = '';

document.getElementById('search').addEventListener('keyup', async function (event) {
  Pagination.setCurrentPage(1);
  const search = event.target.value.toLowerCase();
  const characterList = await CharacterService.loadCharacters(search);
  document.getElementById('character-list').innerHTML = '';
  let nbPages = Math.ceil(characterList.length / Pagination.getCharactersPerPage());
  document.getElementById('pagination').innerHTML = '';
  for (let i = 1; i <= nbPages; i++) {
    Pagination.ajouterBoutonPageSupp(i);
  }
  CharacterService.displayCharactersByPage(search);
});

document.getElementById('fav').addEventListener('click', () => FavorisService.displayFav());

CharacterService.initializeApp();
