import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "yandev",
  database: "Crud_Usuarios",
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
