import express from "express";
import fs from "fs";
import { exec } from "node:child_process";
import chalk from "chalk";
import deletefile from "./deletefile.js";
import languageExt from "../service/languageExt.js";
let nodeCompiler = express.Router();
nodeCompiler.post("/getNodeCode", async (req, res) => {
  try {
    let language = "node";
    let fileName = "nodeCode";
    let fileNameExt = fileName + "." + languageExt(language);
    let command = "node " + fileNameExt;
    fs.writeFileSync(fileNameExt, req.body, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
    var succesful = chalk.bold.cyan;
    var error = chalk.bold.red;
    // run the `node nodeCode.js` command using exec
    exec(command, (err, output, stdout, stderr) => {
      // once the command has completed, the callback function is called
      if (err) {
        // log and return if we encounter an error

        console.log(error("could not execute command: ", err));
        deletefile(fileName, language);
        return res.status(200).json({
          messsage: `Error`,
          err,
          stdout,
        });
      }
      // log the output received from the command
      console.log(succesful("Output: \n", output));
      deletefile(fileName, language);
      return res.status(200).json({
        message: `Compiled`,
        output: output,
        code: req.body,
      });
    });
  } catch (e) {
    console.log(e);
  }
});

export default nodeCompiler;
