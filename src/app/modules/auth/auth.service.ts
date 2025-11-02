import { UserStatus } from "@prisma/client";
import { prisma } from "../../config/prismaInstance";
import bcrypt from "bcryptjs";

const login = async (payload: { email: string; password: string }) => {
  // console.log(payload);
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  // match the password
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Password does not match!");
  }
};

export const AuthService = {
  login,
};
