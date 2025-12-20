import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { DoctorSchedulesService } from "./doctorSchedules.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { IJWTPayload } from "../../types/common";

const createDoctorSchedules = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const payload = req.body;
    const user = req.user;

    const result = await DoctorSchedulesService.createDoctorSchedules(
      user as IJWTPayload,
      payload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctor schedules booked successfully!",
      data: result,
    });
  }
);

export const DoctorSchedulesController = {
  createDoctorSchedules,
};
