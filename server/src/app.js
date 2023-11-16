import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import createSocketServer from "./socket.js";
import "./config/db.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/assets", express.static("assets"));
app.use(routes);

const ExpressServer = app.listen(3000, () => {
  console.log("server listening on port 3000");
});

createSocketServer(ExpressServer);
