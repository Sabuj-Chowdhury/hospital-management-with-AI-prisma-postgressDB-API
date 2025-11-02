import z from "zod";

export const createPatientZodSchema = z.object({
  password: z.string("password required!"),
  patient: z.object({
    name: z.string("Name required!"),
    email: z.email(),
    address: z.string().optional(),
  }),
});
