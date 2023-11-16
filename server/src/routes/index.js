import { Router } from "express";

import authRoute from "../domain/auth/index.js";
import userRoute from "../domain/user/index.js";
import chatRoutes from "../domain/chat/index.js";
import verifyUser from "../utils/verifyUser.js";

const routes = Router();

routes.use("/auth", authRoute);
routes.use(verifyUser);
routes.use("/user", userRoute);
routes.use("/chat", chatRoutes);

export default routes;
