var Book = require('../models/book.model'); // ..
var Column = require('../models/column.model');

//all boards
exports.getBooks = function(req, res){
  Book.find({}, function(err, results){
    res.render('boards', {
        "boards": results
        //board
    });
  });
};

exports.postBook = function (req, res) {
  const book = new Book({
    title: req.body.title
  });
  book.save(function(err, result) {
    res.json(result)
  })
}
exports.postColumn = function (req, res) {
  const column = new Column({
    title: req.body.title,
    boardId: req.body.boardId
  });
  column.save(function(err, result) {
    res.json(result)
  })
}
//specific board
exports.getBook = function(req, res) {
  Book.findOne({/*где ключ в базе данных _id равен значению входящего параметра id*/_id: req.params.id}, function(err, board) {
    if(board) {
      Column.find({}, function(err, column){
        //res.json(columns)
        res.render('board', {
        "board": board,
        "columns": column
        //board
        });
      });
        /*res.render('board', {
          "board": board,
          "columns": columns
        })*/
    }
      //res.json(results)
      /*res.render('board', {
        "board": board
      })*/
  });
};
/*
//board/:id/column/:id
exports.columnsOfBoard = function (req, res) {
    //входячий параметр
    Book.findById({_id: req.params.id}, function(err, board) {
        if (err) {
            res.json({info: 'error during find board', error: err});
        };
        if (board) {
            Column.find({boardId: req.params.BoardId}, function (err, columns) {
                //res.json(columns);
                res.render('')    
            })
        } else {
            res.json({info: 'board not found'});
        }
    });
};*/

//board/:id/columns/:id/cards