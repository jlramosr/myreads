import React, { Component } from 'react'
import PropTypes from "prop-types"
import Book from './Book'
import sortBy from 'sort-by'
import './Shelf.css'

class Shelf extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }

  nameToTitle(name) {
    let title = name.replace(/([A-Z])/g, ' $1').trim(); //space before capital letter
    title = title.charAt(0).toUpperCase() + title.slice(1); //capitalize first letter
    return title;
  }

  render() {
    const { name, books, shelves, onMoveBook } = this.props;
    const ordererBooks = books.sort(sortBy('title'));

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.nameToTitle(name)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {ordererBooks.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelvesToMove={shelves}
                  nameToTitle={this.nameToTitle}
                  onMoveBook={onMoveBook}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default Shelf;
