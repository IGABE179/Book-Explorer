
import { getFavorites } from './favorites.js';
import { renderBooks } from './ui.js';

const container = document.getElementById('favorites-container');
const emptyMessage = document.getElementById('empty-message');

function displayFavorites() {
  const favorites = getFavorites();

  if (favorites.length === 0) {
    container.textContent = '';
    emptyMessage.classList.remove('hidden');
    return;
  }

  emptyMessage.classList.add('hidden');

  renderBooks(container, favorites, displayFavorites);
}

displayFavorites();
