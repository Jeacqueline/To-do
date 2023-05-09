const router = require('express').Router();
const Store = require('../db/store');
const store = new Store();
//GET
router.get('/notes',(req, res) =>{
    store
    .getNotes()
    .then((notes)=>{
        return res.json(notes);
    }).catch((err)=> {
        console.log(err);
        return res.status(500).json(err);
    });
});

//POST
router.post('/notes', (req, res) =>{
   try{
    const { title, text } = req.body;

    if (!title || !text){
        return res.status(400).json(err);
    }
    const note = {title, text};
    const newNote = store.addNote(note);
    return res.json(newNote);
   } catch (err){
    return res.status(500).json(err);
   }
});

//DELETE
router.delete('/notes/:id',(req, res)=>{
    try{
        const noteId = req.params.id;
        const deletedNote = store.removeNote(noteId);
        if(!deletedNote) {
            return res.status(404).json(err);
        } 
        return res.json(deletedNote);
    } catch (err){
        return res.status(500).json(err);
    }
});

module.exports= router;