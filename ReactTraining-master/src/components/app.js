"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Header} from './header.js';
import {Home} from './home.js';
import {Books} from './books.js';
import BookStore from '../stores/bookStore';

import {Authors} from "./authors.js";
import AuthorStore from '../stores/authorStore';

import {AddBookForm}  from "./modBook";
import {UpdateBookForm}  from "./modBook";

import {AddAuthorForm}  from "./ModAuthor";
import {UpdateAuthorForm}  from "./ModAuthor";

export class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bookList:[],
            authorList:[],
            hasError: false
        };
    }

    render() {    
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/books' render={(props) => (<Books {...props} bookList={this.state.bookList} />)}/>

                    <Route path='/authors' render={ (props) => (<Authors {...props} authorList={this.state.authorList} />)}/>

                    <Route path='/addBook' render={ (props) => (<AddBookForm {...props} />)}/>

                    <Route path='/updateBook/:bookid' render={ (props) => (<UpdateBookForm {...props}/>)}/>

                    <Route path='/addAuthor' render={ (props) => (<AddAuthorForm {...props} />)}/>

                    <Route path='/updateAuthor' render={ (props) => (<UpdateAuthorForm  {...props}/>)}/>


                </Switch>
            </div>
        );
    }

    UNSAFE_componentWillMount(){
        BookStore.addChangeListener(this._onBookChange.bind(this));
        AuthorStore.addChangeListener(this._onAuthorChange.bind(this));
    }

    UNSAFE_componentWillUnmount(){
        BookStore.removeChangeListener(this._onBookChange.bind(this));
        AuthorStore.removeChangeListener(this._onAuthorChange.bing(this));
    } 
    _onBookChange(){
        this.setState({bookList: BookStore.getAllBooks()});
    }
    _onAuthorChange(){
        this.setState({authorList: AuthorStore.getAllAuthors()});
    }
}