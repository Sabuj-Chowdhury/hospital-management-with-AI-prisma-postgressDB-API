import { Router } from "express";
import { ScheduleControllers } from "./schedules.controller";

export const scheduleRouter = Router();

scheduleRouter.post("/", ScheduleControllers.createSchedule);
