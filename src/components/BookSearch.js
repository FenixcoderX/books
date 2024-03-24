import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../services/BooksAPI';
import BookItem from './BookItem';

const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  console.log(searchQuery);
  const [bookShelf, setBookShelf] = useState('');

  useEffect(() => {
    const searchBooks = async () => {
      if (searchQuery !== '') {
        const searchedBooks = await BooksAPI.search(searchQuery);
        const booksInOurLibrary = await BooksAPI.getAll();
        console.log('searchedBooks before MAP', searchedBooks);
        console.log('searchedBooks after MAP', searchedBooks);
        if (!searchedBooks.error) {
          const searchedBooksWithShelf = searchedBooks.map((value) => {
            booksInOurLibrary.forEach((value2) => {
              if (value2.id === value.id) {
                value.shelf = value2.shelf;
              }
            });
            return value;
          });

          setBooks(searchedBooksWithShelf);
        } else {
          setBooks([]);
        }
      } else {
        setBooks([]);
      }
    };
    searchBooks();
  }, [searchQuery, bookShelf]);

  const updateBooks = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    setBookShelf(shelf);
  };
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
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
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
