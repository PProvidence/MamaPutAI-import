import express from "express";
import { editUser, getUser } from "../services/UserService.ts";

export const userRouter = express.Router()
 
userRouter.post('/edit/:id', editUser)
userRouter.get('/:id', getUser)
