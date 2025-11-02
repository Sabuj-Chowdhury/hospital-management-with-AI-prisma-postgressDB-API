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
