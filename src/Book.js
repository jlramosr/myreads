import React, { Component } from 'react'
import PropTypes from "prop-types"
import './Book.css'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelvesToMove: PropTypes.array.isRequired,
    nameToTitle: PropTypes.func.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }

  render() {
    const { book, shelvesToMove, nameToTitle, onMoveBook } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={
            { width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks.thumbnail}")`
            }
          }></div>
          <div className="book-shelf-changer">
            <select value="moveTo" onChange={event => 
              onMoveBook(book, event.target.value)
            }>
              <option value="moveTo" disabled>
                Move to...
              </option>
              {shelvesToMove.map(option => (
                <option 
                  key={option} 
                  value={option} 
                  hidden={book.shelf===option}>{nameToTitle(option)}
                </option>
              ))}
              <option value="none">
                None
              </option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.title}
        </div>
        {book.authors.map(author => (
          <div key={author} className="book-authors">
            {author}
          </div>
        ))}
      </div>
    )
  }

}

export default Book;
