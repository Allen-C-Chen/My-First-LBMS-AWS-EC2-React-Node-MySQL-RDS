
import React from 'react';
import AuthorActions from '../actions/authorActions';
import PropTypes from 'prop-types';
import {ErrorBoundary} from './ErrorBoundary.js';

export class UpdateAuthorForm extends React.Component{
   constructor(props) {
      super(props);
      var pathVar = this.props.location.pathname;
      var pathArray = pathVar.split("/");
      this.state = {first_name: pathArray[3],
                  last_name: pathArray[4],
                  author_id: pathArray[2],
                  error: null, errorInfo: null };

      this.handleChange = this.handleChange.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange (evt) {
      this.setState({ [evt.target.name]: evt.target.value });
    }
    handleSubmit(event) {
      event.preventDefault();
      const author = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          author_id: this.state.author_id
      }    

      AuthorActions.updateAuthor(author);

    }
    
    render() {
      return (
        <ErrorBoundary>
        <form onSubmit={this.handleSubmit}>
          <label>
            What is the new last name:
            <input type="text" name = "first_name" value = {this.state.first_name} onChange={this.handleChange} />
          </label>
          <label>
            What is the new first name:
            <input type="text" name = "last_name" value = {this.state.last_name} onChange={this.handleChange} />
          </label>

          <input type="submit" value="Submit" />
        </form>
        </ErrorBoundary>    
      );
    }
}
UpdateAuthorForm.propTypes = {
  author: PropTypes.string.isRequired,
  location: PropTypes.string,
};

export class AddAuthorForm extends React.Component{
  add_Author(author){
        AuthorActions.addAuthor(author);
  }
   constructor(props) {
      super(props);
      this.state = {first_name: '',
                  last_name: '',
                  error: null, errorInfo: null };

      this.handleChange = this.handleChange.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (evt) {
      this.setState({ [evt.target.name ]: evt.target.value });
    }
    handleSubmit(event) {
      event.preventDefault();
      const author = {
         first_name: this.state.first_name,
         last_name: this.state.last_name
      }
      this.add_Author(author);
    }
  
    render() {
      if(this.state.errorInfo){
        return <h2>Something went wrong.</h2>
      }
      else{
        return (
        
          <form onSubmit={this.handleSubmit}>
            <label>
              What is the First name:
              <input type="text" name = "first_name" onChange={this.handleChange} />
            </label>
            <label>
              What is the First name:
              <input type="text" name = "last_name" onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }
}

