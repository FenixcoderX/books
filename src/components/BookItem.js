import PropTypes from 'prop-types';

const BookItem = ({ book, updateBooks, shelfWithBooks }) => {
  // book - object with book data
  // updateBooks - function that updates the shelf of a book
  // shelfWithBooks - object with keys - this is shelf, value - this is array with book objects

  // creates an array with keys of object shelfWithBooks and adds 'none' to it (used for select options)
  const arrayOfShelfs = Object.keys(shelfWithBooks);
  arrayOfShelfs.push('none');
  
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks && book.imageLinks.thumbnail // if book.imageLinks exists, then use book.imageLinks.thumbnail
              })`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf || 'none'} // when open the select, the value is the shelf of the book, if the shelf doesn't exist, then the value is 'none'
              onChange={(event) => updateBooks(book, event.target.value)} // when the select is changed, the function updateBooks is called with the book object and the value of the select
            >
              <option value="none" disabled>
                Move to...
              </option>
              {/* map through array with shelfs and display each shelf as an option, value - shelf */}
              {arrayOfShelfs.map((value, index) => (
                <option value={value} key={index}>
                  {/* Normallizes string like this: 'currentlyReading' => 'Currently Reading' */}
                  {(value.charAt(0).toUpperCase() + value.slice(1)).replace(/([a-z])([A-Z])/g, '$1 $2')}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && // if book.authors exists then map through array with authors and display each author, value - author
          book.authors.map((value, index) => (
            <div className="book-authors" key={index}>
              {value}
            </div>
          ))}
      </div>
    </li>
  );
};

// Define the prop types for the component
BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  updateBooks: PropTypes.func.isRequired,
  shelfWithBooks: PropTypes.object.isRequired,
};

export default BookItem;
