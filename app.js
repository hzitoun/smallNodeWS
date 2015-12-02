var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db;

if(process.env.ENV == 'Test') {
db = mongoose.connect('mongodb://localhost/test_test');

}else {

	db = mongoose.connect('mongodb://localhost/test');
}


var boookCollection = require('./models/bookModel');



var app = express();

var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var bookRouter = require('./routes/bookRoutes')(boookCollection);
app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);
app.get('/', function(req, res){
res.send('Starting NodeJS !');
});
app.listen(port, function(){
	console.log('Running on port : ' + port);
});

module.exports = app;