import express from "express";
import fs from 'fs';
import { exec } from 'node:child_process'
let nodeCompiler = express.Router();


nodeCompiler.post('/getCode', async (req, res) => {

    try {
        let lang = req.query
        fs.writeFileSync('mynewfile.js', req.body, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
        
// run the `ls` command using exec
exec('node mynewfile.js', (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err)
        return
    }
    // log the output received from the command
    console.log("Output: \n", output)
    res.redirect(`http://localhost:5000/v1.0/deletefile?fileName=mynewfile&language=node`)
})
// fs.unlinkSync('mynewfile.js', function (err) {
//     if (err) throw err;
//     console.log('File deleted!');
//   });
    }
    catch (e) {
        console.log(e);
    }
});

export default nodeCompiler;