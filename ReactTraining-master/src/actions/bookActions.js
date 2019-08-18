
import Dispatcher from '../dispatcher/appDispatcher.js';
import axios from 'axios'
import { ErrorBoundary } from '../components/ErrorBoundary.js';
//Here add all crud actions for Books
const BooksActions = {
    readBooks: function(){
        axios.get('http://localhost:3000/book')
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
        axios.delete('http://localhost:3000/book/' + newBook.book_id)
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
            axios.put("http://localhost:3000/book", newBook)
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
            axios.post("http://localhost:3000/book", book)
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