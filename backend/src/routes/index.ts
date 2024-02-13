import express  from "express";
import userController from "../controllers/userController";

const router = express.Router();

//Routes for user
router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);

export default router;