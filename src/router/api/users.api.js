import { Router } from "express";
import {
  readUsers,
  createUser,
  destroyUser,
  updateUser,
  readOneUser,
} from "../../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/", readUsers);
usersRouter.get("/:uid", readOneUser);
usersRouter.post("/", createUser);
usersRouter.put("/:uid", updateUser);
usersRouter.delete("/:uid", destroyUser);

export default usersRouter;
