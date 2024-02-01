import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'


// Connect to Vercel Postgres
export const db = drizzle(sql)
