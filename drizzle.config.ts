import type { Config } from "drizzle-kit";
 
export default {
  schema: "./src/lib/schema.ts",
  out: "./src/drizzle"
} satisfies Config;