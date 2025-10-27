import express, { Request, Response, type Application } from "express";
import cors from "cors";
import { envConfig } from "./app/config/envConfig";
import { uptime } from "process";
import { timeStamp } from "console";
import globalErrorhandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
