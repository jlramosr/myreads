import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { shelfKeyToTitle } from './Common'
import './BookDetail.css'

class BookDetail extends Component {

  static propTypes = {
    bookId: PropTypes.string.isRequired,
    shelvesToMove: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired
  }

  state = {
    book: {}
  }

  componentDidMount() {
    const { bookId, setTitle, setLoading } = this.props;
    setTitle('');
    setLoading(true);
    BooksAPI.get(bookId)
      .then(book => {
        this.setState({book});
        setTitle(book.title || '');
        setLoading(false);
      })
      .catch( _ => {
        this.setState({book:{}});
        setTitle('');
        setLoading(false);
      })
  }

  componentWillUnmount() {
    this.props.setTitle('MyReads');
  }

  render() {
    const { book } = this.state;
    const { shelvesToMove, onMoveBook } = this.props;

    return (
      <div className="book-content">

        <div className="image">
          <div className="cover" style={
            book.imageLinks && book.imageLinks.thumbnail ?
              { width: 180, height: 250, backgroundImage: `url("${book.imageLinks.thumbnail}")` } :
              { width: 160, height: 242, backgroundSize: 100 }
            }>
          </div>
        </div>

        <div className="info">
          <div className="info__main">
            <h2 className="title">{book.title}</h2>
            {book.authors && book.authors.map(author => (
              <div key={author} className="authors">
                {author}
              </div>
            ))}
          </div>
          <ul className="info__secondary">
            <li hidden={!book.publishedDate}>Published at {book.publishedDate}</li>
            <li hidden={!book.pageCount}>{book.pageCount} pages</li>
            <li>
              {book.categories && book.categories.map(category => (
                <span key={category}>{category}</span>
              ))}
            </li>
          </ul>
          <div className="info__shelf" hidden={!book.shelf}>
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
                    book.shelf===option ? 'shelf--highlited' : ''
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

      </div>
    )
  }

}

export default BookDetail;
