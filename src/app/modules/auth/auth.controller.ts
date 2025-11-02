import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await AuthService.login(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Logged in successfully!",
    data: {},
  });
});

export const AuthController = {
  login,
};
