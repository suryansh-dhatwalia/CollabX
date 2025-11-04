import * as projectController from "../controller/project.controller.js";
import { body } from "express-validator";
import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controller/user.controller.js";
const router = Router();

router.post(
  "/create",
  authMiddleWare,
  body("name").isString().withMessage("Name is required"),
  projectController.createProjectController
);

router.get("/all", authMiddleWare, projectController.getAllProjects);

router.put("/add-user", authMiddleWare, projectController.addUserToProject);

router.get("/get-project/:projectId",authMiddleWare,projectController.getProject)

export default router;
