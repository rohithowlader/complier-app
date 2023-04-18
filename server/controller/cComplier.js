import express from "express";
import fs from "fs";
import { exec } from "node:child_process";
import languageExt from "../service/languageExt.js";
import deletefile from "./deletefile.js";
import chalk from "chalk";
let cCompiler = express.Router();

cCompiler.post("/getCCode", async (req, res) => {
  try {
    let language = "c";
    let fileName = "cCode";
    let fileNameExt = fileName + "." + languageExt(language);
    let fileNameExe = fileName + ".exe";
    let command1 = "gcc -o " + fileNameExe + " " + fileNameExt;
    var succesful = chalk.bold.cyan;
    var error = chalk.bold.red;
    fs.writeFileSync(fileNameExt, req.body, function (err) {
      if (err) throw err;
      console.log(succesful("Saved!"));
    });

    // run the "gcc -o mynewfile.exe mynewfile.c" command using exec
    exec(command1, (err, output) => {
      // once the command has completed, the callback function is called
      if (err) {
        // log and return if we encounter an error
        console.log(error("could not execute command: ", err));
        deletefile(fileName, language);
        return res.status(200).json({
          messsage: `Error`,
          code: req.body,
          err,
        });
      } else {
        exec(fileNameExe, (err, output) => {
          // once the command has completed, the callback function is called
          if (err) {
            // log and return if we encounter an error
            console.log(error("could not execute command: ", err));
            deletefile(fileName, language);
            return res.status(200).json({
              messsage: `Error`,
              code: req.body,
              err,
            });
          }
          // log the output received from the command
          console.log(succesful("Output: \n", output));

          deletefile(fileName, language);
          return res.status(200).json({
            messsage: `Compiled`,
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

export default cCompiler;
