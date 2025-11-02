import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAdminZodSchema,
  createDoctorZodSchema,
  createPatientZodSchema,
} from "./user.validation";
import { fileUploader } from "../../utils/fileUploder";

export const userRouter = Router();

userRouter.get("/", UserController.getAllUsers);

userRouter.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  validateRequest(createPatientZodSchema),
  UserController.createPatient
);

userRouter.post(
  "/create-admin",
  fileUploader.upload.single("file"),
  validateRequest(createAdminZodSchema),
  UserController.createAdmin
);

userRouter.post(
  "/create-doctor",
  fileUploader.upload.single("file"),
  validateRequest(createDoctorZodSchema),
  UserController.createDoctor
);
