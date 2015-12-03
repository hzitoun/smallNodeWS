# smallNodeWS
A small RESTFULL API using Nodejs, Expressjs, Mongoose (Mongodb) and Gulp.<br/>
HTTP methods supported: POST, GET, PUT, PATCH and REMOVE.

# Install it

  \>npm install nodemon -g <br/>
  \>npm install

# Run it
  \>nodemon (https://github.com/remy/nodemon)
  
# Insert some data into your mongodb 
\>use dev_db <br/>
\>db.books.insert({
    title : 'title1',
    author : 'author1',
    genre : 'genre1',
    read : true
    });
  
# Test it
  http://127.0.0.1:8000/api/books/
