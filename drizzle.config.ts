import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        password: process.env.POSTGRES_PASSWORD!,
        host: process.env.POSTGRES_HOST!,
        port: +process.env.POSTGRES_PORT!,
        database: process.env.POSTGRES_DATABASE!,
        user: process.env.POSTGRES_USER!,
        ssl: true,
    },
    verbose: true,
    strict: true,
})
