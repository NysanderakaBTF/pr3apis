const { drizzle, PostgresJsDatabase } = require('drizzle-orm/postgres-js');
// @ts-ignore
const postgres = require('postgres');
const schemas = require('./schema.ts');

// for query purposes
// const queryClient = postgres("postgres://postgres:123@127.0.0.1:5432/db");
const queryClient = postgres(process.env.PG_CONN_STR);
const db = drizzle(queryClient, {schema:{...schemas}});

module.exports.db = db;