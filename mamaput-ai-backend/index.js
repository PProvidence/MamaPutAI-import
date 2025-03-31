import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import { aiRouter } from "./routers/AIRouter.js";
import { userRouter } from "./routers/UserRouter.js";
import { auth } from "./lib/auth.js";
import { feedbackRouter } from "./routers/FeedbackRouter.js";
import { mealRouter } from "./routers/MealRouter.js";
configDotenv({ path: "./.env" });
const app = express();


app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.use("/ai", aiRouter)
app.use("/user", userRouter)
app.use("/feedback", feedbackRouter)
app.use("/meal", mealRouter)

const port = process.env.PORT || 3005;

app.listen(port, () => console.log("Listening to port", port));
