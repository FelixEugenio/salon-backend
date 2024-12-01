import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { isAuthenticated } from "../middlewares/auth-middlewares";
import { isAdmin } from "../middlewares/isAdmin";
import { ServiceController } from "../controllers/service-controller";
import { ProfessionalController } from "../controllers/professional-controller";
import { AppointmentController } from "../controllers/appointment-controller";

const router = Router();

const userController = new UserController();
const serviceController = new ServiceController();
const professionalController = new ProfessionalController();
const appointmentController = new AppointmentController();

router.post("/users",userController.register);
router.post("/login",userController.login);
router.get("/profile/:id",isAuthenticated,userController.profile);
router.delete("/users/:id",isAuthenticated,userController.delete);
router.put("/users/:id",isAuthenticated,userController.update);
router.get("/users/blocked/:id",isAdmin,isAuthenticated,userController.blockedUser);
router.get("/users/unblocked/:id",isAdmin,isAuthenticated,userController.unBlockedUser);
router.get("/users",isAuthenticated,userController.getAllUsers);
router.get("/services",isAuthenticated,serviceController.getAll);
router.post("/services",isAuthenticated,serviceController.create);
router.get("/services/:id",isAuthenticated,serviceController.getById);
router.put("/services/:id",isAuthenticated,serviceController.update);
router.delete("/services/:id",isAuthenticated,serviceController.delete);
router.get("/professionals",isAuthenticated,professionalController.getAll);
router.post("/professionals",isAuthenticated,professionalController.create);
router.get("/professionals/:id",isAuthenticated,professionalController.getById);
router.put("/professionals/:id",isAuthenticated,professionalController.update);
router.delete("/professionals/:id",isAuthenticated,professionalController.delete);
router.get("/appointments",isAuthenticated,appointmentController.getAll);
router.post("/appointments",isAuthenticated,appointmentController.create);
router.get("/appointments/:id",isAuthenticated,appointmentController.getOne);
router.put("/appointments/:id",isAuthenticated,appointmentController.update);
router.delete("/appointments/:id",isAuthenticated,appointmentController.delete);
router.get("/appointments/cancel/:id",isAuthenticated,appointmentController.cancel);


export default router;