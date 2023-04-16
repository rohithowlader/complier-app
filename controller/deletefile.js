import express from "express";
import fs from "fs";
import languageExt from "../service/languageExt.js";

const deletefile = (fileName, language) => {
  try {
    let execFile = fileName + ".exe";
    fileName = fileName + "." + languageExt(language);
    fs.unlinkSync(fileName, function (err) {
      if (err) throw err;
      console.log("File deleted!");
    });
    if (language === "c") {
      //Deleteing executable file"
      fs.unlinkSync(execFile, function (err) {
        if (err) throw err;
        console.log("Executable File deleted!");
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export default deletefile;
