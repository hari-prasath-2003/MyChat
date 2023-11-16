import { Router } from "express";
import { loginHandler, signupHandler } from "./controller.js";
import profileUploadHandler from "../../utils/fileUploader.js";

const router = Router();

router.post("/login", loginHandler);

router.post("/signup", signupHandler);

router.post("/profile", profileUploadHandler);

export default router;
