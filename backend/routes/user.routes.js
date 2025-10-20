import { Router } from "express";
import * as userController from "../controller/user.controller.js";
import { body, validationResult } from "express-validator";
import { authMiddleWare } from "../middleware/auth.middleware.js";

const router = Router();
const registerRules = () => {
  return [
    body("email").isEmail().withMessage("Please provide a valid email address"),

    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
  ];
};

router.post("/register", registerRules(), userController.createUserController);
router.post("/login",registerRules(), userController.loginController);
router.get("/profile",authMiddleWare,userController.profileController);

export default router;