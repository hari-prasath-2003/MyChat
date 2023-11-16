import { Router } from "express";
import {
  getChatByConvId,
  recentChatHandler,
  recomendationHandler,
} from "./controller.js";

const router = Router();

router.get("/recent", recentChatHandler);

router.get("/recomendation", recomendationHandler);

router.get("/", getChatByConvId);

export default router;
