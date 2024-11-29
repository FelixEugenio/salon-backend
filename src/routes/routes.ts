import { Router } from "express";
import { Request, Response } from "express";
import { UserController } from "../controllers/user-controller";
import { isAuthenticated } from "../middlewares/auth-middlewares";

const router = Router();

const userController = new UserController();

router.post("/users",userController.register);
router.post("/login",userController.login);
router.get("/profile/:id",isAuthenticated,userController.profile);
router.delete("/users/:id",isAuthenticated,userController.delete);
router.put("/users/:id",isAuthenticated,userController.update);
router.get("/users/blocked/:id",isAuthenticated,userController.blockedUser);
router.get("/users/unblocked/:id",isAuthenticated,userController.unBlockedUser);

export default router;