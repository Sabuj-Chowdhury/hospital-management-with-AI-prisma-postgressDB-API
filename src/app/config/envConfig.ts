import dotenv from "dotenv";

dotenv.config();

interface IEnv {
  PORT: string;
  NODE_ENV: "development" | "production";
  DATABASE_URL: string;
}

// load env variables
const envVariables = (): IEnv => {
  const requiredVariables: string[] = ["PORT", "NODE_ENV", "DATABASE_URL"];

  requiredVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required env variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    DATABASE_URL: process.env.DATABASE_URL as string,
  };
};

export const envConfig = envVariables();
