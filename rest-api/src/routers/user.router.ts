import { Router } from "express";
import {
  createUser,
  deleteUser,
  editUser,
  getUserId,
  getUsers,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserId);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);
userRouter.patch("/:id", editUser);
export { userRouter };
