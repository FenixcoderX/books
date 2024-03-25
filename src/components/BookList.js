import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../services/BooksAPI';
import BookShelf from './BookShelf';

// Сomponent that displays shelfs with books
const BookList = () => {
  // Set the initial state of books as an empty array
  const [books, setBooks] = useState([]);

  // useEffect hook that runs once when the component is mounted
  useEffect(() => {
    /** Fetches books that have their shelfs from API and updates the state with the fetched books
     */
    const getBooks = async () => {
      try {
        const res = await BooksAPI.getAll();
        setBooks(res);
        // console.log('getAll Response from API:', res);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    getBooks();
  }, []);

  /**
   * Updates the shelf of a book and fetches all books that have their shelfs from the API and updates the state with the fetched books.
   * @param {Object} book - The book object to update.
   * @param {string} shelf - The new shelf value for the book.
   */
  const updateBooks = async (book, shelf) => {
    // console.log('book', book);
    // console.log('shelf', shelf);
    try {
      await BooksAPI.update(book, shelf);
      const res = await BooksAPI.getAll();
      // console.log('res', res);
      setBooks(res);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  /**
   * Creates a shelf with books based on the provided array of books.
   * @param {Array} books - The array of books containing the book objects.
   * @returns {JSX.Element} - The JSX element representing the shelf with books.
   */
  const createShelfWithBooks = (books) => {
    // console.log('This is books comes to createShelfWithBooks', books);
    const shelfWithBooks = { currentlyReading: [], wantToRead: [], read: [] }; // Create object shelfWithBooks (keys - this is shelf, value - this is array with book objects)
    books.forEach((value) => {
      Object.keys(shelfWithBooks).includes(value.shelf) // check that shelf of the book exists in object shelfWithBooks
        ? shelfWithBooks[value.shelf].push(value) // if shelf exists, push book object to array of this shelf in shelfWithBooks
        : (shelfWithBooks[value.shelf] = [value]); // if shelf doesn't exist, create new key in object shelfWithBooks and push book object to array of this shelf in shelfWithBooks
    });
    // console.log ('This is object shelfWithBooks',shelfWithBooks);

    return (
      <div>
        {/* map through array of the keys from object shelfWithBooks (value - string with the name of the shelf) and display each shelf using BookShelf component */}
        {Object.keys(shelfWithBooks).map((value, index) => (
          <BookShelf
            bookShelfTitle={value} // string that represents the name of the shelf
            booksInShelf={shelfWithBooks[value]} // array with books
            shelfWithBooks={shelfWithBooks} // object with shelfs and books
            updateBooks={updateBooks} // function that updates the shelf of the book
            key={index} // unique key
          />
        ))}
      </div>
    );
  };

  return (
    <div className="list-books">
      {/* { console.log ('book state', books)
         } */}
      <div className="list-books-title">
        <img src="/logo2.png" alt="Home" style={{ width: '60px' }} />
        <h1>Books</h1>
      </div>
      <div className="list-books-content">
        <div>{createShelfWithBooks(books)}</div>
      </div>
      <div className="open-search">
        <Link to="/search">Search</Link>
      </div>
    </div>
  );
};

export default BookList;
