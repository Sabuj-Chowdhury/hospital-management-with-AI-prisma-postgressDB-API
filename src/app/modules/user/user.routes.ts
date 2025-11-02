import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createPatientZodSchema } from "./user.validation";
import { fileUploader } from "../../utils/fileUploder";

export const userRouter = Router();

userRouter.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  validateRequest(createPatientZodSchema),
  UserController.createPatient
);

// TODO
// create admin and doctor
