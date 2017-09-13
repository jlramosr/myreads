import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types"
import { shelfKeyToTitle } from './Common'
import './Book.css'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelvesToMove: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }

  render() {
    const { book, shelvesToMove, onMoveBook } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <Link to={`/book/${book.id}`}>
            <div className="book-cover" style={
              book.imageLinks && book.imageLinks.thumbnail ?
                { backgroundImage: `url("${book.imageLinks.thumbnail}")` } :
                { backgroundSize: 100 }
            }></div>
          </Link>

          <div className="book-shelf-changer">
            <select
              value={book.shelf || 'moveTo'}
              onChange={event => 
              onMoveBook(book, event.target.value)
            }>
              <option value="moveTo" disabled>
                Move to...
              </option>
              {shelvesToMove.map(option => (
                <option 
                  key={option} 
                  value={option} 
                  className={
                    book.shelf===option ? 'book-shelf-highlited' : ''
                  }
                >{shelfKeyToTitle(option)}
                </option>
              ))}
              <option value="none" hidden={!book.shelf || book.shelf === 'none'}>
                None
              </option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.title}
        </div>
        {book.authors && book.authors.map(author => (
          <div key={author} className="book-authors">
            {author}
          </div>
        ))}
      </div>
    )
  }

}

export default Book;
