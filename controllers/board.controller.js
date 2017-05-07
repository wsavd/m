var Book = require('../models/book.model'); // ..
var Column = require('../models/column.model');
var Card = require('../models/card.model');

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
      Column.find({boardId: req.params.id}, function(err, column){
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
exports.postCard = function (req, res) {
  const card = new Card({
    title: req.body.title,
    boardId: req.body.boardId,
    columnId: req.body.columnId
  });
  card.save()
    .then(savedCard => res.json(savedCard))
}

exports.cardOfColumns = function (req,res) {
  Column.findById(req.params.id, function(err, column) {
    if (err) {
      res.json({info: 'error during find column', error: err});
    };
    if (column) {
      Card.find({columnId: req.params.id}).exec(function (err, card){
        res.render('card', {
          "cards": card
        })
      });
    } else {
      res.json({info: 'column not found'});
    }
  });
}