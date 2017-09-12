import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { ClipLoader } from 'react-spinners'

class BooksApp extends Component {

  state = {
    books: {}, // {bookId1: book1, bookId2: book2, ...}
    shelves: ['currentlyReading', 'wantToRead', 'read'],
    loading: true
  }

  moveBook = this.moveBook.bind(this);
  searchingChanged = this.searchingChanged.bind(this);

  _getShelfBooks(books, shelf) {
    return Object.values(books).filter(book => (
      book.shelf === shelf
    ))
  }

  moveBook(book, newShelf) {
    let loading = true;
    this.setState({loading});
    const bookId = book.id;
    BooksAPI.update(book, newShelf).then(shelvesBooks => {
      let { books } = this.state;
      books[bookId].shelf = newShelf;
      loading = false;
      this.setState({books, loading});
    })
  }

  searchingChanged(searching) {
    this.setState({loading: searching});
  }

  componentDidMount() {
    BooksAPI.getAll().then(allBooks => {
      let { books } = this.state;
      for (const book of allBooks) {
        books[book.id] = book;
      }
      this.setState({books, loading:false});
    })
  }

  render() {
    const { books, shelves, loading } = this.state;

    return (
      <div className="app">

        <div className="app-header">
          <div className="app-loading">
            <ClipLoader size={50} color={'#fff'} loading={loading}/>
          </div>
          <div className="app-title">
            <Route path="/" exact render={ _ => (
              <div className="app-title-icon app-title-icon-udacity"></div>
            )}/>
            <Route path="/:page" exact render={ _ => (
              <Link to="/" className="app-title-icon app-title-icon-back">Close</Link>
            )}/>
            <h1>MyReads</h1>
          </div>
        </div>

        <div className="app-content">

          <Route path="/" exact render={ _ => (
            <div className="list-books">
              <div className="list-books-content">
                {shelves.map(shelf =>
                  <Bookshelf
                    key={shelf}
                    name={shelf}
                    books={this._getShelfBooks(books, shelf)}
                    shelves={shelves}
                    onMoveBook={this.moveBook}/>
                )}
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}/>

          <Route path="/search" render={ _ => (
            <SearchBooks
              shelves={shelves}
              onMoveBook={this.moveBook}
              setSearching={this.searchingChanged}/>
          )}/>

        </div>

      </div>
    )
  }

}

export default BooksApp;