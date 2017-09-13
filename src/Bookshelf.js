import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import sortBy from 'sort-by'
import { shelfKeyToTitle } from './Common'
import './Bookshelf.css'

class Bookshelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }

  render() {
    const { name, books, shelves, onMoveBook } = this.props;
    const ordererBooks = books.sort(sortBy('title'));

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title" hidden={!name}>
          <div className="bookshelf-icon"></div>
          {shelfKeyToTitle(name)}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {ordererBooks.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelvesToMove={shelves}
                  onMoveBook={onMoveBook}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default Bookshelf;
