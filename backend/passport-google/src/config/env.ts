import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    PORT: z
        .string()
        .transform((val) => parseInt(val, 10))
        .default("3000"),
    SESSION_SECRET: z.string().min(1, "SESSION_SECRET is required"),
    MYSQL_HOST: z.string().min(1, "MYSQL_HOST is required"),
    MYSQL_PASSWORD: z.string().min(1, "MYSQL_PASSWORD is required"),
    MYSQL_DB: z.string().min(1, "MYSQL_DB is required"),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error("❌ Invalid environment variables:", env.error.format());
    process.exit(1);
}

export const validateEnv = env.data;
