const express = require('express');
const fs = require('fs');
const router = express.Router();
let db= require('../db/db.json');

router.get('/api/notes', (req, res) =>{
    res.json(db);
});

//GET the notes 
router.get('/api/notes',(req, res)=>
res.sendFile(path.join(__dirname,'/public/notes.html'))
);

//POST new notes
router.post('/api/notes', (req, res)=>{
    res.json(`${req.method} request received`);
    console.log(req.body);

    fs.readFile('./db/db.json','utf8', (err, data)=>{
        if(err) throw err;
        const parsedData= JSON.parse(data);
        const noteID= {
            ...req.body,
            id: uuid(),
        }
        parsedData.push(noteID);
        fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err)=>{
            if(err) throw err;
            console.log('Yaaay the file has been saved 🥳');
        });
    });
});

//DELETE notes 
router.delete('/api/notes/:id', (req, res)=>{
    let newDB = [];
    for(let i= 0;  i< db.length; i++){
        if (db[i].id != req.params.id){
            newDB.push(db[i]);
        }
    }

    fs.writeFile('./db/db.json', JSON.stringify(newDB), (err)=>{
        if(err) throw err;
        console.log('The file is successfully saved🤓');
        res.json(newDB);
    });
});

module.exports= app;
