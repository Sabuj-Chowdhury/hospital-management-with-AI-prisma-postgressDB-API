import { Gender } from "@prisma/client";
import z from "zod";

export const createPatientZodSchema = z.object({
  password: z.string({ error: "password required!" }),
  patient: z.object({
    name: z.string({ error: "name is required" }),
    email: z.email(),
    address: z.string().optional(),
  }),
});

export const createAdminZodSchema = z.object({
  password: z.string({ error: "Password required" }),
  admin: z.object({
    name: z.string({ error: "name is required" }),
    email: z.email(),
    contactNumber: z.string({ error: "Contact number is required" }),
  }),
});

export const createDoctorZodSchema = z.object({
  password: z.string({ error: "Password required" }),
  doctor: z.object({
    name: z.string({ error: "name is required" }),
    email: z.email(),
    contactNumber: z.string({ error: "Contact number is required" }),
    address: z.string().optional(),
    registrationNumber: z.string({ error: "Registration number is required!" }),
    experience: z.number().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    appointmentFee: z.number({ error: "Appointment fee is required!" }),
    qualification: z.string({ error: "Qualification is required!" }),
    currentWorkingPlace: z.string({
      error: "Current working place is required!",
    }),
    designation: z.string({ error: "Designation is required!" }),
  }),
});
