import express  from "express";
import userController from "../controllers/userController";
import imageController from "../controllers/imageController";
import authAuthentication from "../middleware/authAuthentication";
const router = express.Router();

//Routes for user
router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);

//Routes for image
router.post("/gallery", authAuthentication, imageController.create);
router.get("/gallery", authAuthentication, imageController.getAll);
router.delete("/gallery", authAuthentication, imageController.deleteAllByUser);
router.post("/gallery/search", authAuthentication, imageController.searchImageByTitle);
export default router;