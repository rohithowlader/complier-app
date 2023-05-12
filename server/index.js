// import 'dotenv/config';
import express from "express";
import nodeCompiler from "./controller/nodeCompiler.js";
import cCompliler from "./controller/cComplier.js";
import cppCompiler from "./controller/cppCompiler.js";
import pythonCompiler from "./controller/pythonCompiler.js";
import cors from "cors";
//Encoding
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.text());
// connectUserDB();

// Routing
app.use("/v1.0", nodeCompiler);
app.use("/v1.0", cCompliler);
app.use("/v1.0", cppCompiler);
app.use("/v1.0", pythonCompiler);

//Created an express server
const PORT = 5000;
app.get("/", (req, res) => {
  res.send(`Running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`App is running on port : ${PORT}`);
});
