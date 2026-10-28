
import { books } from './books.js';
import { renderBooks } from './ui.js';
import { getFavorites } from './favorites.js';

// Books page
const container = document.getElementById('books-container');

if (container) {
  const searchInput = document.getElementById('search');

  let currentBooks = books;

  function displayBooks() {
    renderBooks(container, currentBooks, displayBooks);
  }

  displayBooks();

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const searchText = searchInput.value.trim().toLowerCase();

      currentBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchText)
      );

      displayBooks();
    });
  }
}

// Favorites page
const favoritesContainer = document.getElementById('favorites-container');

if (favoritesContainer) {
  const emptyState = document.getElementById('empty-state');

  function displayFavorites() {
    const favorites = getFavorites();

    if (favorites.length === 0) {
      favoritesContainer.textContent = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');

    renderBooks(
      favoritesContainer,
      favorites,
      displayFavorites
    );
  }

  displayFavorites();
}
