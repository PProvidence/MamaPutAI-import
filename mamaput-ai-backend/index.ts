import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import { aiRouter } from "./routers/AIRouter.ts";
import { userRouter } from "./routers/UserRouter.ts";
import { auth } from "./lib/auth.ts";
configDotenv({ path: "./.env" });
const app = express();

 
app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());
app.use("/ai", aiRouter)
app.use("/user", userRouter)
app.use(cors({ origin: ["http://localhost:5173"] }));

const port = process.env.PORT || 3005;

app.listen(port, () => console.log("Listening to port", port));
