const path = require('path');
const router = require('express').Router();

//to create the route with the api notes with our notes.html file 

router.get('/notes',(req, res) =>{
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

//with the "*" can call to all the other routes but needs to respond to index.html file

router.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'));
});

module.exports= router;