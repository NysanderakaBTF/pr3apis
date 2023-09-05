const {BookService} = require("../../controllers/BookService.ts");


var express = require('express')
var router = express.Router()

router.get('/', async (req, res) => {
    res.send(await BookService.getAllBooks())
})

router.get('/:book_id', async (req, res) => {
    const book = await BookService.getBookById(req.params.book_id)
    if (book.length >0) {
        res.send(book)
    }
    else {
        res.status(404).send('Not Found');
    }

})

router.post('/', async (req, res)=>{
    let body = req.body;
    try {
        let books = await BookService.insertBook(body)
        res.send(books)
    }catch (e){
        res.status(400).send('Bad request');
    }
})

router.delete('/:book_id', async (req, res) =>{
    await BookService.deleteBook(req.params.book_id)
    res.send().status(204)
})

router.put('/:book_id', async (req, res) =>{
    res.send(await BookService.updateBookById(req.params.book_id, req.body))
})

router.patch('/:book_id', async (req, res) =>{
    res.send(await BookService.updateBookById(req.params.book_id, req.body))
})

module.exports = router