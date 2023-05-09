const util = require('util');
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store{
    constructor(){
        this.dbFilePath = 'db/db.json';
    }
    async read(){
        return readFileAsync(this.dbFilePath, 'utf8');
    }
    async write(note){
        return writeFileAsync(this.dbFilePath, JSON.stringify(note));
    }
    async getNotes(){
        try{
            const notes= await this.read();
            const parsedNotes = JSON.parse(notes);
            return Array.isArray(parsedNotes) ? parsedNotes : [];
        } catch (err){
            return [];
        }
    }
    async addNote(note){
        const { title, text } = note;

        if (!title || !text){
            throw new Error("Please insert something on title and text! 📝");
        }
        const newNote = {title, text, id: uuidv1() };
        const notes = await this.getNotes();
        notes.push(newNote);
        await this.write(notes);
        return newNote;
    }

    async removeNote(id){
        const notes= await this.getNotes();
        const filteredNotes = notes.filter((note)=> note.id !== id);
        await this.write(filteredNotes);
    }

}

module.exports= Store;