import PropTypes from 'prop-types';
import BookItem from './BookItem';

const BookShelf = ({
  bookShelfTitle, // string that represents the name of the shelf
  booksInShelf, // array with books
  updateBooks, // function that updates the shelf of a book
  shelfWithBooks, // object with keys - this is shelf, value - this is array with book objects
}) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {/* Normallizes string like this: 'currentlyReading' => 'Currently Reading' */}
        {(bookShelfTitle.charAt(0).toUpperCase() + bookShelfTitle.slice(1)).replace(/([a-z])([A-Z])/g, '$1 $2')}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
       {/* If array with books is empty then show dots in the shelf */}
          {booksInShelf.length === 0 ? (
            <div>...............</div>
          ) : (
            // If array with books is not empty then map through array with books (value - book object) and display each book using BookItem component
            booksInShelf.map((value, index) => (
              <BookItem
                book={value} // book object
                updateBooks={updateBooks} // function that updates the shelf of a book
                shelfWithBooks={shelfWithBooks} // object with keys - this is shelf, value - this is array with book objects
                key={index} // unique key
              />
            ))
          )}
        </ol>
      </div>
    </div>
  );
};

// Define the prop types for the component
BookShelf.propTypes = {
  bookShelfTitle: PropTypes.string.isRequired,
  booksInShelf: PropTypes.array.isRequired,
  updateBooks: PropTypes.func.isRequired,
  shelfWithBooks: PropTypes.object.isRequired,
};

export default BookShelf;
