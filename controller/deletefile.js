import express from "express";
import fs from 'fs';
import { exec } from 'node:child_process'
let deletefile = express.Router();


deletefile.get('/deletefile', async (req, res) => {

    try {
        
fs.unlinkSync('mynewfile.js', function (err) {
    if (err) throw err;
    console.log('File deleted!');
  });
    }
    catch (e) {
        console.log(e);
    }
});

export default deletefile;