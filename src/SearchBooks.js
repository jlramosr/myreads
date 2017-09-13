import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import './SearchBooks.css'

class SearchBooks extends Component {

  static propTypes = {
    catalogedBooks: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired
  }
  
  state = {
    query: '',
    books: [],
    errorMessage: ''
  }

  _focusInput() {
    document.getElementById('input').focus();
  }

  _handleErrorMessage(error) {
    if (error) { 
      return error === 'empty query' ?
        'No books have been found' :
        error;
    }
    return '';
  }

  _updateQuery = query => {
    const { catalogedBooks, setLoading } = this.props;
    this.setState( {query} );
    setLoading(true);
    if (query) {
      BooksAPI.search(query)
        .then(results => {
          const books = results.error ? [] : results;
          for (let book of books) {
            if (book.id in catalogedBooks) {
              book.shelf = catalogedBooks[book.id].shelf;
            } 
          }
          this.setState({
            books,
            errorMessage: this._handleErrorMessage(results.error)
          });
          setLoading(false);
        })
    } else {
      this.setState( {books: [], errorMessage: ''} );
      setLoading(false);
    }
  }

  componentDidMount() {
    this._focusInput();
  }

  render() {
    const { query, books, errorMessage } = this.state;
    const { shelves, onMoveBook } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <div className="search-icon" onClick={this._focusInput}>
            Search
          </div>
          <div className="search-books-input-wrapper">
            <input
              id="input"
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={ event => this._updateQuery(event.target.value) }/>
          </div>
        </div>
        
        {errorMessage
        ? (
          <div className="search-books-error">{errorMessage}</div>
        ) : (
          <div className="search-books-results">
            <Bookshelf
              books={books}
              shelves={shelves}
              onMoveBook={onMoveBook}/>
          </div>
        )}
        
      </div>
    )
  }

}

export default SearchBooks;
