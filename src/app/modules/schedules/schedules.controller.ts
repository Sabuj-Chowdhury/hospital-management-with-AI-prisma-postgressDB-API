import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import httpStatus from "http-status";
import { ScheduleServices } from "./schedules.service";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await ScheduleServices.createSchedule(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Schedule created successfully!",
    data: result,
  });
});

export const ScheduleControllers = {
  createSchedule,
};
