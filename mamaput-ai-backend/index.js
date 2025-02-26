import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.configDotenv({ path: "./.env" });
const app = express();

app.use(cors({ origin: ["http://localhost:5173"] }));

const port = process.env.PORT || 3005;

app.listen(port, () => console.log("Listening to port", port));
