import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import './SearchBooks.css'

class SearchBooks extends Component {
  
  state = {
    query: '',
    books: [],
    errorMessage: '',
    searching: false,
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
    const { setSearching } = this.props;
    this.setState( {query} );
    setSearching(true);
    if (query) {
      BooksAPI.search(query)
        .then(results => {
          this.setState({
            books: results.error ? [] : results,
            errorMessage: this._handleErrorMessage(results.error)
          });
          setSearching(false);
        })
    } else {
      this.setState( {books: [], errorMessage: ''} );
      setSearching(false);
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

/*BooksAPI from './BooksAPI';
import Book from './Book'
import {Link} from 'react-router-dom';
export default class SearchPage extends Component {
 state = {
   query: '',
   books:[]
 }

 updateQuery =(query) => {
   this.setState({
     query
   })

    BooksAPI.search(query,20).then(results => {
       if(results.length > 0) {
         this.setState({
           books:results
         })
       } else {
         this.setState({
           books:[]
         })
       }
     })
     .catch(e=> console.log(e));
 }

 clearQuery = () => {
   this.setState({
     query:'',
   })
 }
   getShelf = (bookid) =>{
     var toReturn = 'none';
     this.props.books.forEach((book)  => {
       if(book.id === bookid)
        toReturn =  book.shelf;
     });
     return toReturn;
   }*/
