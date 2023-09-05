const {BookService} = require("../../controllers/BookService.ts");


var express = require('express')
var router = express.Router()

router.get('/', async (req, res) => {
    try {
        res.send(await BookService.getAllBooks())
    } catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }

})

router.get('/:book_id', async (req, res) => {
    try {
        const book = await BookService.getBookById(req.params.book_id)
        if (book.length > 0) {
            res.send(book)
        } else {
            res.status(404).send('Not Found');
        }
    } catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }

})

router.post('/', async (req, res) => {
    let body = req.body;
    try {
        let books = await BookService.insertBook(body)
        res.send(books)
    } catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }
})

router.delete('/:book_id', async (req, res) => {
    try {
        await BookService.deleteBook(req.params.book_id)
        res.status(204).send()

    }catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }
})

router.put('/:book_id', async (req, res) => {
    try {
        let updated = await BookService.updateBookById(req.params.book_id, req.body)
        res.send(updated)
    }catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }
})

router.patch('/:book_id', async (req, res) => {
    try {
        let updated = await BookService.updateBookById(req.params.book_id, req.body)
        res.send(updated)
    }catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }
})

module.exports = router