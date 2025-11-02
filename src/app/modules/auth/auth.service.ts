import { UserStatus } from "@prisma/client";
import { prisma } from "../../config/prismaInstance";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/generateToken";

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

  const accessToken = generateToken(
    { email: user.email, role: user.role },
    "abcd",
    "1h"
  );
  const refreshToken = generateToken(
    { email: user.email, role: user.role },
    "abcd",
    "90d"
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

export const AuthService = {
  login,
};
