import express from "express";
import fs from "fs";
import { exec } from "node:child_process";
import chalk from "chalk";
import deletefile from "./deletefile.js";
import languageExt from "../service/languageExt.js";
let pythonCompiler = express.Router();
pythonCompiler.post("/getPythonCode", async (req, res) => {
  try {
    let language = "python";
    let fileName = "pythonCode";
    let fileNameExt = fileName + "." + languageExt(language);
    let command = "python " + fileNameExt;
    fs.writeFileSync(fileNameExt, req.body, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
    var succesful = chalk.bold.cyan;
    var error = chalk.bold.red;
    // run the `node nodeCode.js` command using exec
    exec(command, (err, output) => {
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
  } catch (e) {
    console.log(e);
  }
});

export default pythonCompiler;
