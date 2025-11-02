import { Request } from "express";
import { prisma } from "../../config/prismaInstance";

import bcrypt from "bcryptjs";
import { fileUploader } from "../../utils/fileUploder";
import { Admin, UserRole } from "@prisma/client";

const createPatient = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.patient.profilePhoto = uploadResult?.secure_url;
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // transaction rollback
  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body?.patient.email,
        password: hashedPassword,
      },
    });

    return await tnx.patient.create({
      data: req.body.patient,
    });
  });

  return result;
};

const createAdmin = async (req: Request): Promise<Admin> => {
  // console.log(req.body);

  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.admin.profilePhoto = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const adminCreate = await transactionClient.admin.create({
      data: req.body.admin,
    });
    return adminCreate;
  });

  return result;
};

export const UserService = {
  createPatient,
  createAdmin,
};
