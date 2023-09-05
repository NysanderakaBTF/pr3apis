const {
    getAllAuthors,
    getAuthorWithBooks,
    insertAuthor,
    deleteAuthor,
    updateAuthor
} = require('../../controllers/AuthorService.ts')

var express = require('express')
var router = express.Router()

router.get('/', async (req, res) => {
    try {
        return res.send(await getAllAuthors())
    }catch (err){
        console.log(err);
        res.status(err.status || 500).json({message: err.message});
    }
})

router.get('/:auth_id', async (req, res) => {
    try {
        let authoe = await getAuthorWithBooks(req.params.auth_id);
        if (authoe) {
            return res.status(200).send(authoe);
        } else {
            return res.status(404).send("Not found");
        }
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json({message: err.message});
    }
})

router.post('/', async (req, res) => {
    let body = req.body;
    try {
        let newa = await insertAuthor(body)
        res.status(201).send(newa)
    }catch (e) {
        res.status(e.status || 500).json({message: e.message});
    }

})

router.delete('/:auth_id', async (req, res) => {
    try {
        await deleteAuthor(req.params.auth_id)
        res.send().status(204)
    }catch (e){
        res.status(e.status || 500).json({message: e.message});
    }
})

router.put('/:auth_id', async (req, res) => {
    try {
        let updated = await updateAuthor(req.params.auth_id, req.body)
        res.send(updated)
    }catch (e){
        res.status(e.status || 500).json({message: e.message});
    }


})

router.patch('/:auth_id', async (req, res) => {
    try {
        let updated = await updateAuthor(req.params.auth_id, req.body)
        res.send(updated)
    }catch (e){
        res.status(e.status || 500).json({message: e.message});
    }
})

module.exports = router