import z from "zod";

export const createPatientZodSchema = z.object({
  password: z.string(),
  patient: z.object({
    name: z.string(),
    email: z.email(),
    address: z.string().optional(),
  }),
});
