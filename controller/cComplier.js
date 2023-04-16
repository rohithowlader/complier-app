import express from "express";
import fs from "fs";
import { exec } from "node:child_process";
import languageExt from "../service/languageExt.js";
import deletefile from "./deletefile.js";
let cCompiler = express.Router();

cCompiler.post("/getCCode", async (req, res) => {
  try {
    let language = "c";
    let fileName = "cCode";
    let fileNameExt = fileName + "." + languageExt(language);
    let fileNameExe = fileName + ".exe";
    let command1 = "gcc -o " + fileNameExe + " " + fileNameExt;

    console.log(command1);

    fs.writeFileSync(fileNameExt, req.body, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });

    // run the "gcc -o mynewfile.exe mynewfile.c" command using exec
    exec(command1, (err, output) => {
      // once the command has completed, the callback function is called
      if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err);
        return;
      } else {
        exec(fileNameExe, (err, output) => {
          // once the command has completed, the callback function is called
          if (err) {
            // log and return if we encounter an error
            console.error("could not execute command: ", err);
            return;
          }
          // log the output received from the command
          console.log("Output: \n", output);

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
