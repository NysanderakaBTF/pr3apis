const {LibraryService} = require("../../controllers/LibraryService.ts");


var express = require('express')
var router = express.Router()

router.get('/', async (req, res) => {
    try {
        res.send(await LibraryService.getAllLibraries())
    } catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }

})

router.get('/:lib_id', async (req, res) => {
    try {
        let lib = await LibraryService.getLibraryWithBooks(req.params.lib_id);
        res.send(lib)
    } catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }
})

router.post('/', async (req, res) => {
    let body = req.body;
    try {
        let book = await LibraryService.insertLibraryr(body);
        res.status(201).send(book)
    } catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }
})

router.delete('/:lib_id', async (req, res) => {
    try {
        await LibraryService.deleteLibrary(req.params.lib_id)
        res.send().status(204)
    } catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }
})

router.put('/:lib_id', async (req, res) => {
    try {
        let updated = await LibraryService.updateLibrary(req.params.lib_id, req.body)
        res.send(updated)
    }catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }
})

router.patch('/:lib_id', async (req, res) => {
    try {
        let updated = await LibraryService.updateLibrary(req.params.lib_id, req.body)
        res.send(updated)
    }catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }
})

router.post('/:lib_id/:book_id', async (req, res) => {
    try {
        let added = await LibraryService.addBookToLibrary(req.params.lib_id, req.params.book_id)
        res.status(201).send(added)
    }catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }
})
router.delete('/:lib_id/:book_id', async (req, res) => {
    try {
        await LibraryService.deleteBookFromLibrary(req.params.lib_id, req.params.book_id)
        res.status(204).send
    }catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }
})


module.exports = router