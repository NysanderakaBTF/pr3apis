const {getAllAuthors, getAuthorWithBooks, insertAuthor, deleteAuthor, updateAuthor} = require('../../controllers/AuthorService.ts')

var express = require('express')
var router = express.Router()

router.get('/', async (req, res) => {
    res.send(await getAllAuthors())
})

router.get('/:auth_id', async (req, res) => {
    res.send(await getAuthorWithBooks(req.params.auth_id))
})

router.post('/', async (req, res)=>{
    let body = req.body;
    res.send(await insertAuthor(body))
})

router.delete('/:auth_id', async (req, res) =>{
    await deleteAuthor(req.params.auth_id)
    res.send().status(204)
})

router.put('/:auth_id', async (req, res) =>{
    res.send(await updateAuthor(req.params.auth_id, req.body))
})

router.patch('/:auth_id', async (req, res) =>{
    res.send(await updateAuthor(req.params.auth_id, req.body))
})

module.exports = router