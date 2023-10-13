import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  out: "./drizzle/migrations",
  schema: "./app/db/schemas",
  driver: "libsql",
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
