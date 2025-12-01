import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAdminZodSchema,
  createDoctorZodSchema,
  createPatientZodSchema,
} from "./user.validation";
import { fileUploader } from "../../utils/fileUploder";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";

export const userRouter = Router();

userRouter.get("/", checkAuth(UserRole.ADMIN), UserController.getAllUsers);

userRouter.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  validateRequest(createPatientZodSchema),
  UserController.createPatient
);

userRouter.post(
  "/create-admin",
  checkAuth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  validateRequest(createAdminZodSchema),
  UserController.createAdmin
);

userRouter.post(
  "/create-doctor",
  checkAuth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  validateRequest(createDoctorZodSchema),
  UserController.createDoctor
);
