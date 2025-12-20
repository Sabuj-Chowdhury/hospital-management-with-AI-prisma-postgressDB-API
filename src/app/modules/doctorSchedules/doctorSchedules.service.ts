import { prisma } from "../../config/prismaInstance";
import { IJWTPayload } from "../../types/common";

const createDoctorSchedules = async (
  user: IJWTPayload,
  payload: { schedulesIDs: string[] }
) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const doctorScheduleData = payload.schedulesIDs.map((scheduleID) => ({
    doctorId: doctorData.id,
    scheduleId: scheduleID,
  }));

  return await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });
};

export const DoctorSchedulesService = {
  createDoctorSchedules,
};
