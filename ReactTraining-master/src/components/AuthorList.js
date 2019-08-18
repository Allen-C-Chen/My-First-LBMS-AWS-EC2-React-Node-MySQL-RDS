"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import AuthorActions from '../actions/authorActions';
import {Link} from 'react-router-dom';


export class AuthorList extends React.Component{

    createAuthorRow(author){
        return (
            <tr key={author.author_id}>
                <td> {author.author_id} </td>
                <td> {author.first_name} </td>
                <td> {author.last_name} </td>
                <td> 
                    <button className = "AuthorList" onClick = {
                        () => {
                            this.delete_author(author)
                        }}>Remove item
                    </button>
                </td>
                <td> 
                <Link to = {{ 
                    pathname: `/updateAuthor/${author.author_id}/${author.first_name}/${author.last_name}`
                }
                }>
                <button className="AuthorList">Update</button>
                </Link>
                </td>

            </tr>
        );
    }
    delete_author(author){
        AuthorActions.deleteAuthor(author);
    }
    update_author(author){
        AuthorActions.updateAuthor(author);
    }
    add_Author(){
        AuthorActions.addAuthor();
    }
    UNSAFE_componentWillMount(){
        AuthorActions.readAuthors();
    }
    render() {
        return(
            <div>
                <h1>Authors</h1>
                <Link to="/addAuthor" replace>                <button className="AuthorList">Add Author</button>
                </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.authorList.map(this.createAuthorRow, this)}
                    </tbody>    
                </table>
            </div>
        );
    }
}

AuthorList.propTypes = {
    authorList: PropTypes.array.isRequired
};



