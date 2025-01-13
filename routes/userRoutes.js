import { Router } from "express";
import { signinUser, signoutUser, signupUser } from "../controllers/userController.js";

const router = Router();

router.post("/signup", signupUser)
router.post("/signin", signinUser)                                           
router.post("/signout", signoutUser)

export default router