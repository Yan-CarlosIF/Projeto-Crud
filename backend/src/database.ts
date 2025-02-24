import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const query = (text: string, params?: any[]): Promise<any> =>
  pool.query(text, params);
