import { prisma } from "../../config/prismaInstance";

const createDoctorSchedules = async (user: any, payload: any) => {
  console.log({ user, payload });

  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  return { user, payload }; //boilerplate
};

export const DoctorSchedulesService = {
  createDoctorSchedules,
};
