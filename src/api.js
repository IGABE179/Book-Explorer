
export function toBook(doc) {
  return {
    id: doc.key,
    title: doc.title,
    author: doc.author_name
      ? doc.author_name.join(', ')
      : 'Unknown author',
    year: doc.first_publish_year ?? 'Year unknown',
    coverId: doc.cover_i
  };
}

export async function fetchBooks(searchText = '') {
  const searchTerm = searchText.trim();

  let url;

  if (searchTerm) {
    // Search for a specific book title
    url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}&limit=12&fields=key,title,author_name,first_publish_year,cover_i`;
  } else {
    // Get a general collection of fiction books
    url = 'https://openlibrary.org/search.json?q=subject:fiction&limit=12&fields=key,title,author_name,first_publish_year,cover_i';
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Could not fetch books');
  }

  const data = await response.json();

  return data.docs.map(toBook);
}
