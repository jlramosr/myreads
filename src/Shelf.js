import React, { Component } from 'react'
import PropTypes from "prop-types"
import Book from './Book';

class Shelf extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired
  }

  nameToTitle(name) {
    let title = name.replace(/([A-Z])/g, ' $1').trim(); //space before capital letter
    title = title.charAt(0).toUpperCase() + title.slice(1); //capitalize first letter
    return title;
  }

  render() {
    const {name, books, shelves} = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.nameToTitle(name)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelvesToMove={shelves}
                  nameToTitle={this.nameToTitle}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default Shelf;
