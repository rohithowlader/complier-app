import express from "express";
import fs from "fs";
import { exec } from "node:child_process";
import languageExt from "../service/languageExt.js";
import deletefile from "./deletefile.js";
import chalk from "chalk";

let cppCompiler = express.Router();

cppCompiler.post("/getCppCode", async (req, res) => {
  try {
    const language = "cpp";
    const fileName = "cppCode";
    const fileNameExt = fileName + "." + languageExt(language); // e.g. cppCode.cpp
    const fileNameExe = fileName + ".exe"; // compiled binary name

    // g++ -o cppCode.exe cppCode.cpp
    const command1 = `g++ -o ${fileNameExe} ${fileNameExt}`;
    // On Windows: "cppCode.exe"
    // On Linux/Render: "./cppCode.exe"
    const command2 =
      process.platform === "win32" ? fileNameExe : `./${fileNameExe}`;

    const succesful = chalk.bold.cyan;
    const error = chalk.bold.red;

    // If client sends { code: "..." }
    const code = typeof req.body === "string" ? req.body : req.body.code;

    if (!code) {
      return res.status(400).json({ message: "No C++ code provided" });
    }

    // Write code to file (sync, NO callback)
    fs.writeFileSync(fileNameExt, code);
    console.log(succesful("Saved C++ source file:", fileNameExt));

    // Compile C++: g++ -o cppCode.exe cppCode.cpp
    exec(command1, (err, stdout, stderr) => {
      if (err) {
        console.log(error("could not execute g++ command: ", err));
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
      console.log(succesful("g++ stdout:\n"), stdout);

      // Run compiled binary: ./cppCode.exe (Linux) or cppCode.exe (Windows)
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

export default cppCompiler;
