import { Router } from "express";
import { ScheduleControllers } from "./schedules.controller";

export const scheduleRouter = Router();

scheduleRouter.get("/", ScheduleControllers.schedulesForDoctor);

scheduleRouter.post("/", ScheduleControllers.createSchedule);
