var bookController = function(boookCollection) {

 var post = function(req, res) {
  if (!req.body.title) {
   res.status(400);
   res.send('Title is required');
  } else {
   var instance = new boookCollection(req.body)
   instance.save(function(err, data) {
    if (err)
     res.send(err);
    else
     res.status(202);
    res.send('Saved : ', data);
   });
  }
 }

 var get = function(req, res) {
  boookCollection.find(req.query, function(err, books) {
   if (err)
    res.status(500).send(err);
   else {
    var returnBooks = [];
    books.forEach(function(element, index, array) {
     var newbook = element.toJSON();
     newbook.links = {};
     newbook.links.self = 'http://' + req.headers.host + '/api/books/' + newbook._id;
     returnBooks.push(newbook);
    });
    res.json(returnBooks);
   }
  });
 }


 var middelware = function(req, res, next) {
  boookCollection.findById(req.params.id, function(err, book) {
   if (err)
    res.status(500).send(err);
   else if (book) {
    req.book = book;
    next();
   } else {
    res.status(404).send('no book found');
   }
  });
 }


 var put = function(req, res) {
  req.book.title = req.body.title;
  req.book.author = req.body.author;
  req.book.genre = req.body.genre;
  req.book.read = req.body.read;
  req.book.save(function(err) {
   if (err)
    res.status(500).send(error);
   else
    res.json(req.book);
  });
 }

 var patch = function(req, res) {
  console.log('path http verb invoked');
  if (req.body._id)
   delete req.body._id;
  for (var p in req.body) {
   req.book[p] = req.body[p];
  }
  req.book.save(function(err) {
   if (err)
    res.status(500).send(err);
   else
    res.json(req.book);
  });
 }

 var remove = function(req, res) {
  console.log('removing');
  req.book.remove(function(err) {
   if (err)
    res.status(500).send(err);
   else
    res.status(204).send('removed');
  });
 }

 return {
  post: post,
  get: get,
  middelware: middelware,
  put: put,
  patch: patch,
  remove: remove
 }
}
module.exports = bookController;
