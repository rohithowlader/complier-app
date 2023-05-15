import express from "express";
import fs from "fs";
import { exec } from "node:child_process";
import languageExt from "../service/languageExt.js";
import deletefile from "./deletefile.js";
import chalk from "chalk";
let cppCompiler = express.Router();

cppCompiler.post("/getCppCode", async (req, res) => {
  try {
    let language = "cpp";
    let fileName = "cppCode";
    let fileNameExt = fileName + "." + languageExt(language);
    let fileNameExe = fileName + ".exe";
    let command1 = "g++ -o " + fileNameExe + " " + fileNameExt;
    let command2 = fileNameExe;

    var succesful = chalk.bold.cyan;
    var error = chalk.bold.red;
    //Write code to a new file
    fs.writeFileSync(fileNameExt, req.body, function (err) {
      if (err) throw err;
      console.log(succesful("Saved!"));
    });

    // run the "gcc -o mynewfile.exe mynewfile.c" command using exec
    exec(command1, (err, output, stdout, stderr) => {
      // once the command has completed, the callback function is called
      if (err) {
        // log and return if we encounter an error
        console.log(error("could not execute command: ", err));
        //Delete the file and return error response
        deletefile(fileName, language);
        return res.status(200).json({
          message: `Error`,
          err,
          stdout,
        });
      } else {
        exec(command2, (err, output, stdout, stderr) => {
          // once the command has completed, the callback function is called
          if (err) {
            // log and return if we encounter an error
            console.log(error("could not execute command: ", err));
            //Delete the file and return error response
            deletefile(fileName, language);
            return res.status(200).json({
              message: `Error`,
              stdout,
              err,
            });
          }
          // log the output received from the command
          console.log(succesful("Output: \n", output));
          //Delete the file and return Output of code
          deletefile(fileName, language);
          return res.status(200).json({
            message: `Compiled`,
            output: output,
            code: req.body,
          });
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
});

export default cppCompiler;
