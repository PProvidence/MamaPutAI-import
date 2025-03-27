import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import { auth } from "./lib/auth.ts";
import { aiRouter } from "./routers/AIRouter.ts";
configDotenv({ path: "./.env" });
const app = express();

 
app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());
app.use(aiRouter)
app.use(cors({ origin: ["http://localhost:5173"] }));

const port = process.env.PORT || 3005;

app.listen(port, () => console.log("Listening to port", port));
