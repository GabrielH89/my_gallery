import express  from "express";
import userController from "../controllers/userController";
import imageController from "../controllers/imageController";
import authAuthentication from "../middleware/authAuthentication";
const router = express.Router();

//Routes for user
router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
//router.get("/user/:id_user", authAuthentication, userController.getUser);
router.get("/user", authAuthentication, userController.getUser);
router.delete("/user", authAuthentication, userController.deleteById);

//Routes for image
router.post("/gallery", authAuthentication, imageController.create);
router.get("/gallery", authAuthentication, imageController.getAll);
router.delete("/gallery", authAuthentication, imageController.deleteAllByUser);
router.post("/gallery/search", authAuthentication, imageController.searchImageByTitle);
router.get("/gallery/:id_image", authAuthentication, imageController.getById);
router.delete("/gallery/:id_image", authAuthentication, imageController.deleteById);
router.put("/gallery/:id_image", authAuthentication, imageController.updateById);

export default router;


