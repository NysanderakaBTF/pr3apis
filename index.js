var express = require('express');
var app = express();
const aithor_router = require('./api/routers/author.router')
const book_router = require('./api/routers/book.router')
const lib_router = require('./api/routers/library.router')

app.use(express.json())
app.use('/author', aithor_router)
app.use('/books', book_router)
app.use('/library', lib_router)
app.listen(3000);
