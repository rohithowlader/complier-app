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
    let fileNameExt = fileName + "." + languageExt(language); // e.g. cCode.c
    let fileNameExe = fileName + ".exe"; // output name

    // On Windows -> "cCode.exe"
    // On Linux / Render -> "./cCode.exe"
    const command1 = `gcc -o ${fileNameExe} ${fileNameExt}`;
    const command2 =
      process.platform === "win32" ? fileNameExe : `./${fileNameExe}`;

    const succesful = chalk.bold.cyan;
    const error = chalk.bold.red;

    // Assuming req.body contains the C source code as a string.
    // If your client sends { code: "..." } then use req.body.code instead.
    const code = typeof req.body === "string" ? req.body : req.body.code;

    if (!code) {
      return res.status(400).json({ message: "No C code provided" });
    }

    // Write code to a new file (synchronous, no callback)
    fs.writeFileSync(fileNameExt, code);
    console.log(succesful("Saved C source file:", fileNameExt));

    // Compile: gcc -o cCode.exe cCode.c
    exec(command1, (err, stdout, stderr) => {
      if (err) {
        console.log(error("could not execute gcc command: ", err));
        console.log(error("stderr: "), stderr);

        deletefile(fileName, language);

        return res.status(200).json({
          message: "Error",
          step: "compile",
          err,
          stdout,
          stderr,
        });
      }

      console.log(succesful("Compilation OK"));
      console.log(succesful("gcc stdout:\n"), stdout);

      // Run: ./cCode.exe (Linux) or cCode.exe (Windows)
      exec(command2, (err, stdout, stderr) => {
        if (err) {
          console.log(error("could not execute binary: ", err));
          console.log(error("stderr: "), stderr);

          deletefile(fileName, language);

          return res.status(200).json({
            message: "Error",
            step: "run",
            code,
            err,
            stdout,
            stderr,
          });
        }

        console.log(succesful("Program Output:\n"), stdout);

        deletefile(fileName, language);

        return res.status(200).json({
          message: "Compiled",
          output: stdout,
          code,
        });
      });
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error", error: e });
  }
});

export default cCompiler;
