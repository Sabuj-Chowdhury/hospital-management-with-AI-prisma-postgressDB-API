import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { any } from "zod";
import pick from "../../utils/pick";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  // console.log(`Controller create patient `, req);
  // const payload = req.body;
  const result = await UserService.createPatient(req);
  // console.log(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Patient created successfully!",
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createAdmin(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createDoctor(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Doctor created successfully!",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  // to use the dynamic pick function
  const options = pick(req.query, ["page", "limit", "sort", "order"]);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search || "";
  const sort = req.query.sort || "";
  const order = req.query.order || "";
  const role = req.query.role || "";
  const status = req.query.status || "";
  // console.log(search);

  const result = await UserService.getAllUsers({
    page,
    limit,
    search,
    sort,
    order,
    role,
    status,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users retrieved successfully!",
    data: result,
  });
});

export const UserController = {
  createPatient,
  createAdmin,
  createDoctor,
  getAllUsers,
};
