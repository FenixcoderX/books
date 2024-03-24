import PropTypes from 'prop-types';

const BookItem = ({ book, updateBooks, shelfWithBooks }) => {
  const arrayOfShelfs = Object.keys(shelfWithBooks);
  arrayOfShelfs.push('none');
  // console.log ('arrayOfShelfs',arrayOfShelfs)
  console.log ('book',book)
  // if (book.shelf === "read") {
  // console.log ('book.shelf',book.shelf)}

  return (
    <li>
      <div className="book">
        {/* <p>book.shelf={book.shelf}</p> */}
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks && book.imageLinks.thumbnail
              })`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf || 'none'}
              onChange={(event) => updateBooks(book, event.target.value)}
            >
              <option value="none" disabled>
                Move to...
              </option>
              {arrayOfShelfs.map((value, index) => (
                <option value={value} key={index}>
                  {(value.charAt(0).toUpperCase() + value.slice(1)).replace(
                    /([a-z])([A-Z])/g,
                    '$1 $2',
                  )}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors &&
          book.authors.map((value, index) => (
            <div className="book-authors" key={index}>
              {value}
            </div>
          ))}
      </div>
    </li>
  );
};

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  updateBooks: PropTypes.func.isRequired,
  shelfWithBooks: PropTypes.object.isRequired,
};

export default BookItem;
