# Books

React | Hooks | JavaScript | books API

A single-page application that allows the user to maintain a list of books - search and mark books that they have read, is currently reading, or want to read.

## Getting started

```
npm install
```
 to install all project dependencies
```
npm start
```
 to start the development server

## Description
### Components
- App - a component with routes
- BookList - maintains a state of books and displays HTML from the BookShelf component
- BookShelf - displays a shelf and HTML from the BookItem component
- BookItem - displays the HTML of the book and a selector of the shelfs
- BookSearch - displays a search field and HTML from the BookItem component
### Services
- BooksAPI - handles fetch requests to the API. It contains methods to perform necessary operations on the backend:
    - [`getAll`](#getall)
    - [`update`](#update)
    - [`search`](#search)
 

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. 

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms.

## License

This project is licensed under the MIT License - see the [LICENSE FILE](LICENSE.txt) file for details.
