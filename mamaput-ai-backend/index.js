import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { aiRouter } from "./routers/AIRouter.js";
dotenv.configDotenv({ path: "./.env" });
const app = express();

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());
app.use(aiRouter)
app.use(cors({ origin: ["http://localhost:5173"] }));

const port = process.env.PORT || 3005;

app.listen(port, () => console.log("Listening to port", port));
