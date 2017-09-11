import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Shelf from './Shelf';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  _getShelfBooks(books, shelf) {
    return books.filter(book => (
      book.shelf === shelf
    ))
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books});
    })
  }

  render() {
    const { books } = this.state;
    
    const shelves = ['currentlyReading', 'wantToRead', 'read'];

    return (
      <div className="app">

        <Route path="/" exact render={ _ => (
          
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">          
              <Shelf
                name='currentlyReading'
                books={this._getShelfBooks(books, 'currentlyReading')}
                shelves={shelves}/>
              <Shelf
                name='wantToRead'
                books={this._getShelfBooks(books, 'wantToRead')}
                shelves={shelves}/>
              <Shelf
                name='read'
                books={this._getShelfBooks(books, 'read')}
                shelves={shelves}/>
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