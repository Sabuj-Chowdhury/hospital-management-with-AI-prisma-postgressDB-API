import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { authRouter } from "../modules/auth/auth.routes";
import { scheduleRouter } from "../modules/schedules/schedules.routes";
import { doctorSchedulesRouter } from "../modules/doctorSchedules/doctorSchedules.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/schedules",
    route: scheduleRouter,
  },
  {
    path: "/doctorSchedules",
    route: doctorSchedulesRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
