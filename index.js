const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Book = require('./Book.model');
app.locals.moment = require("moment");

const port = 8000;
const db = 'localhost:27017/books';

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

//по маршруту /newbook отдаем страничку newbook.pug с формой, которая шлет данные методом post на /book 
var newbook = require('./routes/newbook');
app.use('/newbook', newbook);

//var index = require('./routes/index');
//app.use('/', index);

app.get('/', function(req, res){
  //запрос в модель  через класс доступ
  Book.find({},{},function(err, results){
    res.render('index', {
        "books": results
    });
  });
});

app.get('/books', (req, res) => {
  console.log('getting all books');
  Book.find({})
    .exec((err, books) => {
      if(err) {
        res.send('error occured')
      } else {
        console.log(books);
        res.json(books);
    }
 })
});

app.get('/books/:id', (req, res) =>
  Book.findOne({
    _id: req.params.id
    })
    .exec((err, books) => {
      if(err) {
        res.send('error occured')
      } else {
        console.log(books);
        res.json(books);
    }
}));

app.post('/book', (req, res) => {
  let newBook = new Book();

  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;

  newBook.save((err, book) => {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  })
});

app.post('/book2', (req, res) =>
  Book.create(req.body, (err, book) => {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
  }
}));

app.put('/book/:id', (req, res) =>
  Book.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { title: req.body.title }
  }, {upsert: true}, (err, newBook) => {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newBook);
      res.send(newBook);
  }
}));

app.delete('/book/:id', (req, res) =>
  Book.findOneAndRemove({
    _id: req.params.id
  }, (err, book) => {
    if(err) {
      res.send('error removing')
    } else {
      console.log(book);
      res.status(204);
  }
}));

app.listen(port, () =>
  console.log('app listening on port ' + port));