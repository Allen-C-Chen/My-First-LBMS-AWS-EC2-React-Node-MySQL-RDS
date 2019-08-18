var routes = require('express').Router();
var db = require('../dao/db');
var authorDao = require('../dao/authorDao');

routes.get('/author',function(req,res){
    authorDao.getAllAuthors(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});


routes.post('/author', (req, res) => {
  var author = req.body;
  authorDao.addAuthor(author, (err, result, authorData) => {
    if(err){
      res.status(400).end('Add author failed');
      //res.send('Add Author Fail');
    }
    else{
      author.author_id = authorData.insertId;
      res.status(201);
      res.send(author).end;
      //res.status(201).end('Add Author Successfull');
      //res.send('Add Author Successfull');          
    }
  });
});

routes.get('/author/:id', function(req, res){
  authorDao.getAuthorById(req.params.id,function(error, result){
    if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result).end;
  });
});

routes.put('/author', (req, res) => {
  var author = req.body;
  authorDao.updateAuthor(author, (err, result) =>{
    if(err){
      res.status(400).end('Update author failed');
      //res.send('Update author failed');
    }
    else{
      res.status(200).end('Update author Successfull');
      //res.send('Author updated Successfully');  
    }
  });
});

routes.delete('/author/:id', function(req, res){
  authorDao.removeAuthor(req.params.id, function(err, result){
    if(err){
      res.writeHead(400);
      res.end('Delete Author Failed');
      //res.send('Delete Author Failed!').end;
    }
    else{
      res.send('Delete Author Successful!').end;
    }
    return;
  });
});

module.exports = routes;
