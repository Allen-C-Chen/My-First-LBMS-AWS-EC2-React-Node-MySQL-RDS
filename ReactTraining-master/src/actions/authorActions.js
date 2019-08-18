
import Dispatcher from '../dispatcher/appDispatcher.js';
import axios from 'axios'
//Here add all crud actions for Authors


const AuthorsActions = {
    readAuthors: function(){
        axios.get('http://localhost:3000/author')
        .then(res => {
            Dispatcher.dispatch({
            actionType: 'READ_AUTHOR_SUCCESS',
            data: res.data
            });
        })
        .catch( (err ) => {
            Dispatcher.dispatch({
                actionType: 'READ_AUTHOR_FAILURE',
                data: err
                // data: res.data
            });
        });
    },
    deleteAuthor: function(newAuthor){
        axios.delete('http://localhost:3000/author/' + newAuthor.author_id)
        .then(res => {
            //console.log(res);
            Dispatcher.dispatch({
                actionType: 'DELETE_AUTHOR_SUCCESS',
                data: newAuthor
            });
        })
        .catch( (err ) => {
            Dispatcher.dispatch({
                actionType: 'DELETE_AUTHOR_FAILURE',
                data: err
            });
        });
    },
    updateAuthor: function(author){
        if(author.first_name == "" || author.last_name == ""){
            Dispatcher.dispatch({
                actionType: "AUTHOR_PROMPT_INVALID_FAILURE",
                data: "No null fields when updating, pelase try again"
            });
        }
        else{
            const newAuthor = {
                author_id: author.author_id,
                first_name: author.first_name,
                last_name: author.last_name
            }
            axios.put("http://localhost:3000/author", newAuthor)
                .then(res => {
                    Dispatcher.dispatch({
                        actionType: "UPDATE_AUTHOR_SUCCESS",
                        data: res.data
                    });
                })
                .catch( (err ) => {
                    Dispatcher.dispatch({
                        actionType: 'UPDATE_AUTHOR_FAILURE',
                        data: err
                    });
                });
        }

    },
    addAuthor: function (author) {
        if(author.first_name  == "" || author.last_Name == ""){
            Dispatcher.dispatch({
                actionType: "AUTHOR_PROMPT_INVALID_FAILURE",
                data: "No null fields when adding, please try again"
            });
        }
        else{
            axios.post("http://localhost:3000/author", author)
            .then(res => {
                var resAuthor = res.data;
                Dispatcher.dispatch({
                    actionType: "ADD_AUTHOR_SUCCESS",
                    data: resAuthor
                })
            })
            .catch((err) => {
                Dispatcher.dispatch({
                    actionType: "ADD_AUTHOR_FAILURE",
                    data: err
                });
            });                
    }
        }

}
module.exports = AuthorsActions;