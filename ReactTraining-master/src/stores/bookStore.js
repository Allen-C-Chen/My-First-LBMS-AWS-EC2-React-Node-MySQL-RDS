import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';
//import {ErrorBoundary} from '../components/ErrorBoundary.js';

const CHANGE_EVENT = 'change';
let _bookStore = {
  books: [],
  book: {
      title: "",
      author: ""
  }
};

class BookStoreClass extends EventEmitter{
    getBook(){
        return _bookStore.book;
    }
    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }
    emitChangeError(){
        this.emit("CHANGE_EVENT");
    }
    getAllBooks(){
        return _bookStore.books;
    }
    deleteBook(book){
        const newBooks = _bookStore.books.filter(elem => {return elem.book_id != book.book_id});
        _bookStore.books = newBooks;
    }
    updateBook(book){
        const index = _bookStore.books.findIndex((elem) => { return elem.book_id == book.book_id});
        _bookStore.books[index] = book;        
    }

}

const BookStore = new BookStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        //Read all books
        case 'READ_BOOK_FAILURE':
            alert(action.data);
            break;
        case 'READ_BOOK_SUCCESS':
            _bookStore.books = action.data;
            BookStore.emitChange();
            break;
        //Delete Book
        case 'DELETE_BOOK_SUCCESS':
            BookStore.deleteBook(action.data);
            BookStore.emitChange();
            break;
        case 'DELETE_BOOK_FAILURE':
            alert(action.data); 
            break;
        case 'BOOK_PROMPT_INVALID_FAILURE':
            alert(action.data);
            break;
        //Update Book   
        case 'UPDATE_BOOK_SUCCESS':
            BookStore.updateBook(action.data);
            BookStore.emitChange(); 
            break;
        case 'UPDATE_BOOK_FAILURE':

            alert(action.data);
            //ErrorBoundary.errorHasHappened();
            //throw new Error(action.data)
            //BookStore.updateBook("Error");
            BookStore.emitChangeError(); 

            //return "error"
            //this.throw(action.data);
            break;          
        case 'ADD_BOOK_SUCCESS':
            _bookStore.books.push(action.data);
            BookStore.emitChange(); 
            break;
        case 'ADD_BOOK_FAILURE':
            //throw new Error(action.data)
            alert(action.data);
            break;         
        default:
            return;
    }
} );

export default BookStore;