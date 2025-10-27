import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  // console.log(`Controller create patient `, req.body);
  const payload = req.body;
  const result = await UserService.createPatient(payload);
  console.log(result);
});

export const UserController = {
  createPatient,
};
