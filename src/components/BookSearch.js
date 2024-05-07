import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../services/BooksAPI';
import BookItem from './BookItem';

const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [bookShelf, setBookShelf] = useState('');

  // useEffect hook that runs when the component is mounted and every time when searchQuery or bookShelf changes
  useEffect(() => {
    /**
     * Searches for books based on the search query and updates the state with the search results.
     * @returns {Promise<void>} A Promise that resolves when the search is complete.
     */
    const searchBooks = async () => {
      try {if (searchQuery !== '') {
        const searchedBooks = await BooksAPI.search(searchQuery); // Fetches books from API based on the search query
        const booksInOurLibrary = await BooksAPI.getAll(); // Fetches all books that have their shelfs from API

        // Check if there are no errors in the search results
        if (!searchedBooks.error) {
          // Map through the search results (searchedBooks) and add the shelf property to the book object if the book represents in our library (booksInOurLibrary)
          // It is necessary to display the current shelf of the book in the search results
          // value, value2 - this is book objects
          const searchedBooksWithShelf = searchedBooks.map((value) => {
            booksInOurLibrary.forEach((value2) => {
              if (value2.id === value.id) {
                value.shelf = value2.shelf;
              }
            });
            return value; // return book object with shelf property or without it
          });

          setBooks(searchedBooksWithShelf); // Update the state of books with the search results
        } else {
          // If there are errors in the search results, set the state of books as an empty array
          setBooks([]);
        }
      } else {
        setBooks([]); // If the search query is empty, set the state of books as an empty array
      }
    } catch (error) {
      console.error('Error searching books:', error); }
    };

    searchBooks();
  }, [searchQuery, bookShelf]);

  /**
   * Updates the shelf of a book using API and updates the state
   * @param {Object} book - The book object to update
   * @param {string} shelf - The new shelf value for the book
   */
  const updateBooks = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf);
      setBookShelf(shelf);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // Create object shelfWithBooks (keys - this is shelf, value - this is array with book objects)
  const shelfWithBooks = { currentlyReading: [], wantToRead: [], read: [] };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(event) => setSearchQuery(event.target.value)} // When the input is changed, the searchQuery state is updated
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {/* checks if the searchQuery is not empty, if the books array is not empty and maps through the books array 
          and displays each book using BookItem component */}
          {searchQuery ? (
            books.length !== 0 ? (
              books.map((value, index) => (
                <BookItem
                  book={value}
                  updateBooks={updateBooks}
                  shelfWithBooks={shelfWithBooks}
                  key={index}
                />
              ))
            ) : (
              <h3>No books by your request</h3>
            )
          ) : (
            <h3>Enter a search request</h3>
          )}
        </ol>
      </div>
    </div>
  );
};

export default BookSearch;
