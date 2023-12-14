const router = require('express').Router();
const path = require('path');

// route sends inde.html response to client when GET request is made
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

// route sends note.html response to client when GET request made
router.get('/notes', (red, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

module.exports = router;