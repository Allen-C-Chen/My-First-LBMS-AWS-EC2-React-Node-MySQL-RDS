
import Dispatcher from '../dispatcher/appDispatcher.js';
import axios from 'axios'
import { ErrorBoundary } from '../components/ErrorBoundary.js';
var hostFile = require('../../hostNames.json');

//const hostData = hostFile.LocalHost + hostFile.NodePort; //local host
const hostData = hostFile.AmazonHostUrl + hostFile.NodePort  ; //aws host

//Here add all crud actions for Books
console.log(hostData);
const BooksActions = {
    readBooks: function(){
        axios.get(hostData + '/book')
        .then(res => {
            Dispatcher.dispatch({
            actionType: 'READ_BOOK_SUCCESS',
            data: res.data
            });
        })
        .catch( (err ) => {
            Dispatcher.dispatch({
                actionType: 'READ_BOOK_FAILURE',
                data: err
            });
        });
    },
    deleteBook: function(newBook){
        axios.delete(hostData + '/book/' + newBook.book_id)
        .then(res => {
            Dispatcher.dispatch({
                actionType: 'DELETE_BOOK_SUCCESS',
                data: newBook
            });
        })
        .catch( (err ) => {
            Dispatcher.dispatch({
                actionType: 'DELETE_BOOK_FAILURE',
                data: err
            });
        });
    },
    updateBook: function(book){

        if(book.title === "" || book.author == ""){
            Dispatcher.dispatch({
                actionType: "BOOK_PROMPT_INVALID_FAILURE",
                data: "No null fields when updating, pelase try again"
            });
        }
        else{
            const newBook = {
                book_id: book.book_id,
                title: book.title,
                author: book.author
            }
            axios.put(hostData + "/book", newBook)
                .then(res => {
                    Dispatcher.dispatch({
                        actionType: "UPDATE_BOOK_SUCCESS",
                        data: res.data
                    });
                })
                .catch( (err ) => {
                    ErrorBoundary.getDerivedStateFromError(err);
                    ErrorBoundary.state.hasError = true;
                    Dispatcher.dispatch({
                        actionType: 'UPDATE_BOOK_FAILURE',
                        data: err
                    });
                });
        }

    },
    addBook: function (book) {
        if(book.title === "" || book.author === ""){
            Dispatcher.dispatch({
                actionType: "BOOK_PROMPT_INVALID_FAILURE",
                data: "No null fields when adding, pelase try again"
            });
        }
        else{
            axios.post(hostData + "/book", book)
            .then(res => {
                var resBook = res.data;
                Dispatcher.dispatch({
                    actionType: "ADD_BOOK_SUCCESS",
                    data: resBook
                })
            })
            .catch((err) => {
                Dispatcher.dispatch({
                    actionType: "ADD_BOOK_FAILURE",
                    data: err
                });
            });                
    }
        }

}
module.exports = BooksActions;