var db = require('./db');

exports.getAllBooks = function(cb){
    db.query('select * from lms3.book', function(err, result) {
        cb(err, result);
      });
};

exports.addBook = function(book, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
        db.query('insert into lms3.book(title, author) values(?,?)', [book.title, book.author], function(err, result){
          if(err || result.affectedRows == 0 || !book.title || !book.author ){
            db.rollback(function(err, res){
              cb("erorr", res); 
            });
          }
          else{
            db.commit(function(err, res){
              cb(err, res, result);
            });
  
          } 
        });
      });
};
exports.getBookById = function(bookId,cb){
  db.query('select * from lms3.book where book_id = ?',[bookId], function(err, res){
      cb(err, res);
    });
};

exports.updateBook = function(book,cb){ //update fails if it is not changing anything
  db.beginTransaction(function(err){

    if(err) cb(err,null);
    db.query('update lms3.book set title = ?, author = ? where book_id = ?', [book.title, book.author, book.book_id], function(err,res){
      if(err || res.affectedRows == 0 ){
        db.rollback(function(err, res){ //sequalizer
          cb("erorr", res); //need to look it
        });
      }
      else{
        db.commit(function(err, res){
          cb(err, res);
        });
      }
    });
  });
};
exports.removeBook = function(bookId, cb){
  db.beginTransaction(function(err){
    if(err) cb(err, null);
    db.query('delete from lms3.book where book_id = ?', [bookId], function(err, res){
      if(err || res.affectedRows == 0){
        db.rollback(function(err, res){
          cb("erorr", res); 
        });
      }
      else{
        db.commit(function(err, res){
          cb(err, res);
        });  
      } 
    });
  });
}