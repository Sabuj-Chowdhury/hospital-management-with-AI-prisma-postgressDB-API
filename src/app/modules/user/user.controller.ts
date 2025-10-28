import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  // console.log(`Controller create patient `, req.body);
  const payload = req.body;
  const result = await UserService.createPatient(payload);
  // console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Patient created successfully!",
    data: result,
  });
});

export const UserController = {
  createPatient,
};
