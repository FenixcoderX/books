const api = 'https://reactnd-books-api.udacity.com';

// Save token in localStorage to keep the data after page reload (API identifies user by token)
let token = localStorage.token;

// Generate new token if it doesn't exist
if (!token) token = localStorage.token = Math.random().toString(36).slice(-8);

// Headers for fetch requests to API
const headers = {
  Accept: 'application/json',
  Authorization: token,
};

// Fetch book by ID from API
export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book)
    .catch((error) => {
      console.error('Error to get book fetch request to API', error);
      throw error;
    });

// Fetch all books that have their shelfs from API
export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data.books)
    .catch((error) => {
      console.error('Error in getAll books fetch request to API', error);
      throw error;
    });

// Update shelf for the book in API
export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error('Error to update books fetch request to API', error);
      throw error;
    });

// Search books by query in API
export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, maxResults }), // convert to object that looks like this: {"query":"d", "maxResults": 20})
  })
    .then((res) => res.json())
    .then((data) => data.books)
    .catch((error) => {
      console.error('Error to search books fetch request to API', error);
      throw error;
    });
