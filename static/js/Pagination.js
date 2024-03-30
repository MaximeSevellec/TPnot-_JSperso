import { displayCharactersByPage } from './CharacterService.js';
import { addParamsToURL, readParamsFromURL } from './UrlService.js';

const charactersPerPage = 12;
let currentPage = parseInt(readParamsFromURL().page) || 1;

export function getCurrentPage() {
  /**
   * Récupère la page actuelle.
   */
  return currentPage;
}

export function setCurrentPage(page) {
  /**
   * Définit la page actuelle.
   * @param {number} page - La page à définir.
   */
  currentPage = page;
  addParamsToURL({ page });
}

export function getCharactersPerPage() {
  /**
   * Récupère le nombre de personnages par page.
   */
    return charactersPerPage;
}

export async function ajouterBoutonPageSupp(numPage) {
  /**
   * Ajoute un bouton pour accéder à la page suivante.
   * @param {number} numPage - Le numéro de la page.
   */
  const boutonPage = document.createElement('button');
  boutonPage.textContent = numPage;
  boutonPage.addEventListener('click', () => {
    setCurrentPage(numPage);
    document.getElementById('character-list').innerHTML = '';
    displayCharactersByPage(document.getElementById('search').value || '');
  });
  document.getElementById('pagination').appendChild(boutonPage);
}