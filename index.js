var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');//для данных из форм
var mongoose = require('mongoose');
var Book = require('./models/book.model');

var port = 8080;
var db = 'localhost/books';

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

//Controllers
//по маршруту /addbook отдаем страничку newbook.pug с формой, которая шлет данные методом post на /book 
var addbookCtrl = require('./controllers/addbook');
app.get('/addbook', addbookCtrl.addbook);
/*
app.get('/', function(req, res){
  //запрос в модель  через класс доступ
  Book.find({},{},function(err, results){
    res.render('index', {
        "books": results
    });
  });
});
*/
var HomeController =require('./controllers/home')
app.get('/', HomeController.showHome);


/*
app.get('/contact', contactController.contactGet);
app.post('/contact', contactController.contactPost);
app.get('/account', userController.ensureAuthenticated, userController.accountGet);
app.put('/account', userController.ensureAuthenticated, userController.accountPut);
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.get('/signup', userController.signupGet);
app.post('/signup', userController.signupPost);
app.get('/login', userController.loginGet);
app.post('/login', userController.loginPost);
app.get('/forgot', userController.forgotGet);
app.post('/forgot', userController.forgotPost);
app.get('/reset/:token', userController.resetGet);
app.post('/reset/:token', userController.resetPost);
app.get('/logout', userController.logout);
app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}
*/
app.listen(port, () =>
  console.log('app listening on port ' + port));
