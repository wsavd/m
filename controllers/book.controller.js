var Book = require('../models/book.model'); // ..

exports.addBook = function(req, res) {
  res.render('addbook');
};

exports.getBooks = function(req, res){
  Book.find({}, function(err, results){
    res.render('index', {
        "books": results
    });
  });
};

exports.getBook = function(req, res) {
  Book.findOne({_id: req.params.id}, function(err, results) {
      //res.json(results);
      res.render('book', {
        "book": results
  });
});
};