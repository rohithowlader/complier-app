// import 'dotenv/config';
import express from "express";
import nodeCompiler from "./controller/nodeCompiler.js";
import cCompliler from "./controller/cComplier.js";
import cppCompiler from "./controller/cppCompiler.js";
import pythonCompiler from "./controller/pythonCompiler.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ----- ESM __dirname fix -----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.text());

// API routes
app.use("/v1.0", nodeCompiler);
app.use("/v1.0", cCompliler);
app.use("/v1.0", cppCompiler);
app.use("/v1.0", pythonCompiler);

// ----- Serve React build -----
const buildPath = path.join(__dirname, "../client/build");

// Serve static files from React build
app.use(express.static(buildPath));

// (Optional) small health endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Catch-all: send React index.html for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ----- Port for Render -----
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port : ${PORT}`);
});
