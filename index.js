// import 'dotenv/config';
import express from "express";
import nodeCompiler from "./controller/nodeCompiler.js"
import bodyParser from "body-parser"

//Encoding
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.text());
// connectUserDB();

// Routing
app.use('/v1.0', nodeCompiler);






//Created an express server
const PORT= 5000|| process.env.DEV_PORT || process.env.PROD_PORT ;
app.get('/', (req, res) => {
    res.send(`Running on port ${process.env.DEV_PORT}` );
 });

 app.listen( PORT , () =>{
    console.log(`App is running on port : ${process.env.PROD_PORT}`);
})