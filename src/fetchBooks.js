
export async function testFetchBooks() {
  const response = await fetch(
    'https://openlibrary.org/search.json?title=harry+potter'
  );

  const data = await response.json();

  console.log(data.docs[0]);
}
