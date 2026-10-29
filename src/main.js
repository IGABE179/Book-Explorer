
import { renderBooks } from './ui.js';
import { getFavorites } from './favorites.js';
import { fetchBooks } from './api.js';
import './input.css';

// Show a centered message inside a container
function showMessage(container, message) {
  container.textContent = '';

  const paragraph = document.createElement('p');
  paragraph.className = 'col-span-full text-center text-brown';
  paragraph.textContent = message;

  container.appendChild(paragraph);
}

// Books page
const container = document.getElementById('books-container');

if (container) {
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('search-button');

  let currentBooks = [];

  // Display books already loaded without fetching again
  function displayBooks() {
    if (currentBooks.length === 0) {
      showMessage(container, 'No books found. Try a different title.');
      return;
    }

    renderBooks(container, currentBooks, displayBooks);
  }

  // Fetch books from the API
  async function loadBooks(searchText = '') {
    showMessage(container, 'Loading books...');

    try {
      currentBooks = await fetchBooks(searchText);
      displayBooks();
    } catch (error) {
      showMessage(
        container,
        'Could not load books. Please check your internet connection and try again.'
      );

      console.error('Error fetching books:', error);
    }
  }

  // Load books when the page opens
  loadBooks();

  // Search for books
  function searchBooks() {
    if (!searchInput) return;

    const searchText = searchInput.value.trim();
    loadBooks(searchText);
  }

  if (searchInput && searchButton) {
    searchButton.addEventListener('click', searchBooks);

    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        searchBooks();
      }
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
