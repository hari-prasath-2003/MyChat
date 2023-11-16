import { Router } from "express";
import { userInfoHandler } from "./controller.js";

const router = Router();

// return the user detail (name,profile,id) with the mogodb id
router.get("/", userInfoHandler);

export default router;
