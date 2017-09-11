import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Shelf from './Shelf';
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

        <Route path="/" exact render={ _ => (
          
          <div className="list-books">

            <div className="list-books-header">
              <div className="list-books-loading">
                <ClipLoader size="50" color={'#fff'} loading={loading}/>
              </div>
              <div className="list-books-title">
                <div className="list-books-logo"></div>
                <h1>MyReads</h1>
              </div>
            </div>

            <div className="list-books-content">
              {shelves.map(shelf =>
                <Shelf
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
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp;