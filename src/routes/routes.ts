import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { isAuthenticated } from "../middlewares/auth-middlewares";
import { isAdmin } from "../middlewares/isAdmin";
import { ServiceController } from "../controllers/service-controller";
import { ProfessionalController } from "../controllers/professional-controller";

const router = Router();

const userController = new UserController();
const serviceController = new ServiceController();
const professionalController = new ProfessionalController();

router.post("/users",userController.register);
router.post("/login",userController.login);
router.get("/profile/:id",isAuthenticated,userController.profile);
router.delete("/users/:id",isAuthenticated,userController.delete);
router.put("/users/:id",isAuthenticated,userController.update);
router.get("/users/blocked/:id",isAdmin,isAuthenticated,userController.blockedUser);
router.get("/users/unblocked/:id",isAdmin,isAuthenticated,userController.unBlockedUser);
router.get("/users",isAuthenticated,userController.getAllUsers);
router.get("/services",isAuthenticated,isAdmin,serviceController.getAll);
router.post("/services",isAuthenticated,isAdmin,serviceController.create);
router.get("/services/:id",isAuthenticated,serviceController.getById);
router.put("/services/:id",isAuthenticated,isAdmin,serviceController.update);
router.delete("/services/:id",isAuthenticated,isAdmin,serviceController.delete);
router.get("/professionals",isAuthenticated,isAdmin,professionalController.getAll);
router.post("/professionals",isAuthenticated,isAdmin,professionalController.create);
router.get("/professionals/:id",isAuthenticated,professionalController.getById);
router.put("/professionals/:id",isAuthenticated,isAdmin,professionalController.update);
router.delete("/professionals/:id",isAuthenticated,isAdmin,professionalController.delete);


export default router;