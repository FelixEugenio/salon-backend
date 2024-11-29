import { Router } from "express";
import { Request, Response } from "express";
import { UserController } from "../controllers/user-controller";
import { UserService } from "../services/user-service";

const router = Router();

const userController = new UserController();

router.post("/users",userController.register);

export default router;