import express  from "express";
import userController from "../controllers/userController";
import imageController from "../controllers/imageController";
import authAuthentication from "../middleware/authAuthentication";
const router = express.Router();

//Routes for user
router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);
//router.get("/user/:id_user", authAuthentication, userController.getUser);
router.get("/user", authAuthentication, userController.getUser);

//Routes for image
router.post("/gallery", authAuthentication, imageController.create);
router.get("/gallery", authAuthentication, imageController.getAll);
router.delete("/gallery", authAuthentication, imageController.deleteAllByUser);
router.post("/gallery/search", authAuthentication, imageController.searchImageByTitle);
router.get("/gallery/:id_image", authAuthentication, imageController.getById);
router.delete("/gallery/:id_image", authAuthentication, imageController.deleteById);

export default router;


