import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../services/BooksAPI';
import BookShelf from './BookShelf';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
      // console.log('getAll Response from API:', res);
    };
    getBooks();
  }, []);

  //Function create object shelfWithBooks (keys - this is shelf, value - this is array with book objects)
  const createShelfWithBooks = (books) => {
    console.log('Это books пришедший в createShelfWithBooks', books);
    const shelfWithBooks = { currentlyReading: [], wantToRead: [], read: [] };
    books.forEach((value) => {
      Object.keys(shelfWithBooks).includes(value.shelf)
        ? shelfWithBooks[value.shelf].push(value)
        : (shelfWithBooks[value.shelf] = [value]);
    });
    // console.log ('This is object shelfWithBooks',shelfWithBooks);

    return (
      <div>
        {Object.keys(shelfWithBooks).map((value, index) => (
          <BookShelf
            bookShelfTitle={value}
            booksInShelf={shelfWithBooks[value]}
            shelfWithBooks={shelfWithBooks}
            updateBooks={updateBooks}
            key={index}
          />
        ))}
      </div>
    );
  };

  const updateBooks = async (book, shelf) => {
    console.log('book', book);
    console.log('shelf', shelf);
    await BooksAPI.update(book, shelf);
    const res = await BooksAPI.getAll();
    console.log('res', res);
    setBooks(res);
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
