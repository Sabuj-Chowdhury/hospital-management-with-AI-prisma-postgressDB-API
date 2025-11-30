import { Request } from "express";
import { prisma } from "../../config/prismaInstance";

import bcrypt from "bcryptjs";
import { fileUploader } from "../../utils/fileUploder";
import { Admin, Doctor, Prisma, UserRole } from "@prisma/client";
import { paginationHelper, TOptions } from "../../utils/paginationHelper";
import { userSearchableField } from "./user.constant";

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

const createDoctor = async (req: Request): Promise<Doctor> => {
  // console.log(req.body);

  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.doctor.profilePhoto = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const doctorCreate = await transactionClient.doctor.create({
      data: req.body.doctor,
    });
    return doctorCreate;
  });

  return result;
};

const getAllUsers = async (filters: any, options: TOptions) => {
  const { page, limit, skip, sort, order } =
    paginationHelper.calculatePagination(options);

  const { search, ...filterData } = filters;

  const andConditions: Prisma.UserWhereInput[] = [];
  // console.log(andConditions);

  if (search) {
    andConditions.push({
      OR: userSearchableField.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  // console.log(andConditions);

  const allUsers = await prisma.user.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
    },
    orderBy: {
      [sort]: order,
    },
  });

  // const total = await prisma.user.count({});

  return allUsers;
};

export const UserService = {
  createPatient,
  createAdmin,
  createDoctor,
  getAllUsers,
};
