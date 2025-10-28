import { prisma } from "../../config/prismaInstance";
import { CreatePatientInput } from "./user.interface";
import bcrypt from "bcryptjs";

const createPatient = async (payload: CreatePatientInput) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // transaction rollback
  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
      },
    });

    return await tnx.patient.create({
      data: {
        email: payload.email,
        name: payload.name,
      },
    });
  });

  return result;
};

export const UserService = {
  createPatient,
};
