import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';


const CHANGE_EVENT = 'change';

let _authorStore = {
  authors: [],
  author: {
    first_name: "",
    last_name: ""
  }   
};

class AuthorStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllAuthors(){
        return _authorStore.authors;
    }
    deleteAuthor(author){
        const newAuthors = _authorStore.authors.filter(elem => {return elem.author_id != author.author_id});
        _authorStore.authors = newAuthors;
    }
    updateAuthor(author){
        const index = _authorStore.authors.findIndex((elem) => { return elem.author_id == author.author_id});
        _authorStore.authors[index] = author;        
    }

}

const AuthorStore = new AuthorStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        //Read all authors
        case 'READ_AUTHOR_FAILURE':
            //alert("There is no data to access");
            alert(action.data);
            break;
        case 'READ_AUTHOR_SUCCESS':
            _authorStore.authors = action.data;
            AuthorStore.emitChange();
            break;
        //Delete Author
        case 'DELETE_AUTHOR_SUCCESS':
            AuthorStore.deleteAuthor(action.data);
            AuthorStore.emitChange();
            break;
        case 'DELETE_AUTHOR_FAILURE':
            alert(action.data);
            break;
        case 'AUTHOR_PROMPT_INVALID_FAILURE':
            alert(action.data);
            break;
        //Update Author

        case 'UPDATE_AUTHOR_SUCCESS':
            AuthorStore.updateAuthor(action.data);
            AuthorStore.emitChange(); 
            break;
        case 'UPDATE_AUTHOR_FAILURE':
            alert(action.data);
            break;          
        case 'ADD_AUTHOR_SUCCESS':
            _authorStore.authors.push(action.data);
            AuthorStore.emitChange(); 
            break;
        case 'ADD_AUTHOR_FAILURE':
            alert(action.data);
            break;         
        default:
            return;
    }
} );

export default AuthorStore;