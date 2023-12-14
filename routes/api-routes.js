const router = require('express').Router();
const { v4: uuidv4} = require('uuid');
const fs = require('fs');

//GET request to this routes endpoint '/api/notes'
router.get('/api/notes', async (req, res) => { //async returns a new promise
    const dbJson = await JSON.parse(fs.readFileSync('db/db.json', 'utf8')); // await means to wait for promise to be fulfilled
    res.json(dbJson); //sends a JSON string response
});

// POST request to this routes endpoint '/api/notes'
router.post('/api/notes', (req,res) => {
    const dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbJson.push(newFeedback);
    fs.writeFileSync('db/db.json',JSON.stringify(dbJson));
    res.json(dbJson);
});

// DELETE request to this routes endpoint '/api/notes/:id'
router.delete('/api/notes/:id', (req, res) => {
    const data = fs.readFileSync('db/db.json', 'utf8');
    const dataJSON = JSON.parse(data);
    const newNotes = dataJSON.filter((notes) => {
        return notes.id !== req.params.id;
    });
    fs.writeFileSync('db/db.json',JSON.stringify(newNotes));
    res.json('Note deleted');
});

module.exports = router;