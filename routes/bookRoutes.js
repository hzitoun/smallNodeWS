var express = require('express');
var routes = function(boookCollection){
	var bookRouter = express.Router();
	var bookController = require('../controllers/bookController')(boookCollection);
bookRouter.route('/')
.post(bookController.post)
.get(bookController.get);
bookRouter.use('/:id',bookController.middelware);
bookRouter.route('/:id')
.get(function(req, res){
	var returnBook = req.book.toJSON();
	returnBook.links = {};
	returnBook.links.FilterByGenre = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
	returnBook.links.FilterByAuthor = 'http://' + req.headers.host + '/api/books/?author=' + returnBook.author;
	returnBook.links.FilterByTitle = 'http://' + req.headers.host + '/api/books/?title=' + returnBook.title;
	returnBook.links.FilterByRead = 'http://' + req.headers.host + '/api/books/?read=' + returnBook.read;
	res.json(returnBook);
})
.put(bookController.put)
.patch(bookController.patch)
.delete(bookController.remove);
return bookRouter;
}
module.exports = routes;