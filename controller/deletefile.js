import express from "express";
import fs from "fs";
import { exec } from "node:child_process";
import languageExt from "../service/languageExt.js";
let deletefile = express.Router();

deletefile.get("/deletefile", async (req, res) => {
  try {
    let { fileName, language } = req.query;
    // let { language } = req.query;
    fileName=fileName+"."+languageExt(language);
    fs.unlinkSync(fileName, function (err) {
      if (err) throw err;
      console.log("File deleted!");
    });
    return res.status(200).json({
      messsage: `Compiled`,
    });
  } catch (e) {
    console.log(e);
  }
});

export default deletefile;
