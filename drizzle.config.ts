import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        password: process.env.POSTGRES_PASS!,
        host: process.env.POSTGRES_HOST!,
        port: +process.env.POSTGRES_PORT!,
        database: process.env.POSTGRES_PORT!,
        user: process.env.POSTGRES_USER!,
    },
    verbose: true,
    strict: true,
})
