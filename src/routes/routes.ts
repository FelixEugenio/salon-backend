import { Router } from "express";
import { Request, Response } from "express";
import { UserController } from "../controllers/user-controller";
import { UserService } from "../services/user-service";
import { authMiddleware } from "../middlewares/auth-middlewares";

const router = Router();

const userController = new UserController();

router.post("/users",userController.register);
router.post("/login",userController.login);
router.get("/profile/:id",authMiddleware,userController.profile);

export default router;