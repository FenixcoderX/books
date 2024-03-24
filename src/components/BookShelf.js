import PropTypes from 'prop-types';
import BookItem from './BookItem';

const BookShelf = ({
  bookShelfTitle,
  booksInShelf,
  updateBooks,
  shelfWithBooks,
}) => {
  // console.log('booksInShelf', booksInShelf);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {(
          bookShelfTitle.charAt(0).toUpperCase() + bookShelfTitle.slice(1)
        ).replace(/([a-z])([A-Z])/g, '$1 $2')}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksInShelf.length === 0 ? (
            <div>...............</div>
          ) : (
            booksInShelf.map((value, index) => (
              <BookItem
                book={value}
                updateBooks={updateBooks}
                shelfWithBooks={shelfWithBooks}
                key={index}
              />
            ))
          )}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  bookShelfTitle: PropTypes.string.isRequired,
  booksInShelf: PropTypes.array.isRequired,
  updateBooks: PropTypes.func.isRequired,
  shelfWithBooks: PropTypes.object.isRequired,
};

export default BookShelf;
