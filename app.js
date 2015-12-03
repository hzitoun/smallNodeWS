var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db;
if(process.env.ENV == 'PROD') {
	db = mongoose.createConnection('mongodb://localhost/prod_db');
}else {
	db = mongoose.createConnection('mongodb://localhost/dev_db');
}
db.on('error', function(err){
	if(err){
		console.log('error connecting to db, ' + err);
	}
});
db.once('open', function callback(){
	console.log('db opened');
});
var bookCollection = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var bookRouter = require('./routes/bookRoutes')(bookCollection);
app.use('/api/books', bookRouter);
app.get('/', function(req, res){
	res.send('THE API IS WORKING FINE!');
});
app.listen(port, function(){
	console.log('Starting server on port : ' + port);
});

module.exports = app;