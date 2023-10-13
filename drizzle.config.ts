import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  out: "./drizzle/migrations",
  schema: "./src/db/schemas",
  driver: "libsql",
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
