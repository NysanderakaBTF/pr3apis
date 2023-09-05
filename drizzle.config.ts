import type { Config } from "drizzle-kit";

export default {
    schema: './db/schema.ts',
    driver: 'pg',
    out: "./drizzle",
    dbCredentials: {
        connectionString: "postgres://postgres:123@127.0.0.1:5432/db",
    }
} satisfies Config;