import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import httpStatus from "http-status";
import { ScheduleServices } from "./schedules.service";
import pick from "../../utils/pick";

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

const schedulesForDoctor = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "limit", "sort", "order"]); //pagination
  const filters = pick(req.query, ["startDateTime", "endDateTime"]); //filters

  const result = await ScheduleServices.schedulesForDoctor(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All schedules retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const deleteScheduleFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ScheduleServices.deleteScheduleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedules Deleted successfully!",
    data: result,
  });
});

export const ScheduleControllers = {
  createSchedule,
  schedulesForDoctor,
  deleteScheduleFromDB,
};
