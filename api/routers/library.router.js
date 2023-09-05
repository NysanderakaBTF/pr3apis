const {LibraryService} = require("../../controllers/LibraryService.ts");


var express = require('express')
var router = express.Router()

router.get('/', async (req, res) => {
    res.send(await LibraryService.getAllLibraries())
})

router.get('/:lib_id', async (req, res) => {
    res.send(await LibraryService.getLibraryWithBooks(req.params.lib_id))
})

router.post('/', async (req, res)=>{
    let body = req.body;
    res.send(await LibraryService.insertLibraryr(body))
})

router.delete('/:lib_id', async (req, res) =>{
    await LibraryService.deleteLibrary(req.params.lib_id)
    res.send().status(204)
})

router.put('/:lib_id', async (req, res) =>{
    res.send(await LibraryService.updateLibrary(req.params.lib_id, req.body))
})

router.patch('/:lib_id', async (req, res) =>{
    res.send(await LibraryService.updateLibrary(req.params.lib_id, req.body))
})

router.post('/:lib_id/:book_id', async (req, res) =>{
    res.send(await LibraryService.addBookToLibrary(req.params.lib_id, req.params.book_id))
})
router.delete('/:lib_id/:book_id', async (req, res) =>{
    res.send(await LibraryService.deleteBookFromLibrary(req.params.lib_id, req.params.book_id))
})


module.exports = router