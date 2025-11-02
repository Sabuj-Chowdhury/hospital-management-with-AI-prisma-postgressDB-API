import { Request } from "express";
import { prisma } from "../../config/prismaInstance";

import bcrypt from "bcryptjs";
import { fileUploader } from "../../utils/fileUploder";

const createPatient = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    console.log(uploadResult);
  }
  // const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // // transaction rollback
  // const result = await prisma.$transaction(async (tnx) => {
  //   await tnx.user.create({
  //     data: {
  //       email: req.body?.patient.email,
  //       password: hashedPassword,
  //     },
  //   });

  //   return await tnx.patient.create({
  //     data: {
  //       email: req.body?.patient.email,
  //       name: req.body?.patient.name,
  //     },
  //   });
  // });

  // return result;
};

export const UserService = {
  createPatient,
};
