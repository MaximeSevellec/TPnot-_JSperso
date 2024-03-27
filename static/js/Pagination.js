import { displayCharactersByPage } from './CharacterService.js';
import { addParamsToURL, readParamsFromURL } from './UrlService.js';

const charactersPerPage = 12;
let currentPage = parseInt(readParamsFromURL().page) || 1;

export function getCurrentPage() {
  return currentPage;
}

export function setCurrentPage(page) {
  currentPage = page;
  addParamsToURL({ page });
}

export function getCharactersPerPage() {
    return charactersPerPage;
}

export async function ajouterBoutonPageSupp(numPage) {
  const boutonPage = document.createElement('button');
  boutonPage.textContent = numPage;
  boutonPage.addEventListener('click', () => {
    setCurrentPage(numPage);
    document.getElementById('character-list').innerHTML = '';
    displayCharactersByPage(document.getElementById('search').value || '');
  });
  document.getElementById('pagination').appendChild(boutonPage);
}