import { env } from "@mon/env"
import { type Config } from "drizzle-kit"

export default {
  schema: "./schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["wall_*"],
} satisfies Config
