var db = require('./db');

exports.getAllAuthors = function(cb){
    db.query('select * from lms3.author', function(err, result) {
        cb(err, result);
      });
};

exports.addAuthor = function(author, cb){
  db.beginTransaction(function(err){
    if(err) cb(err, null);

    db.query('insert into lms3.author(first_name, last_name) values(?,?)', [author.first_name, author.last_name], function(err, result){
      if(err || result.affectedRows == 0 || !author.first_name || !author.last_name ){
        db.rollback(function(err, res){
          cb("erorr", res); 
        });
      }
      else{
        console.log(result);
        db.commit(function(err, res){
          console.log(res);

          cb(err, res, result);
        });

      } 
    });
  });
};
exports.getAuthorById = function(authorId,cb){
  db.query('select * from lms3.author where author_id = ?',[authorId], function(err, res){
      cb(err, res);
    });
};

exports.updateAuthor = function(author,cb){
  db.beginTransaction(function(err){
    if(err) cb(err,null);

    db.query('update lms3.author set first_name = ?, last_name = ? where author_id = ?', [author.first_name, author.last_name, author.author_id], function(err,res){
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
exports.removeAuthor = function(authorId, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
       
        db.query('delete from lms3.author where author_id = ?', [authorId], function(err, res){
          
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