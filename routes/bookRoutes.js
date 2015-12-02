var express = require('express');
var routes = function(boookCollection){
var bookRouter = express.Router();
var bookController = require('../controllers/bookController')(boookCollection);
//getpostAndGet
 bookRouter.route('/')
 .post(bookController.post)
 .get(bookController.get);

bookRouter.use('/:id',bookController.middelware);
//getByID
bookRouter.route('/:id')
 	.get(function(req, res){
 				var returnBook = req.book.toJSON();
 				returnBook.links = {};
 				returnBook.links.FilterByThisGenre = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;

 				res.json(returnBook);
 		})
 	.put(bookController.put)
 	.patch(bookController.patch)
 	.delete(bookController.remove);
 	return bookRouter;
}
 module.exports = routes;