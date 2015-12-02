var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db;
if(process.env.ENV == 'PROD') {
	db = mongoose.connect('mongodb://localhost/prod_db');
}else {
	db = mongoose.connect('mongodb://localhost/dev_db');
}
var bookCollection = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var bookRouter = require('./routes/bookRoutes')(bookCollection);
app.use('/api/books', bookRouter);
app.get('/', function(req, res){
	res.send('Starting NodeJS !');
});
app.listen(port, function(){
	console.log('Running on port : ' + port);
});

module.exports = app;