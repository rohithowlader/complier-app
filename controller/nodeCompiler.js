import express from "express";
import fs from 'fs';
import { exec } from 'node:child_process'
let nodeCompiler = express.Router();


nodeCompiler.post('/getCode', async (req, res) => {

    try {
        fs.appendFile('mynewfile1.js', req.body, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
        
// run the `ls` command using exec
exec('node mynewfile1.js', (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err)
        return
    }
    // log the output received from the command
    console.log("Output: \n", output)
})

    }
    catch (e) {
        console.log(e);
    }
});

export default nodeCompiler;