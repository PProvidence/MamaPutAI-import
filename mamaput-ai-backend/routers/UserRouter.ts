import express from "express";
import { editUser } from "../services/UserService.ts";

export const userRouter = express.Router()
 
userRouter.post('/edit/:id', editUser)
