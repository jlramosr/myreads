import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import BookDetail from './BookDetail'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { ClipLoader } from 'react-spinners'

class BooksApp extends Component {

  state = {
    books: {}, // {bookId1: book1, bookId2: book2, ...}
    shelves: ['currentlyReading', 'wantToRead', 'read'],
    title: 'MyReads',
    loading: true
  }

  moveBook = this.moveBook.bind(this);
  setLoading = this.setLoading.bind(this);
  setTitle = this.setTitle.bind(this);

  _getShelfBooks(books, shelf) {
    return Object.values(books).filter(book => (
      book.shelf === shelf
    ))
  }

  shelfKeyToTitle(name) {
    if (!name) return '';
    let title = name.replace(/([A-Z])/g, ' $1').trim(); //space before capital letter
    title = title.charAt(0).toUpperCase() + title.slice(1); //capitalize first letter
    return title;
  }

  moveBook(book, newShelf) {
    let loading = true;
    this.setState({loading});
    const bookId = book.id;
    if (book.shelf !== newShelf) {
      BooksAPI.update(book, newShelf).then(shelvesBooks => {
        let { books } = this.state;
        book.shelf = newShelf;
        books[bookId] = book;
        loading = false;
        this.setState({books, loading});
      })
    }
  }

  setTitle(title) {
    this.setState({title: title});
  }

  setLoading(loading) {
    this.setState({loading});
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
            <Route path="/:page" render={ _ => (
              <Link to="/" className="app-title-icon app-title-icon-back">Close</Link>
            )}/>
            <h1>{this.state.title}</h1>
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
                    onMoveBook={this.moveBook}
                    shelfKeyToTitle={this.shelfKeyToTitle}/>
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
              catalogedBooks={books}
              onMoveBook={this.moveBook}
              setLoading={this.setLoading}/>
          )}/>

          <Route path="/book/:bookId" render={ props => (
            <BookDetail
              bookId={props.match.params.bookId}
              shelvesToMove={shelves}
              onMoveBook={this.moveBook}
              shelfKeyToTitle={this.shelfKeyToTitle}
              setTitle={this.setTitle}
              setLoading={this.setLoading}/>
          )}/>

        </div>

      </div>
    )
  }

}

export default BooksApp;