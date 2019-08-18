
import React from 'react';
import BookActions from '../actions/bookActions';
import PropTypes from 'prop-types';
import {ErrorBoundary} from './ErrorBoundary.js';



export class UpdateBookForm extends React.Component{
   constructor(props) {
      super(props);
      var pathVar = this.props.location.pathname;
      var pathArray = pathVar.split("/");
      this.state = {title: pathArray[3],
                  author: pathArray[4],
                  book_id: pathArray[2],
                  error: null, errorInfo: null };

      this.handleChange = this.handleChange.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange (evt) {
      this.setState({ [evt.target.name]: evt.target.value });
    }
    handleSubmit(event) {
      event.preventDefault();
      const book = {
          title: this.state.title,
          author: this.state.author,
          book_id: this.state.book_id
      }    

      BookActions.updateBook(book);

    }
    
    render() {
      return (
        <ErrorBoundary>
        <form onSubmit={this.handleSubmit}>
          <label>
            What is the new Title:
            <input type="text" name = "title" value = {this.state.title} onChange={this.handleChange} />
          </label>
          <label>
            What is the new Author:
            <input type="text" name = "author" value = {this.state.author} onChange={this.handleChange} />
          </label>

          <input type="submit" value="Submit" />
        </form>
        </ErrorBoundary>    
      );
    }
}
UpdateBookForm.propTypes = {
  book: PropTypes.string.isRequired,
  location: PropTypes.string,
};

export class AddBookForm extends React.Component{
  add_Book(book){
        BookActions.addBook(book);
  }
   constructor(props) {
      super(props);
      this.state = {title: '',
                  author: '',
                  error: null, errorInfo: null };

      this.handleChange = this.handleChange.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (evt) {
      this.setState({ [evt.target.name ]: evt.target.value });
    }
    handleSubmit(event) {
      event.preventDefault();
      const book = {
         title: this.state.title,
         author: this.state.author
      }
      this.add_Book(book);
    }
  
    render() {
      if(this.state.errorInfo){
        return <h2>Something went wrong.</h2>
      }
      else{
        return (
        
          <form onSubmit={this.handleSubmit}>
            <label>
              What is the Title:
              <input type="text" name = "title" onChange={this.handleChange} />
            </label>
            <label>
              What is the Author:
              <input type="text" name = "author" onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }
}

