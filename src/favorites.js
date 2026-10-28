
const FAVORITES_KEY = 'book-explorer-favorites';

// Save the favorites list
function saveFavorites(list) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

// Get saved favorite books
export function getFavorites() {
  const savedFavorites = localStorage.getItem(FAVORITES_KEY);

  if (savedFavorites === null) {
    return [];
  }

  return JSON.parse(savedFavorites);
}

// Add a book to favorites
export function addFavorite(book) {
  const favorites = getFavorites();

  const alreadyFavorite = favorites.some(
    (favorite) => favorite.id === book.id
  );

  if (!alreadyFavorite) {
    favorites.push(book);
    saveFavorites(favorites);
  }
}

// Remove a book from favorites
export function removeFavorite(id) {
  const favorites = getFavorites();

  const updatedFavorites = favorites.filter(
    (favorite) => favorite.id !== id
  );

  saveFavorites(updatedFavorites);
}
