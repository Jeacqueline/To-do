const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require= ('fs');
//helper method for unique ids
const uuid = require('./helpers/uuid.js');
const PORT = 3001;

const noteRoutes = require('./routes/noteRoutes')

const app = express ();

//middlewares 
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use('/notes', noteRoutes);

//
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname,'/public/index.html'))
);

//GET the notes 
app.get('api/notes',(req, res)=>{
    console.info(req.rawHeaders);
    console.info(`${req.method} request received`);

    fs.readFile('./db/db.json', 'utf8', (err,data)=>{
        if(err) throw err;
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        res.json(parsedData);
    });
});

//POST new notes
app.post('/api/notes', (req, res)=>{
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
app.delete('/api/notes/:id', (req, res)=>{
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


//PORT 
app.listen(PORT, () =>{
    console.log(`App listening on PORT: http://localhost:${PORT}`);
});
