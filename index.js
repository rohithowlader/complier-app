// import 'dotenv/config';
import express from "express";
import nodeCompiler from "./controller/nodeCompiler.js";
import cCompliler from "./controller/cComplier.js"

//Encoding
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.text());
// connectUserDB();

// Routing
app.use('/v1.0', nodeCompiler);
app.use('/v1.0', cCompliler);






//Created an express server
const PORT= 5000;
app.get('/', (req, res) => {
    res.send(`Running on port ${PORT}` );
 });

 app.listen( PORT , () =>{
    console.log(`App is running on port : ${PORT}`);
})