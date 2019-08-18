var routes = require('express').Router();
var db = require('../dao/db');
var bookDao = require('../dao/bookDao');

routes.get('/book',function(req,res){
    bookDao.getAllBooks(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});


routes.post('/book', (req, res) => {
  var book = req.body;
  bookDao.addBook(book, (err, result, bookData) => {
    if(err){
      res.status(400).end('Add book failed');
      //res.send('Add Book Fail');
    }
    else{
      book.book_id = bookData.insertId;
      res.status(201);
      res.send(book).end;
      //res.status(201).end('Add Book Successfull');
      //res.send('Add Book Successfull');          
    }
  });
});

routes.get('/book/:id', function(req, res){
  bookDao.getBookById(req.params.id,function(error, result){
    if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result).end;
  });
});

routes.put('/book', (req, res) => {
  var book = req.body;
  bookDao.updateBook(book, (err, result) =>{
    if(err){
      res.status(400).end('Update book failed');
      //res.send('Update book failed');
    }
    else{
      res.status(200).end('Update book Successfull');
      //res.send('Book updated Successfully');  
    }
  });
});

routes.delete('/book/:id', function(req, res){
  bookDao.removeBook(req.params.id, function(err, result){
    if(err){
      res.writeHead(400);
      res.end('Delete Book Failed');
      //res.send('Delete Book Failed!').end;
    }
    else{
      res.send('Delete Book Successful!').end;
    }
    return;
  });
});

module.exports = routes;
