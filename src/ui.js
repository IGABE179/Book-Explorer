
import {
  addFavorite,
  getFavorites,
  removeFavorite
} from './favorites.js';

export function renderBooks(container, bookList, onChange) {
  // Clear the existing cards
  container.textContent = '';

  // Show a message when no books match the search
  if (bookList.length === 0) {
    const message = document.createElement('p');

    message.className = 'col-span-full text-center text-brown';
    message.textContent = 'No books match your search. Try a different title.';

    container.appendChild(message);
    return;
  }

  // Read favorites only once per render
  const favorites = getFavorites();

  // Create a card for each book
  bookList.forEach((book) => {
    const card = document.createElement('article');
    card.className = 'rounded-lg border border-tan bg-white p-6';

    // Show the book cover if one is available
    if (book.coverId) {
      const cover = document.createElement('img');

      cover.src = `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`;
      cover.alt = `Cover of ${book.title}`;
      cover.className = 'mb-4 h-48 w-full rounded-md object-contain';
      cover.loading = 'lazy';

      card.appendChild(cover);
    } else {
      // Show a placeholder when the book has no cover
      const noCover = document.createElement('div');

      noCover.className =
        'mb-4 h-48 w-full rounded-md bg-tan flex items-center justify-center';

      noCover.textContent = 'No cover available';

      card.appendChild(noCover);
    }

    // Display the book title
    const title = document.createElement('h3');
    title.className = 'mb-3 text-xl font-bold text-burgundy';
    title.textContent = book.title;

    // Display the author and publication year
    const details = document.createElement('p');
    details.className = 'mb-4 text-brown';
    details.textContent = `${book.author} · ${book.year}`;

    // Check whether this book is already a favorite
    const isFavorite = favorites.some(
      (favorite) => favorite.id === book.id
    );

    // Create the Favorite button
    const favoriteButton = document.createElement('button');

    favoriteButton.className =
      'rounded-md bg-burgundy px-4 py-2 text-white hover:opacity-90';

    favoriteButton.textContent = isFavorite
      ? 'Remove from Favorites'
      : 'Add to Favorites';

    favoriteButton.addEventListener('click', () => {
      if (isFavorite) {
        removeFavorite(book.id);
      } else {
        addFavorite(book);
      }

      // Update the display without fetching books again
      onChange();
    });

    // Add the elements to the card
    card.appendChild(title);
    card.appendChild(details);
    card.appendChild(favoriteButton);

    // Add the card to the container
    container.appendChild(card);
  });
}
