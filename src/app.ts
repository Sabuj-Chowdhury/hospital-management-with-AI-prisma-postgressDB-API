import express, { Request, Response, type Application } from "express";
import cors from "cors";
import { envConfig } from "./app/config/envConfig";
import cookieParser from "cookie-parser";
import { uptime } from "process";
import { timeStamp } from "console";
import globalErrorhandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// router
app.use("/api/vi", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "server is running...",
    environment: envConfig.NODE_ENV,
    uptime: process.uptime().toFixed(2) + " sec",
    timeStamp: new Date().toISOString(),
  });
});

app.use(globalErrorhandler);
app.use(notFound);

export default app;
