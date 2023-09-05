import { migrate } from "drizzle-orm/postgres-js/migrator";
// @ts-ignore
import postgres from "postgres";
const {drizzle} = require("drizzle-orm/postgres-js");
const migrationClient = postgres("postgres://postgres:123@127.0.0.1:5432/db", { max: 1 });
export const migrateDB = async () => {
    console.log("migrating db");
    await migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" });
    console.log("db migrated");
};

migrateDB();